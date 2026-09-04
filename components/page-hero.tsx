import type { ReactNode } from 'react';

export function PageHero({ eyebrow, title, description, aside }: { eyebrow: string; title: string; description: string; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="blueprint-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-16 lg:grid-cols-[1fr_.55fr] lg:px-10 lg:py-24">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.18em] text-accent"><span className="h-px w-8 bg-accent" />{eyebrow}</p>
          <h1 className="mt-7 max-w-4xl text-[clamp(2.7rem,6vw,6.3rem)] font-semibold leading-[.98] tracking-[-.065em] text-ink">{title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-ink/60 lg:text-xl">{description}</p>
        </div>
        {aside && <div className="flex items-end">{aside}</div>}
      </div>
    </section>
  );
}
