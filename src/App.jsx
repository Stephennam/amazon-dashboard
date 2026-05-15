import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = {
  bg: "#0d0f14",
  surface: "#161b25",
  card: "#1c2333",
  border: "#2a3347",
  accent: "#4f9cf9",
  green: "#34d399",
  yellow: "#fbbf24",
  red: "#f87171",
  purple: "#a78bfa",
  text: "#e2e8f0",
  muted: "#64748b",
};

const salesData = [
  { month: "11월", 토너: 1240000, 세럼: 980000 },
  { month: "12월", 토너: 1850000, 세럼: 1420000 },
  { month: "1월",  토너: 1320000, 세럼: 1180000 },
  { month: "2월",  토너: 1560000, 세럼: 1340000 },
  { month: "3월",  토너: 1780000, 세럼: 1620000 },
  { month: "4월",  토너: 2100000, 세럼: 1890000 },
  { month: "5월",  토너: 1950000, 세럼: 2040000 },
];

const costData = [
  { name: "상품원가", value: 38, color: "#4f9cf9" },
  { name: "FBA수수료", value: 22, color: "#a78bfa" },
  { name: "광고비", value: 15, color: "#fbbf24" },
  { name: "배송비", value: 12, color: "#34d399" },
  { name: "플랫폼수수료", value: 8, color: "#f87171" },
  { name: "기타", value: 5, color: "#94a3b8" },
];

const orders = [
  { id: "114-8823991-7661032", product: "토너 200ml", qty: 2, price: 58000, status: "배송완료", date: "2026-05-13", ship: "FBA" },
  { id: "114-7712884-5520018", product: "세럼 30ml",  qty: 1, price: 82000, status: "배송중",   date: "2026-05-13", ship: "FBA" },
  { id: "114-6634521-3309877", product: "토너 200ml", qty: 3, price: 87000, status: "처리중",   date: "2026-05-14", ship: "FBA" },
  { id: "114-5598110-2281043", product: "세럼 30ml",  qty: 2, price: 164000, status: "배송완료", date: "2026-05-12", ship: "FBM" },
  { id: "114-4412309-1190023", product: "토너 세럼 세트", qty: 1, price: 128000, status: "취소됨", date: "2026-05-11", ship: "FBA" },
  { id: "114-3302918-0085991", product: "세럼 30ml",  qty: 4, price: 328000, status: "배송완료", date: "2026-05-11", ship: "FBA" },
  { id: "114-2291807-9974880", product: "토너 200ml", qty: 1, price: 29000, status: "배송중",   date: "2026-05-14", ship: "FBM" },
];

const inventory = [
  { product: "토너 200ml",     sku: "TN-200-KR", inStock: 84,  reserved: 12, fba: 68,  fbm: 28, reorder: 50, status: "정상" },
  { product: "세럼 30ml",      sku: "SR-30-KR",  inStock: 32,  reserved: 8,  fba: 24,  fbm: 16, reorder: 40, status: "주의" },
  { product: "토너 세럼 세트", sku: "SET-KR-01", inStock: 15,  reserved: 3,  fba: 12,  fbm: 6,  reorder: 20, status: "부족" },
];

const shipping = [
  { id: "TBA199102984000", product: "토너 200ml x2", carrier: "Amazon Logistics", status: "배송완료", updated: "05/13 14:22", eta: "완료" },
  { id: "TBA199203874001", product: "세럼 30ml x1",  carrier: "UPS",              status: "배송중",   updated: "05/14 09:15", eta: "05/15" },
  { id: "TBA199304763002", product: "토너 200ml x3", carrier: "Amazon Logistics", status: "포장중",   updated: "05/14 11:30", eta: "05/16" },
  { id: "TBA199405652003", product: "세럼 30ml x2",  carrier: "FedEx",            status: "픽업대기", updated: "05/14 08:00", eta: "05/17" },
];

const fmt = (n) => n.toLocaleString("ko-KR") + "원";

