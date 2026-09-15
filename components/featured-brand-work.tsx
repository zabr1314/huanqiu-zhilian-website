'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const mediaRoot = '/works/shanxia-yousong';
const posters = [
  {
    image: 'poster-landscape.png',
    title: '编织日常',
    format: '横版视觉 / 4:3',
    width: 1448,
    height: 1086,
    alt: '山下有松横版海报：窗边的白衣人物与编织手袋，主题为编织日常',
  },
  {
    image: 'poster-portrait.png',
    title: '把日子，一点点收好',
    format: '竖版视觉 / 3:4',
    width: 1086,
    height: 1448,
    alt: '山下有松竖版海报：自然光中的人物与编织手袋，主题为把日子一点点收好',
  },
] as const;

export function BrandFilmDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) setFailed(false);
      }}
    >
      <DialogContent className="brand-film-dialog" showCloseButton={false}>
        <div className="brand-dialog-heading">
          <div>
            <DialogTitle>山下有松 · 慢一点</DialogTitle>
            <DialogDescription>品牌片 / 完整作品</DialogDescription>
          </div>
          <DialogClose className="brand-dialog-close" aria-label="关闭品牌片">
            <X size={22} />
          </DialogClose>
        </div>
        {open && (
          <video
            className="brand-film-player"
            src={`${mediaRoot}/film.mp4`}
            poster={`${mediaRoot}/film-poster.jpg`}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label="山下有松《慢一点》品牌片完整播放"
            onError={() => setFailed(true)}
          />
        )}
        {failed && (
          <p className="brand-video-error" role="alert">
            影片暂时无法在此播放，请尝试单独打开影片。
          </p>
        )}
        <a
          className="brand-film-direct"
          href={`${mediaRoot}/film.mp4`}
          onClick={() => onOpenChange(false)}
          target="_blank"
          rel="noopener noreferrer"
        >
          单独打开影片
          <ArrowUpRight size={14} />
        </a>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturedBrandWork({ onPlay }: { onPlay: () => void }) {
  const [posterIndex, setPosterIndex] = useState<number | null>(null);
  const poster = posterIndex === null ? null : posters[posterIndex];
  return (
    <>
      <section
        id="selected-work"
        className="studio-work studio-container brand-feature"
      >
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">01 / SELECTED WORK</p>
            <h2>慢一点，感受多一点。</h2>
          </div>
          <p>
            山下有松《慢一点》
            <br />
            品牌片与平面视觉作品
          </p>
        </div>
        <button
          className="brand-film-cover"
          onClick={onPlay}
          aria-label="播放山下有松《慢一点》完整品牌片"
        >
          <Image
            src={`${mediaRoot}/film-poster.jpg`}
            alt="山下有松《慢一点》品牌片画面"
            fill
            sizes="(min-width: 1440px) 1320px, 100vw"
          />
          <span className="brand-cover-shade" />
          <span className="brand-play">
            <Play size={28} fill="currentColor" strokeWidth={1} />
            <span>观看完整品牌片</span>
          </span>
          <span className="brand-film-label">
            <span>SHANXIA YOUSONG</span>
            <strong>慢一点。</strong>
            <span>品牌影像 / BRAND FILM</span>
          </span>
        </button>
        <div className="brand-project-notes">
          <h3>
            山下有松
            <br />
            <span>《慢一点》</span>
          </h3>
          <p>
            把日常的松弛，写进品牌的画面。
            <br />
            从一支品牌片，到两幅平面表达，让人物、材质与生活气息相互呼应。
          </p>
          <div>
            <span>品牌影像</span>
            <span>平面视觉</span>
          </div>
        </div>
        <div className="brand-posters-heading">
          <p className="studio-kicker">THE VISUAL SERIES</p>
          <span>同一份气质，两种画幅。</span>
        </div>
        <div className="brand-posters">
          {posters.map((item, index) => (
            <button
              className="brand-poster"
              key={item.image}
              onClick={() => setPosterIndex(index)}
              aria-label={`放大海报：${item.title}`}
            >
              <div className="brand-poster-image">
                <Image
                  src={`${mediaRoot}/${item.image}`}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes={
                    index === 0
                      ? '(min-width: 800px) 58vw, 100vw'
                      : '(min-width: 800px) 32vw, 100vw'
                  }
                />
                <span className="brand-poster-open">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="brand-poster-caption">
                <h3>{item.title}</h3>
                <span>{item.format}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <Dialog
        open={poster !== null}
        onOpenChange={(value) => {
          if (!value) setPosterIndex(null);
        }}
      >
        <DialogContent className="brand-poster-dialog" showCloseButton={false}>
          {poster && (
            <>
              <div className="brand-dialog-heading">
                <div>
                  <DialogTitle>{poster.title}</DialogTitle>
                  <DialogDescription>
                    山下有松 · {poster.format}
                  </DialogDescription>
                </div>
                <DialogClose
                  className="brand-dialog-close"
                  aria-label="关闭海报"
                >
                  <X size={22} />
                </DialogClose>
              </div>
              <div className="brand-poster-full">
                <Image
                  src={`${mediaRoot}/${poster.image}`}
                  alt={poster.alt}
                  width={poster.width}
                  height={poster.height}
                  sizes="90vw"
                />
              </div>
              <div className="brand-poster-pager">
                <button
                  aria-label="上一张海报"
                  onClick={() => setPosterIndex((posterIndex! + 1) % 2)}
                >
                  <ArrowLeft size={19} />
                </button>
                <span>0{posterIndex! + 1} / 02</span>
                <button
                  aria-label="下一张海报"
                  onClick={() => setPosterIndex((posterIndex! + 1) % 2)}
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
