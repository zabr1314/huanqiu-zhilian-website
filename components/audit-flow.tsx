'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { calculateAudit, emptyAudit, getAuditNarrative, processOptions, type AuditAnswers, type AuditResult } from '@/lib/audit';

const steps = ['公司概况', '目标流程', '工作量', '自动化条件', '试点准备'];

const optionSets = {
  frequency: [
    ['weekly', '每周 1—2 次'], ['often', '每周 3—5 次'], ['daily', '每天 1—10 次'], ['heavy', '每天超过 10 次'],
  ],
  people: [
    ['one', '1 人'], ['two-three', '2—3 人'], ['four-six', '4—6 人'], ['seven-plus', '7 人以上'],
  ],
  time: [
    ['short', '每周不到 1 小时'], ['medium', '每周 1—3 小时'], ['long', '每周 4—8 小时'], ['very-long', '每周超过 8 小时'],
  ],
  impact: [
    ['low', '影响很小'], ['medium', '需要返工或延迟'], ['high', '漏客、投诉或退款'], ['critical', '影响收入、合规或信任'],
  ],
  inputFixed: [
    ['no', '每次都不同'], ['partly', '有大致规则'], ['mostly', '大部分重复'], ['yes', '输入与规则基本固定'],
  ],
  samples: [
    ['none', '没有历史记录'], ['messy', '有，但比较混乱'], ['some', '能整理 20—49 条'], ['ready', '有 50 条以上脱敏样本'],
  ],
  access: [
    ['none', '无法稳定导出'], ['manual', '只能复制或截图'], ['export', '可稳定导出表格/文件'], ['api', '已有 API 或接入权限'],
  ],
  humanReview: [
    ['yes', '可以，执行前由人确认'], ['partly', '只能抽查或事后检查'], ['no', '很难判断或无法复核'],
  ],
  exceptions: [
    ['rare', '很少，低于 5%'], ['sometimes', '偶尔，约 5%—20%'], ['many', '很多或无法估计'],
  ],
  owner: [
    ['yes', '有，且能决定试点范围'], ['approval', '有执行人，需上级批准'], ['unclear', '有人关注，职责未明确'], ['no', '暂时没有'],
  ],
  dataReady: [
    ['yes', '3 天内可以提供'], ['partly', '需要审批或整理'], ['no', '暂时不能提供'],
  ],
  interview: [
    ['yes', '可以'], ['maybe', '需要协调'], ['no', '暂时不可以'],
  ],
  metricReadiness: [
    ['yes', '有明确指标和目标值'], ['direction', '知道指标方向'], ['no', '还不清楚'],
  ],
} as const;

