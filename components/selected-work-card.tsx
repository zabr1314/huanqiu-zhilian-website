'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import type { PortfolioWork } from '@/lib/portfolio';

const projectCopy: Record<
  string,
  { category: string; title: string; description: string; preview?: string }
> = {
  'china-bank': {
    category: '商业宣传片',
    title: '中国银行 · 海外生活',
    description: '多人物、多场景的业务信息表达',
    preview: '/works/china-bank/preview.mp4',
  },
  'shanxia-yousong': {
    category: '品牌影像与平面',
    title: '山下有松 · 慢一点',
    description: '品牌短片与横竖版海报',
    preview: '/works/shanxia-yousong/preview.mp4',
  },
  'sage-tailoring': {
    category: 'AI 模特与商品视觉',
    title: '浅绿套装',
    description: '多角度服装视觉与动态展示',
  },
  'twenty-four': {
    category: 'AI 叙事短片',
    title: '第二十四张',
    description: '人物关系与情绪的连续叙事',
  },
};

export function SelectedWorkCard({
  work,
  index,
}: {
  work: PortfolioWork;
  index: number;
}) {
  const copy = projectCopy[work.slug];
  const card = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const stop = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setActive(false);
    setPlaying(false);
  };
  const start = (event: PointerEvent<HTMLAnchorElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;
    timer.current = setTimeout(() => setActive(true), 180);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) stop();
      },
      { threshold: 0 },
    );
    if (card.current) observer.observe(card.current);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visibility = () => {
      if (document.hidden) stop();
    };
    motion.addEventListener('change', stop);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', visibility);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const preview =
    copy.preview && active ? (
      <video
        className={`selected-preview ${playing ? 'is-playing' : ''}`}
        src={copy.preview}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-hidden="true"
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        onError={stop}
      />
    ) : null;

  return (
    <a
      ref={card}
      href={`/works/${work.slug}`}
      className={`selected-card selected-${work.slug}${active ? ' is-active' : ''}`}
      onPointerEnter={start}
      onPointerLeave={stop}
      onBlur={stop}
      aria-label={`${copy.title}：${copy.description}，查看完整项目`}
    >
      <div className="selected-art">
        {work.slug === 'china-bank' && (
          <div className="selected-film-image">
            <Image
              src={work.cover.src}
              alt={work.cover.alt}
              fill
              sizes="(min-width: 1440px) 644px, (min-width: 701px) 45vw, 100vw"
            />
            {preview}
            <span className="selected-film-play" aria-hidden="true">
              <Play size={24} strokeWidth={1.3} />
            </span>
          </div>
        )}
        {work.slug === 'shanxia-yousong' && (
          <div className="selected-brand-composition">
            <div className="selected-brand-film">
              <span className="selected-composition-label" aria-hidden="true">
                MOTION / 慢一点
              </span>
              <div className="selected-brand-still">
                <Image
                  src={work.cover.src}
                  alt="《慢一点》品牌片画面"
                  fill
                  sizes="(min-width: 701px) 28vw, 60vw"
                />
                {preview}
                <span className="selected-film-play" aria-hidden="true">
                  <Play size={20} strokeWidth={1.3} />
                </span>
              </div>
              <span className="selected-composition-note" aria-hidden="true">
                把日常，写进品牌的画面。
              </span>
            </div>
            <div className="selected-brand-print">
              <Image
                src="/works/shanxia-yousong/poster-portrait.png"
                alt="山下有松《把日子一点点收好》竖版品牌海报"
                width={1086}
                height={1448}
                sizes="(min-width: 701px) 18vw, 36vw"
              />
            </div>
          </div>
        )}
        {work.slug === 'sage-tailoring' && (
          <div className="selected-fashion-composition">
            <div className="selected-fashion-main">
              <Image
                src="/works/sage-tailoring/4.webp"
                alt="浅绿套装全身造型与拱廊场景"
                fill
                sizes="(min-width: 701px) 30vw, 60vw"
              />
              <Image
                className="selected-fashion-alternate"
                src="/works/sage-tailoring/5.webp"
                alt="浅绿套装腰线与比例近景"
                fill
                sizes="(min-width: 701px) 30vw, 60vw"
              />
            </div>
            <div className="selected-fashion-detail">
              <Image
                src="/works/sage-tailoring/2.webp"
                alt="浅绿套装的面料纹理与领口饰件特写"
                fill
                sizes="(min-width: 701px) 18vw, 36vw"
              />
            </div>
          </div>
        )}
        {work.slug === 'twenty-four' && (
          <div className="selected-story-composition">
            <div className="selected-story-main">
              <Image
                src="/works/twenty-four/still-1.jpg"
                alt="《第二十四张》：取景器里的目光"
                width={992}
                height={432}
                sizes="(min-width: 1440px) 644px, (min-width: 701px) 45vw, 100vw"
              />
            </div>
            <div>
              <Image
                src="/works/twenty-four/cover.jpg"
                alt="《第二十四张》：夕阳中的相处"
                width={992}
                height={432}
                sizes="(min-width: 701px) 23vw, 50vw"
              />
            </div>
            <div>
              <Image
                src="/works/twenty-four/still-3.jpg"
                alt="《第二十四张》：人物关系的回应"
                width={992}
                height={432}
                sizes="(min-width: 701px) 23vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
      <div className="selected-card-meta">
        <span>{copy.category}</span>
        <span className="selected-duration">
          {playing && <span className="selected-preview-label">无声预览</span>}
          <Play size={11} aria-hidden="true" />
          {work.video?.duration}
        </span>
      </div>
      <div className="selected-card-heading">
        <h3>{copy.title}</h3>
        <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <div className="selected-card-description">
        <p>{copy.description}</p>
        {work.slug === 'china-bank' && (
          <span className="selected-client-label">正式客户项目</span>
        )}
      </div>
      <span className="selected-card-number" aria-hidden="true">
        PROJECT / {String(index + 1).padStart(2, '0')}
      </span>
    </a>
  );
}
