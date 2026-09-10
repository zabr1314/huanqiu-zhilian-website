import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#090d14] pb-24 text-white sm:pb-0">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 lg:grid-cols-[1.4fr_.6fr_.6fr] lg:px-10 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#6f92ff]">天才教授 · AI 改造局</p>
          <p className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-.04em]">一个流程、一个试点、一组前后数据。</p>
          <p className="mt-5 max-w-xl leading-7 text-white/48">先看流程值不值得改，再决定用什么技术。关键动作保留人工确认，每个结果都能追踪、验收和恢复。</p>
        </div>
        <div>
          <p className="text-sm font-semibold">样板与诊断</p>
          <div className="mt-5 grid gap-3 text-sm text-white/50">
            <Link className="hover:text-white" href="/demo">样板中心</Link>
            <Link className="hover:text-white" href="/demo/commerce">跨境经营驾驶舱</Link>
            <Link className="hover:text-white" href="/demo/content-factory">AIGC 内容工厂</Link>
            <Link className="hover:text-white" href="/audit">3 分钟流程体检</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold">下一步</p>
          <Link href="/about#contact" className="mt-5 inline-flex items-center gap-2 border-b border-white/25 pb-2 text-sm text-white/72 hover:border-white hover:text-white">
            预约 30 分钟诊断 <ArrowUpRight className="size-4" />
          </Link>
          <p className="mt-6 text-xs leading-5 text-white/35">公开页面不收集身份证、客户名单或企业原始文件。联系方式仅用于发送诊断结果与预约沟通。</p>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/40">
            <Link className="hover:text-white" href="/cases/studio-operations">内部实战案例</Link>
            <Link className="hover:text-white" href="/insights">内容拆解</Link>
            <Link className="hover:text-white" href="/method">方法与边界</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>© 2026 天才教授 AI 改造局</span>
          <span>企业流程诊断 · 最小试点 · 可验收交付</span>
        </div>
      </div>
    </footer>
  );
}