type ModelContext = {
  registerTool: (tool: Record<string, unknown>, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

export function AuditFlow({ initialProcess, attribution }: { initialProcess: string; attribution: { source: string; campaign: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AuditAnswers>({ ...emptyAudit, process: processOptions.includes(initialProcess as never) ? initialProcess : '' });
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [contact, setContact] = useState({ name: '', company: '', value: '', isOwner: 'yes', website: '' });
  const narrative = useMemo(() => result ? getAuditNarrative(answers, result) : null, [answers, result]);

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const enums = {
      frequency: ['weekly', 'often', 'daily', 'heavy'],
      weeklyTime: ['short', 'medium', 'long', 'very-long'],
      ruleClarity: ['no', 'partly', 'mostly', 'yes'],
      samples: ['none', 'messy', 'some', 'ready'],
      impact: ['low', 'medium', 'high', 'critical'],
      access: ['none', 'manual', 'export', 'api'],
      humanReview: ['yes', 'partly', 'no'],
    } as const;
    const valid = (key: keyof typeof enums, value: unknown) => typeof value === 'string' && (enums[key] as readonly string[]).includes(value);
    try {
      void Promise.resolve(context.registerTool({
        name: 'calculate_process_audit',
        title: '计算企业 AI 流程体检',
        description: '根据一条业务流程的频率、耗时、规则、样本、影响和接入条件计算确定性的改造价值与风险预览，并同步更新页面。不会提交联系方式。',
        inputSchema: {
          type: 'object',
          properties: {
            process: { type: 'string', enum: [...processOptions] },
            frequency: { type: 'string', enum: [...enums.frequency] },
            weeklyTime: { type: 'string', enum: [...enums.weeklyTime] },
            ruleClarity: { type: 'string', enum: [...enums.ruleClarity] },
            samples: { type: 'string', enum: [...enums.samples] },
            impact: { type: 'string', enum: [...enums.impact] },
            access: { type: 'string', enum: [...enums.access] },
            humanReview: { type: 'string', enum: [...enums.humanReview] },
          },
          required: ['process', 'frequency', 'weeklyTime', 'ruleClarity', 'samples', 'impact', 'access', 'humanReview'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(input: unknown) {
          if (!input || typeof input !== 'object') throw new Error('请输入完整的流程体检参数。');
          const value = input as Record<string, unknown>;
          if (!processOptions.includes(value.process as never) || !valid('frequency', value.frequency) || !valid('weeklyTime', value.weeklyTime) || !valid('ruleClarity', value.ruleClarity) || !valid('samples', value.samples) || !valid('impact', value.impact) || !valid('access', value.access) || !valid('humanReview', value.humanReview)) {
            throw new Error('体检参数无效，请使用页面支持的选项。');
          }
          const next = {
            ...emptyAudit,
            process: value.process as string,
            frequency: value.frequency as AuditAnswers['frequency'],
            time: value.weeklyTime as AuditAnswers['time'],
            inputFixed: value.ruleClarity as AuditAnswers['inputFixed'],
            samples: value.samples as AuditAnswers['samples'],
            impact: value.impact as AuditAnswers['impact'],
            access: value.access as AuditAnswers['access'],
            humanReview: value.humanReview as AuditAnswers['humanReview'],
          };
          const nextResult = calculateAudit(next);
          setAnswers(next);
          setResult(nextResult);
          setStep(5);
          setError('');
          return { process: next.process, valueScore: nextResult.valueScore, riskLevel: nextResult.riskLevel, priority: nextResult.priority };
        },
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch {}
    return () => lifecycle.abort();
  }, []);

  function update<K extends keyof AuditAnswers>(key: K, value: AuditAnswers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError('');
  }

  function validateStep() {
    if (step === 0 && (!answers.industry || !answers.teamSize)) return '请先选择行业和团队人数。';
    if (step === 1 && !answers.process) return '请选择一条最想先改的流程。';
    return '';
  }

  function next() {
    const message = validateStep();
    if (message) { setError(message); return; }
    if (step === 4) {
      const nextResult = calculateAudit(answers);
      setResult(nextResult);
      setStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setStep((current) => current + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submitContact(event: FormEvent) {
    event.preventDefault();
    if (!result) return;
    if (!contact.name.trim() || !contact.company.trim() || !contact.value.trim()) {
      setError('请填写姓名、公司和微信或手机。');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ answers, result, contact, attribution }),
      });
      const data = await response.json() as { id?: string; error?: string };
      if (!response.ok || !data.id) throw new Error(data.error || '暂时无法生成完整报告，请稍后再试。');
      router.push(`/report/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '暂时无法生成完整报告，请稍后再试。');
      setSubmitting(false);
    }
  }

  if (step === 5 && result && narrative) {
    return (
      <div className="mx-auto max-w-[1180px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#7f9eff]">你的诊断预览</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.05em] lg:text-6xl">{narrative.headline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/52">我们不先推荐工具，而是先判断哪条流程值得改、哪些动作不能自动做。</p>
            <div className="mt-10 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04]">
              <Score value={`${result.valueScore}`} label="改造价值 / 100" accent />
              <Score value={result.riskLevel} label={`风险分 ${result.riskScore}`} />
              <Score value={result.priority} label="建议优先级" />
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[.04] p-6">
              <p className="font-semibold">初步判断</p><p className="mt-3 leading-7 text-white/55">{narrative.explanation}</p>
              <p className="mt-5 font-semibold">最小试点</p><p className="mt-3 leading-7 text-white/55">{narrative.pilot}</p>
            </div>
          </section>

          <form onSubmit={submitContact} className="self-start rounded-3xl bg-white p-6 text-ink shadow-2xl lg:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-accent"><LockKeyhole className="size-4" />获取完整报告</div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.045em]">完整试点边界与准备清单</h2>
            <p className="mt-3 text-sm leading-6 text-ink/52">留下最少必要信息，即时查看完整报告。不会要求上传客户名单或企业原始文件。</p>
            <input tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} className="absolute -left-[9999px]" aria-hidden="true" name="website" />
            <div className="mt-7 grid gap-4">
              <Field label="姓名"><Input className="h-11" maxLength={40} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="怎么称呼你" /></Field>
              <Field label="公司"><Input className="h-11" maxLength={80} value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} placeholder="公司或团队名称" /></Field>
              <Field label="微信或手机"><Input className="h-11" maxLength={80} value={contact.value} onChange={(e) => setContact({ ...contact, value: e.target.value })} placeholder="任选一种联系方式" /></Field>
              <Field label="你是否是这条流程的负责人？">
                <NativeSelect className="w-full" value={contact.isOwner} onChange={(e) => setContact({ ...contact, isOwner: e.target.value })}><NativeSelectOption value="yes">是，可以推动试点</NativeSelectOption><NativeSelectOption value="partial">参与执行，需要内部确认</NativeSelectOption><NativeSelectOption value="no">不是，先了解</NativeSelectOption></NativeSelect>
              </Field>
            </div>
            {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={submitting} className="mt-6 h-12 w-full rounded-xl bg-accent text-white hover:bg-accent-strong">{submitting ? '正在生成报告…' : '获取完整诊断报告'}<ArrowRight className="size-4" /></Button>
            <p className="mt-4 text-xs leading-5 text-ink/38">提交即表示同意我们仅为发送诊断结果和预约沟通处理以上信息。你可以随时要求删除。</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-10 lg:px-10 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#7f9eff]">3 分钟 AI 流程体检</p>
          <div className="mt-8 grid gap-4">
            {steps.map((name, index) => <div key={name} className={`flex items-center gap-3 text-sm ${index === step ? 'text-white' : index < step ? 'text-white/55' : 'text-white/28'}`}><span className={`grid size-7 place-items-center rounded-full border text-xs ${index <= step ? 'border-[#6f92ff]/50 bg-[#174fe6]/20' : 'border-white/10'}`}>{index < step ? <Check className="size-3.5" /> : index + 1}</span>{name}</div>)}
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[.04] p-5"><ShieldCheck className="size-5 text-[#7f9eff]" /><p className="mt-5 text-sm font-semibold">评分不交给大模型</p><p className="mt-2 text-xs leading-5 text-white/38">价值分由频率、耗时、规则、数据、影响和接入条件按固定权重计算。</p></div>
        </aside>

        <section className="rounded-3xl bg-white p-6 text-ink shadow-2xl lg:p-9">
          <div className="mb-3 flex items-center justify-between text-sm"><span className="font-medium">第 {step + 1} 步 · {steps[step]}</span><span className="text-ink/45">{step + 1} / 5</span></div>
          <Progress value={Math.min(100, ((step + 1) / 5) * 100)} className="[&_[data-slot=progress-indicator]]:bg-accent" />
          <div className="mt-9 min-h-[480px]">{renderStep()}</div>
          {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}
          <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
            <Button type="button" variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className="h-11 px-4"><ArrowLeft className="size-4" />上一步</Button>
            <Button type="button" onClick={next} className="h-11 rounded-xl bg-accent px-5 text-white hover:bg-accent-strong">{step === 4 ? '查看诊断预览' : '下一步'}<ArrowRight className="size-4" /></Button>
          </div>
        </section>
      </div>
    </div>
  );

  function renderStep() {
    if (step === 0) return <div><StepHeading title="先了解你的业务环境" copy="这里只用于让报告更贴近你的场景，不参与价值评分。" /><div className="mt-8 grid gap-5 sm:grid-cols-2"><Field label="所属行业"><NativeSelect className="w-full" value={answers.industry} onChange={(e) => update('industry', e.target.value)}><NativeSelectOption value="">请选择</NativeSelectOption>{['跨境电商', '国内电商', '私域零售', '内容与营销', '专业服务', '制造与供应链', '其他'].map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}</NativeSelect></Field><Field label="团队人数"><NativeSelect className="w-full" value={answers.teamSize} onChange={(e) => update('teamSize', e.target.value)}><NativeSelectOption value="">请选择</NativeSelectOption>{['1 人', '2—5 人', '6—20 人', '21—50 人', '51 人以上'].map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}</NativeSelect></Field><Field label="主要业务（可选）"><Input className="h-11" maxLength={80} value={answers.business} onChange={(e) => update('business', e.target.value)} placeholder="例如：跨境家居产品" /></Field><Field label="当前常用工具（可选）"><Input className="h-11" maxLength={120} value={answers.tools} onChange={(e) => update('tools', e.target.value)} placeholder="例如：企微、飞书、ERP、Excel" /></Field></div></div>;
    if (step === 1) return <div><StepHeading title="只选一条最想先改的流程" copy="这份报告只评估你本次选择的流程，不会声称找到了全公司的最优答案。" /><RadioGroup value={answers.process} onValueChange={(value) => update('process', value)} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">{processOptions.map((item) => <Choice key={item} value={item} label={item} checked={answers.process === item} />)}</RadioGroup>{answers.process === '其他流程' && <Textarea className="mt-4 min-h-24" value={answers.business} onChange={(e) => update('business', e.target.value)} placeholder="用一句话描述这条流程" maxLength={80} />}</div>;
    if (step === 2) return <div><StepHeading title="这条流程消耗了多少工作量？" copy="用区间回答即可，不需要精确计算。" /><Question title="发生频率"><ChoiceGroup value={answers.frequency} options={optionSets.frequency} onChange={(value) => update('frequency', value as AuditAnswers['frequency'])} /></Question><Question title="有多少人参与"><ChoiceGroup value={answers.people} options={optionSets.people} onChange={(value) => update('people', value as AuditAnswers['people'])} /></Question><Question title="所有参与者每周合计投入"><ChoiceGroup value={answers.time} options={optionSets.time} onChange={(value) => update('time', value as AuditAnswers['time'])} /></Question><Question title="出错或遗漏的最严重后果"><ChoiceGroup value={answers.impact} options={optionSets.impact} onChange={(value) => update('impact', value as AuditAnswers['impact'])} /></Question></div>;
    if (step === 3) return <div><StepHeading title="它是否具备自动化条件？" copy="高风险不等于没价值，但必须增加人工闸门。" /><Question title="输入和判断规则有多稳定"><ChoiceGroup value={answers.inputFixed} options={optionSets.inputFixed} onChange={(value) => update('inputFixed', value as AuditAnswers['inputFixed'])} /></Question><Question title="历史样本情况"><ChoiceGroup value={answers.samples} options={optionSets.samples} onChange={(value) => update('samples', value as AuditAnswers['samples'])} /></Question><Question title="系统和数据怎样访问"><ChoiceGroup value={answers.access} options={optionSets.access} onChange={(value) => update('access', value as AuditAnswers['access'])} /></Question><Question title="结果能否在执行前人工复核"><ChoiceGroup value={answers.humanReview} options={optionSets.humanReview} onChange={(value) => update('humanReview', value as AuditAnswers['humanReview'])} /></Question><Question title="涉及哪些敏感动作（可多选）"><div className="mt-3 grid gap-2 sm:grid-cols-2">{[['commitment', '对外回复、报价或承诺'], ['money', '付款、退款或资金'], ['production', '修改或删除生产数据'], ['publish', '对外公开发布'], ['sensitive', '客户、员工等敏感信息']].map(([value, label]) => { const checked = answers.riskActions.includes(value); return <label key={value} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 text-sm ${checked ? 'border-accent bg-[#edf2ff]' : 'border-ink/10 bg-paper'}`}><Checkbox checked={checked} onCheckedChange={() => update('riskActions', checked ? answers.riskActions.filter((item) => item !== value) : [...answers.riskActions, value])} />{label}</label>; })}</div></Question><Question title="异常情况大约占多少"><ChoiceGroup value={answers.exceptions} options={optionSets.exceptions} onChange={(value) => update('exceptions', value as AuditAnswers['exceptions'])} /></Question></div>;
    return <div><StepHeading title="你是否准备好启动一个小试点？" copy="准备度不改变流程价值，但会决定现在能不能开始。" /><Question title="是否有明确负责人"><ChoiceGroup value={answers.owner} options={optionSets.owner} onChange={(value) => update('owner', value as AuditAnswers['owner'])} /></Question><Question title="是否愿意提供脱敏样本"><ChoiceGroup value={answers.dataReady} options={optionSets.dataReady} onChange={(value) => update('dataReady', value as AuditAnswers['dataReady'])} /></Question><Question title="员工能否参与一次访谈"><ChoiceGroup value={answers.interview} options={optionSets.interview} onChange={(value) => update('interview', value as AuditAnswers['interview'])} /></Question><Question title="两周后怎样判断成功"><ChoiceGroup value={answers.metricReadiness} options={optionSets.metricReadiness} onChange={(value) => update('metricReadiness', value as AuditAnswers['metricReadiness'])} /><NativeSelect className="mt-3 w-full" value={answers.successMetric} onChange={(e) => update('successMetric', e.target.value)}>{['处理时间', '准确率', '漏跟进数量', '单周处理量', '人工复核时间', '异常发现提前量'].map((item) => <NativeSelectOption key={item} value={item}>优先看：{item}</NativeSelectOption>)}</NativeSelect></Question></div>;
  }
}

function StepHeading({ title, copy }: { title: string; copy: string }) { return <div><h1 className="text-3xl font-semibold tracking-[-.045em] lg:text-4xl">{title}</h1><p className="mt-3 leading-7 text-ink/52">{copy}</p></div>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="grid gap-2 text-sm font-medium text-ink"><span>{label}</span>{children}</label>; }
function Question({ title, children }: { title: string; children: ReactNode }) { return <fieldset className="mt-7 border-t border-ink/10 pt-6"><legend className="text-sm font-semibold text-ink">{title}</legend>{children}</fieldset>; }
function ChoiceGroup({ value, options, onChange }: { value: string; options: readonly (readonly [string, string])[]; onChange: (value: string) => void }) { return <RadioGroup value={value} onValueChange={onChange} className="mt-3 grid grid-cols-2 gap-2">{options.map(([optionValue, label]) => <Choice key={optionValue} value={optionValue} label={label} checked={value === optionValue} />)}</RadioGroup>; }
function Choice({ value, label, checked }: { value: string; label: string; checked: boolean }) { return <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${checked ? 'border-accent bg-[#edf2ff] text-ink shadow-[0_0_0_1px_rgba(23,79,230,.08)]' : 'border-ink/10 bg-paper text-ink/58 hover:border-ink/25'}`}><RadioGroupItem value={value} />{label}</label>; }
function Score({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) { return <div className="border-r border-white/10 p-5 last:border-r-0 lg:p-6"><p className={`text-3xl font-semibold tracking-[-.05em] lg:text-5xl ${accent ? 'text-[#7f9eff]' : 'text-white'}`}>{value}</p><p className="mt-3 text-xs text-white/38">{label}</p></div>; }
