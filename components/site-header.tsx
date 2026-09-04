import { ArrowRight } from 'lucide-react';
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
          <a href="/" className="flex min-w-0 items-center gap-3" aria-label="天才教授 AI 改造局首页">
            <span className={cn('grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold', dark ? 'bg-white text-ink' : 'bg-ink text-paper')}>AI</span>
            <span className="truncate text-[15px] font-semibold tracking-[-0.02em]">天才教授 <span className={dark ? 'text-white/35' : 'text-ink/35'}>/</span> AI 改造局</span>
          </a>
          <nav className={cn('hidden items-center gap-7 text-sm lg:flex', dark ? 'text-white/60' : 'text-ink/62')} aria-label="主导航">
            {navigation.map((item) => (
              <a key={item.href} className={cn('transition', dark ? 'hover:text-white' : 'hover:text-ink')} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <a href="/audit" className={cn(buttonVariants({ size: 'lg' }), 'hidden h-10 rounded-full bg-accent px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,73,230,.2)] hover:bg-accent-strong sm:inline-flex')}>
            做一次流程体检
            <ArrowRight className="size-4" />
          </a>
        </div>
      </header>
      <a href="/audit" className="fixed bottom-4 left-4 right-4 z-50 flex h-13 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-semibold text-white shadow-[0_14px_40px_rgba(15,42,120,.28)] sm:hidden">
        体检我的流程 <ArrowRight className="size-4" />
      </a>
    </>
  );
}
