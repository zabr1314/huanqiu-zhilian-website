import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { insights } from '@/lib/site-data';

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="内容与拆解" title="把模糊的 AI 讨论，拆成可以判断的业务问题。" description="这里不追逐工具清单。每一篇内容都回到流程、数据、责任、验收和适用边界。" />
      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-5 md:grid-cols-3">
          {insights.map((item, index) => {
            const Icon = item.icon;
            return <a key={item.slug} href={`/insights/${item.slug}`} className="group flex min-h-[420px] flex-col rounded-2xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_24px_60px_rgba(17,23,34,.08)]"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-full bg-[#edf2ff] text-accent"><Icon className="size-5" /></span><span className="font-mono text-xs text-ink/25">0{index + 1}</span></div><p className="mt-12 text-xs font-semibold uppercase tracking-[.14em] text-accent">{item.category}</p><h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-.035em] text-ink">{item.title}</h2><p className="mt-4 leading-7 text-ink/52">{item.summary}</p><span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent">阅读全文 <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></a>;
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
