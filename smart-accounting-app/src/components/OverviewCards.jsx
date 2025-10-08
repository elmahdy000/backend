import React from 'react';
import StatCard from './StatCard.jsx';
import './overviewCards.css';

function OverviewCards({ metrics, highlights = [] }) {
  const highlightItems = highlights ?? [];
  const hasHighlights = highlightItems.length > 0;

  return (
    <section className="overview">
      <div className="overview__stats">
        <StatCard
          title="إجمالي الإيرادات"
          value={`${metrics.revenue.toLocaleString('ar-EG')} ر.س`}
          change={'+18%'}
          tone="positive"
          subtitle="نمو خلال آخر 60 يومًا"
        />
        <StatCard
          title="إجمالي المصروفات"
          value={`${metrics.expenses.toLocaleString('ar-EG')} ر.س`}
          change={'-6%'}
          tone="positive"
          subtitle="تراجع في المصاريف التشغيلية"
        />
        <StatCard
          title="مؤشر الربحية"
          value={`+${metrics.profitGrowth}%`}
          change={'+2.3 نقطة'}
          tone="neutral"
          subtitle="مقارنةً بالربع السابق"
        />
        <StatCard
          title="موثوقية الذكاء الاصطناعي"
          value={`${metrics.aiConfidence}%`}
          change={'+4%'}
          tone="positive"
          subtitle="مستوى الثقة في التنبؤات"
        />
      </div>
      <div className="overview__highlights glass shadow-card">
        <h3>مزايا المنصة الذكية</h3>
        {hasHighlights ? (
          <div className="highlight-list">
            {highlightItems.map((item) => (
              <article key={item.title} className="highlight-item">
                <div className="icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">لم يتم تفعيل أي مزايا بعد، ابدأ بإضافة مصادر البيانات.</p>
        )}
      </div>
    </section>
  );
}

export default OverviewCards;
