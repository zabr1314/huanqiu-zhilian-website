import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { DemoHub } from '@/components/demo-hub';

export const metadata: Metadata = {
  title: 'AI 样板中心｜天才教授 AI 改造局',
  description: '亲手体验跨境经营驾驶舱与 AIGC 内容工厂，查看业务数据、系统判断、人工闸门和交付结果如何连成一条流程。',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const legacyKeys = ['module', 'role', 'channel', 'period'] as const;

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  if (legacyKeys.some((key) => params[key] !== undefined)) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      const firstValue = Array.isArray(value) ? value[0] : value;
      if (firstValue) query.set(key, firstValue);
    });
    redirect(`/demo/commerce?${query.toString()}`);
  }

  return <DemoHub />;
}
