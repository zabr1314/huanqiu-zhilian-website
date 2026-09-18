'use client';

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  AudioLines,
  ChartNoAxesCombined,
  Compass,
  Layers3,
  ScanLine,
  ShoppingBag,
  X,
} from 'lucide-react';

const departments = [
  {
    name: '选品',
    title: '把市场线索，变成选品依据。',
    context:
      '结合目标市场、竞品资料与可用的成本、库存数据，建立团队共同使用的商品评估标准。',
    flow: ['需求线索', '商品评估', '团队选定', '小批量验证'],
    agent:
      '汇总需求与评论中的问题，比较产品差异和成本条件，标注资料来源与待验证假设。',
    output: '候选商品对比表、机会摘要与测试建议。',
    human: '确认供应条件、利润测算与采购决策。',
    handoff: '将确认的商品卖点与测试要求交给内容、运营。',
    en: 'RESEARCH',
    detail: '市场洞察 · 商品机会',
    icon: Compass,
    x: '-16px',
    y: '-12px',
    rotation: '-5deg',
  },
  {
    name: '内容',
    title: '从商品卖点，到成套品牌内容。',
    context:
      '围绕商品资料、品牌规范和目标市场，衔接 AIGC 创作、多语言表达与素材管理。',
    flow: ['商品资料', '创作任务', '内容制作', '审核归档'],
    agent:
      '整理创作简报，准备多语言文案与图像、视频任务，按渠道规格组织素材与版本。',
    output: '创作简报、多语言内容草案与渠道素材包。',
    human: '核对商品真实性、品牌表达与最终发布素材。',
    handoff: '把审核通过的内容交给运营与营销，反馈用于下一轮创作。',
    en: 'CREATIVE',
    detail: '品牌视觉 · 多语言内容',
    icon: Layers3,
    x: '-18px',
    y: '10px',
    rotation: '-4deg',
  },
  {
    name: '运营',
    title: '让商品信息与店铺任务有序衔接。',
    context:
      '以商品主档、平台规则和店铺数据为基础，梳理从上架准备到日常维护的重复工作。',
    flow: ['商品主档', '上架检查', '确认发布', '异常跟进'],
    agent:
      '按平台字段整理资料、识别缺项；依据约定规则检查库存与订单异常，生成可追踪的待办。',
    output: '上架资料包、商品维护清单与异常待办。',
    human: '确认发布、价格调整、库存处理与补货安排。',
    handoff: '衔接内容版本与客服问题，让商品修改有记录、有负责人。',
    en: 'OPERATIONS',
    detail: '店铺任务 · 业务衔接',
    icon: ShoppingBag,
    x: '15px',
    y: '-14px',
    rotation: '5deg',
  },
  {
    name: '营销',
    title: '让每轮测试，都能指导下一次创作。',
    context:
      '结合目标受众、素材版本和可用的投放数据，建立从测试计划到反馈任务的工作流程。',
    flow: ['测试假设', '素材组合', '表现分析', '调整任务'],
    agent:
      '按受众、卖点与渠道组织测试方案，对比同一统计口径下的表现，提出待验证的调整建议。',
    output: '素材测试计划、表现摘要与内容修改任务。',
    human: '决定预算、投放范围、测试取舍与执行节奏。',
    handoff: '将验证结果反馈给内容与选品，保留素材版本和测试记录。',
    en: 'MARKETING',
    detail: '素材策略 · 投放复盘',
    icon: ScanLine,
    x: '18px',
    y: '8px',
    rotation: '4deg',
  },
  {
    name: '客服',
    title: '让常见问题有依据，复杂问题有人接。',
    context:
      '基于产品知识、售后规则与获准使用的订单信息，设计回复辅助与人工交接流程。',
    flow: ['问题识别', '知识检索', '回复审核', '反馈沉淀'],
    agent:
      '检索相关知识并起草回复；按问题类型分流，整理订单背景与历史沟通，方便人工接手。',
    output: '回复草稿、异常工单与产品问题清单。',
    human: '处理退款、赔付、特殊承诺及知识库未覆盖的问题。',
    handoff: '把反复出现的产品与描述问题反馈给选品、内容和运营。',
    en: 'SERVICE',
    detail: '知识沉淀 · 服务协作',
    icon: AudioLines,
    x: '-12px',
    y: '16px',
    rotation: '-3deg',
  },
  {
    name: '复盘',
    title: '把经营数据，变成下一步行动。',
    context:
      '对齐销售、成本、投放与售后数据的统计口径，让各岗位围绕同一份经营事实讨论。',
    flow: ['数据对齐', '异常归纳', '团队研判', '行动跟进'],
    agent:
      '按固定周期汇总数据，关联异常与执行记录，区分事实和推测，整理改进假设及待办。',
    output: '经营复盘报告、问题清单与跨部门行动表。',
    human: '判断原因，确定改进优先级、负责人和验收标准。',
    handoff: '跟进上轮行动结果，再进入下一轮选品、内容与运营计划。',
    en: 'INSIGHTS',
    detail: '经营分析 · 行动跟进',
    icon: ChartNoAxesCombined,
    x: '15px',
    y: '16px',
    rotation: '3deg',
  },
];
const overview = {
  name: '部门协作',
  en: 'CONNECTED TEAM',
  title: '从一条流程开始，连接整个部门。',
  context:
    '围绕现有岗位、业务系统与工作规范，设计适合团队的 Agent 分工与协作方式。',
  flow: ['流程诊断', '小范围试点', '系统衔接', '团队落地'],
  agent:
    '先梳理任务、资料和岗位交接，再设计 Agent 工作流、知识库与系统连接，明确异常如何交给人处理。',
  output: '流程方案、可执行工作流、使用规范与团队培训。',
  human: '掌握关键决策、审批权限和业务验收，持续完善工作规则。',
  handoff: '围绕同一份业务信息协作，让各岗位的产出成为下一环节的输入。',
};

