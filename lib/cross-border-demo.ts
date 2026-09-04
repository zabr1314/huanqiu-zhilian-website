export type DemoRole = 'owner' | 'operator' | 'supply';
export type DemoChannel = 'all' | 'amazon-us' | 'shopify' | 'tiktok-us';
export type DemoPeriod = '7d' | '30d' | '90d';

export type DemoModuleId =
  | 'overview'
  | 'profit'
  | 'ads'
  | 'inventory'
  | 'fulfillment'
  | 'returns'
  | 'voice'
  | 'supplier'
  | 'settlement'
  | 'compliance'
  | 'weekly';

export type MetricFormat = 'currency' | 'integer' | 'percent' | 'ratio' | 'rating' | 'days' | 'text';

export type DemoMetric = {
  label: string;
  value: number | string;
  format: MetricFormat;
  scale?: 'scope' | 'scope-period';
  delta: string;
  tone?: 'normal' | 'good' | 'warn';
  help: string;
};

export type DemoRow = {
  cells: string[];
  scopes: DemoChannel[];
  tone?: 'normal' | 'good' | 'warn' | 'critical';
};

export type DemoDecision = {
  id: string;
  module: DemoModuleId;
  level: '高风险' | '需关注' | '增长机会';
  title: string;
  impact: string;
  source: string;
  rule: string;
  action: string;
  owner: string;
  deadline: string;
  gate: string;
  roles: DemoRole[];
  scopes: DemoChannel[];
};

export type DemoModule = {
  id: DemoModuleId;
  label: string;
  title: string;
  description: string;
  metricNote: string;
  metrics: DemoMetric[];
  columns: string[];
  rows: DemoRow[];
};

export const demoRoles: { id: DemoRole; label: string; short: string }[] = [
  { id: 'owner', label: '老板视角', short: '只看利润、现金和需要拍板的风险' },
  { id: 'operator', label: '运营视角', short: '看渠道、广告、商品和当天动作' },
  { id: 'supply', label: '供应链视角', short: '看库存、履约、退款和补货节点' },
];

export const demoChannels: { id: DemoChannel; label: string; short: string; scopeFactor: number }[] = [
  { id: 'all', label: '全部渠道', short: '全渠道', scopeFactor: 1 },
  { id: 'amazon-us', label: 'Amazon US', short: 'Amazon US', scopeFactor: 0.57 },
  { id: 'shopify', label: 'Shopify 独立站', short: 'Shopify', scopeFactor: 0.25 },
  { id: 'tiktok-us', label: 'TikTok Shop US', short: 'TikTok Shop', scopeFactor: 0.18 },
];

export const demoPeriods: { id: DemoPeriod; label: string; factor: number }[] = [
  { id: '7d', label: '最近 7 天', factor: 0.238 },
  { id: '30d', label: '最近 30 天', factor: 1 },
  { id: '90d', label: '最近 90 天', factor: 2.86 },
];

const everyChannel: DemoChannel[] = ['all', 'amazon-us', 'shopify', 'tiktok-us'];

