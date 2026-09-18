'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  AudioLines,
  ChartNoAxesCombined,
  Compass,
  Layers3,
  ScanLine,
  ShoppingBag,
} from 'lucide-react';

const departments = [
  {
    name: '选品',
    en: 'RESEARCH',
    detail: '市场洞察 · 商品机会',
    icon: Compass,
    x: '-16px',
    y: '-12px',
    rotation: '-5deg',
  },
  {
    name: '内容',
    en: 'CREATIVE',
    detail: '品牌视觉 · 多语言内容',
    icon: Layers3,
    x: '-18px',
    y: '10px',
    rotation: '-4deg',
  },
  {
    name: '运营',
    en: 'OPERATIONS',
    detail: '店铺任务 · 业务衔接',
    icon: ShoppingBag,
    x: '15px',
    y: '-14px',
    rotation: '5deg',
  },
  {
    name: '营销',
    en: 'MARKETING',
    detail: '素材策略 · 投放复盘',
    icon: ScanLine,
    x: '18px',
    y: '8px',
    rotation: '4deg',
  },
  {
    name: '客服',
    en: 'SERVICE',
    detail: '知识沉淀 · 服务协作',
    icon: AudioLines,
    x: '-12px',
    y: '16px',
    rotation: '-3deg',
  },
  {
    name: '复盘',
    en: 'INSIGHTS',
    detail: '经营分析 · 行动跟进',
    icon: ChartNoAxesCombined,
    x: '15px',
    y: '16px',
    rotation: '3deg',
  },
];
const paths = [
  'M245 119 H293 Q310 119 310 136 V266 Q310 281 328 281 H352',
  'M272 306 H352',
  'M541 138 H516 Q493 138 493 159 V265 Q493 281 477 281 H456',
  'M568 329 H488 Q478 329 478 313 H456',
  'M290 511 H313 Q329 511 329 491 V351 Q329 334 346 334 H352',
  'M522 525 H497 Q478 525 478 506 V352 Q478 334 459 334 H456',
];

export function DepartmentTransformation({ onBrief }: { onBrief: () => void }) {
  const art = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const reveal = () => {
      setAssembled(true);
      observer?.disconnect();
    };
    if (motion.matches || !('IntersectionObserver' in window)) reveal();
    else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) reveal();
        },
        { threshold: 0.25 },
      );
      if (art.current) observer.observe(art.current);
    }
    const onMotionChange = () => {
      if (motion.matches) reveal();
    };
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <section
      id="agent-studio"
      className="department-section"
      aria-labelledby="department-title"
    >
      <div className="studio-container">
        <div className="department-layout">
          <div className="department-copy">
            <p className="studio-kicker">02 / AI FOR YOUR TEAM</p>
            <h2 id="department-title">
              让整个部门，
              <br />
              <span>协同进化。</span>
            </h2>
            <p className="department-description">
              从业务流程到人机协作，
              <br />
              为跨境电商部门构建 AI 工作方式。
            </p>
            <button className="department-contact" onClick={onBrief}>
              梳理部门需求
              <span>
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </span>
            </button>
            <p className="department-signature" aria-hidden="true">
              HUMAN DIRECTION.
              <br />
              CONNECTED INTELLIGENCE.
            </p>
          </div>

          <figure
            className="department-figure"
            aria-label="跨境电商部门协作示意：团队掌握决策，Agent 连接选品、内容、运营、营销、客服与复盘。"
          >
            <div className="department-art-heading" aria-hidden="true">
              <span>ONE TEAM. CONNECTED.</span>
              <span>01 — 06</span>
            </div>
            <div
              ref={art}
              className={`department-art${assembled ? ' is-assembled' : ''}`}
            >
              <div className="department-plane">
                <svg
                  className="department-connections"
                  viewBox="0 0 800 620"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <g className="department-traces">
                    {paths.map((d) => (
                      <path key={d} d={d} pathLength="1" />
                    ))}
                  </g>
                  <g className="department-signals">
                    {paths.map((d, index) => (
                      <path
                        key={d}
                        d={d}
                        pathLength="1"
                        style={
                          {
                            '--signal-delay': `${0.7 + index * 0.08}s`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </g>
                </svg>
                <div className="department-core">
                  <span className="department-core-label">HUMAN × AI</span>
                  <div className="department-core-mark" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>协作中枢</strong>
                  <span className="department-core-rule">
                    团队决策
                    <br />
                    Agent 执行
                  </span>
                </div>
                <ul className="department-nodes">
                  {departments.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li
                        key={item.en}
                        className={`department-node department-node-${index}`}
                        style={
                          {
                            '--node-x': item.x,
                            '--node-y': item.y,
                            '--node-r': item.rotation,
                            '--node-delay': `${index * 0.065}s`,
                          } as CSSProperties
                        }
                      >
                        <div className="department-node-top">
                          <span>
                            0{index + 1} / {item.en}
                          </span>
                          <Icon
                            size={17}
                            strokeWidth={1.3}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="department-node-content">
                          {index === 1 && (
                            <Image
                              src="/works/sage-tailoring/4.webp"
                              alt=""
                              width={70}
                              height={80}
                              sizes="70px"
                              className="department-node-image"
                            />
                          )}
                          <div>
                            <h3>{item.name}</h3>
                            <p>
                              {item.detail.split(' · ').map((detail) => (
                                <span key={detail}>{detail}</span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <figcaption>
              <span className="department-caption-line" aria-hidden="true" />
              业务协作示意 · 按企业流程设计
            </figcaption>
          </figure>
        </div>
        <div className="department-service-line">
          <p>把 AI，落到每一天的工作里。</p>
          <ul aria-label="部门改造服务">
            <li>流程梳理</li>
            <li>Agent 搭建</li>
            <li>系统衔接</li>
            <li>团队落地</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
