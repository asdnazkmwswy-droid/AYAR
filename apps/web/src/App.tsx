import { useState } from "react";
import {
  Activity, ArrowDownLeft, ArrowUpLeft, BadgeDollarSign, Bell, Boxes,
  Calculator, ChevronDown, CircleHelp, Gem, LayoutDashboard, Menu,
  Package, Search, Settings, ShieldCheck, Users, Wallet
} from "lucide-react";

const nav = [
  { label: "نظرة عامة", icon: LayoutDashboard },
  { label: "الفواتير", icon: BadgeDollarSign },
  { label: "المخزون", icon: Boxes },
  { label: "حاسبة الذهب", icon: Calculator },
  { label: "الزبائن", icon: Users },
  { label: "الصندوق والحسابات", icon: Wallet },
  { label: "التقارير", icon: Activity },
];

function Metric({ title, value, note, icon: Icon }: {
  title: string; value: string; note: string; icon: typeof Wallet
}) {
  return <article className="metric">
    <div className="metric-top"><span>{title}</span><i><Icon size={19}/></i></div>
    <strong>{value}</strong><small>{note}</small>
  </article>;
}

export default function App() {
  const [active, setActive] = useState("نظرة عامة");
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="shell">
    <aside className={menuOpen ? "sidebar open" : "sidebar"}>
      <div className="brand"><span className="brand-mark"><Gem size={23}/></span><div><b>AYAR</b><small>نظام إدارة الصاغة</small></div></div>
      <div className="workspace"><span className="shop-dot"/> متجر تجريبي <ChevronDown size={15}/></div>
      <p className="nav-caption">القائمة الرئيسية</p>
      <nav>{nav.map(item => <button key={item.label} className={active === item.label ? "nav-item selected" : "nav-item"} onClick={() => {setActive(item.label);setMenuOpen(false);}}><item.icon size={18}/>{item.label}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings size={18}/>الإعدادات</button><button className="nav-item"><CircleHelp size={18}/>المساعدة والدعم</button><div className="secure"><ShieldCheck size={17}/><span>مساحة عمل آمنة<br/><small>بيانات متجرك محمية</small></span></div></div>
    </aside>
    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu/></button>
        <div className="crumb">مساحة التاجر <span>/</span> {active}</div>
        <div className="top-actions"><button className="icon-btn"><Search size={18}/></button><button className="icon-btn"><Bell size={18}/></button><div className="avatar">م</div></div>
      </header>
      <section className="content">
        <div className="welcome"><div><p className="eyebrow">الأحد، مساحة تجريبية</p><h1>مرحباً بك في عيار</h1><p>كل تفاصيل محلك في مكان واحد، بوضوح ودقة.</p></div><button className="gold-button">＋ فاتورة جديدة</button></div>
        <div className="section-head"><div><h2>ملخص المتجر</h2><p>نظرة سريعة على حركة المتجر</p></div><button className="period">آخر 30 يوم <ChevronDown size={15}/></button></div>
        <div className="metrics">
          <Metric title="إجمالي المبيعات" value="— د.ع" note="بانتظار ربط البيانات الفعلية" icon={ArrowUpLeft}/>
          <Metric title="إجمالي المشتريات" value="— د.ع" note="بانتظار ربط البيانات الفعلية" icon={ArrowDownLeft}/>
          <Metric title="قيمة المخزون" value="— د.ع" note="لا توجد بيانات تجريبية مفترضة" icon={Package}/>
          <Metric title="رصيد الصندوق" value="— د.ع" note="سيظهر بعد تفعيل الحسابات" icon={Wallet}/>
        </div>
        <div className="lower-grid">
          <section className="panel"><div className="panel-head"><div><h3>حركة المتجر</h3><p>سيظهر الرسم بعد تسجيل العمليات</p></div><span className="soft-tag">ملخص</span></div><div className="empty-chart"><div className="chart-icon"><Activity size={25}/></div><b>لا توجد حركات بعد</b><span>ابدأ بتسجيل أول فاتورة حتى تظهر حركة المتجر هنا.</span></div></section>
          <section className="panel"><div className="panel-head"><div><h3>سعر الذهب</h3><p>أسعار تجريبية غير مفعّلة</p></div><span className="soft-tag">IQD / غرام</span></div><div className="price-list">{[24,22,21,18].map(k => <div className="price-row" key={k}><span>{k} قيراط</span><b>—</b><small>د.ع</small></div>)}</div><div className="notice">أدخل أسعار محلك المعتمدة قبل إصدار أي فاتورة.</div></section>
        </div>
        <footer>AYAR © 2026 <span>نسخة تأسيسية — البيانات غير مفعّلة بعد</span></footer>
      </section>
    </main>
  </div>;
}
