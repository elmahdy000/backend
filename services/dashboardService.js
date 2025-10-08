const deepClone = (value) => JSON.parse(JSON.stringify(value));

const overviewMetrics = {
  revenue: 148500,
  expenses: 91050,
  profitGrowth: 14.2,
  aiConfidence: 94,
  cashOnHand: 67200,
  monthlyBurn: 21800
};

const cashflowTrend = [
  { month: 'يناير', name: 'يناير', revenue: 101000, expenses: 69000 },
  { month: 'فبراير', name: 'فبراير', revenue: 109500, expenses: 72000 },
  { month: 'مارس', name: 'مارس', revenue: 115400, expenses: 76000 },
  { month: 'أبريل', name: 'أبريل', revenue: 121300, expenses: 79200 },
  { month: 'مايو', name: 'مايو', revenue: 134800, expenses: 83400 },
  { month: 'يونيو', name: 'يونيو', revenue: 148500, expenses: 91050 }
];

const systemHighlights = [
  {
    icon: 'realtime',
    title: 'تكامل مع البنوك السعودية',
    description:
      'استيراد تلقائي للحركات البنكية من مدى، سداد، والمدفوعات الحكومية مع تصنيف ذكي فوري.'
  },
  {
    icon: 'analytics',
    title: 'توقعات نقدية دقيقة',
    description:
      'محركات تعلم آلي تتنبأ بسيناريوهات متعددة للسيولة وتعرض منحنيات الحساسية باللغة العربية.'
  },
  {
    icon: 'integrations',
    title: 'تشغيل آلي للضرائب',
    description:
      'منظومة تولد الإقرارات الضريبية الشهرية وتتحقق من الالتزام بمعايير الزكاة والضريبة والجمارك.'
  }
];

const aiAlerts = [
  {
    id: 1,
    title: 'تحسين إدارة الذمم المدينة',
    description:
      'هناك 9 فواتير متأخرة بإجمالي 24,600 ر.س. تم اقتراح حملة رسائل فورية لتقليل دورة التحصيل بنسبة 22٪.',
    impact: '+22% تسريع في التدفقات'
  },
  {
    id: 2,
    title: 'خفض تكلفة سلسلة التوريد',
    description:
      'كشف الذكاء الاصطناعي عن إمكانية التفاوض مع موردين بديلين لتقليل تكلفة المخزون بمعدل 11٪ شهريًا.',
    impact: 'وفورات متوقعة 9,400 ر.س'
  },
  {
    id: 3,
    title: 'فرصة تمويل تشغيلي',
    description:
      'بناءً على قوة التدفق النقدي الحالي، يمكنك زيادة الائتمان التشغيلي بمقدار 150,000 ر.س دون التأثير على نسبة التغطية.',
    impact: 'دعم نمو المبيعات القادم'
  }
];

const recentActivities = [
  {
    id: 1,
    title: 'تسوية قيود الرواتب',
    description:
      'تمت مطابقة 54 معاملة رواتب تلقائيًا مع قيود دفتر الأستاذ العام خلال 12 ثانية فقط.'
  },
  {
    id: 2,
    title: 'إنشاء لوحة تحكم جديدة',
    description:
      'قام فريق الإدارة المالية بإنشاء لوحة تحليلات للتدفقات اليومية وربطها بتطبيق الهاتف.'
  },
  {
    id: 3,
    title: 'كشف مخاطرة مشتريات',
    description:
      'اكتشف النظام تعارضًا في بيانات مورد وتم فتح تذكرة تدقيق آلية لمراجعته.'
  },
  {
    id: 4,
    title: 'تفعيل تكامل متجر إلكتروني',
    description:
      'تم ربط منصة المتجر بالذكاء المحاسبي وتم استيراد 430 طلبًا مع تصنيفها الضريبي.'
  }
];

const smartInsights = [
  {
    id: 'runway',
    label: 'مدة السيولة المتوقعة',
    description: 'استنادًا إلى التدفق الحالي يمكن الحفاظ على التشغيل لمدة 9 أشهر دون تمويل إضافي.'
  },
  {
    id: 'breakEven',
    label: 'نقطة التعادل اليومية',
    description: 'يلزم تحقيق 23,100 ر.س في الإيرادات اليومية للحفاظ على ربحية مستقرة.'
  },
  {
    id: 'forecastReliability',
    label: 'موثوقية التوقعات',
    description: 'تم تدريب النماذج على 1.2 مليون معاملة عربية مما رفع الدقة إلى 94٪.'
  }
];

const generateTimestamp = () => new Date().toISOString();

module.exports = {
  async getOverviewMetrics() {
    return deepClone(overviewMetrics);
  },
  async getCashflowTrend() {
    return deepClone(cashflowTrend);
  },
  async getSystemHighlights() {
    return deepClone(systemHighlights);
  },
  async getAIAlerts() {
    return deepClone(aiAlerts);
  },
  async getRecentActivities() {
    return deepClone(recentActivities);
  },
  async getSmartInsights() {
    return deepClone(smartInsights);
  },
  async getDashboardSnapshot() {
    return {
      generatedAt: generateTimestamp(),
      metrics: deepClone(overviewMetrics),
      cashflow: deepClone(cashflowTrend),
      highlights: deepClone(systemHighlights),
      aiAlerts: deepClone(aiAlerts),
      activities: deepClone(recentActivities),
      insights: deepClone(smartInsights)
    };
  }
};
