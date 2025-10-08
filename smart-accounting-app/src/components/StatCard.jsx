import React from 'react';
import './statCard.css';

function StatCard({ title, value, change, subtitle, tone = 'neutral' }) {
  return (
    <article className={`stat-card shadow-card glass tone-${tone}`}>
      <div className="stat-card__header">
        <p className="stat-card__title">{title}</p>
        <span className="stat-card__change">{change}</span>
      </div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__subtitle">{subtitle}</p>
    </article>
  );
}

export default StatCard;
