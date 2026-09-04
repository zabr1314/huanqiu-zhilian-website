export type AigcModuleId =
  | 'workspace'
  | 'facts'
  | 'listing'
  | 'images'
  | 'video'
  | 'localization'
  | 'review'
  | 'versions';

export type AigcStage = 'draft' | 'checked' | 'revised' | 'review' | 'approved' | 'exported';

export const aigcModules: { id: AigcModuleId; label: string; group: string; count?: number }[] = [
  { id: 'workspace', label: '内容任务', group: '生产工作台', count: 3 },
  { id: 'facts', label: '商品事实', group: '生产工作台' },
  { id: 'listing', label: 'Listing 文案', group: '内容产物', count: 3 },
  { id: 'images', label: '商品图', group: '内容产物', count: 3 },
  { id: 'video', label: '短视频分镜', group: '内容产物', count: 6 },
  { id: 'localization', label: '多语言适配', group: '质量与交付', count: 4 },
  { id: 'review', label: '审核中心', group: '质量与交付', count: 2 },
  { id: 'versions', label: '版本与交付', group: '质量与交付' },
];

export const contentChannels = [
  { id: 'amazon-us', label: 'Amazon US' },
  { id: 'shopify-us', label: 'Shopify US' },
  { id: 'tiktok-us', label: 'TikTok Shop US' },
] as const;

export const contentLocales = [
  { id: 'en-US', label: 'English · US' },
  { id: 'de-DE', label: 'Deutsch · DE' },
  { id: 'ja-JP', label: '日本語 · JP' },
] as const;

export const productFacts = [
  { field: '产品型号', value: 'R08 TrailBeam Mini', source: 'PIM 商品主数据', status: '已确认' },
  { field: '电池容量', value: '2200mAh', source: '规格表 SPEC-R08-V4', status: '已确认' },
  { field: '实测续航', value: '4–8 小时', source: '测试报告 TR-0828', status: '已确认' },
  { field: '防护等级', value: 'IPX4', source: '检测报告 QA-118', status: '已确认' },
  { field: '商品重量', value: '280g', source: 'PIM 商品主数据', status: '已确认' },
  { field: '充电接口', value: 'USB-C 输入', source: '产品说明书 MAN-R08', status: '已确认' },
  { field: '固定方式', value: '磁吸底座、折叠挂钩', source: '产品说明书 MAN-R08', status: '已确认' },
  { field: '照明档位', value: '三档亮度', source: '测试报告 TR-0828', status: '已确认' },
] as const;

export const blockedClaims = ['IPX7 waterproof', '12-hour runtime', '30-minute fast charge', 'military grade', '100% safe'];

export const campaignBrief = {
  id: 'CAM-092',
  name: '北美秋季露营季',
  goal: '提高商品页有效转化，同时守住利润与承诺边界',
  audience: '周末露营、房车旅行与停电应急人群',
  angle: '轻量便携、灵活固定、稳定照明',
  deadline: '2026-09-05 18:00',
  owner: '内容运营 · 林墨',
};

export const contentTasks = [
  { id: 'WO-041', title: 'R08 Amazon US 内容包', owner: '林墨', due: '今天 17:00', status: '待审核', variants: 12, blocked: 1 },
  { id: 'WO-042', title: 'R12 Amazon DE 上新包', owner: '德国市场运营', due: '明天 12:00', status: '本地化中', variants: 9, blocked: 2 },
  { id: 'WO-043', title: 'R03 Shopify 组合页', owner: '独立站运营', due: '已完成', status: '已批准', variants: 8, blocked: 0 },
] as const;

