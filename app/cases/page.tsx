import { ArrowRight, BadgeCheck } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { caseStudy } from '@/lib/site-data';

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="真实案例" title="不只展示结果，也公开基线、失败和人工成本。" description="每个案例都沿着同一条证据链展开：原始问题、改造前基线、职责边界、失败调整、前后结果和适用条件。" />
      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <a href={`/cases/${caseStudy.slug}`} className="group grid overflow-hidden rounded-3xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(17,23,34,.09)] lg:grid-cols-[.82fr_1.18fr]">
          <div className="flex min-h-[440px] flex-col bg-[#090d14] p-8 text-white lg:p-12">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#8ca8ff]"><BadgeCheck className="size-4" />{caseStudy.eyebrow}</span>
            <h2 className="mt-auto text-4xl font-semibold leading-tight tracking-[-.05em] lg:text-6xl">{caseStudy.title}</h2>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70">查看完整证据链 <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
          </div>
          <div className="p-7 lg:p-12">
            <p className="max-w-2xl text-lg leading-8 text-ink/55">{caseStudy.summary}</p>
            <div className="mt-10 grid grid-cols-2 border-l border-t border-ink/10">
              {caseStudy.baseline.map((item) => <div key={item.label} className="border-b border-r border-ink/10 p-5 lg:p-7"><p className="text-3xl font-semibold tracking-[-.05em] text-ink">{item.value}</p><p className="mt-2 text-sm text-ink/42">{item.label}</p></div>)}
            </div>
            <p className="mt-7 text-xs leading-5 text-ink/40">这些数字描述的是改造前的内部流程基线，不是对外承诺的效率提升比例。</p>
          </div>
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
