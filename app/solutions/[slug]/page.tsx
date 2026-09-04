import { ArrowRight, Check, CircleOff, Database, Gauge, PackageCheck, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { solutions } from '@/lib/site-data';

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) notFound();
  const Icon = solution.icon;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-ink/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-10 lg:py-24">
          <div>
            <p className="section-kicker">业务方案 · {solution.shortTitle}</p>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[.98] tracking-[-.065em] text-ink">{solution.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/58">{solution.result}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={`/audit?process=${encodeURIComponent(solution.auditProcess)}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-strong">体检这条流程 <ArrowRight className="size-4" /></a>
              <a href="/demo" className="inline-flex h-12 items-center justify-center rounded-xl border border-ink/15 px-6 text-sm font-semibold text-ink hover:bg-paper">先看交互样板</a>
            </div>
          </div>
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-3xl bg-[#090d14] text-white">
            <div className="absolute inset-0 opacity-25 blueprint-grid" />
            <div className="relative text-center"><span className="mx-auto grid size-20 place-items-center rounded-full border border-white/10 bg-white/[.06] text-[#7fa0ff]"><Icon className="size-8" /></span><p className="mt-6 text-xs uppercase tracking-[.18em] text-white/35">Input → Decision → Human gate → Output</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <InfoBlock icon={Users} number="01" title="适合谁" text={solution.forWho} />
          <ListBlock icon={Gauge} number="02" title="解决什么问题" items={solution.problems} />
          <ListBlock icon={Database} number="03" title="需要哪些数据" items={solution.data} />
          <ListBlock icon={PackageCheck} number="04" title="最终交付什么" items={solution.delivery} />
          <ListBlock icon={Check} number="05" title="如何验收" items={solution.acceptance} />
          <InfoBlock icon={CircleOff} number="06" title="明确不做什么" text={solution.boundary} accent />
        </div>
      </section>

      <section className="border-t border-ink/10 bg-accent text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-5 py-14 lg:flex-row lg:items-center lg:px-10">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">先验证，再扩展</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">用 3 分钟判断这条流程值不值得改。</h2></div>
          <a href={`/audit?process=${encodeURIComponent(solution.auditProcess)}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-accent">开始体检 <ArrowRight className="size-4" /></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function InfoBlock({ icon: Icon, number, title, text, accent = false }: { icon: typeof Users; number: string; title: string; text: string; accent?: boolean }) {
  return <article className={`min-h-72 rounded-2xl border p-7 ${accent ? 'border-[#e9a33b]/30 bg-[#fff6e7]' : 'border-ink/10 bg-white'}`}><div className="flex items-center justify-between"><Icon className={`size-5 ${accent ? 'text-[#a6660b]' : 'text-accent'}`} /><span className="font-mono text-xs text-ink/25">{number}</span></div><h2 className="mt-14 text-xl font-semibold tracking-[-.025em] text-ink">{title}</h2><p className="mt-4 leading-7 text-ink/55">{text}</p></article>;
}

function ListBlock({ icon: Icon, number, title, items }: { icon: typeof Users; number: string; title: string; items: readonly string[] }) {
  return <article className="min-h-72 rounded-2xl border border-ink/10 bg-white p-7"><div className="flex items-center justify-between"><Icon className="size-5 text-accent" /><span className="font-mono text-xs text-ink/25">{number}</span></div><h2 className="mt-14 text-xl font-semibold tracking-[-.025em] text-ink">{title}</h2><div className="mt-4 grid gap-2.5">{items.map((item) => <p key={item} className="flex items-start gap-2 text-sm leading-6 text-ink/55"><span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />{item}</p>)}</div></article>;
}
