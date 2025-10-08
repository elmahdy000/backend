import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './cashflowChart.css';

function CashflowChart({ data = [] }) {
  const hasData = data.length > 0;

  return (
    <section className="chart-card glass shadow-card">
      <div className="chart-card__header">
        <div>
          <h3>التدفق النقدي المباشر</h3>
          <p>تطور الإيرادات والمصروفات خلال آخر ستة أشهر</p>
        </div>
        <span className="chart-card__badge">تحليل لحظي</span>
      </div>
      {hasData ? (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" tick={{ fill: 'currentColor' }} tickMargin={12} />
              <YAxis tick={{ fill: 'currentColor' }} tickFormatter={(value) => `${value / 1000}k`} width={70} />
              <Tooltip formatter={(value) => `${value.toLocaleString('ar-EG')} ر.س`} />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#colorRevenue)" strokeWidth={2.8} />
              <Area type="monotone" dataKey="expenses" stroke="#f97316" fill="url(#colorExpenses)" strokeWidth={2.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="empty-state">لا تتوفر بيانات تدفق نقدي لعرضها الآن.</div>
      )}
    </section>
  );
}

export default CashflowChart;
