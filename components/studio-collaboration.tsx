'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { studioContact } from '@/lib/studio-contact';

const collaborationPaths = [
  {
    id: '01',
    en: 'CREATIVE PROJECT',
    name: 'AIGC 创意项目',
    intro: '品牌影像、AI 模特与商品视觉',
    steps: [
      {
        name: '明确用途',
        detail: '对齐品牌、目标人群与发布渠道，确定作品形式和交付范围。',
        result: '项目简报',
      },
      {
        name: '确认方向',
        detail: '通过创意方案、视觉参考或关键画面，确认表达与制作标准。',
        result: '创意与视觉方案',
      },
      {
        name: '制作交付',
        detail: '按确认的方案制作、审核与修订，整理约定规格的最终素材。',
        result: '成片与渠道素材',
      },
    ],
  },
  {
    id: '02',
    en: 'TEAM TRANSFORMATION',
    name: '部门 AI 改造',
    intro: '从一项可验证的任务逐步展开',
    steps: [
      {
        name: '梳理流程',
        detail: '了解岗位、现有工具与交接问题，选定值得先改的环节。',
        result: '流程与任务清单',
      },
      {
        name: '验证试点',
        detail: '围绕一项任务明确输入、输出和验收标准，验证工作流。',
        result: '试点工作流',
      },
      {
        name: '衔接系统',
        detail: '按授权接入所需数据与工具，配置审核、异常处理和记录。',
        result: '协作与权限配置',
      },
      {
        name: '验收扩展',
        detail: '用约定任务共同验收，交付操作规范与培训，再决定扩展范围。',
        result: '验收记录与使用规范',
      },
    ],
  },
];

export function StudioCollaboration() {
  return (
    <section
      id="about-studio"
      className="studio-container collaboration-section"
      aria-labelledby="collaboration-title"
    >
      <div className="collaboration-heading">
        <div>
          <p className="studio-kicker">03 / HOW WE WORK</p>
          <h2 id="collaboration-title">
            从一个明确的目标，
            <br />
            开始合作。
          </h2>
        </div>
        <div className="collaboration-intro">
          <p>
            我们以 AIGC 创作品牌内容，
            <br />以 AI Agent 改造团队工作。
          </p>
          <p>
            先把需求、范围和验收标准说清楚，
            <br />
            让每一步都有具体的交付。
          </p>
        </div>
      </div>
      <div className="collaboration-paths">
        {collaborationPaths.map((path) => (
          <article
            className="collaboration-path"
            key={path.id}
            aria-labelledby={`collaboration-path-${path.id}`}
          >
            <div className="collaboration-path-heading">
              <p>
                {path.id} / {path.en}
              </p>
              <h3 id={`collaboration-path-${path.id}`}>{path.name}</h3>
              <span>{path.intro}</span>
            </div>
            <ol
              className="collaboration-steps"
              style={{ '--step-count': path.steps.length } as CSSProperties}
            >
              {path.steps.map((step, index) => (
                <li key={step.name}>
                  <span className="collaboration-step-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h4>{step.name}</h4>
                  <p>{step.detail}</p>
                  <span className="collaboration-delivery">
                    <span>交付</span>
                    {step.result}
                  </span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <div className="collaboration-next">
        <p>带着品牌资料，或一个想改善的工作环节来聊。</p>
        <a href="#contact-studio">
          聊聊你的项目{' '}
          <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function ContactChannels({ compact = false }: { compact?: boolean }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );
  if (!studioContact.wechat && !studioContact.email) return null;

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(studioContact.wechat!);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };
  return (
    <div
      className={`contact-channels${compact ? ' contact-channels-compact' : ''}`}
    >
      {studioContact.wechat && (
        <div className="contact-channel-row">
          <span className="contact-channel-label">商务微信</span>
          <div className="contact-channel-value">
            <span className="contact-wechat-id">{studioContact.wechat}</span>
            <button
              type="button"
              onClick={copyWechat}
              aria-label="复制商务微信号"
            >
              {copyState === 'copied' ? (
                <Check size={17} aria-hidden="true" />
              ) : (
                <Copy size={17} aria-hidden="true" />
              )}
              <span>{copyState === 'copied' ? '已复制' : '复制微信号'}</span>
            </button>
          </div>
          <output className="contact-copy-status">
            {copyState === 'copied'
              ? '微信号已复制，可在微信中搜索添加。'
              : copyState === 'failed'
                ? '请长按或选中微信号复制。'
                : ''}
          </output>
        </div>
      )}
      {studioContact.email && (
        <div className="contact-channel-row">
          <span className="contact-channel-label">商务邮箱</span>
          <a
            className="contact-email"
            href={`mailto:${studioContact.email}?subject=${encodeURIComponent('项目合作咨询｜天才教授')}`}
          >
            <span>{studioContact.email}</span>
            <ArrowUpRight size={21} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

export function StudioContact({ onBrief }: { onBrief: () => void }) {
  const hasContact = Boolean(studioContact.wechat || studioContact.email);
  return (
    <footer
      id="contact-studio"
      className="studio-footer collaboration-contact"
      aria-labelledby="contact-title"
    >
      <div className="studio-container">
        <div className="collaboration-contact-main">
          <div>
            <p className="studio-kicker">LET’S START A CONVERSATION</p>
            <h2 id="contact-title">
              你的下一步，
              <br />
              <span>我们一起想清楚。</span>
            </h2>
            <p className="collaboration-contact-intro">
              一件想做的作品，
              <br />
              一个想改善的工作环节，都可以成为开始。
            </p>
          </div>
          <div className="collaboration-contact-actions">
            <ContactChannels />
            <div className="contact-preparation">
              <p>
                {hasContact
                  ? '可以直接联系，也可以先整理一份项目简报。'
                  : '先写下项目目标、现有资料与期望交付。'}
              </p>
              <button type="button" onClick={onBrief}>
                整理项目简报 <ArrowUpRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="studio-footer-bottom">
          <span>© 2026 天才教授</span>
          <span>AIGC 创意 · 跨境电商部门 AI 改造</span>
          <div>
            <Link href="/demo">更多交互样板</Link>
            <a href="#top">
              回到顶部 <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
