import React from 'react';
import './recentActivity.css';

function RecentActivity({ items = [] }) {
  const hasActivities = items.length > 0;

  return (
    <section className="activity-panel glass shadow-card">
      <header>
        <h3>أحدث الأنشطة</h3>
        <p>تحديثات مباشرة حول ما يحدث في شركتك</p>
      </header>
      {hasActivities ? (
        <>
          <ul className="activity-list">
            {items.map((activity) => (
              <li key={activity.id}>
                <h4>{activity.title}</h4>
                <p>{activity.description}</p>
              </li>
            ))}
          </ul>
          <button className="action-btn">عرض جميع العمليات</button>
        </>
      ) : (
        <div className="empty-state">لا توجد أنشطة حديثة لعرضها حاليًا.</div>
      )}
    </section>
  );
}

export default RecentActivity;
