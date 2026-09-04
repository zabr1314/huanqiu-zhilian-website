import { Suspense } from 'react';
import { AuditFlow } from '@/components/audit-flow';
import { SiteHeader } from '@/components/site-header';

export default async function AuditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const process = typeof params.process === 'string' ? params.process : '';
  const attribution = {
    source: typeof params.utm_source === 'string' ? params.utm_source : '',
    campaign: typeof params.utm_campaign === 'string' ? params.utm_campaign : '',
  };
  return (
    <main className="min-h-screen bg-[#090d14] text-white">
      <SiteHeader dark />
      <Suspense fallback={<div className="mx-auto max-w-4xl px-5 py-20 text-white/50">正在打开流程体检…</div>}>
        <AuditFlow initialProcess={process} attribution={attribution} />
      </Suspense>
    </main>
  );
}
