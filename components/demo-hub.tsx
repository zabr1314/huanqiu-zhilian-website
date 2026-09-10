import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  CircleAlert,
  FileCheck2,
  Languages,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const steps = [
  ['01', '选择业务场景', '先进入与你最接近的一条流程。'],
  ['02', '查看系统判断', '每条结论都能回到数据与规则。'],
  ['03', '确认人工边界', '发布、采购和承诺保留人工拍板。'],
] as const;

export function DemoHub() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
          <p className="section-kicker">样板中心 · 全部使用合成数据</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[.95] tracking-[-.065em] text-ink">
                先看系统怎样工作，<br /><span className="text-accent">再谈要不要做。</span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-lg leading-8 text-ink/58">这里不是功能截图，而是两个可以亲手操作的业务样板。你会看到输入、判断、异常、人工确认和最终交付怎样连成一条流程。</p>
              <div className="mt-7 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:gap-6">
                <Link href="/demo/commerce" className="inline-flex items-center gap-2 text-accent">进入跨境经营驾驶舱 <ArrowRight className="size-4" /></Link>
                <Link href="/demo/content-factory" className="inline-flex items-center gap-2 text-accent">进入 AIGC 内容工厂 <ArrowRight className="size-4" /></Link>
              </div>
            </div>
          </div>

          <div className="mt-12 hidden overflow-hidden rounded-2xl border border-ink/10 bg-white md:grid md:grid-cols-3">
            {steps.map(([index, title, copy]) => (
              <div key={index} className="border-b border-ink/10 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-6">
                <span className="font-mono text-xs text-accent">{index}</span>
                <p className="mt-5 text-sm font-semibold text-ink">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/48">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="section-kicker">两个可交互样板</p>
            <h2 className="section-title mt-5">一个管经营判断，<br />一个管内容交付。</h2>
          </div>
          <p className="max-w-md leading-7 text-ink/52">都可以直接操作，也都明确标出合成数据、人工闸门和不自动执行的动作。</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-[1.75rem] bg-[#090d14] text-white shadow-[0_24px_70px_rgba(17,23,34,.14)]">
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#174fe6] text-white"><BarChart3 className="size-5" /></span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45">经营决策</span>
              </div>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[.16em] text-[#7fa0ff]">跨境经营驾驶舱</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] lg:text-4xl">从多后台数据，走到今天该处理的动作。</h3>
              <p className="mt-5 max-w-xl leading-7 text-white/50">切换老板、运营和供应链视角，查看利润、广告、库存、退款与回款异常的判断依据。</p>
              <div className="mt-7 flex flex-wrap gap-2 text-xs text-white/58">
                {['11 个经营模块', '角色与渠道筛选', '行动清单', '人工采购闸门'].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5">{item}</span>)}
              </div>
            </div>
            <div className="mx-4 rounded-2xl border border-white/10 bg-white/[.045] p-4 lg:mx-6 lg:p-5">
              <div className="grid grid-cols-3 gap-2">
                {[['净销售额', 'US$184K'], ['贡献利润', '17.1%'], ['需拍板', '3 项']].map(([label, value]) => <div key={label} className="rounded-xl bg-white/[.055] p-3"><p className="text-[11px] text-white/35">{label}</p><p className="mt-2 text-sm font-semibold">{value}</p></div>)}
              </div>
              <div className="mt-3 flex items-start gap-3 rounded-xl border border-[#ffbd59]/15 bg-[#ffbd59]/[.06] p-4">
                <CircleAlert className="mt-0.5 size-4 shrink-0 text-[#ffd28e]" />
                <div><p className="text-sm font-medium">NX-HL-01 预计 11 天后断货</p><p className="mt-1 text-xs leading-5 text-white/38">给出空运与分批补货建议，但不会自动采购。</p></div>
              </div>
            </div>
            <Link href="/demo/commerce" className="m-4 flex h-12 items-center justify-between rounded-xl bg-white px-5 text-sm font-semibold text-ink transition group-hover:bg-[#dce5ff] lg:m-6">
              进入样板 <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </article>

          <article className="group overflow-hidden rounded-[1.75rem] bg-[#10101a] text-white shadow-[0_24px_70px_rgba(17,23,34,.14)]">
            <div className="relative h-56 overflow-hidden border-b border-white/10 lg:h-64">
              <Image src="/aigc/lantern-campsite-16x9.png" alt="露营灯 AIGC 场景内容样板" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10101a] via-transparent to-transparent" />
              <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">内容交付</span>
            </div>
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 text-[#b9aaff]"><Sparkles className="size-5" /><p className="text-xs font-semibold uppercase tracking-[.16em]">AIGC 内容工厂</p></div>
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] lg:text-4xl">从一份商品事实，生成可审核的内容包。</h3>
              <p className="mt-5 max-w-xl leading-7 text-white/50">生成 Listing、商品图、短视频和多语言版本，并演示错误声明怎样被拦截、修订和批准。</p>
              <div className="mt-7 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl border border-white/10 p-3 text-white/55"><FileCheck2 className="size-4 text-[#b9aaff]" /><span className="mt-2 block">事实检查</span></div>
                <div className="rounded-xl border border-white/10 p-3 text-white/55"><Languages className="size-4 text-[#b9aaff]" /><span className="mt-2 block">多语言</span></div>
                <div className="rounded-xl border border-white/10 p-3 text-white/55"><PackageCheck className="size-4 text-[#b9aaff]" /><span className="mt-2 block">版本交付</span></div>
              </div>
            </div>
            <Link href="/demo/content-factory" className="m-4 flex h-12 items-center justify-between rounded-xl bg-[linear-gradient(135deg,#725cff,#247dff)] px-5 text-sm font-semibold text-white transition group-hover:brightness-110 lg:m-6 lg:mt-0">
              进入样板 <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10 lg:py-18">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-accent"><ShieldCheck className="size-4" />两个样板都不会连接真实店铺或自动执行关键动作</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-ink lg:text-4xl">看完样板，再把它换成你的流程。</h2>
            <p className="mt-4 max-w-2xl leading-7 text-ink/52">流程体检会把你的输入、步骤、负责人、异常和验收指标整理成一份初步改造建议。</p>
          </div>
          <Link href="/audit" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white transition hover:bg-accent-strong">开始 3 分钟流程体检 <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
