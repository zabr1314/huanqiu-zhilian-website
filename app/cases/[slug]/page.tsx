import { ArrowRight, Check, CircleAlert, GitBranch, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { caseStudy } from '@/lib/site-data';

export function generateStaticParams() { return [{ slug: caseStudy.slug }]; }

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== caseStudy.slug) notFound();
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader dark />
      <section className="bg-[#090d14] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#7f9eff]">{caseStudy.eyebrow}</p>
          <h1 className="mt-7 max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[.92] tracking-[-.07em]">{caseStudy.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/52">{caseStudy.summary}</p>
          <div className="mt-14 grid grid-cols-2 border-l border-t border-white/10 lg:grid-cols-4">
            {caseStudy.baseline.map((item) => <div key={item.label} className="border-b border-r border-white/10 p-5 lg:p-7"><p className="text-3xl font-semibold tracking-[-.05em]">{item.value}</p><p className="mt-3 text-sm text-white/38">{item.label}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudy.sections.map((section, index) => <article key={section.title} className="min-h-64 rounded-2xl border border-ink/10 bg-white p-7 lg:p-8"><span className="font-mono text-xs text-accent">0{index + 1}</span><h2 className="mt-10 text-2xl font-semibold tracking-[-.04em] text-ink">{section.title}</h2><p className="mt-4 leading-7 text-ink/55">{section.copy}</p></article>)}
        </div>

        <div className="mt-16 rounded-3xl bg-[#edf2ff] p-7 lg:p-10">
          <p className="section-kicker">系统流程</p>
          <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {[
              ['输入', '客户、订单、内容任务'], ['处理', '提取、归一、分类'], ['人工闸门', '报价、发布、异常'], ['输出', '任务、提醒、经营视图'],
            ].map(([title, copy], index) => <div key={title} className="contents"><div className="rounded-xl bg-white p-5"><p className="text-xs font-semibold text-accent">{title}</p><p className="mt-2 text-sm text-ink/58">{copy}</p></div>{index < 3 && <ArrowRight className="mx-auto size-4 rotate-90 text-accent lg:rotate-0" />}</div>)}
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Callout icon={GitBranch} title="程序负责" copy="搬运、校验、写入状态和记录执行过程。" />
          <Callout icon={Check} title="AI 负责" copy="提取、分类、匹配、草拟与异常提示。" />
          <Callout icon={ShieldCheck} title="人负责" copy="报价、承诺、发布、变更与异常兜底。" />
        </div>

        <div className="mt-12 flex gap-4 rounded-2xl border border-[#e9a33b]/25 bg-[#fff6e7] p-6"><CircleAlert className="mt-1 size-5 shrink-0 text-[#a6660b]" /><div><h2 className="font-semibold text-ink">这个案例的边界</h2><p className="mt-2 leading-7 text-ink/58">适合高频、规则相对稳定、结果可人工判断的团队。不适合没有统一流程、无法提供样本，或希望 AI 独自承担对外责任的企业。</p></div></div>
      </section>

      <section className="bg-accent text-white"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-5 py-14 lg:flex-row lg:items-center lg:px-10"><div><p className="text-xs uppercase tracking-[.18em] text-white/55">检查你的流程</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">用同样的方法，先做一次结构化体检。</h2></div><a href="/audit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-accent">开始体检 <ArrowRight className="size-4" /></a></div></section>
      <SiteFooter />
    </main>
  );
}

function Callout({ icon: Icon, title, copy }: { icon: typeof Check; title: string; copy: string }) {
  return <div className="rounded-2xl border border-ink/10 bg-white p-6"><Icon className="size-5 text-accent" /><h3 className="mt-6 font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-ink/52">{copy}</p></div>;
}
