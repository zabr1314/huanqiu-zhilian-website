import { ArrowRight, Bot, Check, ClipboardCheck, Code2, Database, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getRawDb } from '@/db';
import type { AuditAnswers, AuditResult } from '@/lib/audit';

export const dynamic = 'force-dynamic';

type Narrative = { headline: string; explanation: string; pilot: string; metrics: string[]; gaps: string[] };
type LeadRow = { target_process: string; value_score: number; readiness_score: number; risk_score: number; risk_level: string; priority: string; lead_grade: string; answers_json: string; report_json: string };

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  let lead: LeadRow | null = null;
  try {
    lead = await getRawDb().prepare(`
      SELECT target_process, value_score, readiness_score, risk_score,
             risk_level, priority, lead_grade, answers_json, report_json
      FROM leads WHERE id = ? LIMIT 1
    `).bind(id).first<LeadRow>();
  } catch { notFound(); }
  if (!lead) notFound();
  const answers = JSON.parse(lead.answers_json) as AuditAnswers;
  const stored = JSON.parse(lead.report_json) as { result: AuditResult; narrative: Narrative };
  const { result, narrative } = stored;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-[#edf2ff] px-3 py-1 text-xs font-semibold text-accent">完整诊断报告</span><span className="text-xs text-ink/35">报告仅通过不可预测链接访问</span></div>
          <h1 className="mt-7 max-w-5xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.98] tracking-[-.065em] text-ink">{narrative.headline}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink/55">我们不先推荐工具，而是先判断哪条流程值得改、哪些动作不能自动做。</p>
          <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper lg:grid-cols-4">
            <ReportScore value={`${result.valueScore}`} label="改造价值 / 100" accent />
            <ReportScore value={`${result.readinessScore}`} label="准备度 / 100" />
            <ReportScore value={result.riskLevel} label={`风险分 ${result.riskScore}`} />
            <ReportScore value={result.priority} label="建议优先级" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          <RoleCard icon={Bot} title="AI 负责" copy="信息提取、分类、匹配、草稿生成与异常提示。" />
          <RoleCard icon={Code2} title="程序负责" copy="数据流转、状态校验、任务创建和执行留痕。" />
          <RoleCard icon={UserRoundCheck} title="员工负责" copy={answers.riskActions.length ? '报价、付款、承诺、发布、生产数据变更与异常处理。' : '关键结果抽检、异常处理与最终确认。'} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-3xl border border-ink/10 bg-white p-7 lg:p-9"><p className="section-kicker">7—14 天最小试点</p><h2 className="mt-5 text-3xl font-semibold tracking-[-.045em] text-ink">只跑通一个最小闭环。</h2><p className="mt-5 text-lg leading-8 text-ink/58">{narrative.pilot}</p><div className="mt-8 grid gap-2 sm:grid-cols-4">{[['输入', '一类真实样本'], ['处理', '提取与判断'], ['闸门', '一次人工确认'], ['输出', '任务与记录']].map(([title, copy]) => <div key={title} className="rounded-xl bg-paper p-4"><p className="text-xs font-semibold text-accent">{title}</p><p className="mt-2 text-sm text-ink/55">{copy}</p></div>)}</div></article>
          <article className="rounded-3xl bg-[#090d14] p-7 text-white lg:p-9"><ClipboardCheck className="size-6 text-[#7f9eff]" /><h2 className="mt-8 text-2xl font-semibold tracking-[-.035em]">验收指标</h2><div className="mt-6 grid gap-3">{narrative.metrics.map((metric) => <p key={metric} className="flex items-center gap-3 text-sm text-white/55"><Check className="size-4 text-[#7f9eff]" />{metric}</p>)}</div><p className="mt-7 text-xs leading-5 text-white/35">试点前记录基线，两周后同时计算新增维护与人工复核成本。</p></article>
        </div>

        <article className="mt-6 rounded-3xl border border-[#e9a33b]/25 bg-[#fff6e7] p-7 lg:p-9"><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#9a620f]"><Database className="size-4" />开始试点前还缺什么</p><div className="mt-6 grid gap-3 md:grid-cols-2">{narrative.gaps.map((gap) => <p key={gap} className="flex items-start gap-3 rounded-xl bg-white/70 p-4 text-sm text-ink/62"><span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-[#e9a33b]/15 text-[10px] font-bold text-[#9a620f]">!</span>{gap}</p>)}</div></article>

        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-accent/15 bg-[#edf2ff] p-6"><ShieldCheck className="mt-1 size-5 shrink-0 text-accent" /><div><h2 className="font-semibold text-ink">不建议自动化的部分</h2><p className="mt-2 leading-7 text-ink/58">{narrative.explanation} 高风险不代表没有价值，而是必须改成“系统建议 + 人工执行”。</p></div></div>
      </section>

      <section className="bg-accent text-white"><div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-14 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10"><div><p className="text-xs uppercase tracking-[.18em] text-white/55">下一步</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.05em]">预约 30 分钟诊断，把报告变成可执行的试点方案。</h2></div><div className="flex flex-col gap-3 sm:flex-row"><a href="/about#contact" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-accent">查看预约方式 <ArrowRight className="size-4" /></a><a href="/demo" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-6 text-sm font-semibold text-white">先看类似流程</a></div></div></section>
      <SiteFooter />
    </main>
  );
}

function ReportScore({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) { return <div className="border-b border-r border-ink/10 p-5 even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0 lg:p-7"><p className={`text-4xl font-semibold tracking-[-.055em] ${accent ? 'text-accent' : 'text-ink'}`}>{value}</p><p className="mt-3 text-xs text-ink/40">{label}</p></div>; }
function RoleCard({ icon: Icon, title, copy }: { icon: typeof Bot; title: string; copy: string }) { return <article className="rounded-2xl border border-ink/10 bg-white p-6"><Icon className="size-5 text-accent" /><h2 className="mt-8 text-lg font-semibold text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-ink/52">{copy}</p></article>; }
