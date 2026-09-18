import type { Metadata } from 'next';
import { AigcStudio, type AigcInitialState } from '@/components/aigc-studio';
import { aigcModules, contentChannels, contentLocales, listingVariants, type AigcModuleId } from '@/lib/aigc-demo';

export const metadata: Metadata = {
  title: 'AIGC 内容工厂 Demo｜寰球智联 AI 改造局',
  description: '从商品事实到 Listing、商品图、短视频、多语言审核与发布交接的可交互 AIGC 内容流水线。',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContentFactoryDemoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const rawModule = first(params.task);
  const moduleId = (aigcModules.some((item) => item.id === rawModule) ? rawModule : 'workspace') as AigcModuleId;
  const rawChannel = first(params.channel);
  const channel = contentChannels.some((item) => item.id === rawChannel) ? rawChannel! : 'amazon-us';
  const rawLocale = first(params.lang);
  const locale = contentLocales.some((item) => item.id === rawLocale) ? rawLocale! : 'en-US';
  const rawVariant = first(params.version);
  const variant = listingVariants.some((item) => item.id === rawVariant) ? rawVariant! : 'a';
  const initialState: AigcInitialState = { moduleId, channel, locale, variant };

  return <AigcStudio initialState={initialState} />;
}
