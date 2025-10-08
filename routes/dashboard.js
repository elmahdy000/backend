const express = require('express');
const router = express.Router();
const dashboardService = require('../services/dashboardService');

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const snapshot = await dashboardService.getDashboardSnapshot();
    res.json(snapshot);
  })
);

router.get(
  '/snapshot',
  asyncHandler(async (req, res) => {
    const snapshot = await dashboardService.getDashboardSnapshot();
    res.json(snapshot);
  })
);

router.get(
  '/overview',
  asyncHandler(async (req, res) => {
    const metrics = await dashboardService.getOverviewMetrics();
    res.json(metrics);
  })
);

router.get(
  '/cashflow',
  asyncHandler(async (req, res) => {
    const trend = await dashboardService.getCashflowTrend();
    res.json(trend);
  })
);

router.get(
  '/highlights',
  asyncHandler(async (req, res) => {
    const highlights = await dashboardService.getSystemHighlights();
    res.json(highlights);
  })
);

router.get(
  '/ai-alerts',
  asyncHandler(async (req, res) => {
    const alerts = await dashboardService.getAIAlerts();
    res.json(alerts);
  })
);

router.get(
  '/activities',
  asyncHandler(async (req, res) => {
    const activities = await dashboardService.getRecentActivities();
    res.json(activities);
  })
);

router.get(
  '/insights',
  asyncHandler(async (req, res) => {
    const insights = await dashboardService.getSmartInsights();
    res.json(insights);
  })
);

module.exports = router;
