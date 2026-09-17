'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SelectedWorkCard } from '@/components/selected-work-card';
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  featuredWorks,
  findWork,
  portfolioWorks,
  workCategories,
  type PortfolioWork,
  type WorkImage,
} from '@/lib/portfolio';

export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <a className="studio-brand" href="/" aria-label="天才教授首页">
        <Aperture aria-hidden="true" />
        <span>
          天才教授<small>AI CREATIVE & SYSTEMS</small>
        </span>
      </a>
      <nav aria-label="作品导航">
        <a href="/works">作品</a>
        <a href="/#agent-studio">AI Agents</a>
        <a href="/#contact-studio">
          探讨合作 <ArrowUpRight size={15} />
        </a>
      </nav>
    </header>
  );
}

function WorkCard({ work, index }: { work: PortfolioWork; index: number }) {
  return (
    <a
      className={`portfolio-card portfolio-card-${work.slug}`}
      href={`/works/${work.slug}`}
    >
      <div className="portfolio-card-image">
        <Image
          src={work.cover.src}
          alt={work.cover.alt}
          fill
          style={{
            objectFit: [
              'sage-tailoring',
              'ivory-tailoring',
              'twenty-four',
            ].includes(work.slug)
              ? 'contain'
              : 'cover',
          }}
          sizes="(min-width: 1440px) 630px, (min-width: 700px) 45vw, 100vw"
        />
        <span className="portfolio-card-type">{work.category}</span>
        {work.video && (
          <span className="portfolio-card-duration">
            <Play size={12} fill="currentColor" aria-hidden="true" />
            {work.video.duration}
          </span>
        )}
      </div>
      <div className="portfolio-card-copy">
        <span className="portfolio-number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3>
            {work.title}
            <span>{work.subtitle}</span>
          </h3>
          <p>{work.label}</p>
        </div>
        <ArrowUpRight
          className="portfolio-card-arrow"
          size={23}
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

export function SelectedPortfolio() {
  return (
    <section
      className="studio-container portfolio-selected selected-editorial"
      id="selected-work"
      aria-labelledby="selected-title"
    >
      <div className="studio-section-heading">
        <div>
          <p className="studio-kicker">01 / SELECTED WORK</p>
          <h2 id="selected-title">精选作品</h2>
          <p className="selected-introduction">
            品牌影像、商品视觉与叙事探索。
          </p>
        </div>
        <a className="portfolio-text-link" href="/works">
          浏览全部作品 <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="portfolio-grid">
        {featuredWorks.map((work, index) => (
          <SelectedWorkCard key={work.slug} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}

export function WorkLibrary() {
  const [category, setCategory] =
    useState<(typeof workCategories)[number]>('全部');
  const shown = portfolioWorks.filter(
    (work) => category === '全部' || work.category === category,
  );
  return (
    <>
      <div
        className="portfolio-filters"
        role="group"
        aria-label="按作品类型筛选"
      >
        {workCategories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="portfolio-result-count" role="status">
        {shown.length} 个项目与系列
      </p>
      <div className="portfolio-grid">
        {shown.map((work) => (
          <WorkCard
            key={work.slug}
            work={work}
            index={portfolioWorks.indexOf(work)}
          />
        ))}
      </div>
    </>
  );
}

function WorkGallery({
  images,
  title,
}: {
  images: WorkImage[];
  title: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : images[selected];
  const move = (delta: number) =>
    setSelected((value) =>
      value === null ? null : (value + delta + images.length) % images.length,
    );
  return (
    <>
      <div className="portfolio-gallery">
        {images.map((photo, index) => (
          <button
            type="button"
            key={photo.src}
            className={`portfolio-gallery-item ${photo.height > photo.width ? 'is-portrait' : ''}`}
            onClick={() => setSelected(index)}
            aria-label={`放大：${photo.caption}`}
          >
            <div>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 800px) 45vw, 100vw"
              />
              <span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </div>
            <p>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {photo.caption}
            </p>
          </button>
        ))}
      </div>
      <Dialog
        open={current !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="portfolio-lightbox"
          showCloseButton={false}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              move(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
        >
          {current && (
            <>
              <div className="portfolio-lightbox-heading">
                <div>
                  <DialogTitle>{current.caption}</DialogTitle>
                  <DialogDescription>{title}</DialogDescription>
                </div>
                <DialogClose
                  className="portfolio-icon-button"
                  aria-label="关闭大图"
                >
                  <X size={22} />
                </DialogClose>
              </div>
              <div className="portfolio-lightbox-stage">
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                />
              </div>
              <div className="portfolio-lightbox-pager">
                <button
                  type="button"
                  className="portfolio-icon-button"
                  onClick={() => move(-1)}
                  aria-label="上一张"
                >
                  <ArrowLeft size={20} />
                </button>
                <span aria-live="polite">
                  {String(selected! + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="portfolio-icon-button"
                  onClick={() => move(1)}
                  aria-label="下一张"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function WorkVideo({ work }: { work: PortfolioWork }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (playing) player.current?.focus({ preventScroll: true });
  }, [playing]);
  if (!work.video) return null;
  const poster = work.video.poster ?? work.cover.src;
  return (
    <div
      className={`portfolio-film ${work.video.portrait ? 'portfolio-film-portrait' : ''}`}
    >
      {playing ? (
        <video
          ref={player}
          tabIndex={0}
          controls
          autoPlay
          playsInline
          preload="metadata"
          src={work.video.src}
          poster={poster}
          aria-label={`${work.title}完整影片`}
          onError={() => setFailed(true)}
        />
      ) : (
        <button
          type="button"
          className="portfolio-film-cover"
          onClick={() => setPlaying(true)}
          aria-label={`播放${work.title}完整影片`}
        >
          <Image
            src={poster}
            alt={work.cover.alt}
            width={work.video.portrait ? 1080 : work.cover.width}
            height={work.video.portrait ? 1440 : work.cover.height}
            priority={!work.video.portrait}
            sizes={
              work.video.portrait
                ? '(min-width: 600px) 450px, 90vw'
                : '(min-width: 1440px) 1200px, 100vw'
            }
          />
          <span className="portfolio-film-play">
            <Play size={23} fill="currentColor" aria-hidden="true" />
            <span>
              观看完整影片<small>{work.video.duration}</small>
            </span>
          </span>
        </button>
      )}
      {failed && (
        <p role="alert">
          暂时无法在页面内播放。
          <a href={work.video.src} target="_blank" rel="noopener noreferrer">
            单独打开影片
          </a>
        </p>
      )}
    </div>
  );
}

export function WorkDetail({ work }: { work: PortfolioWork }) {
  const related = work.related
    .map(findWork)
    .filter((item): item is PortfolioWork => !!item);
  return (
    <>
      <header className="portfolio-detail-heading">
        <a href="/works" className="portfolio-back">
          <ArrowLeft size={17} />
          全部作品
        </a>
        <p className="studio-kicker">{work.label}</p>
        <h1>{work.title}</h1>
        <p className="portfolio-detail-subtitle">{work.subtitle}</p>
      </header>
      {work.video && !work.video.portrait && <WorkVideo work={work} />}
      <section className="portfolio-project-intro" aria-label="作品介绍">
        <p>{work.description}</p>
        <ul>
          {work.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="portfolio-series" aria-labelledby="series-heading">
        <div className="portfolio-section-title">
          <span>VISUAL SERIES</span>
          <h2 id="series-heading">{work.galleryTitle}</h2>
        </div>
        <WorkGallery title={work.title} images={work.images} />
      </section>
      {work.video?.portrait && (
        <section className="portfolio-motion">
          <div>
            <p className="studio-kicker">IN MOTION</p>
            <h2>让造型，动起来。</h2>
            <p>从静态成图，延伸到完整的动态展示。</p>
          </div>
          <WorkVideo work={work} />
        </section>
      )}
      <section className="portfolio-related" aria-labelledby="related-heading">
        <div className="portfolio-section-title">
          <span>MORE TO EXPLORE</span>
          <h2 id="related-heading">继续看作品</h2>
        </div>
        <div className="portfolio-grid">
          {related.map((item, index) => (
            <WorkCard work={item} index={index} key={item.slug} />
          ))}
        </div>
      </section>
    </>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <div>
        <p>有一个想实现的项目？</p>
        <a href="/#contact-studio">
          从这里开始 <ArrowUpRight size={23} />
        </a>
      </div>
      <span>© 2026 天才教授 · AIGC 创意与 AI Agent 系统</span>
    </footer>
  );
}
