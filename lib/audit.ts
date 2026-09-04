export const processOptions = [
  '客户询盘', '私域跟进', '达人开发', '商品内容', '客服售后', '订单协同', '经营报表', '内部知识', '其他流程',
] as const;

export type AuditAnswers = {
  industry: string;
  teamSize: string;
  business: string;
  tools: string;
  process: string;
  frequency: 'weekly' | 'often' | 'daily' | 'heavy';
  people: 'one' | 'two-three' | 'four-six' | 'seven-plus';
  time: 'short' | 'medium' | 'long' | 'very-long';
  impact: 'low' | 'medium' | 'high' | 'critical';
  inputFixed: 'no' | 'partly' | 'mostly' | 'yes';
  samples: 'none' | 'messy' | 'some' | 'ready';
  access: 'none' | 'manual' | 'export' | 'api';
  humanReview: 'yes' | 'partly' | 'no';
  riskActions: string[];
  exceptions: 'rare' | 'sometimes' | 'many';
  owner: 'yes' | 'approval' | 'unclear' | 'no';
  dataReady: 'yes' | 'partly' | 'no';
  interview: 'yes' | 'maybe' | 'no';
  metricReadiness: 'yes' | 'direction' | 'no';
  successMetric: string;
};

export const emptyAudit: AuditAnswers = {
  industry: '',
  teamSize: '',
  business: '',
  tools: '',
  process: '',
  frequency: 'daily',
  people: 'two-three',
  time: 'long',
  impact: 'high',
  inputFixed: 'mostly',
  samples: 'some',
  access: 'export',
  humanReview: 'yes',
  riskActions: [],
  exceptions: 'sometimes',
  owner: 'approval',
  dataReady: 'partly',
  interview: 'maybe',
  metricReadiness: 'direction',
  successMetric: '处理时间',
};

export type AuditResult = {
  valueScore: number;
  readinessScore: number;
  riskScore: number;
  riskLevel: '低' | '中' | '高';
  priority: '高' | '中' | '低' | '不建议自动化';
  leadGrade: 'A' | 'B' | 'C';
};

const valueMap = {
  frequency: { weekly: 5, often: 10, daily: 15, heavy: 20 },
  time: { short: 0, medium: 5, long: 10, 'very-long': 20 },
  clarity: { no: 0, partly: 7, mostly: 14, yes: 20 },
  samples: { none: 0, messy: 5, some: 10, ready: 15 },
  impact: { low: 0, medium: 5, high: 10, critical: 15 },
  access: { none: 0, manual: 3, export: 7, api: 10 },
} as const;

const actionRisk: Record<string, number> = {
  commitment: 4,
  money: 6,
  production: 5,
  publish: 3,
  sensitive: 4,
};

export function calculateAudit(a: AuditAnswers): AuditResult {
  const valueScore =
    valueMap.frequency[a.frequency] +
    valueMap.time[a.time] +
    valueMap.clarity[a.inputFixed] +
    valueMap.samples[a.samples] +
    valueMap.impact[a.impact] +
    valueMap.access[a.access];

  const readinessScore =
    ({ yes: 30, approval: 20, unclear: 10, no: 0 } as const)[a.owner] +
    ({ yes: 30, partly: 15, no: 0 } as const)[a.dataReady] +
    ({ yes: 20, maybe: 10, no: 0 } as const)[a.interview] +
    ({ yes: 20, direction: 10, no: 0 } as const)[a.metricReadiness];

  const rawRisk =
    ({ yes: 0, partly: 4, no: 8 } as const)[a.humanReview] +
    Math.min(16, a.riskActions.reduce((sum, item) => sum + (actionRisk[item] || 0), 0)) +
    ({ rare: 0, sometimes: 3, many: 6 } as const)[a.exceptions];
  const forcedHigh =
    a.riskActions.includes('money') ||
    (a.humanReview === 'no' && (a.riskActions.includes('commitment') || a.riskActions.includes('production')));
  const riskScore = Math.round((rawRisk / 30) * 100);
  const riskLevel = forcedHigh || rawRisk >= 16 ? '高' : rawRisk >= 7 ? '中' : '低';

  const notRecommended =
    (riskLevel === '高' && a.humanReview === 'no') ||
    valueScore < 40 ||
    (a.inputFixed === 'no' && (a.samples === 'none' || a.samples === 'messy'));
  const highPriority =
    valueScore >= 75 && readinessScore >= 70 && riskLevel !== '高' && a.owner === 'yes' && a.dataReady !== 'no';
  const midPriority =
    (valueScore >= 55 && readinessScore >= 40) ||
    (valueScore >= 75 && readinessScore >= 40) ||
    (valueScore >= 75 && riskLevel === '高' && a.humanReview === 'yes');
  const priority = notRecommended ? '不建议自动化' : highPriority ? '高' : midPriority ? '中' : '低';

  const recurring = a.frequency === 'daily' || a.frequency === 'heavy';
  const multiPerson = a.people !== 'one';
  const leadGrade = valueScore >= 75 && readinessScore >= 70 && recurring && multiPerson && a.owner === 'yes' && a.dataReady !== 'no'
    ? 'A'
    : valueScore >= 55 && readinessScore >= 40
      ? 'B'
      : 'C';

  return { valueScore, readinessScore, riskScore, riskLevel, priority, leadGrade };
}

export function getAuditNarrative(a: AuditAnswers, result: AuditResult) {
  const process = a.process || '这条流程';
  const headline = result.priority === '高'
    ? `「${process}」值得优先作为第一个 AI 流程试点。`
    : result.priority === '中'
      ? `「${process}」有改造价值，但需要先补齐准备条件。`
      : result.priority === '不建议自动化'
        ? `「${process}」不适合直接全自动运行。`
        : `暂不建议把「${process}」作为第一条改造流程。`;

  const aiScope = a.inputFixed === 'no'
    ? '先统一输入字段和判断规则，再让 AI 参与资料整理。'
    : 'AI 可以先负责信息提取、分类、匹配、草稿和异常提示。';
  const boundary = a.riskActions.length
    ? '程序负责数据流转与留痕；报价、付款、承诺、发布或生产数据变更必须由员工确认。'
    : '程序负责数据流转与留痕；员工负责抽检、异常处理和最终确认。';
  const sample = a.samples === 'ready' ? '50 条以上可脱敏样本' : '20—50 条脱敏样本与统一字段说明';

  const gaps = [
    a.owner !== 'yes' ? '指定能决定试点范围的负责人' : '',
    a.dataReady !== 'yes' ? '准备一批脱敏历史样本' : '',
    a.interview !== 'yes' ? '安排一次 30 分钟员工访谈' : '',
    a.metricReadiness !== 'yes' ? '写清两周后的目标值' : '',
    a.access === 'none' || a.access === 'manual' ? '确认稳定的数据导出或接口方式' : '',
  ].filter(Boolean);

  return {
    headline,
    explanation: `${aiScope}${boundary}`,
    pilot: `建议用 7—14 天，只跑通一个入口、一类任务和一次人工确认；先准备${sample}。`,
    metrics: [a.successMetric || '处理时间', '结果准确率', '遗漏数量', '保留人工复核时间'],
    gaps: gaps.length ? gaps : ['确定试点样本范围', '记录当前处理基线', '约定失败回退方式'],
  };
}
