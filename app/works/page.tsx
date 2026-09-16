import type { Metadata } from 'next';
import { WorkLibrary } from '@/components/portfolio';

export const metadata: Metadata = {
  title: '作品集｜天才教授',
  description:
    '品牌宣传片、AI 模特与商品视觉、叙事短片。浏览天才教授的精选项目与视觉系列。',
};

export default function WorksPage() {
  return (
    <>
      <header className="portfolio-library-heading">
        <p className="studio-kicker">SELECTED WORK & EXPLORATIONS</p>
        <h1>想象，有了具体的样子。</h1>
        <p>品牌影像、商品视觉与叙事探索。</p>
      </header>
      <WorkLibrary />
    </>
  );
}
