'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BrandFilmDialog } from '@/components/featured-brand-work';
import { SelectedPortfolio } from '@/components/portfolio';
import { CreativeCanvasHero } from '@/components/creative-canvas-hero';
import { DepartmentTransformation } from '@/components/department-transformation';
import {
  Aperture,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  ImageIcon,
  Menu,
  PackageCheck,
  Play,
  ScanLine,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const works = [
  {
    title: '暮色里的，一点光。',
    category: '场景视觉',
    ratio: '16:9',
    image: '/aigc/lantern-campsite-16x9.png',
    alt: '露营灯湖畔暮色场景概念图',
    description:
      '湖面、暮色与一盏暖光。用冷暖对比，把便携照明放进值得向往的周末场景。',
    use: '品牌主视觉 / 商品详情页',
    note: '以场景建立情绪，保留灯体的材质与光线层次。',
  },
  {
    title: '让细节，有说服力。',
    category: '商品视觉',
    ratio: '4:5',
    image: '/aigc/lantern-catalog-4x5.png',
    alt: '浅灰背景的露营灯商品概念图',
    description:
      '干净背景与柔和侧光，把注意力留给灯体、提手和材质。让商品本身成为画面中心。',
    use: '商品介绍 / 目录展示',
    note: '通过光线与构图突出商品细节，示意素材仍需与实物核对。',
  },
  {
    title: '让目光，多停留一秒。',
    category: '社交创意',
    ratio: '9:16',
    image: '/aigc/lantern-social-9x16.png',
    alt: '蓝色背景与橙色光轨中的露营灯竖版概念图',
    description:
      '蓝色空间、橙色光轨与暖光主体。用鲜明的色彩关系，探索竖屏内容的视觉表现。',
    use: '社交封面 / 竖版广告',
    note: '为竖屏重新组织视觉重心，并为后续文案保留空间。',
  },
] as const;
const steps = [
  {
    id: 'facts',
    title: '读懂商品',
    subtitle: '整理资料与可用事实',
    icon: ScanLine,
    file: '商品资料卡',
    action: '从规格表中整理可用参数，保留每项信息的来源。',
  },
  {
    id: 'brief',
    title: '形成创意',
    subtitle: '明确受众与表达方向',
    icon: Sparkles,
    file: '创意简报',
    action: '结合目标市场和使用场景，把商品特点转成创意方向。',
  },
  {
    id: 'assets',
    title: '组织内容',
    subtitle: '图像、文案与视频分镜',
    icon: ImageIcon,
    file: '内容产物',
    action: '围绕同一简报组织图片、文案与分镜，供团队挑选和修改。',
  },
  {
    id: 'review',
    title: '检查修订',
    subtitle: '核对参数与品牌表达',
    icon: FileCheck2,
    file: '事实检查示例',
    action: '将草稿中的产品承诺与资料逐项对照，标出需要修订的内容。',
  },
  {
    id: 'handoff',
    title: '交付归档',
    subtitle: '汇总产物与审核状态',
    icon: PackageCheck,
    file: '交付清单',
    action: '整理文案、素材与分镜，明确还需要由谁完成最终确认。',
  },
] as const;
const facts = [
  ['电池容量', '2200mAh', '规格表示例'],
  ['实测续航', '4–8 小时', '测试报告示例'],
  ['防护等级', 'IPX4', '检测报告示例'],
  ['商品重量', '280g', '商品资料示例'],
  ['充电接口', 'USB-C 输入', '说明书示例'],
  ['照明档位', '三档亮度', '测试报告示例'],
];
const shotList = [
  ['0–2s', '暗处亮起', '建立产品轮廓'],
  ['2–5s', '磁吸固定', '演示灵活摆放'],
  ['5–8s', '悬挂照明', '进入帐篷场景'],
  ['8–11s', '切换亮度', '展示三档明暗'],
  ['11–13s', '商品近景', '呈现资料参数'],
  ['13–15s', '营地收束', '回到使用情境'],
];

function saveText(name: string, content: string) {
  const url = URL.createObjectURL(
    new Blob([content], { type: 'text/markdown;charset=utf-8' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function CreativeHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mode, setMode] = useState('process');
  const [selectedWork, setSelectedWork] = useState(0);
  const [step, setStep] = useState(0);
  const [revised, setRevised] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefType, setBriefType] = useState<'department' | 'creative'>(
    'department',
  );
  const [briefText, setBriefText] = useState('');
  const [briefSaved, setBriefSaved] = useState(false);
  const activeStep = steps[step];
  const navigateToProcess = () => {
    setMode('process');
    setMenuOpen(false);
  };
  const jumpToProcess = () => {
    setLightbox(null);
    setMode('process');
    setStep(2);
    window.setTimeout(() => {
      document.getElementById('content-example')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
      document.getElementById('process-tab')?.focus({ preventScroll: true });
    }, 120);
  };
  return (
    <main className="studio-home" id="top">
      <a className="studio-skip" href="#selected-work">
        跳到作品与演示
      </a>
      <header className="studio-header">
        <a className="studio-brand" href="/" aria-label="天才教授首页">
          <Aperture aria-hidden="true" />
          <span>
            天才教授<small>AI CREATIVE & SYSTEMS</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="/works">作品</a>
          <a href="#agent-studio" onClick={navigateToProcess}>
            AI 部门改造
          </a>
          <a href="#about-studio">关于我们</a>
        </nav>
        <div className="header-end">
          <a className="studio-contact" href="#contact-studio">
            探讨合作
            <ArrowUpRight size={16} />
          </a>
          <button
            className="studio-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="studio-mobile-navigation"
            aria-label={menuOpen ? '关闭导航' : '打开导航'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="studio-mobile-nav"
            id="studio-mobile-navigation"
            aria-label="手机导航"
          >
            <a href="/works" onClick={() => setMenuOpen(false)}>
              作品
              <ArrowUpRight size={16} />
            </a>
            <a href="#agent-studio" onClick={navigateToProcess}>
              AI 部门改造
              <ArrowUpRight size={16} />
            </a>
            <a href="#about-studio" onClick={() => setMenuOpen(false)}>
              关于我们
              <ArrowUpRight size={16} />
            </a>
            <a href="#contact-studio" onClick={() => setMenuOpen(false)}>
              探讨合作
              <ArrowUpRight size={16} />
            </a>
          </nav>
        )}
      </header>
      <CreativeCanvasHero
        onFilmOpen={() => setFilmOpen(true)}
        onAgent={navigateToProcess}
      />
      <SelectedPortfolio />
      <DepartmentTransformation
        onBrief={() => {
          setBriefType('department');
          setBriefSaved(false);
          setBriefOpen(true);
        }}
      >
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(String(value))}
          className="case-explorer"
        >
          <div className="explorer-top">
            <div className="explorer-project">
              <span className="project-monogram">R</span>
              <div>
                <strong>R08 / TRAILBEAM</strong>
                <span>预设流程演示 · 露营灯内容项目</span>
              </div>
            </div>
            <TabsList className="explorer-tabs" aria-label="案例展示方式">
              <TabsTrigger value="work">
                <ImageIcon size={16} />
                看作品
              </TabsTrigger>
              <TabsTrigger value="process" id="process-tab">
                <Workflow size={16} />
                看执行过程
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="work" className="explorer-work">
            <button
              className={`explorer-art art-${selectedWork}`}
              onClick={() => setLightbox(selectedWork)}
              aria-label={`放大${works[selectedWork].category}`}
            >
              <Image
                key={selectedWork}
                src={works[selectedWork].image}
                alt={works[selectedWork].alt}
                fill
                sizes="(min-width: 800px) 60vw, 100vw"
              />
              <span className="work-open">
                <ArrowUpRight size={20} />
              </span>
            </button>
            <div className="explorer-selection">
              <p className="studio-kicker">CREATIVE OUTPUT</p>
              <h3>
                一个商品，
                <br />
                不同的内容语境。
              </h3>
              <div className="art-options" aria-label="选择作品">
                {works.map((work, i) => (
                  <button
                    key={work.image}
                    aria-pressed={selectedWork === i}
                    onClick={() => setSelectedWork(i)}
                  >
                    <span>0{i + 1}</span>
                    <div>
                      <strong>{work.category}</strong>
                      <small>{work.use}</small>
                    </div>
                    <ArrowUpRight size={17} />
                  </button>
                ))}
              </div>
              <p className="art-note">{works[selectedWork].note}</p>
              <button
                className="text-action"
                onClick={() => {
                  setMode('process');
                  document.getElementById('process-tab')?.focus();
                }}
              >
                看看背后的工作
                <ArrowRight size={17} />
              </button>
            </div>
          </TabsContent>
          <TabsContent value="process" className="explorer-process">
            <div className="process-sidebar">
              <p className="process-sidebar-label">任务 / 准备北美上市内容</p>
              <div className="process-steps" aria-label="任务步骤">
                {steps.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      aria-pressed={step === i}
                      onClick={() => setStep(i)}
                    >
                      <span className="step-index">0{i + 1}</span>
                      <Icon size={19} />
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.subtitle}</small>
                      </span>
                      <ChevronRight size={16} />
                    </button>
                  );
                })}
              </div>
              <div className="process-label">
                <span />
                交互演示 · 预设流程
              </div>
            </div>
            <div className="process-panel">
              <div className="process-panel-heading">
                <div>
                  <span>产物 0{step + 1} / 05</span>
                  <h3>{activeStep.file}</h3>
                </div>
                <activeStep.icon size={24} />
              </div>
              <p className="process-action">{activeStep.action}</p>
              {step === 0 && (
                <>
                  <div className="facts-document">
                    <div className="document-label">
                      <FileText size={17} />
                      <span>R08 TRAILBEAM MINI</span>
                      <small>演示资料</small>
                    </div>
                    <dl>
                      {facts.map(([label, value, source]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                          <span>{source}</span>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="panel-footnote">
                    此处的规格与来源名称均为虚构示例，不代表真实检测或认证。
                  </p>
                </>
              )}
              {step === 1 && (
                <div className="brief-document">
                  <span className="document-overline">
                    CREATIVE BRIEF / 北美秋季露营季
                  </span>
                  <h4>把光，带进自然。</h4>
                  <p>让一盏便携灯，成为周末出走时的陪伴。</p>
                  <dl>
                    <div>
                      <dt>目标人群</dt>
                      <dd>周末露营与房车旅行人群</dd>
                    </div>
                    <div>
                      <dt>表达重点</dt>
                      <dd>轻量便携 · 灵活固定 · 稳定照明</dd>
                    </div>
                    <div>
                      <dt>视觉方向</dt>
                      <dd>暮色中的冷暖对比，真实可感的材质。</dd>
                    </div>
                    <div>
                      <dt>计划产物</dt>
                      <dd>场景图、商品图、社交创意与短视频分镜。</dd>
                    </div>
                  </dl>
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="process-assets">
                    {works.map((work, i) => (
                      <button
                        key={work.image}
                        onClick={() => setLightbox(i)}
                        aria-label={`查看${work.category}`}
                      >
                        <div>
                          <Image
                            src={work.image}
                            alt={work.alt}
                            fill
                            sizes="200px"
                          />
                        </div>
                        <span>
                          {work.category}
                          <ArrowUpRight size={14} />
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="shot-heading">
                    <strong>15 秒短视频分镜</strong>
                    <span>文字方案 · 尚未制作成片</span>
                  </div>
                  <ol className="shot-list">
                    {shotList.map(([time, title, desc]) => (
                      <li key={time}>
                        <time>{time}</time>
                        <strong>{title}</strong>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              {step === 3 && (
                <div className="review-document">
                  <div
                    className="review-switch"
                    role="group"
                    aria-label="选择文案版本"
                  >
                    <button
                      aria-pressed={!revised}
                      onClick={() => setRevised(false)}
                    >
                      查看原稿
                    </button>
                    <button
                      aria-pressed={revised}
                      onClick={() => setRevised(true)}
                    >
                      查看修订稿
                    </button>
                  </div>
                  <div
                    className={`review-result ${revised ? 'is-revised' : ''}`}
                  >
                    <span className="review-status">
                      {revised
                        ? '示例问题已修订 · 待人工审核'
                        : '发现 2 处资料不支持的声明'}
                    </span>
                    <h4>TrailBeam Mini Camping Lantern</h4>
                    <p>
                      {revised
                        ? 'IPX4 Water-Resistant · 4–8 Hour Runtime'
                        : 'IPX7 Waterproof · 12-Hour Runtime'}
                    </p>
                  </div>
                  <div className="review-comparison">
                    <div>
                      <span>防护等级</span>
                      <s>IPX7</s>
                      <ArrowRight size={15} />
                      <strong>IPX4</strong>
                    </div>
                    <div>
                      <span>续航时间</span>
                      <s>12 小时</s>
                      <ArrowRight size={15} />
                      <strong>4–8 小时</strong>
                    </div>
                  </div>
                  <p className="panel-footnote">
                    此处切换预设版本，演示核对逻辑。正式发布前需确认商品资料与最终文案。
                  </p>
                </div>
              )}
              {step === 4 && (
                <div className="handoff-document">
                  <div className="handoff-summary">
                    <PackageCheck size={28} />
                    <div>
                      <strong>R08 内容包样例</strong>
                      <span>整理完成，待最终人工审核</span>
                    </div>
                  </div>
                  <ul>
                    {[
                      '商品资料卡与创意简报',
                      '3 张概念图片的资源链接',
                      '修订后的英文商品文案',
                      '15 秒分镜与审核说明',
                    ].map((item) => (
                      <li key={item}>
                        <Check size={17} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="studio-button blue"
                    href="/downloads/r08-content-example.zip"
                    download
                  >
                    下载内容包样例
                    <Download size={17} />
                  </a>
                  <p className="panel-footnote">
                    包含说明文档与 3 张概念图片；未接入店铺或发布渠道。
                  </p>
                </div>
              )}
              <div className="process-pagination">
                <span>0{step + 1} / 05</span>
                <div>
                  <button
                    aria-label="上一步"
                    disabled={step === 0}
                    onClick={() => setStep(step - 1)}
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <button
                    disabled={step === 4}
                    onClick={() => setStep(step + 1)}
                  >
                    {step === 4 ? '已到最后一步' : '下一步'}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
          <div className="explorer-bottom">
            <span>概念案例 · 预生成素材与流程演示</span>
            <a href="/demo/content-factory">
              打开完整工作台
              <ArrowUpRight size={15} />
            </a>
          </div>
        </Tabs>
      </DepartmentTransformation>
      <section id="about-studio" className="studio-container studio-about">
        <div>
          <p className="studio-kicker">03 / OUR PRACTICE</p>
          <h2>
            把创意与执行，
            <br />
            放在同一张工作台。
          </h2>
          <p className="about-copy">
            我们以 AIGC 为品牌创作影像与商品视觉， 以 AI Agent
            帮助跨境电商部门改造日常工作。
            <br />
            <br />
            从一件作品的表达，到一个部门的协作，
            把创意能力与系统落地带进你的业务。
          </p>
        </div>
        <div className="practice-list">
          <a href="#selected-work">
            <span>01</span>
            <div>
              <h3>AIGC 创意</h3>
              <p>商品视觉、场景表达与品牌内容。</p>
            </div>
            <ArrowUpRight size={21} />
          </a>
          <a href="#agent-studio" onClick={navigateToProcess}>
            <span>02</span>
            <div>
              <h3>跨境电商部门 AI 改造</h3>
              <p>流程梳理、Agent 搭建与团队落地。</p>
            </div>
            <ArrowUpRight size={21} />
          </a>
        </div>
      </section>
      <footer id="contact-studio" className="studio-footer">
        <div className="studio-container">
          <div className="footer-main">
            <div>
              <p className="studio-kicker">LET’S BUILD SOMETHING</p>
              <h2>
                从你的下一件作品，
                <br />
                或一次部门改造开始。
              </h2>
            </div>
            <div>
              <p>
                说说你想创作的内容，
                <br />
                或团队最想改变的工作。
              </p>
              <button
                className="studio-button light"
                onClick={() => setBriefOpen(true)}
              >
                梳理合作需求
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
          <div className="studio-footer-bottom">
            <span>© 2026 天才教授</span>
            <span>AIGC 创意 · 跨境电商部门 AI 改造</span>
            <div>
              <a href="/demo">
                更多交互样板
                <ArrowUpRight size={14} />
              </a>
              <a href="#top">
                回到顶部
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent className="studio-lightbox" showCloseButton={false}>
          {lightbox !== null && (
            <>
              <DialogClose className="lightbox-close" aria-label="关闭作品">
                <X size={23} />
              </DialogClose>
              <div className="lightbox-art">
                <Image
                  src={works[lightbox].image}
                  alt={works[lightbox].alt}
                  fill
                  sizes="(min-width:800px) 70vw,100vw"
                />
              </div>
              <div className="lightbox-info">
                <p className="studio-kicker">R08 / CREATIVE CONCEPT</p>
                <DialogTitle className="lightbox-title">
                  {works[lightbox].title}
                </DialogTitle>
                <DialogDescription className="lightbox-description">
                  {works[lightbox].description}
                </DialogDescription>
                <dl>
                  <div>
                    <dt>内容形式</dt>
                    <dd>
                      {works[lightbox].category} · {works[lightbox].ratio}
                    </dd>
                  </div>
                  <div>
                    <dt>应用方向</dt>
                    <dd>{works[lightbox].use}</dd>
                  </div>
                  <div>
                    <dt>项目性质</dt>
                    <dd>自主概念 · AI 生成示意素材</dd>
                  </div>
                </dl>
                <button className="studio-button dark" onClick={jumpToProcess}>
                  查看制作过程
                  <Workflow size={17} />
                </button>
                <a
                  href={works[lightbox].image}
                  download
                  className="text-action"
                >
                  下载概念原图
                  <Download size={16} />
                </a>
                <div className="lightbox-pager">
                  <button
                    aria-label="上一张作品"
                    onClick={() => setLightbox((lightbox + 2) % 3)}
                  >
                    <ArrowLeft size={19} />
                  </button>
                  <span>0{lightbox + 1} / 03</span>
                  <button
                    aria-label="下一张作品"
                    onClick={() => setLightbox((lightbox + 1) % 3)}
                  >
                    <ArrowRight size={19} />
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <BrandFilmDialog open={filmOpen} onOpenChange={setFilmOpen} />
      <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
        <DialogContent className="studio-brief-dialog" showCloseButton={false}>
          <DialogClose className="brief-close" aria-label="关闭项目简报">
            <X size={22} />
          </DialogClose>
          <p className="studio-kicker">START WITH A BRIEF</p>
          <DialogTitle className="brief-dialog-title">
            先把想法，写清楚。
          </DialogTitle>
          <DialogDescription>
            {briefType === 'department'
              ? '写下团队分工、现有工具和最想改善的流程。下载需求简报，用于后续沟通。'
              : '写下品牌、商品、目标市场和期望作品。下载需求简报，用于后续沟通。'}
          </DialogDescription>
          <fieldset className="brief-service-options">
            <legend>你想聊哪一类合作？</legend>
            <label>
              <input
                type="radio"
                name="brief-service"
                value="department"
                checked={briefType === 'department'}
                onChange={() => {
                  setBriefType('department');
                  setBriefSaved(false);
                }}
              />
              部门 AI 改造
            </label>
            <label>
              <input
                type="radio"
                name="brief-service"
                value="creative"
                checked={briefType === 'creative'}
                onChange={() => {
                  setBriefType('creative');
                  setBriefSaved(false);
                }}
              />
              AIGC 创意
            </label>
          </fieldset>
          <label htmlFor="project-brief">
            {briefType === 'department' ? '你的团队与流程' : '你的创意项目'}
          </label>
          <textarea
            id="project-brief"
            value={briefText}
            maxLength={4000}
            onChange={(event) => {
              setBriefText(event.target.value);
              setBriefSaved(false);
            }}
            placeholder={
              briefType === 'department'
                ? '例如：我们的跨境团队分为运营、设计和客服。目前商品信息需要反复同步，客服反馈也很难传回选品端。希望先梳理这些交接，再搭建适合团队的 Agent 工作流。'
                : '例如：我们有一个包袋品牌，希望制作一支品牌短片，以及用于海外市场的模特图与商品视觉。'
            }
            rows={6}
          />
          <div className="brief-privacy">
            <span>内容仅保留在当前页面，不会提交。</span>
            <span>{briefText.length}/4000</span>
          </div>
          <button
            className="studio-button dark"
            disabled={!briefText.trim()}
            onClick={() => {
              saveText(
                briefType === 'department'
                  ? '部门AI改造需求简报.md'
                  : 'AIGC创意需求简报.md',
                `# ${briefType === 'department' ? '部门 AI 改造需求简报' : 'AIGC 创意需求简报'}\n\n${briefText.trim()}\n\n## 沟通时可补充\n${briefType === 'department' ? '- 团队岗位与分工\n- 业务平台与现有工具\n- 重复任务和交接问题\n- 希望先改造的流程\n- 成功标准、时间与预算范围' : '- 品牌、商品与现有资料\n- 目标人群和市场\n- 期望作品与交付形式\n- 时间与预算范围'}\n`,
              );
              setBriefSaved(true);
            }}
          >
            下载项目简报
            <Download size={17} />
          </button>
          <p role="status" className="brief-save-status">
            {briefSaved ? '简报已生成，浏览器已开始下载。' : ''}
          </p>
        </DialogContent>
      </Dialog>
    </main>
  );
}
