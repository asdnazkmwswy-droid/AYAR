PRAGMA foreign_keys = ON;

CREATE TABLE merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','pending')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  name TEXT NOT NULL,
  is_default INTEGER NOT NULL DEFAULT 0 CHECK (is_default IN (0,1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_branches_merchant ON branches(merchant_id);

CREATE TABLE staff_users (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'staff',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','disabled')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(merchant_id, email)
);
CREATE INDEX idx_staff_merchant ON staff_users(merchant_id);

CREATE TABLE gold_prices (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  karat INTEGER NOT NULL CHECK (karat IN (18,21,22,24)),
  price_per_gram_iqd INTEGER NOT NULL CHECK (price_per_gram_iqd >= 0),
  effective_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_gold_prices_lookup ON gold_prices(merchant_id, karat, effective_at);

CREATE TABLE inventory_items (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  branch_id TEXT NOT NULL REFERENCES branches(id),
  sku TEXT,
  barcode TEXT,
  title TEXT NOT NULL,
  karat INTEGER NOT NULL CHECK (karat IN (18,21,22,24)),
  weight_mg INTEGER NOT NULL CHECK (weight_mg >= 0),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(merchant_id, sku),
  UNIQUE(merchant_id, barcode)
);
CREATE INDEX idx_inventory_merchant_branch ON inventory_items(merchant_id, branch_id);

CREATE TABLE invoices (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  branch_id TEXT NOT NULL REFERENCES branches(id),
  invoice_number TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('sale','purchase','exchange')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','posted','reversed')),
  customer_id TEXT,
  subtotal_iqd INTEGER NOT NULL DEFAULT 0 CHECK (subtotal_iqd >= 0),
  discount_iqd INTEGER NOT NULL DEFAULT 0 CHECK (discount_iqd >= 0),
  total_iqd INTEGER NOT NULL DEFAULT 0 CHECK (total_iqd >= 0),
  paid_iqd INTEGER NOT NULL DEFAULT 0 CHECK (paid_iqd >= 0),
  gold_price_snapshot_json TEXT,
  posted_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(merchant_id, invoice_number)
);
CREATE INDEX idx_invoices_merchant_date ON invoices(merchant_id, created_at);

CREATE TABLE invoice_lines (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  invoice_id TEXT NOT NULL REFERENCES invoices(id),
  item_id TEXT REFERENCES inventory_items(id),
  description TEXT NOT NULL,
  karat INTEGER NOT NULL CHECK (karat IN (18,21,22,24)),
  weight_mg INTEGER NOT NULL CHECK (weight_mg >= 0),
  gold_price_per_gram_iqd INTEGER NOT NULL CHECK (gold_price_per_gram_iqd >= 0),
  gold_value_iqd INTEGER NOT NULL CHECK (gold_value_iqd >= 0),
  workmanship_iqd INTEGER NOT NULL DEFAULT 0 CHECK (workmanship_iqd >= 0),
  stones_iqd INTEGER NOT NULL DEFAULT 0 CHECK (stones_iqd >= 0),
  discount_iqd INTEGER NOT NULL DEFAULT 0 CHECK (discount_iqd >= 0),
  total_iqd INTEGER NOT NULL CHECK (total_iqd >= 0)
);
CREATE INDEX idx_invoice_lines_merchant_invoice ON invoice_lines(merchant_id, invoice_id);

CREATE TABLE inventory_movements (
  id TEXT PRIMARY KEY,
  merchant_id TEXT NOT NULL REFERENCES merchants(id),
  branch_id TEXT NOT NULL REFERENCES branches(id),
  item_id TEXT NOT NULL REFERENCES inventory_items(id),
  invoice_id TEXT REFERENCES invoices(id),
  movement_type TEXT NOT NULL CHECK (movement_type IN ('opening','purchase','sale','return','adjustment','reversal')),
  quantity_mg INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_inventory_movements_item ON inventory_movements(merchant_id, item_id, created_at);

CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  merchant_id TEXT REFERENCES merchants(id),
  actor_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_merchant_date ON audit_logs(merchant_id, created_at);
