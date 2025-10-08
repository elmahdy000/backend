import React, { useEffect, useMemo, useState } from 'react';
import { FiBarChart2, FiCloudLightning, FiLayers, FiMoon, FiSun } from 'react-icons/fi';
import OverviewCards from './components/OverviewCards.jsx';
import CashflowChart from './sections/CashflowChart.jsx';
import SmartInsights from './sections/SmartInsights.jsx';
import RecentActivity from './sections/RecentActivity.jsx';
import AIRecommendations from './sections/AIRecommendations.jsx';
import {
  fetchAIAlerts,
  fetchCashflowTrend,
  fetchOverviewMetrics,
  fetchRecentActivities,
  fetchSmartInsights,
  fetchSystemHighlights
} from './services/index.js';
import './styles/app.css';

const fallbackMetrics = {
  revenue: 0,
  expenses: 0,
  profitGrowth: 0,
  aiConfidence: 0,
  cashOnHand: 0,
  monthlyBurn: 1
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [smartAlerts, setSmartAlerts] = useState([]);
  const [systemHighlights, setSystemHighlights] = useState([]);
  const [activities, setActivities] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      try {
        const [
          metricsData,
          trend,
          highlights,
          alerts,
          recentActivities,
          insightItems
        ] = await Promise.all([
          fetchOverviewMetrics(),
          fetchCashflowTrend(),
          fetchSystemHighlights(),
          fetchAIAlerts(),
          fetchRecentActivities(),
          fetchSmartInsights()
        ]);

        if (!mounted) return;

        setMetrics(metricsData);
        setTrendData(trend);
        setSystemHighlights(highlights);
        setSmartAlerts(alerts);
        setActivities(recentActivities);
        setInsights(insightItems);
      } catch (err) {
        console.error('فشل تحميل بيانات لوحة التحكم الذكية', err);
        if (mounted) {
          setError('حدث خطأ غير متوقع أثناء تحميل البيانات الذكية. يرجى المحاولة لاحقًا.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  const iconMap = useMemo(
    () => ({
      realtime: <FiCloudLightning />,
      analytics: <FiBarChart2 />,
      integrations: <FiLayers />
    }),
    []
  );

  const highlightsWithIcons = useMemo(
    () =>
      systemHighlights.map((item) => ({
        ...item,
        icon: iconMap[item.icon] || <FiBarChart2 />
      })),
    [systemHighlights, iconMap]
  );

  const metricsToUse = metrics ?? fallbackMetrics;

  const toggleTheme = async () => {
    if (window.desktop?.toggleTheme) {
      const dark = await window.desktop.toggleTheme();
      setIsDark(dark);
    } else {
      setIsDark((prev) => !prev);
    }
  };

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <div className="gradient-bg" />
      <header className="app__header container">
        <div className="app__branding">
          <div className="app__logo">الحساب الذكي</div>
          <p className="app__tagline">منصة محاسبة عربية مدعومة بالذكاء الاصطناعي لتسريع النمو المالي</p>
        </div>
        <button className="theme-switch" onClick={toggleTheme}>
          {isDark ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      <main className="container app__content">
        {loading && !error ? (
          <div className="status-message loading">جارٍ تحميل البيانات الذكية...</div>
        ) : null}

        {error ? (
          <div className="status-message error">{error}</div>
        ) : (
          <>
            <OverviewCards metrics={metricsToUse} highlights={highlightsWithIcons} />
            <div className="grid-two">
              <CashflowChart data={trendData} />
              <SmartInsights metrics={metricsToUse} insights={insights} />
            </div>
            <div className="grid-two">
              <AIRecommendations alerts={smartAlerts} />
              <RecentActivity items={activities} />
            </div>
          </>
        )}
      </main>

      <footer className="app__footer container">
        <p>© {new Date().getFullYear()} الحساب الذكي - كل الحقوق محفوظة.</p>
        <div className="footer-links">
          <a href="#">سياسة الخصوصية</a>
          <a href="#">شروط الاستخدام</a>
          <a href="#">الدعم الذكي</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
