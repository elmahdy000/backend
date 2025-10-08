import React from 'react';
import './aiRecommendations.css';

function AIRecommendations({ alerts = [] }) {
  const hasAlerts = alerts.length > 0;

  return (
    <section className="ai-panel glass shadow-card">
      <header>
        <h3>توصيات الذكاء الاصطناعي</h3>
        <p>اقتراحات فورية لتحسين الأداء المالي</p>
      </header>
      {hasAlerts ? (
        <div className="ai-alerts">
          {alerts.map((alert) => (
            <article key={alert.id} className="ai-alert">
              <div className="ai-alert__badge">أولوية متقدمة</div>
              <h4>{alert.title}</h4>
              <p>{alert.description}</p>
              <span className="ai-alert__impact">{alert.impact}</span>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">لا توجد توصيات جديدة الآن، راجع التحديثات لاحقًا.</div>
      )}
    </section>
  );
}

export default AIRecommendations;
