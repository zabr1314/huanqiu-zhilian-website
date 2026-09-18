import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { navigation } from '@/lib/site-data';
import { cn } from '@/lib/utils';

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <header className={cn(
        'relative z-30 border-b backdrop-blur-xl',
        dark ? 'border-white/10 bg-[#090d14]/90 text-white' : 'border-ink/10 bg-paper/90 text-ink',
      )}>
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="寰球智联 AI 改造局首页">
            <span className={cn('grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold', dark ? 'bg-white text-ink' : 'bg-ink text-paper')}>AI</span>
            <span className="truncate text-[15px] font-semibold tracking-[-0.02em]">寰球智联 <span className={dark ? 'text-white/35' : 'text-ink/35'}>/</span> AI 改造局</span>
          </Link>
          <nav className={cn('hidden items-center gap-7 text-sm lg:flex', dark ? 'text-white/60' : 'text-ink/62')} aria-label="主导航">
            {navigation.map((item) => (
              <Link key={item.href} className={cn('transition', dark ? 'hover:text-white' : 'hover:text-ink')} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/audit" className={cn(buttonVariants({ size: 'lg' }), 'hidden h-10 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,73,230,.2)] hover:bg-accent-strong sm:inline-flex')}>
            做一次流程体检
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </header>
      <nav className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-1.5 rounded-2xl border border-ink/10 bg-white/95 p-1.5 shadow-[0_14px_40px_rgba(15,42,120,.22)] backdrop-blur-xl sm:hidden" aria-label="移动端快捷导航">
        <Link href="/demo" className="flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-ink"><Sparkles className="size-4 text-accent" />样板中心</Link>
        <Link href="/audit" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-white">流程体检 <ArrowRight className="size-4" /></Link>
      </nav>
    </>
  );
}
