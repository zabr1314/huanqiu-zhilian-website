import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDetail } from '@/components/portfolio';
import { findWork, portfolioWorks } from '@/lib/portfolio';

export function generateStaticParams() {
  return portfolioWorks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = findWork(slug);
  return work
    ? {
        title: `${work.title} · ${work.subtitle}｜天才教授`,
        description: work.description,
      }
    : { title: '作品未找到｜天才教授' };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = findWork(slug);
  if (!work) notFound();
  return <WorkDetail work={work} />;
}
