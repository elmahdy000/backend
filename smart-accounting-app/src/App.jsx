import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiBarChart2, FiCloudLightning, FiLayers, FiMoon, FiRefreshCcw, FiSun } from 'react-icons/fi';
import OverviewCards from './components/OverviewCards.jsx';
import CashflowChart from './sections/CashflowChart.jsx';
import SmartInsights from './sections/SmartInsights.jsx';
import RecentActivity from './sections/RecentActivity.jsx';
import AIRecommendations from './sections/AIRecommendations.jsx';
import {
  fetchDashboardSnapshot
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
  const [offlineData, setOfflineData] = useState(false);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = useCallback(
    async ({ forceRefresh = false, signal } = {}) => {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const snapshot = await fetchDashboardSnapshot({ forceRefresh, signal });
        if (signal?.aborted) {
          return;
        }

        setMetrics(snapshot.metrics);
        setTrendData(snapshot.cashflow);
        setSystemHighlights(snapshot.highlights);
        setSmartAlerts(snapshot.aiAlerts);
        setActivities(snapshot.activities);
        setInsights(snapshot.insights);
        setOfflineData(Boolean(snapshot.fromFallback));
        setGeneratedAt(snapshot.generatedAt);
      } catch (err) {
        if (signal?.aborted) {
          return;
        }
        console.error('فشل تحميل بيانات لوحة التحكم الذكية', err);
        setOfflineData(false);
        setGeneratedAt(null);
        setError('حدث خطأ غير متوقع أثناء تحميل البيانات الذكية. يرجى المحاولة لاحقًا.');
      } finally {
        if (signal?.aborted) {
          return;
        }
        if (forceRefresh) {
          setRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    loadDashboardData({ signal: controller.signal }).catch((err) => {
      if (controller.signal.aborted) {
        return;
      }
      console.error('تعذر تشغيل جلب البيانات الأولي', err);
      setOfflineData(false);
      setGeneratedAt(null);
      setError('تعذر تشغيل جلب البيانات الأولي');
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [loadDashboardData]);

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
        <div className="app__actions">
          <button
            type="button"
            className="refresh-button"
            onClick={() => loadDashboardData({ forceRefresh: true })}
            disabled={loading || refreshing}
            aria-busy={refreshing}
          >
            <FiRefreshCcw className={refreshing ? 'spinning' : ''} />
            <span>تحديث</span>
          </button>
          <button className="theme-switch" onClick={toggleTheme}>
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      <main className="container app__content">
        {loading && !error ? (
          <div className="status-message loading">جارٍ تحميل البيانات الذكية...</div>
        ) : null}

        {refreshing && !loading && !error ? (
          <div className="status-message loading">جارٍ تحديث البيانات...</div>
        ) : null}

        {offlineData && !error ? (
          <div className="status-message warning">
            لا يمكن الوصول إلى الخدمات الخلفية حاليًا، يتم عرض بيانات افتراضية للمتابعة دون انقطاع.
          </div>
        ) : null}

        {generatedAt && !error ? (
          <div className="status-message subtle">
            آخر تحديث للوحة التحكم: {new Date(generatedAt).toLocaleString('ar-EG')}
          </div>
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