type DepartmentDetail = typeof overview;
function DepartmentDetailContent({
  item,
  number,
}: {
  item: DepartmentDetail;
  number: string;
}) {
  return (
    <>
      <div className="department-detail-heading">
        <span>
          {number} / {item.en}
        </span>
        <strong>{item.name}</strong>
      </div>
      <h3>{item.title}</h3>
      <p className="department-detail-context">{item.context}</p>
      <ol className="department-detail-flow" aria-label="工作流程">
        {item.flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <dl className="department-detail-facts">
        <div>
          <dt>{item.en === 'CONNECTED TEAM' ? '改造方式' : 'Agent 工作'}</dt>
          <dd>{item.agent}</dd>
        </div>
        <div>
          <dt>交付成果</dt>
          <dd>{item.output}</dd>
        </div>
        <div>
          <dt>团队把关</dt>
          <dd>{item.human}</dd>
        </div>
      </dl>
      <p className="department-detail-handoff">
        <span>岗位衔接</span>
        {item.handoff}
      </p>
    </>
  );
}

const paths = [
  'M245 119 H293 Q310 119 310 136 V266 Q310 281 328 281 H352',
  'M272 306 H352',
  'M541 138 H516 Q493 138 493 159 V265 Q493 281 477 281 H456',
  'M568 329 H488 Q478 329 478 313 H456',
  'M290 511 H313 Q329 511 329 491 V351 Q329 334 346 334 H352',
  'M522 525 H497 Q478 525 478 506 V352 Q478 334 459 334 H456',
];

// Phone coordinates follow the portrait composition, without shrinking the labels.
const portraitPaths = [
  'M151 73 H166 Q178 73 178 86 V210 Q178 226 160 226 H126',
  'M112 249 H126',
  'M218 96 H201 Q190 96 190 112 V211 Q190 226 205 226 H234',
  'M248 264 H234',
  'M94 390 V355 Q94 338 111 338 H146 Q160 338 160 320 V295',
  'M279 409 V366 Q279 348 263 348 H217 Q202 348 202 331 V295',
];

function DepartmentConnections({
  selected,
  portrait = false,
}: {
  selected: number | null;
  portrait?: boolean;
}) {
  const connections = portrait ? portraitPaths : paths;
  return (
    <svg
      className={`department-connections department-connections-${portrait ? 'portrait' : 'wide'}`}
      viewBox={portrait ? '0 0 360 520' : '0 0 800 620'}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <g className="department-traces">
        {connections.map((d, index) => (
          <path
            key={d}
            d={d}
            pathLength="1"
            className={selected === index ? 'is-selected' : undefined}
          />
        ))}
      </g>
      <g className="department-signals">
        {connections.map((d, index) => (
          <path
            key={d}
            d={d}
            pathLength="1"
            style={
              { '--signal-delay': `${0.7 + index * 0.08}s` } as CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}

export function DepartmentTransformation({ onBrief }: { onBrief: () => void }) {
  const art = useRef<HTMLDivElement>(null);
  const mobileDetail = useRef<HTMLDivElement>(null);
  const revealDetail = useRef(false);
  const [assembled, setAssembled] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [revealRevision, setRevealRevision] = useState(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  const select = (index: number | null, reveal = false) => {
    clearHover();
    revealDetail.current = reveal;
    if (reveal) setRevealRevision((revision) => revision + 1);
    setSelected(index);
    setHasInteracted(true);
  };
  const preview = (index: number | null, pointerType: string) => {
    clearHover();
    const focused = document.activeElement;
    if (
      focused instanceof HTMLElement &&
      focused.classList.contains('department-node-trigger') &&
      focused.matches(':focus-visible')
    )
      return;
    if (
      pointerType === 'mouse' &&
      window.matchMedia('(min-width: 1001px) and (hover: hover)').matches
    )
      hoverTimer.current = setTimeout(() => {
        setSelected(index);
        setHasInteracted(true);
      }, 180);
  };
  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    [],
  );
  const activeItem = selected === null ? overview : departments[selected];
  useLayoutEffect(() => {
    if (
      !hasInteracted ||
      !revealDetail.current ||
      !window.matchMedia('(max-width: 1000px)').matches
    )
      return;
    revealDetail.current = false;
    const frame = requestAnimationFrame(() => {
      const detail = mobileDetail.current;
      if (!detail) return;
      const rect = detail.getBoundingClientRect();
      if (rect.top > window.innerHeight - 180) {
        window.scrollTo({
          top: window.scrollY + rect.top - window.innerHeight * 0.45,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'instant'
            : 'smooth',
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hasInteracted, selected, revealRevision]);
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
            <p className="department-mobile-intro">
              从业务流程到人机协作，
              <br />
              为跨境电商部门构建 AI 工作方式。
            </p>
            <output className="sr-only" aria-live="polite">
              {hasInteracted
                ? `已选择${activeItem.name}：${activeItem.title}`
                : ''}
            </output>
            <div
              className="department-detail-stack"
              role="region"
              id="department-detail-desktop"
              aria-label="部门改造详细介绍"
            >
              {[overview, ...departments].map((item, index) => {
                const active = selected === (index === 0 ? null : index - 1);
                return (
                  <article
                    key={item.en}
                    className={`department-detail${active ? ' is-active' : ''}`}
                    aria-hidden={!active}
                  >
                    <DepartmentDetailContent
                      item={item}
                      number={index === 0 ? '00' : `0${index}`}
                    />
                  </article>
                );
              })}
            </div>
            <button className="department-contact" onClick={onBrief}>
              梳理部门需求
              <span>
                <ArrowUpRight size={19} strokeWidth={1.5} />
              </span>
            </button>
          </div>

          <figure
            className="department-figure"
            aria-label="跨境电商部门协作示意：团队掌握决策，Agent 连接选品、内容、运营、营销、客服与复盘。"
          >
            <div className="department-art-heading" aria-hidden="true">
              <span>ONE TEAM. CONNECTED.</span>
              <span className="department-explore-hint">选择模块查看介绍</span>
            </div>
            <div
              ref={art}
              tabIndex={-1}
              className={`department-art${assembled ? ' is-assembled' : ''}`}
            >
              <div className="department-plane">
                <DepartmentConnections selected={selected} />
                <DepartmentConnections selected={selected} portrait />
                <div
                  className={`department-core${selected === null ? ' is-selected' : ''}`}
                >
                  <button
                    type="button"
                    className="department-node-trigger"
                    aria-label="了解整个部门的协作方式"
                    aria-pressed={selected === null}
                    aria-controls={
                      hasInteracted
                        ? 'department-detail-desktop department-detail-mobile'
                        : 'department-detail-desktop'
                    }
                    onPointerEnter={(e) => preview(null, e.pointerType)}
                    onPointerLeave={clearHover}
                    onFocus={(e) => {
                      if (e.currentTarget.matches(':focus-visible'))
                        select(null);
                    }}
                    onClick={() => select(null, true)}
                  />
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
                        className={`department-node department-node-${index}${selected === index ? ' is-selected' : ''}`}
                        style={
                          {
                            '--node-x': item.x,
                            '--node-y': item.y,
                            '--node-r': item.rotation,
                            '--node-delay': `${index * 0.065}s`,
                          } as CSSProperties
                        }
                      >
                        <button
                          type="button"
                          className="department-node-trigger"
                          aria-label={`了解${item.name}部门改造`}
                          aria-pressed={selected === index}
                          aria-controls={
                            hasInteracted
                              ? 'department-detail-desktop department-detail-mobile'
                              : 'department-detail-desktop'
                          }
                          onPointerEnter={(e) => preview(index, e.pointerType)}
                          onPointerLeave={clearHover}
                          onFocus={(e) => {
                            if (e.currentTarget.matches(':focus-visible'))
                              select(index);
                          }}
                          onClick={() => select(index, true)}
                        />
                        <div className="department-node-top">
                          <span>
                            0{index + 1}
                            <span className="department-node-en">
                              {' '}
                              / {item.en}
                            </span>
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
              服务范围示意 · 工具与数据接入按企业授权确定
            </figcaption>
            <div
              ref={mobileDetail}
              id="department-detail-mobile"
              className="department-mobile-detail"
              hidden={!hasInteracted}
            >
              <button
                type="button"
                className="department-detail-close"
                onClick={() => {
                  clearHover();
                  setHasInteracted(false);
                  setSelected(null);
                  art.current?.focus({ preventScroll: true });
                  art.current?.scrollIntoView({
                    block: 'center',
                    behavior: window.matchMedia(
                      '(prefers-reduced-motion: reduce)',
                    ).matches
                      ? 'instant'
                      : 'smooth',
                  });
                }}
              >
                收起介绍
                <X size={16} aria-hidden="true" />
              </button>
              <article
                className="department-detail is-active"
                key={activeItem.en}
                aria-label={`${activeItem.name}改造详细介绍`}
              >
                <DepartmentDetailContent
                  item={activeItem}
                  number={selected === null ? '00' : `0${selected + 1}`}
                />
              </article>
            </div>
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