export const demoModules: DemoModule[] = [
  {
    id: 'overview',
    label: '经营总览',
    title: '今天先处理什么，而不是再看一遍数字',
    description: '把销售、利润、广告、库存与退款放到同一口径，只保留真正需要团队行动的异常。',
    metricNote: '贡献利润未扣固定人员、办公室、税费与汇兑损益。',
    metrics: [
      { label: '净销售额', value: 184260, format: 'currency', scale: 'scope-period', delta: '较上期 +12.4%', tone: 'good', help: '商品销售额减折扣与已确认退款。' },
      { label: '贡献利润', value: 31480, format: 'currency', scale: 'scope-period', delta: '利润率 17.1%', help: '净销售额减货品、平台、广告、履约与仓储等变动成本。' },
      { label: '广告花费', value: 28690, format: 'currency', scale: 'scope-period', delta: 'TACOS 15.6%', tone: 'warn', help: '所选渠道内可归集的广告支出。' },
      { label: '退款率', value: 5.8, format: 'percent', delta: '较上期 +1.1pp', tone: 'warn', help: '已确认退款订单数 ÷ 支付订单数。' },
    ],
    columns: ['渠道', '净销售额', '贡献利润率', '广告占比', '需要关注'],
    rows: [
      { cells: ['Amazon US', 'US$105,030', '15.8%', '17.2%', '库存 + 退款'], scopes: ['all', 'amazon-us'], tone: 'warn' },
      { cells: ['Shopify', 'US$46,210', '23.4%', '12.1%', '支付拒付'], scopes: ['all', 'shopify'], tone: 'good' },
      { cells: ['TikTok Shop', 'US$33,020', '12.6%', '18.9%', '广告止损'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
    ],
  },
  {
    id: 'profit',
    label: 'SKU 利润',
    title: '销售增长，不等于每个 SKU 都在赚钱',
    description: '把采购、平台佣金、广告、头程、尾程、仓储和退款摊回 SKU，找出真正贡献利润的商品。',
    metricNote: '成本按本月结算口径估算，税费与固定管理成本单独核算。',
    metrics: [
      { label: '在售 SKU', value: 68, format: 'integer', scale: 'scope', delta: '核心 SKU 12 个', help: '近 30 天产生有效订单的商品。' },
      { label: '贡献利润率', value: 17.1, format: 'percent', delta: '目标 ≥ 18%', tone: 'warn', help: '贡献利润 ÷ 净销售额。' },
      { label: '亏损 SKU', value: 4, format: 'integer', scale: 'scope', delta: '影响 US$2,940', tone: 'warn', help: '扣除可归集变动成本后贡献利润小于 0 的商品。' },
      { label: '利润集中度', value: 61.4, format: 'percent', delta: 'Top 5 SKU', help: '前五个 SKU 贡献利润占总贡献利润的比例。' },
    ],
    columns: ['渠道 / SKU', '净销售额', '贡献利润率', '退款率', '判断'],
    rows: [
      { cells: ['Amazon · NX-HL-01 头灯', 'US$38,420', '24.6%', '3.1%', '利润核心'], scopes: ['all', 'amazon-us'], tone: 'good' },
      { cells: ['Shopify · NX-BT-04 保温杯', 'US$21,860', '21.8%', '4.2%', '健康'], scopes: ['all', 'shopify'], tone: 'good' },
      { cells: ['TikTok · NX-CL-08 营地灯', 'US$17,940', '-3.8%', '11.9%', '立即止损'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
      { cells: ['Amazon · NX-BG-02 防水包', 'US$14,680', '8.4%', '7.6%', '复核费用'], scopes: ['all', 'amazon-us'], tone: 'warn' },
    ],
  },
  {
    id: 'ads',
    label: '广告投放',
    title: '把“有订单”与“值得继续花钱”分开',
    description: '同时看 ACOS、TACOS、自然销售与贡献利润，避免用高销售额掩盖亏损投放。',
    metricNote: 'ACOS = 广告花费 ÷ 广告归因销售额；TACOS = 广告花费 ÷ 总销售额。',
    metrics: [
      { label: '广告花费', value: 28690, format: 'currency', scale: 'scope-period', delta: '较上期 +18.7%', tone: 'warn', help: '平台广告后台已结算花费。' },
      { label: '广告归因销售', value: 98620, format: 'currency', scale: 'scope-period', delta: 'ROAS 3.44', help: '在平台归因窗口内由广告带来的销售额。' },
      { label: '整体 ACOS', value: 29.1, format: 'percent', delta: '盈亏线 31%', help: '广告花费 ÷ 广告归因销售额。' },
      { label: '整体 TACOS', value: 15.6, format: 'percent', delta: '较上期 +0.9pp', tone: 'warn', help: '广告花费 ÷ 全部销售额。' },
    ],
    columns: ['广告活动', '花费', '归因销售', 'ACOS', '建议'],
    rows: [
      { cells: ['Amazon · HL 核心词', 'US$6,840', 'US$31,260', '21.9%', '扩大高转化词'], scopes: ['all', 'amazon-us'], tone: 'good' },
      { cells: ['TikTok · CL 广泛兴趣', 'US$4,320', 'US$9,480', '45.6%', '降预算 30%'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
      { cells: ['Shopify · 品牌再营销', 'US$2,180', 'US$11,920', '18.3%', '保持'], scopes: ['all', 'shopify'], tone: 'good' },
      { cells: ['Amazon · BG 竞品词', 'US$3,760', 'US$10,580', '35.5%', '否词复核'], scopes: ['all', 'amazon-us'], tone: 'warn' },
    ],
  },
  {
    id: 'inventory',
    label: '库存补货',
    title: '先看会不会断货，再看仓库里还有多少件',
    description: '用可售库存、日均销量、在途、入仓周期和安全天数计算覆盖天数与最晚补货日。',
    metricNote: '覆盖天数只计可售库存；在途货在完成签收前不计入可售。',
    metrics: [
      { label: '库存货值', value: 96840, format: 'currency', scale: 'scope', delta: '含 FBA 与海外仓', help: '可售库存按采购成本与已发生头程估值。' },
      { label: '断货风险 SKU', value: 6, format: 'integer', scale: 'scope', delta: '3 个低于 14 天', tone: 'warn', help: '预计到货前可售库存将低于安全库存。' },
      { label: '滞销 SKU', value: 8, format: 'integer', scale: 'scope', delta: '占用 US$18,420', tone: 'warn', help: '覆盖天数超过 90 天且近 14 天销量未改善。' },
      { label: '平均覆盖天数', value: 46, format: 'days', delta: '目标 35—60 天', help: '可售件数 ÷ 近 28 天日均销量。' },
    ],
    columns: ['仓 / SKU', '可售', '在途', '覆盖天数', '最晚动作'],
    rows: [
      { cells: ['Amazon FBA · NX-HL-01', '428', '600', '11 天', '今天确认空运'], scopes: ['all', 'amazon-us'], tone: 'critical' },
      { cells: ['美国海外仓 · NX-BT-04', '862', '0', '38 天', '9 月 12 日复核'], scopes: ['all', 'shopify'], tone: 'good' },
      { cells: ['TikTok FBM · NX-CL-08', '1,420', '800', '96 天', '停止补货'], scopes: ['all', 'tiktok-us'], tone: 'warn' },
      { cells: ['Amazon FBA · NX-BG-02', '318', '400', '17 天', '核对入仓预约'], scopes: ['all', 'amazon-us'], tone: 'warn' },
    ],
  },
  {
    id: 'fulfillment',
    label: '订单履约',
    title: '订单不是发出就结束，要看是否按承诺送达',
    description: '把平台订单、仓库出库、承运商轨迹与客户承诺时效合并，提前暴露迟发与丢件风险。',
    metricNote: '迟发率按平台承诺的最晚发货时间计算，不按仓库自行填写时间计算。',
    metrics: [
      { label: '支付订单', value: 4286, format: 'integer', scale: 'scope-period', delta: '较上期 +8.7%', help: '已支付且未取消的订单。' },
      { label: '准时发货率', value: 96.2, format: 'percent', delta: '目标 ≥ 98%', tone: 'warn', help: '在平台最晚发货时间前取得有效承运扫描的订单比例。' },
      { label: '异常包裹', value: 41, format: 'integer', scale: 'scope-period', delta: '12 单需今天处理', tone: 'warn', help: '轨迹停滞、地址异常、退回或超过承诺时效的包裹。' },
      { label: '平均妥投时长', value: 4.8, format: 'days', delta: '较上期 -0.4 天', tone: 'good', help: '有效出库扫描至妥投的平均自然日。' },
    ],
    columns: ['渠道 / 仓', '订单', '准时发货', '异常包裹', '处理人'],
    rows: [
      { cells: ['Amazon FBA', '2,442', '98.8%', '7', 'FBA Case'], scopes: ['all', 'amazon-us'], tone: 'good' },
      { cells: ['Shopify · CA 海外仓', '1,071', '94.6%', '21', '仓配主管'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['TikTok · US FBM', '773', '92.1%', '13', '渠道运营'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
    ],
  },
  {
    id: 'returns',
    label: '退款售后',
    title: '退款率升高时，要能定位商品、批次和原因',
    description: '把退款、退货原因、客户描述、评价和批次合并，识别是内容误导、产品质量还是履约问题。',
    metricNote: '退款率以已确认退款订单为分子；申请中与取消订单单独展示。',
    metrics: [
      { label: '确认退款', value: 249, format: 'integer', scale: 'scope-period', delta: '退款率 5.8%', tone: 'warn', help: '统计期内已确认退款的订单。' },
      { label: '退款损失', value: 10840, format: 'currency', scale: 'scope-period', delta: '含不可售与逆向物流', tone: 'warn', help: '退款金额、逆向运费和不可售货损的估算合计。' },
      { label: '质量类占比', value: 37.8, format: 'percent', delta: '较上期 +8.2pp', tone: 'warn', help: '经人工复核后归为质量相关的退款原因占比。' },
      { label: '高风险 SKU', value: 3, format: 'integer', scale: 'scope', delta: '需要批次核查', tone: 'warn', help: '退款率与同类基线、样本量同时超过预设阈值的商品。' },
    ],
    columns: ['SKU', '退款率', '主要原因', '关联批次', '建议'],
    rows: [
      { cells: ['NX-CL-08 营地灯', '11.9%', '充电不稳定', 'B2407', '暂停扩量'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
      { cells: ['NX-BG-02 防水包', '7.6%', '尺寸理解偏差', '多批次', '修改尺寸图'], scopes: ['all', 'amazon-us'], tone: 'warn' },
      { cells: ['NX-BT-04 保温杯', '4.2%', '运输凹陷', 'WH-0821', '检查包装'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['NX-HL-01 头灯', '3.1%', '亮度预期', '多批次', '保持观察'], scopes: ['all', 'amazon-us'], tone: 'good' },
    ],
  },
  {
    id: 'voice',
    label: '评价与市场',
    title: '把客户原话变成产品和内容改进清单',
    description: '汇总评价、客服工单、退货备注与竞品评论，按主题和影响量排序，不让洞察停在词云。',
    metricNote: '主题由 AI 聚类后抽样复核；情绪不能替代具体事实与商品证据。',
    metrics: [
      { label: '新增反馈', value: 1246, format: 'integer', scale: 'scope-period', delta: '覆盖 4 个来源', help: '评价、售后工单、退货备注与站内问答去重后的数量。' },
      { label: '平均评分', value: 4.32, format: 'rating', delta: '较上期 -0.08', tone: 'warn', help: '按有效评价数加权后的平均星级。' },
      { label: '负向反馈', value: 7.9, format: 'percent', delta: '目标 < 6%', tone: 'warn', help: '人工确认的负向反馈占有效反馈比例。' },
      { label: '新出现主题', value: 4, format: 'integer', scale: 'scope', delta: '2 个需进入产品会', help: '过去 14 天首次达到样本阈值的反馈主题。' },
    ],
    columns: ['主题', '提及量', '影响 SKU', '来源', '动作'],
    rows: [
      { cells: ['“充电口松动”', '38', 'NX-CL-08', '退款 + 评价', '抽检 B2407'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
      { cells: ['“尺寸比预期小”', '27', 'NX-BG-02', 'Amazon 评价', '重做尺寸图'], scopes: ['all', 'amazon-us'], tone: 'warn' },
      { cells: ['“包装有凹陷”', '19', 'NX-BT-04', '客服工单', '跌落测试'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['“续航符合预期”', '84', 'NX-HL-01', '多渠道评价', '提炼卖点'], scopes: everyChannel, tone: 'good' },
    ],
  },
  {
    id: 'supplier',
    label: '供应商风险',
    title: '商品问题是否正在同一家供应商聚集',
    description: '把 SKU、生产批次、质量退款、交期与未交采购单关联起来，避免只按单个商品处理。',
    metricNote: '风险来自经营与质检信号，不代表已经认定供应商责任。',
    metrics: [
      { label: '活跃供应商', value: 14, format: 'integer', scale: 'scope', delta: '覆盖 68 个 SKU', help: '近 90 天有在售 SKU 或未关闭采购单的供应商。' },
      { label: '高风险供应商', value: 1, format: 'integer', scale: 'scope', delta: '关联 3 个 SKU', tone: 'warn', help: '质量、交期或合规信号同时达到内部升级阈值。' },
      { label: '延迟采购单', value: 3, format: 'integer', scale: 'scope', delta: '最久延迟 8 天', tone: 'warn', help: '预计出货日已过且供应商未完成出货的采购单。' },
      { label: '风险敞口', value: 42600, format: 'currency', scale: 'scope', delta: '库存 + 在途货值', tone: 'warn', help: '与高风险供应商关联的可售、在途及未交采购货值。' },
    ],
    columns: ['供应商', '关联 SKU', '质量退款', '平均延迟', '建议'],
    rows: [
      { cells: ['JX-03', '3', '11.6%', '6.2 天', '暂停新增采购'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
      { cells: ['HL-02', '5', '4.7%', '0.8 天', '正常复核'], scopes: ['all', 'amazon-us'], tone: 'good' },
      { cells: ['QS-07', '4', '5.1%', '1.1 天', '保持观察'], scopes: ['all', 'shopify'], tone: 'normal' },
    ],
  },
  {
    id: 'settlement',
    label: '回款与汇率',
    title: '利润表之外，还要知道钱什么时候回来',
    description: '对齐平台结算、支付网关、退款准备金、采购付款与汇率，提前看到现金缺口。',
    metricNote: '本页只做经营现金预测，不替代财务记账、税务申报或银行对账。',
    metrics: [
      { label: '待回款', value: 139200, format: 'currency', scale: 'scope', delta: '未来 21 天', help: '平台与支付渠道已确认、尚未到账的预计净额。' },
      { label: '下次预计到账', value: 48260, format: 'currency', scale: 'scope', delta: '9 月 8 日', help: '扣除平台费、退款与准备金后的预计到账金额。' },
      { label: '汇率偏差', value: -1.8, format: 'percent', delta: '较预算少 US$2,140', tone: 'warn', help: '按实际结汇汇率与预算汇率计算的收入差异。' },
      { label: '现金缺口窗口', value: 18, format: 'days', delta: '补货付款早于回款', tone: 'warn', help: '预计最低现金余额低于安全线的连续天数。' },
    ],
    columns: ['来源', '预计净额', '预计到账', '主要扣减', '状态'],
    rows: [
      { cells: ['Amazon US', 'US$72,840', '9 月 10 日', '退款准备金', '正常'], scopes: ['all', 'amazon-us'], tone: 'good' },
      { cells: ['Shopify Payments', 'US$38,960', '9 月 8 日', '拒付预留', '需复核'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['TikTok Shop', 'US$27,400', '9 月 18 日', '结算延迟', '影响补货'], scopes: ['all', 'tiktok-us'], tone: 'critical' },
    ],
  },
  {
    id: 'compliance',
    label: '合规账号',
    title: '风险要在账号受限之前进入负责人视野',
    description: '集中查看平台绩效、产品合规、知识产权、支付拒付与资料到期，明确截止时间和责任人。',
    metricNote: '系统只聚合信号和准备材料，不替代律师、税务顾问或平台最终判断。',
    metrics: [
      { label: '开放事项', value: 5, format: 'integer', scale: 'scope', delta: '2 项高风险', tone: 'warn', help: '仍需提交材料、回复平台或完成人工判断的事项。' },
      { label: '最近截止', value: 3, format: 'days', delta: '9 月 7 日', tone: 'warn', help: '所有开放事项中距离当前最近的截止日期。' },
      { label: '支付拒付率', value: 0.74, format: 'percent', delta: '警戒线 0.9%', help: '独立站支付拒付数 ÷ 成功支付订单数。' },
      { label: '账号健康', value: '需关注', format: 'text', delta: '无停用风险', tone: 'warn', help: '根据平台绩效通知与待处理事项汇总的内部状态。' },
    ],
    columns: ['事项', '渠道', '截止', '负责人', '状态'],
    rows: [
      { cells: ['电池运输资料补充', 'Amazon US', '9 月 7 日', '合规负责人', '高风险'], scopes: ['all', 'amazon-us'], tone: 'critical' },
      { cells: ['拒付证据提交', 'Shopify', '9 月 9 日', '客服主管', '待材料'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['商品标题敏感词复核', 'TikTok Shop', '9 月 12 日', '渠道运营', '处理中'], scopes: ['all', 'tiktok-us'], tone: 'warn' },
      { cells: ['WEEE 注册续期', 'Amazon DE', '10 月 1 日', '合规负责人', '准备中'], scopes: ['all', 'amazon-us'], tone: 'normal' },
    ],
  },
  {
    id: 'weekly',
    label: '周会中心',
    title: '每个异常都要有负责人、期限和关闭条件',
    description: '系统把各模块的关键判断汇总为周会议题；会议只决定动作，不重新争论数据口径。',
    metricNote: '任务只有在写回处理结果并通过负责人确认后才算关闭。',
    metrics: [
      { label: '本周议题', value: 18, format: 'integer', scale: 'scope', delta: '较上周 -3', help: '从经营异常、人工新增与上周遗留生成的议题。' },
      { label: '已完成', value: 11, format: 'integer', scale: 'scope', delta: '完成率 61%', help: '已记录处理结果且通过负责人确认的任务。' },
      { label: '已超时', value: 3, format: 'integer', scale: 'scope', delta: '2 项影响收入', tone: 'warn', help: '超过截止时间且未关闭的任务。' },
      { label: '待老板拍板', value: 2, format: 'integer', scale: 'scope', delta: '预算与采购', tone: 'warn', help: '涉及预算、采购、停投或对外承诺的待决事项。' },
    ],
    columns: ['议题', '负责人', '截止', '验收条件', '状态'],
    rows: [
      { cells: ['NX-HL-01 空运补货', '供应链负责人', '今天 17:00', '确认数量与到仓日', '待拍板'], scopes: ['all', 'amazon-us'], tone: 'critical' },
      { cells: ['CL 广告预算下调', 'TikTok 运营', '今天 14:00', '日预算降低 30%', '进行中'], scopes: ['all', 'tiktok-us'], tone: 'warn' },
      { cells: ['BT-04 包装跌落测试', '产品经理', '9 月 8 日', '完成 3 轮测试记录', '待开始'], scopes: ['all', 'shopify'], tone: 'warn' },
      { cells: ['HL 核心词扩大预算', 'Amazon 运营', '9 月 9 日', 'ACOS 保持 < 25%', '待确认'], scopes: ['all', 'amazon-us'], tone: 'good' },
    ],
  },
];

export const demoDecisions: DemoDecision[] = [
  {
    id: 'inventory-hl-air', module: 'inventory', level: '高风险', title: 'NX-HL-01 预计 11 天后断货',
    impact: '若海运按当前计划到仓，预计缺货 9 天，可能损失约 US$18,600 销售额。',
    source: 'Amazon 可售库存、近 28 天销量、FBA 入仓预约、海运节点',
    rule: '可售库存覆盖 11 天；海运预计 20 天后完成入仓，低于 14 天安全线。',
    action: '供应链今天比较 300 件空运与分批补货成本，老板在 17:00 前确认方案。',
    owner: '供应链负责人', deadline: '今天 17:00', gate: '系统不得自动下采购单或选择物流方式。',
    roles: ['owner', 'operator', 'supply'], scopes: ['all', 'amazon-us'],
  },
  {
    id: 'profit-cl-stop', module: 'profit', level: '高风险', title: 'NX-CL-08 销量增长，但贡献利润已转负',
    impact: '近 7 天多卖 214 件，但广告与退款使每件平均亏损 US$1.46。',
    source: 'TikTok 订单、广告账单、采购成本、仓配费用、已确认退款',
    rule: '贡献利润率 -3.8%，且退款率 11.9%，连续 5 天低于内部止损线。',
    action: '运营先降广泛兴趣广告预算 30%；产品与采购复核 B2407 批次。',
    owner: 'TikTok 运营', deadline: '今天 14:00', gate: '暂停商品、改价和大幅调预算必须由负责人确认。',
    roles: ['owner', 'operator', 'supply'], scopes: ['all', 'tiktok-us'],
  },
  {
    id: 'ads-hl-scale', module: 'ads', level: '增长机会', title: 'NX-HL-01 核心词有扩量空间',
    impact: '在 ACOS 21.9% 下仍保持 24.6% 贡献利润率，可测试增加 US$300/日预算。',
    source: 'Amazon Ads 搜索词、广告归因销售、SKU 贡献利润',
    rule: '过去 14 天转化率稳定，ACOS 低于 25% 目标，库存风险已作为前置条件。',
    action: '库存方案确认后，将 6 个高转化词单独建组并分两天递增预算。',
    owner: 'Amazon 运营', deadline: '9 月 9 日', gate: '库存未确认前禁止扩量；预算变化需保留回退值。',
    roles: ['owner', 'operator'], scopes: ['all', 'amazon-us'],
  },
  {
    id: 'ads-cl-cut', module: 'ads', level: '需关注', title: 'TikTok 广泛兴趣活动超过盈亏线',
    impact: 'ACOS 45.6%，高于当前商品约 31% 的广告盈亏线。',
    source: 'TikTok Ads、店铺订单、SKU 变动成本',
    rule: '活动连续 3 天 ACOS 高于盈亏线，且自然销售没有同步增长。',
    action: '保留高转化素材，暂停 4 个低转化广告组，把日预算降低 30%。',
    owner: 'TikTok 运营', deadline: '今天 14:00', gate: '系统只给出建议与影响估算，不自动改预算。',
    roles: ['owner', 'operator'], scopes: ['all', 'tiktok-us'],
  },
  {
    id: 'fulfillment-ca-delay', module: 'fulfillment', level: '需关注', title: 'CA 海外仓 21 个包裹轨迹停滞',
    impact: '其中 8 单将在 24 小时内超过独立站承诺时效。',
    source: 'Shopify 订单、海外仓出库、承运商轨迹、站点配送承诺',
    rule: '包裹 36 小时无新扫描，且预计妥投时间晚于客户承诺日期。',
    action: '仓配主管联系承运商；客服先向 8 名高风险客户发送人工确认后的说明。',
    owner: '仓配主管', deadline: '今天 16:00', gate: '补偿金额与对外承诺必须由客服负责人确认。',
    roles: ['operator', 'supply'], scopes: ['all', 'shopify'],
  },
  {
    id: 'returns-cl-batch', module: 'returns', level: '高风险', title: '营地灯退款集中在 B2407 批次',
    impact: '38 条反馈提到充电不稳定，质量类退款高于历史基线 2.4 倍。',
    source: '退款原因、评价文本、客服工单、出库批次',
    rule: '同一批次样本超过 30，质量关键词占比 63%，显著高于其他批次。',
    action: '采购抽检库存；运营暂停扩量；产品确认是否更新详情页与售后说明。',
    owner: '产品经理', deadline: '9 月 7 日', gate: '下架、召回或向供应商索赔必须人工决定。',
    roles: ['owner', 'operator', 'supply'], scopes: ['all', 'tiktok-us'],
  },
  {
    id: 'voice-bg-size', module: 'voice', level: '需关注', title: '防水包的尺寸误解正在推高退款',
    impact: '27 条评价提到“比预期小”，相关退款造成约 US$1,120 损失。',
    source: 'Amazon 评价、退货备注、Listing 版本、尺寸图',
    rule: '尺寸相关反馈连续两周增长，且集中在移动端首次访问用户。',
    action: '内容团队重做尺寸对照图，并对新旧版本进行两周 A/B 观察。',
    owner: '内容负责人', deadline: '9 月 10 日', gate: 'AI 可总结反馈，不得编造产品参数或认证信息。',
    roles: ['owner', 'operator'], scopes: ['all', 'amazon-us'],
  },
  {
    id: 'supplier-jx', module: 'supplier', level: '高风险', title: 'JX-03 的质量风险出现在 3 个 SKU',
    impact: '关联库存与在途货值约 US$42,600；若继续新增采购，风险敞口会扩大。',
    source: 'SKU 供应商映射、生产批次、质量类退款、质检与采购单',
    rule: '同一供应商 3 个 SKU 的质量退款率同时高于品类基线 1.5 倍。',
    action: '质量负责人索取批次资料；采购复核未交 PO；老板决定是否暂停新增采购。',
    owner: '采购负责人', deadline: '9 月 8 日', gate: '系统不得自动冻结供应商、取消采购单或发起索赔。',
    roles: ['owner', 'supply'], scopes: ['all', 'tiktok-us'],
  },
  {
    id: 'settlement-cash-gap', module: 'settlement', level: '需关注', title: '补货付款比下一笔大额回款早 18 天',
    impact: '若同时执行头灯空运补货，最低现金余额将低于 US$20,000 安全线。',
    source: '平台结算单、采购付款计划、物流报价、银行实际到账',
    rule: '按已确认应收与应付日期滚动预测，9 月 11—28 日出现现金缺口。',
    action: '老板决定分批付款、缩小空运数量，或延后非核心 SKU 采购。',
    owner: '负责人', deadline: '9 月 8 日', gate: '系统不得自动付款、融资或换汇。',
    roles: ['owner', 'supply'], scopes: everyChannel,
  },
  {
    id: 'compliance-battery', module: 'compliance', level: '高风险', title: '电池运输资料需在 3 天内补充',
    impact: '逾期可能影响 NX-HL-01 的入仓与继续销售。',
    source: '平台绩效通知、产品资料库、历史提交记录',
    rule: '通知要求 9 月 7 日前提交 UN38.3 与包装信息，目前缺一份最新版文件。',
    action: '合规负责人向检测机构确认版本；运营准备商品与批次对应关系。',
    owner: '合规负责人', deadline: '9 月 7 日', gate: '系统只整理清单，不代替专业合规判断或对平台作承诺。',
    roles: ['owner', 'operator', 'supply'], scopes: ['all', 'amazon-us'],
  },
  {
    id: 'weekly-overdue', module: 'weekly', level: '需关注', title: '3 个跨部门任务已超时',
    impact: '其中 2 项直接影响补货与下周广告计划。',
    source: '上周会议题、任务状态、负责人更新记录',
    rule: '超过截止时间且没有结果记录；影响销售或合规的任务优先升级。',
    action: '周会只确认新的负责人、截止时间和关闭条件，不重新讨论数据口径。',
    owner: '负责人', deadline: '本周会', gate: '任务关闭必须由责任人写回证据并经负责人确认。',
    roles: ['owner', 'operator', 'supply'], scopes: everyChannel,
  },
];

export function roleBrief(role: DemoRole, channel: string) {
  if (role === 'owner') return `${channel}销售仍在增长，但利润被广告、退款和空运补货同时挤压。今天需要拍板 2 项。`;
  if (role === 'operator') return `${channel}有 4 个可执行机会：先止损低效投放，再修正退款集中的商品内容与批次问题。`;
  return `${channel}最紧急的是头灯补货和海外仓异常包裹；先确认到仓节点，再决定空运数量。`;
}
