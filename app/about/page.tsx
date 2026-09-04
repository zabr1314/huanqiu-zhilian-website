import { ArrowRight, CheckCircle2, Clock3, MessageSquareText } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero eyebrow="关于与联系" title="先把流程跑通，再谈一整套系统。" description="我们从自己的设备自动化、订单数据、私域经营、达人投放和 AI 内容生产中积累方法，再把它整理成可复用的企业试点流程。" />
      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-24">
        <div><p className="section-kicker">合作方式</p><h2 className="section-title mt-5">一个流程，三步验证。</h2></div>
        <div className="grid gap-4">
          {[
            ['01', '流程体检', '用结构化问题判断价值、风险和准备度，先拿到一份有用的诊断预览。'],
            ['02', '30 分钟诊断', '核对真实流程、数据来源、责任边界和两周后的验收指标。'],
            ['03', '7—14 天试点', '只跑通一个最小闭环，记录前后数据，再决定扩展、调整或停止。'],
          ].map(([number, title, copy]) => <article key={number} className="grid gap-5 rounded-2xl border border-ink/10 bg-white p-6 sm:grid-cols-[60px_1fr]"><span className="font-mono text-xs text-accent">{number}</span><div><h3 className="text-xl font-semibold text-ink">{title}</h3><p className="mt-3 leading-7 text-ink/55">{copy}</p></div></article>)}
        </div>
      </section>
      <section id="contact" className="border-y border-ink/10 bg-white scroll-mt-10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-[1fr_.7fr] lg:px-10 lg:py-24">
          <div><p className="section-kicker">预约诊断</p><h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.05em] text-ink lg:text-6xl">不必先决定做一套大系统。先选一条高频流程，用两周验证它值不值得改。</h2><p className="mt-6 max-w-2xl leading-7 text-ink/55">完成体检后留下姓名、公司与微信或手机，即可获得完整报告和预约入口。我们不会在公开页面要求上传客户名单或企业原始文件。</p><a href="/audit" className="mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white">开始 3 分钟流程体检 <ArrowRight className="size-4" /></a></div>
          <div className="grid gap-3 self-end">
            <div className="rounded-2xl bg-paper p-5"><Clock3 className="size-5 text-accent" /><p className="mt-5 font-semibold text-ink">30 分钟</p><p className="mt-2 text-sm leading-6 text-ink/50">围绕一条具体流程，不做泛泛的 AI 介绍。</p></div>
            <div className="rounded-2xl bg-paper p-5"><MessageSquareText className="size-5 text-accent" /><p className="mt-5 font-semibold text-ink">先看报告</p><p className="mt-2 text-sm leading-6 text-ink/50">先让诊断结果对你有用，再决定是否继续沟通。</p></div>
            <div className="rounded-2xl bg-paper p-5"><CheckCircle2 className="size-5 text-accent" /><p className="mt-5 font-semibold text-ink">明确边界</p><p className="mt-2 text-sm leading-6 text-ink/50">告诉你哪些适合试点，哪些现在不该自动化。</p></div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
