'use client';

import { useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  FileText,
  Layers3,
  Play,
  ScanLine,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const workflow = [
  {
    title: '理解资料',
    label: 'INPUT',
    icon: FileText,
    description: '先整理商品资料与需求，让每项表达都有依据。',
    lines: ['商品信息', '品牌要求', '目标市场'],
  },
  {
    title: '组织创意',
    label: 'CREATE',
    icon: Layers3,
    description: '把需求组织成创意简报，连接图像、文案与分镜。',
    lines: ['视觉方向', '内容草稿', '视频分镜'],
  },
  {
    title: '核对修订',
    label: 'REVIEW',
    icon: ScanLine,
    description: '对照原始资料检查内容，将需要修改的地方交给团队确认。',
    lines: ['事实核对', '表达修订', '人工确认'],
  },
  {
    title: '整理交付',
    label: 'DELIVER',
    icon: Check,
    description: '汇总确认后的内容、素材与版本，形成清楚的交付清单。',
    lines: ['素材归档', '版本记录', '交付清单'],
  },
];

export function CreativeCanvasHero({
  onFilmOpen,
  onAgent,
}: {
  onFilmOpen: () => void;
  onAgent: () => void;
}) {
  const [mode, setMode] = useState('creative');
  const [stage, setStage] = useState(0);
  const field = useRef<HTMLDivElement>(null);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const box = event.currentTarget.getBoundingClientRect();
    field.current?.style.setProperty(
      '--field-x',
      `${((event.clientX - box.left) / box.width - 0.5) * 14}px`,
    );
    field.current?.style.setProperty(
      '--field-y',
      `${((event.clientY - box.top) / box.height - 0.5) * 14}px`,
    );
  };
  const reset = () => {
    field.current?.style.setProperty('--field-x', '0px');
    field.current?.style.setProperty('--field-y', '0px');
  };

  return (
    <section className="canvas-hero" aria-labelledby="hero-title">
      <div className="canvas-hero-inner">
        <div className="canvas-hero-copy">
          <p className="canvas-eyebrow">
            天才教授 <span>/</span> AIGC & AI AGENTS
          </p>
          <h1 id="hero-title">
            让想象<span className="canvas-word">成形</span>。<br />
            让智能<span className="canvas-word second">协作</span>。
          </h1>
          <p className="canvas-hero-description">
            以影像表达品牌，
            <br />以 AI 工作流连接创意与执行。
          </p>
          <div className="canvas-hero-actions">
            <a className="canvas-primary" href="#selected-work">
              探索作品 <ArrowDown size={17} />
            </a>
            <a
              className="canvas-secondary"
              href="#agent-studio"
              onClick={onAgent}
            >
              体验 AI Agent <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="canvas-capabilities">
            <span>品牌影像</span>
            <span>AI 模特与商品视觉</span>
            <span>智能体工作流</span>
          </div>
        </div>

        <Tabs
          value={mode}
          onValueChange={(value) => {
            setMode(String(value));
            reset();
          }}
          className="creative-field"
        >
          <div className="field-toolbar">
            <span className="field-toolbar-label">THE CREATIVE FIELD</span>
            <TabsList className="field-tabs" aria-label="切换首屏能力展示">
              <TabsTrigger value="creative">
                AIGC <span>创意</span>
              </TabsTrigger>
              <TabsTrigger value="workflow">
                AI Agent <span>协作</span>
              </TabsTrigger>
            </TabsList>
          </div>
          <div
            ref={field}
            className="field-stage"
            data-mode={mode}
            onPointerMove={move}
            onPointerLeave={reset}
          >
            <div className="field-guides" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <TabsContent
              value="creative"
              className="field-panel field-creative"
            >
              <span className="field-large-type" aria-hidden="true">
                Create.
              </span>
              <button
                type="button"
                className="field-art field-art-film"
                onClick={onFilmOpen}
                aria-label="观看山下有松《慢一点》品牌片"
              >
                <div className="field-art-image">
                  <Image
                    src="/works/shanxia-yousong/film-poster.jpg"
                    alt="山下有松《慢一点》品牌影像"
                    width={1920}
                    height={1080}
                    priority
                    sizes="(max-width: 700px) 65vw, 380px"
                  />
                  <span className="field-play">
                    <Play size={17} fill="currentColor" />
                  </span>
                </div>
                <span className="field-art-caption">
                  <span>01 / 品牌影像</span>
                  <ArrowUpRight size={14} />
                </span>
              </button>
              <a
                className="field-art field-art-model"
                href="/works/sage-tailoring"
                aria-label="查看浅绿套装 AI 模特系列"
              >
                <div className="field-art-image">
                  <Image
                    src="/works/sage-tailoring/4.webp"
                    alt="暖光拱廊中的浅绿套装 AI 模特"
                    width={1536}
                    height={1152}
                    priority
                    sizes="(max-width: 700px) 35vw, 230px"
                  />
                </div>
                <span className="field-art-caption">
                  <span>02 / AI 模特</span>
                  <ArrowUpRight size={14} />
                </span>
              </a>
              <a
                className="field-art field-art-story"
                href="/works/twenty-four"
                aria-label="查看叙事短片《第二十四张》"
              >
                <div className="field-art-image">
                  <Image
                    src="/works/twenty-four/cover.jpg"
                    alt="《第二十四张》夕阳中的人物与相机"
                    width={992}
                    height={432}
                    sizes="(max-width: 700px) 42vw, 270px"
                  />
                </div>
                <span className="field-art-caption">
                  <span>03 / 叙事短片</span>
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </TabsContent>
            <TabsContent
              value="workflow"
              className="field-panel field-workflow"
            >
              <span className="field-flow-title">从一个想法，到有序交付。</span>
              <svg
                className="field-connections"
                viewBox="0 0 600 440"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M145 128H455V330H145" />
                <path d="m292 122 8 6-8 6M449 223l6 8 6-8M308 324l-8 6 8 6" />
              </svg>
              <div className="field-nodes">
                {workflow.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={`field-node field-node-${index}`}
                      aria-pressed={stage === index}
                      onClick={() => setStage(index)}
                    >
                      <span className="field-node-meta">
                        0{index + 1} / {item.label}
                        <Icon size={17} />
                      </span>
                      <strong>{item.title}</strong>
                      <span className="field-node-lines">
                        {item.lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          </div>
          <div className="field-caption" aria-live="polite" aria-atomic="true">
            {mode === 'creative' ? (
              <>
                <p>想象，可以有很多种样子。</p>
                <span>精选作品 · 点击画框探索</span>
              </>
            ) : (
              <>
                <p>{workflow[stage].description}</p>
                <span>工作流示意 · 点击步骤了解</span>
              </>
            )}
          </div>
        </Tabs>
      </div>
      <div className="canvas-hero-bottom">
        <span>CREATIVE THINKING. CONNECTED SYSTEMS.</span>
        <a href="#selected-work">
          往下，看见更多可能 <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}
