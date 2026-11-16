export type ID = string;
export type IQD = number;
export type WeightMg = number;

export type Karat = 18 | 21 | 22 | 24;

export interface TenantRecord {
  id: ID;
  merchantId: ID;
  createdAt: string;
  updatedAt: string;
}

export interface GoldPrice {
  id: ID;
  merchantId: ID;
  karat: Karat;
  pricePerGramIqd: IQD;
  effectiveAt: string;
}

export interface InvoiceLine {
  id: ID;
  description: string;
  karat: Karat;
  weightMg: WeightMg;
  goldValueIqd: IQD;
  workmanshipIqd: IQD;
  stonesIqd: IQD;
  discountIqd: IQD;
  totalIqd: IQD;
}

export interface InvoiceTotals {
  subtotalIqd: IQD;
  discountIqd: IQD;
  paidIqd: IQD;
  balanceIqd: IQD;
  totalIqd: IQD;
}

export type InvoiceStatus = "draft" | "posted" | "reversed";
export type InvoiceKind = "sale" | "purchase" | "exchange";

export function assertNonNegativeInteger(value: number, field: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${field} must be a non-negative safe integer`);
  }
}

export function calculateLineTotal(input: Pick<InvoiceLine,
  "goldValueIqd" | "workmanshipIqd" | "stonesIqd" | "discountIqd"
>): IQD {
  for (const [field, value] of Object.entries(input)) {
    assertNonNegativeInteger(value, field);
  }
  const total = input.goldValueIqd + input.workmanshipIqd + input.stonesIqd - input.discountIqd;
  if (!Number.isSafeInteger(total) || total < 0) {
    throw new Error("Line total cannot be negative or exceed safe integer range");
  }
  return total;
}
