'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Bot, Users, Files } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const areas = [
  {
    id: 'research',
    name: '市场与选品',
    caption: '找到值得投入的方向',
    question: '把分散的市场信息，变成可以讨论的选品依据。',
    agent: ['整理市场资料与用户反馈', '归纳需求、竞品差异与待验证机会'],
    team: ['判断商品与供应链可行性', '确定选品方向与投入优先级'],
    outputs: ['机会清单', '竞品对照与来源记录'],
    input: '市场资料 · 竞品信息 · 用户反馈',
    next: '选品结论进入商品资料与内容简报',
  },
  {
    id: 'content',
    name: '商品与内容',
    caption: '让商品信息成为内容',
    question: '让商品资料、品牌要求与多语言内容沿着同一份简报协作。',
    agent: ['整理商品事实与品牌要求', '组织图像、视频与多语言文案草稿'],
    team: ['把关商品准确性与品牌表达', '确认素材版本与发布内容'],
    outputs: ['商品资料库', '内容素材与审核记录'],
    input: '商品资料 · 品牌规范 · 目标市场',
    next: '确认后的内容交给店铺与营销团队',
  },
  {
    id: 'operations',
    name: '店铺与运营',
    caption: '把重复工作组织起来',
    question: '让商品检查、运营待办和异常处理有清楚的交接。',
    agent: ['检查商品资料与页面信息', '汇总运营待办，标出异常与缺项'],
    team: ['决定上架、促销与库存处理', '确认例外情况的处理方式'],
    outputs: ['运营任务清单', '异常记录与处理跟进'],
    input: '商品信息 · 店铺数据 · 运营规则',
    next: '运营变化同步给营销与客服环节',
  },
  {
    id: 'marketing',
    name: '营销与投放',
    caption: '从素材走向持续测试',
    question: '把素材表现带回下一轮创意，让内容与投放相互反馈。',
    agent: ['整理素材与投放表现', '提出创意方向与测试方案'],
    team: ['制定预算与投放策略', '确认测试方案与上线动作'],
    outputs: ['素材测试计划', '表现分析与创意简报'],
    input: '投放数据 · 素材版本 · 营销目标',
    next: '测试结论回到内容生产与经营复盘',
  },
  {
    id: 'support',
    name: '客服与售后',
    caption: '让经验进入每一次服务',
    question: '把产品知识和处理经验，带到咨询、回复与问题交接中。',
    agent: ['分类咨询，检索知识并起草回复', '识别需要转交的问题，整理上下文'],
    team: ['处理退款、争议与特殊承诺', '维护服务规则与知识准确性'],
    outputs: ['客服知识库与回复草稿', '问题转交与处理记录'],
    input: '产品知识 · 服务规则 · 咨询记录',
    next: '常见问题反馈给商品与运营团队',
  },
  {
    id: 'insights',
    name: '经营与复盘',
    caption: '让数据成为下一步行动',
    question: '把各环节的数据与问题汇总起来，形成有负责人、有后续的行动。',
    agent: ['按约定口径整理业务数据', '提示异常，汇总并追踪行动项'],
    team: ['确认指标口径与经营判断', '决定改进动作与资源分配'],
    outputs: ['经营摘要与复盘报告', '责任人与行动清单'],
    input: '业务数据 · 工作记录 · 阶段目标',
    next: '改进动作分配回相应岗位与流程',
  },
];

const delivery = [
  [
    '梳理现状',
    '盘点岗位、任务与工具，选出值得优先改造的流程。',
    '流程图与改造优先级',
  ],
  [
    '设计与搭建',
    '明确人机分工，按实际环境连接知识、数据与工具。',
    'Agent 工作流与协作规则',
  ],
  [
    '小范围试运行',
    '在真实任务中检查质量、用时与异常处理，再逐步扩大范围。',
    '试运行记录与修订方案',
  ],
  [
    '交接与迭代',
    '把使用方式、维护责任和复盘机制交给团队。',
    '操作说明与团队培训',
  ],
];

