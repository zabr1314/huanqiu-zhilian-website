'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const imageRoot = '/works/ai-model-editorial';
const photographs = [
  {
    file: 'window-bag.png',
    title: '窗边的片刻',
    category: '商品与场景',
    description: '暖光落在编织纹理上，让商品与日常自然相遇。',
    alt: '窗边木桌上的米白编织包，人物手持笔与卡片坐在一旁',
    width: 2048,
    height: 1152,
  },
  {
    file: 'doorway-bag.png',
    title: '带着日常出发',
    category: '商品与场景',
    description: '以自然的背包姿态，呈现商品与人物的比例关系。',
    alt: '白衣人物背着米白色手袋，推开木框玻璃门',
    width: 2048,
    height: 1152,
  },
  {
    file: 'ivory-editorial.png',
    title: '留一点柔软',
    category: '商品与场景',
    description: '浅色穿搭、手袋与窗边光线，组成安静的画面。',
    alt: '窗边坐着的白衣人物与米白手袋，整体为柔和的浅色调',
    width: 2048,
    height: 1152,
  },
  {
    file: 'cafe-portrait.png',
    title: '午后的目光',
    category: '人物与氛围',
    description: '借咖啡馆里的明暗层次，突出人物神态与生活气息。',
    alt: '咖啡馆木桌前手持笔的人物，旁边放着浅色织物手袋',
    width: 2048,
    height: 1152,
  },
  {
    file: 'orange-knit.png',
    title: '街角，一束花',
    category: '人物与氛围',
    description: '橙色针织与白色花束，在街景中留下温暖的色彩。',
    alt: '身穿橙色针织衫的人物站在街角，手中抱着白色花束',
    width: 1536,
    height: 2048,
  },
] as const;

export function ModelEditorial() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : photographs[selected];
  const move = (direction: number) =>
    setSelected((value) =>
      value === null
        ? null
        : (value + direction + photographs.length) % photographs.length,
    );

  function tile(index: number, featured = false) {
    const photo = photographs[index];
    return (
      <button
        className={`model-tile${featured ? ' model-tile-featured' : ''}`}
        onClick={() => setSelected(index)}
        aria-label={`查看 AI 模特作品：${photo.title}`}
      >
        <div className="model-tile-image">
          <Image
            src={`${imageRoot}/${photo.file}`}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={
              featured
                ? '(min-width: 800px) 60vw, 100vw'
                : '(min-width: 800px) 30vw, 100vw'
            }
          />
          <span className="model-image-tag">AI 生成作品</span>
          <span className="model-image-open">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <div className="model-tile-caption">
          <h3>{photo.title}</h3>
          <span>{photo.category}</span>
        </div>
        {featured && (
          <p className="model-feature-description">{photo.description}</p>
        )}
      </button>
    );
  }

  return (
    <>
      <section
        id="model-editorial"
        className="model-editorial studio-container"
        aria-labelledby="model-editorial-title"
      >
        <div className="studio-section-heading">
          <div>
            <p className="studio-kicker">02 / AI MODEL & PRODUCT VISUALS</p>
            <h2 id="model-editorial-title">
              让商品，走进
              <br />
              有吸引力的日常。
            </h2>
          </div>
          <p>
            AI 模特与商品视觉
            <br />
            人物、商品与场景，共同构建品牌的表达。
          </p>
        </div>
        <div className="model-editorial-grid">
          {tile(0, true)}
          <div className="model-editorial-side">
            {tile(1)}
            {tile(2)}
          </div>
        </div>
        <div className="model-editorial-footer">
          <p>模特形象 · 商品搭配 · 生活场景</p>
          <button className="model-view-series" onClick={() => setSelected(0)}>
            查看完整系列<span>05 幅作品</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>
      <Dialog
        open={current !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="model-gallery-dialog"
          showCloseButton={false}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              move(event.key === 'ArrowRight' ? 1 : -1);
            }
          }}
        >
          {current && (
            <>
              <div className="model-gallery-heading">
                <div>
                  <DialogTitle>AI 模特与商品视觉</DialogTitle>
                  <DialogDescription>
                    AI 生成作品 · 商品与场景 / 人物与氛围
                  </DialogDescription>
                </div>
                <DialogClose
                  className="model-gallery-close"
                  aria-label="关闭模特作品系列"
                >
                  <X size={22} />
                </DialogClose>
              </div>
              <div className="model-gallery-stage">
                <Image
                  src={`${imageRoot}/${current.file}`}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  sizes="(min-width: 1200px) 1100px, 96vw"
                />
              </div>
              <div className="model-gallery-caption">
                <div aria-live="polite" aria-atomic="true">
                  <span>{current.category}</span>
                  <h3>{current.title}</h3>
                  <p>{current.description}</p>
                </div>
                <div className="model-gallery-pagination">
                  <button aria-label="上一幅模特作品" onClick={() => move(-1)}>
                    <ArrowLeft size={19} />
                  </button>
                  <span>0{selected! + 1} / 05</span>
                  <button aria-label="下一幅模特作品" onClick={() => move(1)}>
                    <ArrowRight size={19} />
                  </button>
                </div>
              </div>
              <div className="model-gallery-groups" aria-label="选择系列作品">
                {(['商品与场景', '人物与氛围'] as const).map((category) => (
                  <div className="model-gallery-group" key={category}>
                    <p>{category}</p>
                    <div>
                      {photographs.map(
                        (photo, index) =>
                          photo.category === category && (
                            <button
                              key={photo.file}
                              aria-label={`查看${photo.title}`}
                              aria-pressed={selected === index}
                              onClick={() => setSelected(index)}
                            >
                              <Image
                                src={`${imageRoot}/${photo.file}`}
                                alt=""
                                width={photo.width}
                                height={photo.height}
                                sizes="110px"
                              />
                            </button>
                          ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
