import type { Metadata } from 'next';
import { DemoDashboard } from '@/components/demo-dashboard';

export const metadata: Metadata = {
  title: '跨境电商经营驾驶舱 Demo｜天才教授 AI 改造局',
  description: '用合成数据体验跨境电商销售利润、广告、库存、履约、退款、供应商、回款与账号风险如何变成可执行任务。',
};

export default function DemoPage() {
  return <DemoDashboard />;
}