export const listingVariants = [
  {
    id: 'a',
    label: 'A · 事实型',
    angle: '强调经确认的产品参数与使用方式',
    title: 'TrailBeam Mini Camping Lantern, IPX7 Waterproof, 12-Hour Runtime, Magnetic Base & Folding Hook',
    revisedTitle: 'TrailBeam Mini Camping Lantern, IPX4 Water-Resistant, 4–8 Hour Runtime, Magnetic Base & Folding Hook',
    bullets: [
      'Flexible placement with a magnetic base and foldable hanging hook.',
      'Three brightness levels for tents, tables and emergency backup.',
      'Compact 280g body fits easily into a daypack or glove box.',
      'USB-C input makes charging simple with your existing cable.',
      'Built for changing outdoor conditions with verified IPX4 water resistance.',
    ],
    score: 92,
  },
  {
    id: 'b',
    label: 'B · 场景型',
    angle: '把固定方式放进露营、房车和停电场景',
    title: 'Light Where You Need It — TrailBeam Mini Lantern with Magnetic Base, Hook and 3 Brightness Levels',
    revisedTitle: 'Light Where You Need It — TrailBeam Mini Lantern with Magnetic Base, Hook and 3 Brightness Levels',
    bullets: [
      'Snap it to a metal surface, hang it overhead or place it on the table.',
      'Choose from three brightness levels as the evening changes.',
      'At 280g, it travels easily from campsite to emergency kit.',
      'Tested for 4–8 hours of runtime under documented settings.',
      'IPX4 water resistance helps with splashes and changing weather.',
    ],
    score: 96,
  },
  {
    id: 'c',
    label: 'C · 简洁型',
    angle: '更短、更直接，适合移动端快速浏览',
    title: 'TrailBeam Mini Portable Lantern — Magnetic, Hangable, USB-C Input',
    revisedTitle: 'TrailBeam Mini Portable Lantern — Magnetic, Hangable, USB-C Input',
    bullets: [
      'Magnetic base and folding hook.',
      'Three useful brightness levels.',
      'Verified 4–8 hour runtime.',
      'Lightweight 280g body.',
      'IPX4 water-resistant construction.',
    ],
    score: 89,
  },
] as const;

export const reviewChecks = [
  { label: '商品事实', passed: 24, total: 25, tone: 'warn' },
  { label: '品牌规范', passed: 10, total: 10, tone: 'good' },
  { label: '平台字段', passed: 14, total: 14, tone: 'good' },
  { label: '素材权属', passed: 7, total: 7, tone: 'good' },
] as const;

export const localizationRows = [
  { channel: 'Amazon US', locale: 'en-US', fields: '标题、五点、A+、搜索词', status: '1 项待修订', tone: 'warn' },
  { channel: 'Amazon DE', locale: 'de-DE', fields: '标题、五点、单位与警示语', status: '2 项待确认', tone: 'warn' },
  { channel: 'Shopify US', locale: 'en-US', fields: '详情页、FAQ、邮件', status: '已通过', tone: 'good' },
  { channel: 'TikTok Shop US', locale: 'en-US', fields: '标题、字幕、封面', status: '生成中', tone: 'normal' },
] as const;

export const storyboard = [
  { second: '0–2s', shot: '黑场亮起', visual: '灯体在暗色环境中点亮，建立产品轮廓。', copy: 'Light, right where you need it.' },
  { second: '2–5s', shot: '磁吸固定', visual: '灯吸附在房车金属侧板，手部自然离开。', copy: 'Magnetic base' },
  { second: '5–8s', shot: '折叠挂钩', visual: '切换到帐篷内顶部悬挂，照亮桌面。', copy: 'Foldable hook' },
  { second: '8–11s', shot: '三档亮度', visual: '同一构图连续切换三档亮度，保留真实明暗。', copy: '3 brightness levels' },
  { second: '11–13s', shot: '可信参数', visual: '产品近景配合简洁参数，不出现夸大认证。', copy: 'IPX4 · 4–8h · 280g' },
  { second: '13–15s', shot: '收束画面', visual: '露营桌全景，灯光与人物活动自然融合。', copy: 'TrailBeam Mini' },
] as const;

export const versionRows = [
  { version: 'v3.1', status: '待人工审核', change: '将 IPX7 与 12 小时修订为已确认事实', author: 'AI 草拟 · 林墨确认', time: '今天 15:42' },
  { version: 'v3.0', status: '规则阻断', change: '事实检查发现 1 项高风险声明', author: '内容规则 2.4', time: '今天 15:36' },
  { version: 'v2.2', status: '已归档', change: '增加场景型 B 版本和视频分镜', author: '内容运营', time: '昨天 18:20' },
  { version: 'v2.1', status: '已归档', change: '活动 Brief 由品牌负责人确认', author: '品牌负责人', time: '昨天 16:05' },
] as const;

export const pipelineSteps = [
  { id: 'facts', label: '事实确认' },
  { id: 'brief', label: '活动 Brief' },
  { id: 'generate', label: '多模态生成' },
  { id: 'review', label: '质量审核' },
  { id: 'handoff', label: '发布交接' },
] as const;

export function stageIndex(stage: AigcStage) {
  if (stage === 'draft') return 2;
  if (stage === 'checked' || stage === 'revised' || stage === 'review') return 3;
  return 4;
}

export function stageLabel(stage: AigcStage) {
  return {
    draft: '草稿待检查', checked: '发现 1 项阻断', revised: '修订完成',
    review: '等待人工审核', approved: '人工审核通过', exported: '交接包已生成',
  }[stage];
}
