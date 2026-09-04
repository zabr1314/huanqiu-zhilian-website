import { AlertTriangle, ArrowRight, Eye, PauseCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { principles } from '@/lib/site-data';

export default function MethodPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="方法与边界" title="不从“AI 能做什么”开始，而从“企业该把什么交给 AI”开始。" description="一套可信的 AI 流程系统，必须能回答：为什么改、怎样验收、什么时候停止、出错如何恢复，以及经验如何沉淀。" />
      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid border-l border-t border-ink/10 md:grid-cols-5">
          {principles.map((item) => <article key={item.number} className="min-h-72 border-b border-r border-ink/10 bg-white p-6"><span className="font-mono text-xs text-accent">{item.number}</span><h2 className="mt-16 text-xl font-semibold tracking-[-.03em] text-ink">{item.title}</h2><p className="mt-4 text-sm leading-6 text-ink/52">{item.copy}</p></article>)}
        </div>
      </section>
      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-24">
          <div><p className="section-kicker">我们明确不让 AI 自主做</p><h2 className="section-title mt-5">责任不能藏在自动化后面。</h2><p className="mt-6 max-w-md leading-7 text-ink/55">高风险不等于没有价值。它意味着试点必须转为“系统建议 + 人工执行”，并留下完整记录。</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [ShieldCheck, '价格与付款', '报价、退款、付款和资金操作由有权限的人确认。'],
              [Eye, '对外承诺', '交期、政策、合同与正式回复不能由模型自行承诺。'],
              [AlertTriangle, '公开发布', '商品内容、广告和公开信息必须经过发布前审核。'],
              [RotateCcw, '生产数据变更', '删除、覆盖和不可逆修改要有审批、记录与回退方式。'],
            ].map(([Icon, title, copy]) => { const I = Icon as typeof ShieldCheck; return <article key={title as string} className="rounded-2xl border border-ink/10 bg-paper p-6"><I className="size-5 text-accent" /><h3 className="mt-8 text-lg font-semibold text-ink">{title as string}</h3><p className="mt-3 text-sm leading-6 text-ink/52">{copy as string}</p></article>; })}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1000px] px-5 py-16 text-center lg:py-24"><PauseCircle className="mx-auto size-8 text-accent" /><h2 className="mt-7 text-4xl font-semibold tracking-[-.05em] text-ink">什么时候应该停下来？</h2><p className="mx-auto mt-5 max-w-2xl leading-7 text-ink/55">当准确率达不到验收线、数据条件不足、异常远多于预期，或维护成本超过节省成本时，停止不是失败，而是一次合格的试点结论。</p><a href="/audit" className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-sm font-semibold text-white hover:bg-accent">先判断我的流程 <ArrowRight className="size-4" /></a></section>
      <SiteFooter />
    </main>
  );
}
