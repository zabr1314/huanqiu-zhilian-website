import type { Metadata } from 'next';
import { AigcStudio } from '@/components/aigc-studio';

export const metadata: Metadata = {
  title: 'AIGC 内容增长工厂 Demo｜天才教授 AI 改造局',
  description: '从商品事实到 Listing、商品图、短视频、多语言审核与发布交接的可交互 AIGC 内容流水线。',
};

export default function ContentFactoryDemoPage() {
  return <AigcStudio />;
}
