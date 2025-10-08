import React, { useMemo } from 'react';
import './smartInsights.css';

function SmartInsights({ metrics, insights = [] }) {
  if (!metrics) {
    return null;
  }

  const runwayMonths = useMemo(
    () => Math.max(1, Math.round(metrics.cashOnHand / metrics.monthlyBurn)),
    [metrics]
  );

  const formattedBurn = useMemo(
    () => metrics.monthlyBurn.toLocaleString('ar-EG'),
    [metrics]
  );

  const breakEvenDaily = useMemo(
    () => Math.round(metrics.expenses / 30).toLocaleString('ar-EG'),
    [metrics]
  );

  return (
    <section className="insights-card glass shadow-card">
      <header>
        <h3>تحليلات الذكاء الاصطناعي</h3>
        <p>نظرة معمقة على السيولة والكفاءة التشغيلية</p>
      </header>
      <div className="insight-grid">
        <div className="insight-item">
          <span className="label">مدة السيولة المتوقعة</span>
          <strong className="value">{runwayMonths} أشهر</strong>
          <p className="description">مع معدل حرق شهري قدره {formattedBurn} ر.س</p>
        </div>
        <div className="insight-item">
          <span className="label">نقطة التعادل</span>
          <strong className="value">{breakEvenDaily} ر.س / اليوم</strong>
          <p className="description">يمكن الوصول إلى ربحية أعلى بزيادة المبيعات اليومية بنسبة 6٪</p>
        </div>
        <div className="insight-item">
          <span className="label">ثقة التوقعات</span>
          <strong className="value">{metrics.aiConfidence}%</strong>
          <p className="description">الدقة مبنية على تدريب النموذج على بيانات قطاع التقنية المالية</p>
        </div>
      </div>
      {insights.length > 0 ? (
        <ul className="insight-list">
          {insights.map((insight) => (
            <li key={insight.id}>
              <span className="insight-marker" aria-hidden="true" />
              <div>
                <h4>{insight.label}</h4>
                <p>{insight.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default SmartInsights;
