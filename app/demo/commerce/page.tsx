import type { Metadata } from 'next';
import { DemoDashboard, type DemoInitialState } from '@/components/demo-dashboard';
import {
  demoChannels,
  demoModules,
  demoPeriods,
  demoRoles,
  type DemoChannel,
  type DemoModuleId,
  type DemoPeriod,
  type DemoRole,
} from '@/lib/cross-border-demo';

export const metadata: Metadata = {
  title: '跨境经营驾驶舱 Demo｜天才教授 AI 改造局',
  description: '用合成数据体验跨境电商销售利润、广告、库存、履约、退款、供应商、回款与账号风险如何变成可执行任务。',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const roleDefaultModule: Record<DemoRole, DemoModuleId> = {
  owner: 'overview',
  operator: 'ads',
  supply: 'inventory',
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CommerceDemoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const rawRole = first(params.role);
  const role = (demoRoles.some((item) => item.id === rawRole) ? rawRole : 'owner') as DemoRole;
  const rawModule = first(params.module);
  const moduleId = (
    demoModules.some((item) => item.id === rawModule)
      ? rawModule
      : rawModule === undefined
        ? roleDefaultModule[role]
        : 'overview'
  ) as DemoModuleId;
  const rawChannel = first(params.channel);
  const channel = (demoChannels.some((item) => item.id === rawChannel) ? rawChannel : 'all') as DemoChannel;
  const rawPeriod = first(params.period);
  const period = (demoPeriods.some((item) => item.id === rawPeriod) ? rawPeriod : '30d') as DemoPeriod;

  const initialState: DemoInitialState = { role, moduleId, channel, period };
  return <DemoDashboard initialState={initialState} />;
}
