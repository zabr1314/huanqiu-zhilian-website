'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BrandFilmDialog } from '@/components/featured-brand-work';
import { SelectedPortfolio } from '@/components/portfolio';
import { CreativeCanvasHero } from '@/components/creative-canvas-hero';
import { DepartmentTransformation } from '@/components/department-transformation';
import {
  StudioCollaboration,
  StudioContact,
  ContactChannels,
} from '@/components/studio-collaboration';
import { Aperture, ArrowUpRight, Download, Menu, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

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
  const [briefOpen, setBriefOpen] = useState(false);
  const [briefType, setBriefType] = useState<'department' | 'creative'>(
    'department',
  );
  const [briefText, setBriefText] = useState('');
  const [briefSaved, setBriefSaved] = useState(false);
  const navigateToAgent = () => setMenuOpen(false);
  return (
    <main className="studio-home" id="top">
      <a className="studio-skip" href="#selected-work">
        跳到精选作品
      </a>
      <header className="studio-header">
        <Link className="studio-brand" href="/" aria-label="天才教授首页">
          <Aperture aria-hidden="true" />
          <span>
            天才教授<small>AI CREATIVE & SYSTEMS</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          <Link href="/works">作品</Link>
          <a href="#agent-studio" onClick={navigateToAgent}>
            AI 部门改造
          </a>
          <a href="#about-studio">合作方式</a>
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
            <Link href="/works" onClick={() => setMenuOpen(false)}>
              作品
              <ArrowUpRight size={16} />
            </Link>
            <a href="#agent-studio" onClick={navigateToAgent}>
              AI 部门改造
              <ArrowUpRight size={16} />
            </a>
            <a href="#about-studio" onClick={() => setMenuOpen(false)}>
              合作方式
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
        onAgent={navigateToAgent}
      />
      <SelectedPortfolio />
      <DepartmentTransformation
        onBrief={() => {
          setBriefType('department');
          setBriefSaved(false);
          setBriefOpen(true);
        }}
      />
      <StudioCollaboration />
      <StudioContact
        onBrief={() => {
          setBriefSaved(false);
          setBriefOpen(true);
        }}
      />
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
              ? '写下团队分工、现有工具和最想改善的流程。可下载为简报，通过微信或邮箱发给我们。'
              : '写下品牌、商品、目标市场和期望作品。可下载为简报，通过微信或邮箱发给我们。'}
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
          <output className="brief-save-status">
            {briefSaved ? '简报已生成。你可以通过下方微信或邮箱发给我们。' : ''}
          </output>
          <div className="brief-contact-channels">
            <p>准备好后，直接联系我们</p>
            <ContactChannels compact />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
