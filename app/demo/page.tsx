import { DemoDashboard } from '@/components/demo-dashboard';
import { SiteHeader } from '@/components/site-header';

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#090d14] text-white">
      <SiteHeader dark />
      <DemoDashboard />
    </main>
  );
}
