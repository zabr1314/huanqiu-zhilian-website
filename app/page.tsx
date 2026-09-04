import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleAlert,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { caseStudy, evidence, principles, solutions } from '@/lib/site-data';

const proofTags = ['真实流程', '脱敏数据', '人工闸门', '可追踪', '可验收', '可恢复'];
const flow = [
  { index: '01', title: '业务输入', copy: '微信 · 邮箱 · 订单 · 表格' },
  { index: '02', title: '系统判断', copy: '提取 · 分类 · 匹配 · 提醒' },
  { index: '03', title: '人工确认', copy: '价格 · 承诺 · 发布 · 变更' },
  { index: '04', title: '业务结果', copy: '客户库 · 任务 · 风险 · 看板' },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <SiteHeader />

      <section className="relative border-b border-ink/10">
        <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-14 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:py-20 xl:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent"><span className="h-px w-9 bg-accent" />企业 AI 流程改造</div>
            <h1 className="max-w-[760px] text-[clamp(2.8rem,6vw,6.7rem)] font-semibold leading-[.96] tracking-[-0.065em] text-ink">
              把重复流程，<span className="text-accent">改造成可验收</span><br />的 AI 系统。
            </h1>
            <p className="mt-7 max-w-[660px] text-lg leading-8 text-ink/62 lg:text-xl">面向跨境、电商、私域和内容团队。先做流程体检，再用 7—14 天跑通一个最小试点。不是装一个聊天框，而是让客户、订单、内容和报表真正流起来。</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/audit" className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent">开始 3 分钟流程体检<ArrowRight className="size-4 transition group-hover:translate-x-0.5" /></a>
              <a href="/demo" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white/65 px-6 text-[15px] font-semibold text-ink transition hover:border-ink/35 hover:bg-white"><Sparkles className="size-4 text-accent" />查看可交互演示</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-ink/10 pt-6">
              {proofTags.map((tag) => <span key={tag} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/55"><Check className="size-3.5 text-accent" />{tag}</span>)}
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#070b12] shadow-[0_35px_80px_rgba(14,21,34,.22)] lg:min-h-[650px]">
            <img src="/hero-ai-transformation.png" alt="企业数据经过智能工作流流向业务系统的抽象流程蓝图" className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-[#070b12]/20" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 text-xs text-white/65 backdrop-blur-md">
              <span className="inline-flex items-center gap-2"><span className="pulse-dot size-2 rounded-full bg-[#47d7ff]" />流程样板正在运行</span><span>人工确认已开启</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/12 bg-[#0b111c]/82 p-5 text-white backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div><p className="text-xs tracking-[0.14em] text-white/45">CURRENT DECISION</p><p className="mt-1 text-base font-medium">高价值客户进入复购窗口</p></div>
                <span className="shrink-0 rounded-full border border-[#ffbd59]/30 bg-[#ffbd59]/10 px-3 py-1 text-xs text-[#ffd28e]">等待人工确认</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-white/6 p-3"><span className="block text-white/42">数据来源</span><span className="mt-1 block">订单 + 客户标签</span></div>
                <div className="rounded-xl bg-white/6 p-3"><span className="block text-white/42">系统判断</span><span className="mt-1 block">14 天内可复购</span></div>
                <div className="rounded-xl bg-white/6 p-3"><span className="block text-white/42">下一步</span><span className="mt-1 block">客服今日回访</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10">
          <div className="grid overflow-hidden rounded-2xl border border-ink/10 bg-paper lg:grid-cols-4">
            {flow.map((item, index) => (
              <div key={item.index} className="relative border-b border-ink/10 p-5 last:border-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <div className="flex items-center justify-between"><span className="font-mono text-xs text-accent">{item.index}</span>{index < flow.length - 1 && <ArrowRight className="hidden size-4 text-ink/25 lg:block" />}</div>
                <p className="mt-6 text-sm font-semibold text-ink">{item.title}</p><p className="mt-1 text-sm text-ink/50">{item.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-ink/55"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />AI 处理规则明确、重复频繁的部分；价格、承诺、发布和不可逆操作始终保留人工确认。</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <p className="section-kicker">真实能力证据</p>
            <h2 className="section-title mt-5">不是从 PPT 开始，<br />我们先改造了自己的业务。</h2>
            <p className="mt-6 max-w-md leading-7 text-ink/55">点击查看每项经验对应的真实流程。这里不放未授权 Logo，也不虚构“服务百家企业”。</p>
          </div>
          <Accordion className="border-t border-ink/15">
            {evidence.map((item, index) => {
              const Icon = item.icon;
              return (
                <AccordionItem key={item.title} value={`evidence-${index}`} className="border-ink/15">
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <span className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 pr-4">
                      <span className="grid size-10 place-items-center rounded-full bg-white text-accent"><Icon className="size-4.5" /></span>
                      <span className="text-left text-base font-semibold text-ink">{item.title}</span>
                      <span className="font-mono text-sm text-accent">{item.value}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14 pr-8 text-base leading-7 text-ink/55">{item.copy}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="section-kicker">先从一个具体问题开始</p><h2 className="section-title mt-5">你的流程，卡在哪一步？</h2></div><p className="max-w-lg leading-7 text-ink/52">选择与你最接近的问题，直接进入对应方案。每个方案都写清需要什么数据、怎样验收，以及明确不做什么。</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {solutions.map((item, index) => {
              const Icon = item.icon;
              return (
                <a key={item.slug} href={`/solutions/${item.slug}`} className="group relative min-h-[290px] overflow-hidden rounded-2xl border border-ink/12 bg-paper p-7 transition hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_22px_50px_rgba(17,23,34,.08)] lg:p-9">
                  <span className="absolute right-6 top-6 font-mono text-xs text-ink/25">0{index + 1}</span>
                  <span className="grid size-11 place-items-center rounded-full bg-white text-accent shadow-sm"><Icon className="size-5" /></span>
                  <h3 className="mt-12 text-2xl font-semibold tracking-[-.035em] text-ink">{item.shortTitle}</h3>
                  <p className="mt-4 max-w-lg leading-7 text-ink/55">{item.pain}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">看这条流程怎么改 <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <p className="section-kicker">一条询盘流程的前后对比</p>
        <h2 className="section-title mt-5">少做复制粘贴，多留判断责任。</h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_72px_1fr] lg:items-stretch">
          <ProcessColumn label="改造前" tone="muted" steps={['收到询盘', '人工复制到表格', '查产品资料', '判断客户类型', '写回复', '手工提醒跟进', '周末再汇总报表']} />
          <div className="grid place-items-center"><span className="grid size-13 place-items-center rounded-full bg-ink text-white"><ArrowRight className="size-5 rotate-90 lg:rotate-0" /></span></div>
          <ProcessColumn label="改造后" tone="accent" steps={['收到询盘', '自动提取客户与需求', 'AI 初步分类', '匹配产品资料', '生成回复草稿', '人工确认报价和承诺', '建立任务并进入看板']} />
        </div>
      </section>

      <section className="bg-[#090d14] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-28">
          <div>
            <p className="section-kicker text-[#6f92ff]">跨境电商 Demo · 合成数据</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.045em] lg:text-6xl">销售、利润、广告、库存，<br />最后都要变成动作。</h2>
            <p className="mt-6 max-w-lg leading-7 text-white/52">这不是一组好看的图表。你可以切换渠道和角色，查看每个异常的数据来源、判断规则、负责人、期限与人工闸门。</p>
            <a href="/demo" className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-ink transition hover:bg-[#dce5ff]">进入跨境经营驾驶舱 <ArrowRight className="size-4" /></a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.045] p-4 shadow-2xl lg:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-sm font-semibold">北辰户外 · 跨境经营总览</p><p className="mt-1 text-xs text-white/35">Amazon / Shopify / TikTok Shop · 合成数据</p></div><span className="rounded-full bg-[#ffbd59]/12 px-3 py-1 text-xs text-[#ffd28e]">3 项需拍板</span></div>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ['净销售额', 'US$184,260', '+12.4%'], ['贡献利润', 'US$31,480', '利润率 17.1%'], ['广告花费', 'US$28,690', 'TACOS 15.6%'], ['退款率', '5.8%', '+1.1pp'],
              ].map(([label, value, delta]) => <div key={label} className="rounded-xl bg-white/[.055] p-4"><p className="text-xs text-white/40">{label}</p><p className="mt-3 text-xl font-semibold">{value}</p><p className="mt-2 text-xs text-[#7fa0ff]">{delta}</p></div>)}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-[#ffbd59]/15 bg-[#ffbd59]/[.06] p-5"><div className="flex items-center gap-2 text-[#ffd28e]"><CircleAlert className="size-4" /><span className="text-xs font-semibold">库存与质量风险</span></div><p className="mt-4 font-medium">NX-HL-01 预计 11 天后断货</p><p className="mt-2 text-sm leading-6 text-white/42">海运晚于断货日 9 天；系统建议比较空运与分批补货，但不会自动采购。</p></div>
              <div className="rounded-xl border border-[#6f92ff]/15 bg-[#174fe6]/10 p-5"><div className="flex items-center gap-2 text-[#9db3ff]"><Database className="size-4" /><span className="text-xs font-semibold">广告止损判断</span></div><p className="mt-4 font-medium">营地灯销量增长但贡献利润转负</p><p className="mt-2 text-sm leading-6 text-white/42">广告与退款使每件平均亏损 US$1.46，等待运营确认降预算。</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div><p className="section-kicker">{caseStudy.eyebrow}</p><h2 className="section-title mt-5">{caseStudy.title}</h2><p className="mt-6 leading-7 text-ink/55">{caseStudy.summary}</p><a href={`/cases/${caseStudy.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">查看完整证据链 <ArrowRight className="size-4" /></a></div>
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
              {caseStudy.baseline.map((item) => <div key={item.label} className="min-h-40 border-b border-r border-ink/10 p-6 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 lg:p-8"><p className="text-3xl font-semibold tracking-[-.05em] text-ink lg:text-5xl">{item.value}</p><p className="mt-4 text-sm text-ink/45">{item.label}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="section-kicker">方法与边界</p><h2 className="section-title mt-5">五件事，比“用了多少 AI”更重要。</h2></div><a href="/method" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">查看完整方法 <ArrowRight className="size-4" /></a></div>
        <div className="mt-12 grid border-l border-t border-ink/10 md:grid-cols-5">
          {principles.map((item) => <div key={item.number} className="min-h-64 border-b border-r border-ink/10 p-6"><span className="font-mono text-xs text-accent">{item.number}</span><h3 className="mt-16 text-lg font-semibold text-ink">{item.title}</h3><p className="mt-3 text-sm leading-6 text-ink/50">{item.copy}</p></div>)}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-accent text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-20">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">从一个流程开始</p><h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-[-.05em] lg:text-6xl">不必先决定做一套大系统。<br />先用两周验证它值不值得改。</h2></div>
          <a href="/audit" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-accent transition hover:-translate-y-0.5">开始 3 分钟流程体检 <ArrowRight className="size-4" /></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ProcessColumn({ label, tone, steps }: { label: string; tone: 'muted' | 'accent'; steps: string[] }) {
  return (
    <div className={`rounded-2xl border p-6 lg:p-8 ${tone === 'accent' ? 'border-accent/20 bg-[#edf2ff]' : 'border-ink/10 bg-white'}`}>
      <div className="flex items-center justify-between"><p className={`text-sm font-semibold ${tone === 'accent' ? 'text-accent' : 'text-ink/45'}`}>{label}</p><ArrowDown className="size-4 text-ink/25" /></div>
      <div className="mt-7 grid gap-2">
        {steps.map((step, index) => <div key={step} className={`flex min-h-11 items-center gap-3 rounded-lg px-4 text-sm ${tone === 'accent' && index === 5 ? 'border border-[#e9a33b]/30 bg-[#fff6e7] text-[#8d5a0d]' : 'bg-white text-ink/65'}`}><span className="font-mono text-[10px] text-ink/30">{String(index + 1).padStart(2, '0')}</span>{step}</div>)}
      </div>
    </div>
  );
}
