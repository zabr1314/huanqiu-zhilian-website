import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { solutions } from '@/lib/site-data';

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="四类产品化方案" title="不卖万能 AI，先改一条值得改的流程。" description="每个方案都从真实业务问题开始，写清需要哪些数据、最终交付什么、怎样验收，以及哪些动作必须由人负责。" aside={<div className="rounded-2xl border border-ink/10 bg-white p-6 text-sm leading-6 text-ink/55"><p className="font-semibold text-ink">共同交付方式</p><p className="mt-3">1 条流程 · 7—14 天试点 · 1 组前后数据</p></div>} />
      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.slug} className="flex min-h-[430px] flex-col rounded-2xl border border-ink/10 bg-white p-7 lg:p-9">
                <div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-full bg-[#edf2ff] text-accent"><Icon className="size-5" /></span><span className="font-mono text-xs text-ink/25">0{index + 1}</span></div>
                <h2 className="mt-10 text-3xl font-semibold tracking-[-.045em] text-ink">{item.title}</h2>
                <p className="mt-4 max-w-lg leading-7 text-ink/55">{item.result}</p>
                <div className="mt-7 grid gap-2">
                  {item.delivery.slice(0, 3).map((entry) => <span key={entry} className="flex items-center gap-2 text-sm text-ink/58"><CheckCircle2 className="size-4 text-accent" />{entry}</span>)}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
                  <a href={`/solutions/${item.slug}`} className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-semibold text-white hover:bg-accent">查看方案 <ArrowRight className="size-4" /></a>
                  <a href={`/audit?process=${encodeURIComponent(item.auditProcess)}`} className="text-sm font-semibold text-accent">体检这条流程</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