const StatusBadge = ({ status }) => {
  const map = {
    배송완료: { bg: "#0d2d1e", color: "#34d399", border: "#166534" },
    배송중:   { bg: "#1a1f0d", color: "#a3e635", border: "#4d7c0f" },
    처리중:   { bg: "#1e1a0d", color: "#fbbf24", border: "#78350f" },
    포장중:   { bg: "#1e1a0d", color: "#fbbf24", border: "#78350f" },
    픽업대기: { bg: "#0d1a2d", color: "#60a5fa", border: "#1e3a5f" },
    취소됨:   { bg: "#2d0d0d", color: "#f87171", border: "#7f1d1d" },
    FBA:      { bg: "#1a0d2d", color: "#a78bfa", border: "#4c1d95" },
    FBM:      { bg: "#0d1a2d", color: "#60a5fa", border: "#1e3a5f" },
    정상:     { bg: "#0d2d1e", color: "#34d399", border: "#166534" },
    주의:     { bg: "#1e1a0d", color: "#fbbf24", border: "#78350f" },
    부족:     { bg: "#2d0d0d", color: "#f87171", border: "#7f1d1d" },
  };
  const s = map[status] || map["처리중"];
  return (
    <span style={{
      padding: "2px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      letterSpacing: "0.03em"
    }}>{status}</span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${COLORS.border}`,
    borderRadius: 14, padding: "20px 24px", ...style
  }}>{children}</div>
);

const KPI = ({ label, value, sub, color = COLORS.accent, icon }) => (
  <Card style={{ flex: 1, minWidth: 160 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ color: COLORS.muted, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
        <div style={{ color, fontSize: 24, fontWeight: 800, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
        {sub && <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 5 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 24, opacity: 0.6 }}>{icon}</div>
    </div>
  </Card>
);

const Tab = ({ id, label, active, onClick }) => (
  <button onClick={() => onClick(id)} style={{
    padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer",
    background: active ? COLORS.accent : "transparent",
    color: active ? "#fff" : COLORS.muted,
    fontWeight: active ? 700 : 500,
    fontSize: 13, transition: "all 0.2s",
    letterSpacing: "0.02em"
  }}>{label}</button>
);

const SectionTitle = ({ children }) => (
  <div style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, marginBottom: 16, letterSpacing: "0.01em" }}>{children}</div>
);

const customTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 16px", fontSize: 12 }}>
      <div style={{ color: COLORS.muted, marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 700 }}>{p.name}: {(p.value / 10000).toFixed(0)}만원</div>
      ))}
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState("overview");

  const totalSales = salesData.reduce((a, b) => a + b.토너 + b.세럼, 0);
  const thisMonth = salesData[salesData.length - 1];
  const thisMonthTotal = thisMonth.토너 + thisMonth.세럼;
  const prevMonth = salesData[salesData.length - 2];
  const prevMonthTotal = prevMonth.토너 + prevMonth.세럼;
  const growth = (((thisMonthTotal - prevMonthTotal) / prevMonthTotal) * 100).toFixed(1);
  const balance = 4280000;
  const pendingCost = 820000;

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", color: COLORS.text,
      fontFamily: "'DM Sans', 'Pretendard', system-ui, sans-serif",
      padding: "24px 28px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #4f9cf9, #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
            }}>🧴</div>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>K-Beauty Seller</span>
            <span style={{
              fontSize: 10, padding: "2px 8px", borderRadius: 4,
              background: "#0d2d1e", color: "#34d399", border: "1px solid #166534", fontWeight: 700
            }}>LIVE</span>
          </div>
          <div style={{ color: COLORS.muted, fontSize: 12 }}>Amazon US · 토너 / 세럼 · 2026년 5월 14일</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 2 }}>Amazon Seller Central</div>
          <div style={{ color: COLORS.green, fontSize: 13, fontWeight: 700 }}>● 연동 활성</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 24,
        background: COLORS.surface, borderRadius: 10, padding: 4,
        border: `1px solid ${COLORS.border}`, width: "fit-content"
      }}>
        {[
          { id: "overview", label: "📊 개요" },
          { id: "orders",   label: "📦 주문" },
          { id: "inventory",label: "🗂️ 재고" },
          { id: "shipping", label: "🚚 배송" },
          { id: "finance",  label: "💰 비용/잔액" },
        ].map(t => <Tab key={t.id} {...t} active={tab === t.id} onClick={setTab} />)}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* KPIs */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <KPI label="이번달 매출" value={`${(thisMonthTotal / 10000).toFixed(0)}만원`} sub={`전월 대비 +${growth}%`} color={COLORS.green} icon="📈" />
            <KPI label="누적 매출 (7개월)" value={`${(totalSales / 10000).toFixed(0)}만원`} sub="토너+세럼 합산" color={COLORS.accent} icon="💳" />
            <KPI label="현재 잔액" value={fmt(balance)} sub="Amazon Payout" color={COLORS.purple} icon="🏦" />
            <KPI label="미결제 비용" value={fmt(pendingCost)} sub="FBA+광고 예정" color={COLORS.yellow} icon="⚠️" />
            <KPI label="이번달 주문" value="47건" sub="처리중 3건" color={COLORS.accent} icon="📦" />
          </div>

          {/* Charts */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Card style={{ flex: 2, minWidth: 300 }}>
              <SectionTitle>월별 매출 추이 (만원)</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="toner" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="serum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.purple} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={COLORS.purple} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="month" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `${v / 10000}만`} tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={customTooltip} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="토너" stroke={COLORS.accent} strokeWidth={2} fill="url(#toner)" />
                  <Area type="monotone" dataKey="세럼" stroke={COLORS.purple} strokeWidth={2} fill="url(#serum)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card style={{ flex: 1, minWidth: 220 }}>
              <SectionTitle>비용 구조</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={costData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                    dataKey="value" paddingAngle={3}>
                    {costData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Quick Status */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Card style={{ flex: 1 }}>
              <SectionTitle>재고 현황</SectionTitle>
              {inventory.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < inventory.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{item.product}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11 }}>재고 {item.inStock}개 · FBA {item.fba}개</div>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </Card>
            <Card style={{ flex: 1 }}>
              <SectionTitle>최근 배송</SectionTitle>
              {shipping.slice(0, 3).map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{s.product}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11 }}>{s.carrier} · ETA {s.eta}</div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {tab === "orders" && (
        <Card>
          <SectionTitle>주문 내역</SectionTitle>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                  {["주문번호", "상품", "수량", "금액", "날짜", "배송방식", "상태"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: COLORS.muted, fontWeight: 600, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "12px 14px", color: COLORS.accent, fontFamily: "monospace", fontSize: 12 }}>{o.id}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{o.product}</td>
                    <td style={{ padding: "12px 14px", color: COLORS.muted }}>{o.qty}개</td>
                    <td style={{ padding: "12px 14px", fontWeight: 700, color: COLORS.green }}>{fmt(o.price)}</td>
                    <td style={{ padding: "12px 14px", color: COLORS.muted }}>{o.date}</td>
                    <td style={{ padding: "12px 14px" }}><StatusBadge status={o.ship} /></td>
                    <td style={{ padding: "12px 14px" }}><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 16, padding: "12px 16px", background: COLORS.surface, borderRadius: 8, display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div><span style={{ color: COLORS.muted, fontSize: 11 }}>총 주문</span><span style={{ marginLeft: 8, fontWeight: 700 }}>{orders.length}건</span></div>
            <div><span style={{ color: COLORS.muted, fontSize: 11 }}>총 금액</span><span style={{ marginLeft: 8, fontWeight: 700, color: COLORS.green }}>{fmt(orders.reduce((a, b) => a + b.price, 0))}</span></div>
            <div><span style={{ color: COLORS.muted, fontSize: 11 }}>FBA</span><span style={{ marginLeft: 8, fontWeight: 700 }}>{orders.filter(o => o.ship === "FBA").length}건</span></div>
            <div><span style={{ color: COLORS.muted, fontSize: 11 }}>FBM</span><span style={{ marginLeft: 8, fontWeight: 700 }}>{orders.filter(o => o.ship === "FBM").length}건</span></div>
          </div>
        </Card>
      )}

      {/* INVENTORY TAB */}
      {tab === "inventory" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <KPI label="총 재고" value={`${inventory.reduce((a, b) => a + b.inStock, 0)}개`} sub="전 상품 합산" color={COLORS.accent} icon="📦" />
            <KPI label="FBA 재고" value={`${inventory.reduce((a, b) => a + b.fba, 0)}개`} sub="Amazon 창고" color={COLORS.purple} icon="🏭" />
            <KPI label="예약 수량" value={`${inventory.reduce((a, b) => a + b.reserved, 0)}개`} sub="처리 중인 주문" color={COLORS.yellow} icon="🔒" />
            <KPI label="재고 부족" value="1개" sub="토너 세럼 세트" color={COLORS.red} icon="🚨" />
          </div>
          <Card>
            <SectionTitle>상품별 재고 현황</SectionTitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${COLORS.border}` }}>
                    {["상품명", "SKU", "총재고", "예약", "FBA", "FBM", "재주문기준", "상태"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: COLORS.muted, fontWeight: 600, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}` }}
                      onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "14px", fontWeight: 700 }}>{item.product}</td>
                      <td style={{ padding: "14px", color: COLORS.accent, fontFamily: "monospace", fontSize: 12 }}>{item.sku}</td>
                      <td style={{ padding: "14px", fontWeight: 700 }}>{item.inStock}개</td>
                      <td style={{ padding: "14px", color: COLORS.yellow }}>{item.reserved}개</td>
                      <td style={{ padding: "14px", color: COLORS.purple }}>{item.fba}개</td>
                      <td style={{ padding: "14px", color: COLORS.accent }}>{item.fbm}개</td>
                      <td style={{ padding: "14px", color: COLORS.muted }}>{item.reorder}개</td>
                      <td style={{ padding: "14px" }}><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={inventory} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="product" tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: COLORS.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="fba" name="FBA" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fbm" name="FBM" fill={COLORS.accent} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="reserved" name="예약" fill={COLORS.yellow} radius={[4, 4, 0, 0]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* SHIPPING TAB */}
      {tab === "shipping" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <KPI label="배송완료" value="1건" color={COLORS.green} icon="✅" />
            <KPI label="배송중" value="1건" color={COLORS.accent} icon="🚚" />
            <KPI label="포장/픽업" value="2건" color={COLORS.yellow} icon="📦" />
            <KPI label="평균배송일" value="2.3일" sub="이번달 FBA 기준" color={COLORS.purple} icon="⏱️" />
          </div>
          <Card>
            <SectionTitle>배송 추적</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {shipping.map((s, i) => (
                <div key={i} style={{
                  padding: "16px 18px", background: COLORS.surface,
                  borderRadius: 10, border: `1px solid ${COLORS.border}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10
                }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.product}</div>
                    <div style={{ color: COLORS.muted, fontSize: 12 }}>
                      <span style={{ fontFamily: "monospace", color: COLORS.accent }}>{s.id}</span>
                      <span style={{ marginLeft: 12 }}>{s.carrier}</span>
                      <span style={{ marginLeft: 12 }}>업데이트: {s.updated}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: COLORS.muted, fontSize: 11 }}>도착예정</div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{s.eta}</div>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* FINANCE TAB */}
      {tab === "finance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <KPI label="현재 잔액" value={fmt(balance)} sub="정산 예정 5/21" color={COLORS.green} icon="💰" />
            <KPI label="이번달 FBA 수수료" value={fmt(462000)} sub="보관+처리+반품" color={COLORS.red} icon="🏭" />
            <KPI label="광고비 (Sponsored)" value={fmt(318000)} sub="ACOS 14.2%" color={COLORS.yellow} icon="📣" />
            <KPI label="순이익 (추정)" value={fmt(1270000)} sub="매출-모든비용" color={COLORS.purple} icon="📊" />
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Card style={{ flex: 2, minWidth: 280 }}>
              <SectionTitle>비용 항목 상세</SectionTitle>
              {[
                { label: "상품원가",     amount: 760000,  pct: 38, color: COLORS.accent },
                { label: "FBA 수수료",   amount: 440000,  pct: 22, color: COLORS.purple },
                { label: "광고비",       amount: 300000,  pct: 15, color: COLORS.yellow },
                { label: "배송비 (FBM)", amount: 240000,  pct: 12, color: COLORS.green },
                { label: "플랫폼 수수료",amount: 160000,  pct: 8,  color: COLORS.red },
                { label: "기타",         amount: 100000,  pct: 5,  color: COLORS.muted },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: item.color, fontWeight: 700, fontFamily: "monospace" }}>{fmt(item.amount)} <span style={{ color: COLORS.muted, fontWeight: 400 }}>({item.pct}%)</span></span>
                  </div>
                  <div style={{ height: 6, background: COLORS.border, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.pct * 2}%`, background: item.color, borderRadius: 4, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              ))}
            </Card>

            <Card style={{ flex: 1, minWidth: 200 }}>
              <SectionTitle>손익 요약</SectionTitle>
              {[
                { label: "총 매출",   value: fmt(thisMonthTotal), color: COLORS.green, sign: "+" },
                { label: "총 비용",   value: fmt(2000000),        color: COLORS.red,   sign: "−" },
                { label: "순이익",    value: fmt(1270000),        color: COLORS.purple, sign: "=" },
                { label: "이익률",    value: "38.8%",             color: COLORS.accent, sign: "%" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: item.color, fontWeight: 800, fontSize: 16, width: 20 }}>{item.sign}</span>
                    <span style={{ color: COLORS.muted, fontSize: 13 }}>{item.label}</span>
                  </div>
                  <span style={{ color: item.color, fontWeight: 800, fontFamily: "monospace" }}>{item.value}</span>
                </div>
              ))}
              <div style={{
                marginTop: 16, padding: "12px 16px",
                background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(79,156,249,0.1))",
                borderRadius: 10, border: `1px solid rgba(52,211,153,0.2)`,
                textAlign: "center"
              }}>
                <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 4 }}>다음 정산일</div>
                <div style={{ color: COLORS.green, fontWeight: 800, fontSize: 18 }}>2026.05.21</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>예상 {fmt(balance)}</div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