export function DepartmentTransformation({
  children,
  onBrief,
}: {
  children: ReactNode;
  onBrief: () => void;
}) {
  const [area, setArea] = useState('research');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px)');
    const update = () =>
      setOrientation(mobile.matches ? 'horizontal' : 'vertical');
    update();
    mobile.addEventListener('change', update);
    return () => mobile.removeEventListener('change', update);
  }, []);
  return (
    <section
      id="agent-studio"
      className="department-section"
      aria-labelledby="department-title"
    >
      <div className="studio-container">
        <div className="department-heading">
          <div>
            <p className="studio-kicker">02 / AI FOR YOUR TEAM</p>
            <h2 id="department-title">
              让 AI，进入
              <br />
              整个部门的日常。
            </h2>
          </div>
          <div className="department-intro">
            <p>
              为跨境电商部门设计并落地 AI 工作方式。
              <br />
              从岗位任务、业务流程到系统衔接，
              <br className="department-desktop-break" />
              让人和 Agent 各司其职、共同推进业务。
            </p>
            <button className="department-text-link" onClick={onBrief}>
              梳理部门需求 <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        <Tabs
          orientation={orientation}
          value={area}
          onValueChange={(value) => setArea(String(value))}
          className="department-map"
        >
          <div className="department-map-top">
            <span>跨境电商 / 部门协作图</span>
            <span>业务场景示意</span>
          </div>
          <div className="department-map-body">
            <TabsList
              className="department-tabs"
              aria-label="选择部门业务环节"
              variant="line"
            >
              {areas.map((item, index) => (
                <TabsTrigger
                  value={item.id}
                  key={item.id}
                  className="department-tab"
                >
                  <span className="department-tab-number">0{index + 1}</span>
                  <span>{item.name}</span>
                  <ArrowUpRight size={16} />
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="department-panels">
              {areas.map((item) => (
                <TabsContent
                  value={item.id}
                  key={item.id}
                  className="department-panel"
                >
                  <div className="department-panel-title">
                    <span>{item.caption}</span>
                    <h3>{item.name}</h3>
                    <p>{item.question}</p>
                  </div>
                  <div className="department-roles">
                    <div>
                      <div className="department-role-label">
                        <Bot size={20} />
                        <h4>Agent 承担</h4>
                      </div>
                      <ul>
                        {item.agent.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="department-role-label">
                        <Users size={20} />
                        <h4>团队决定</h4>
                      </div>
                      <ul>
                        {item.team.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="department-output">
                      <div className="department-role-label">
                        <Files size={20} />
                        <h4>留下的成果</h4>
                      </div>
                      <ul>
                        {item.outputs.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="department-handoff">
                    <div>
                      <span>从这里开始</span>
                      <p>{item.input}</p>
                    </div>
                    <ArrowRight size={19} aria-hidden="true" />
                    <div>
                      <span>接到下一环</span>
                      <p>{item.next}</p>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
          <div className="department-foundation">
            <span>贯穿整个部门</span>
            <p>
              共享业务资料<span>/</span>明确权限与审核<span>/</span>
              保留任务与交接记录
            </p>
          </div>
        </Tabs>
        <p className="department-scope-note">
          以上展示可设计的任务分工；具体改造范围与系统接入，以你的业务流程和现有工具为准。
        </p>

        <div className="department-delivery">
          <div className="department-delivery-heading">
            <h3>从流程梳理，到团队用起来。</h3>
            <p>从一个关键流程切入，逐步连成部门的工作方式。</p>
          </div>
          <ol>
            {delivery.map(([title, description, output], index) => (
              <li key={title}>
                <span className="department-delivery-number">0{index + 1}</span>
                <h4>{title}</h4>
                <p>{description}</p>
                <span className="department-delivery-output">{output}</span>
              </li>
            ))}
          </ol>
          <button className="studio-button dark" onClick={onBrief}>
            准备改造需求 <ArrowUpRight size={18} />
          </button>
        </div>

        <Accordion className="department-example" id="content-example">
          <AccordionItem value="content-demo">
            <AccordionTrigger className="department-example-trigger">
              <span>
                <span className="department-example-label">
                  一个具体切面 / 商品与内容
                </span>
                <strong>看看商品资料，如何走到内容交付。</strong>
              </span>
            </AccordionTrigger>
            <AccordionContent className="department-example-content">
              <p className="department-example-intro">
                露营灯内容生产示例，展示资料整理、创意、审核与交付的衔接。以下为预设演示，可切换步骤查看产物。
              </p>
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
