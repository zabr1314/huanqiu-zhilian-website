import { NextResponse } from 'next/server';
import { getRawDb } from '@/db';
import { calculateAudit, getAuditNarrative, processOptions, type AuditAnswers } from '@/lib/audit';

const allowed = {
  frequency: ['weekly', 'often', 'daily', 'heavy'], people: ['one', 'two-three', 'four-six', 'seven-plus'],
  time: ['short', 'medium', 'long', 'very-long'], impact: ['low', 'medium', 'high', 'critical'],
  inputFixed: ['no', 'partly', 'mostly', 'yes'], samples: ['none', 'messy', 'some', 'ready'],
  access: ['none', 'manual', 'export', 'api'], humanReview: ['yes', 'partly', 'no'],
  exceptions: ['rare', 'sometimes', 'many'], owner: ['yes', 'approval', 'unclear', 'no'],
  dataReady: ['yes', 'partly', 'no'], interview: ['yes', 'maybe', 'no'], metricReadiness: ['yes', 'direction', 'no'],
} as const;

function isAuditAnswers(value: unknown): value is AuditAnswers {
  if (!value || typeof value !== 'object') return false;
  const a = value as Record<string, unknown>;
  if (typeof a.industry !== 'string' || !a.industry || typeof a.teamSize !== 'string' || !a.teamSize) return false;
  if (typeof a.process !== 'string' || !processOptions.includes(a.process as never)) return false;
  for (const [key, values] of Object.entries(allowed)) {
    if (!values.includes(a[key] as never)) return false;
  }
  if (!Array.isArray(a.riskActions) || a.riskActions.some((item) => !['commitment', 'money', 'production', 'publish', 'sensitive'].includes(item))) return false;
  return ['business', 'tools', 'successMetric'].every((key) => typeof a[key] === 'string');
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(request: Request) {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 32_000) return NextResponse.json({ error: '提交内容过长。' }, { status: 413 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const answers = body.answers;
    const contact = body.contact as Record<string, unknown> | undefined;
    const attribution = body.attribution as Record<string, unknown> | undefined;
    if (!isAuditAnswers(answers) || !contact) return NextResponse.json({ error: '体检信息不完整。' }, { status: 400 });
    if (clean(contact.website, 200)) return NextResponse.json({ error: '提交未通过校验。' }, { status: 400 });
    const name = clean(contact.name, 40);
    const company = clean(contact.company, 80);
    const contactValue = clean(contact.value, 80);
    const isOwner = clean(contact.isOwner, 20);
    if (!name || !company || !contactValue || !['yes', 'partial', 'no'].includes(isOwner)) return NextResponse.json({ error: '请填写完整的联系信息。' }, { status: 400 });

    const result = calculateAudit(answers);
    const narrative = getAuditNarrative(answers, result);
    const id = crypto.randomUUID();
    const db = getRawDb();
    await db.prepare(`
      INSERT INTO leads (
        id, created_at, contact_name, company, contact_value, is_process_owner,
        industry, team_size, target_process, value_score, readiness_score,
        risk_score, risk_level, priority, lead_grade, status, source, campaign,
        answers_json, report_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, Date.now(), name, company, contactValue, isOwner,
      answers.industry.slice(0, 60), answers.teamSize.slice(0, 40), answers.process.slice(0, 40),
      result.valueScore, result.readinessScore, result.riskScore, result.riskLevel,
      result.priority, result.leadGrade, '新提交', clean(attribution?.source, 120), clean(attribution?.campaign, 120),
      JSON.stringify(answers), JSON.stringify({ result, narrative }),
    ).run();
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: '暂时无法保存报告，请稍后再试。' }, { status: 500 });
  }
}
