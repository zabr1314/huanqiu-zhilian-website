'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, CircleAlert, Clock3, Database, ShieldCheck, UsersRound } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const trends = [
  { date: '08-25', gmv: 54200, refund: 6.1 }, { date: '08-26', gmv: 58900, refund: 6.2 }, { date: '08-27', gmv: 55700, refund: 7.1 },
  { date: '08-28', gmv: 61300, refund: 7.1 }, { date: '08-29', gmv: 63800, refund: 7.9 }, { date: '08-30', gmv: 68400, refund: 8.3 }, { date: '08-31', gmv: 66300, refund: 9.2 },
];

const items = [
  {
    id: 'R-01', level: '高风险', tone: 'amber', title: 'R08 便携灯退款率升至 14.5%',
    evidence: '近 7 日售出 186 件、退款 27 件；18 条原因提到“充电不稳定”。',
    source: '订单系统、售后记录、商品资料',
    decision: '样本量超过 30 且退款率高于 28 日基线 2 倍，可能集中在充电组件或特定批次。',
    action: '运营今日核对批次与详情页；采购抽检；老板决定是否暂停加投。',
    gate: '系统不能自行下架商品或停止投放。',
    roles: ['boss', 'ops'],
  },
  {
    id: 'R-02', level: '高风险', tone: 'amber', title: '厂家 JX-03 的 3 个商品同时出现质量类退款',
    evidence: '3 个 SKU 共 352 单，质量类退款 41 单；其他厂家同期退款率为 5.2%。',
    source: '订单系统、厂家档案、退款原因标签',
    decision: '同一厂家 3 个 SKU 同时高于品类基线 1.5 倍，属于厂家级聚集风险。',
    action: '采购索取批次检测结果；运营暂停扩大广告；老板确认是否暂停新采购。',
    gate: '暂停采购及投放必须审批。',
    roles: ['boss', 'ops'],
  },
  {
    id: 'T-03', level: '机会任务', tone: 'blue', title: '126 名客户将在未来 14 天进入复购窗口',
    evidence: '其中高价值客户 38 人，24 人最近 30 天没有跟进记录。',
    source: '历史订单、客户标签、员工跟进记录',
    decision: '按个人历史复购间隔的中位数 ±7 天生成；存在未完成售后的客户自动排除。',
    action: '运营分配未跟进客户；AI 生成草稿；员工确认价格与承诺后发送。',
    gate: '禁止自动群发或自动承诺优惠。',
    roles: ['boss', 'ops', 'staff'],
  },
  {
    id: 'T-04', level: '高优先级', tone: 'blue', title: '12 条客户询盘超过 48 小时未跟进',
    evidence: '超时记录中有 4 条高价值询盘，预计金额合计 ¥28,600。',
    source: '微信客户标签、询盘采集表、跟进日志',
    decision: '超过 48 小时且无有效跟进；预计金额超过 ¥5,000 自动升为高优先级。',
    action: '运营重新分配；一线员工今天联系并填写结果；无法判断报价时升级负责人。',
    gate: 'AI 只起草回复，不可自行报价。',
    roles: ['ops', 'staff'],
  },
  {
    id: 'R-05', level: '中风险', tone: 'blue', title: '23 名高价值客户出现流失信号',
    evidence: '近 90 日累计贡献 ¥64,800；连续 30 天无互动且 60 天无复购。',
    source: '订单系统、客户价值标签、售后记录、互动日志',
    decision: 'RFM 位于前 20% 且触发沉默阈值；未结售后客户不得进入营销触达。',
    action: '先闭环 5 名客户的售后；其余客户分配专属关怀任务，由员工人工联系。',
    gate: '不允许自动批量唤醒。',
    roles: ['ops', 'staff'],
  },
] as const;

const metricsByRole = {
  boss: [['支付金额', '¥428,600', '+12.4%'], ['支付订单', '1,286', '+8.7%'], ['复购订单占比', '31.8%', '+3.6pp'], ['退款订单率', '7.5%', '+1.9pp']],
  ops: [['成交客户', '1,042', '+6.1%'], ['复购窗口', '126 人', '+18 人'], ['待跟进', '38 条', '12 条超时'], ['风险事项', '5 项', '2 项高风险']],
  staff: [['今日待办', '18', '已完成 11'], ['已超时', '3', '需今天处理'], ['待负责人判断', '2', '报价相关'], ['我的完成率', '61%', '+8pp']],
} as const;

export function DemoDashboard() {
  const [role, setRole] = React.useState<'boss' | 'ops' | 'staff'>('boss');
  const filteredItems = items.filter((item) => item.roles.includes(role as never));
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
        <div><a href="/" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white"><ArrowLeft className="size-3.5" />返回官网</a><p className="mt-6 text-xs font-semibold uppercase tracking-[.17em] text-[#7f9eff]">私域经营驾驶舱 · Interactive demo</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.045em] lg:text-5xl">澄屿生活 · 经营总览</h1><p className="mt-3 text-sm text-white/38">演示数据 · 全部为合成数据 · 样本周期 2026-08-25 至 2026-08-31</p></div>
        <Tabs value={role} onValueChange={(value) => setRole(value as typeof role)}><TabsList className="h-auto rounded-xl bg-white/[.06] p-1"><TabsTrigger value="boss" className="h-10 px-4 text-white/55 data-active:bg-white data-active:text-ink">老板视角</TabsTrigger><TabsTrigger value="ops" className="h-10 px-4 text-white/55 data-active:bg-white data-active:text-ink">运营负责人</TabsTrigger><TabsTrigger value="staff" className="h-10 px-4 text-white/55 data-active:bg-white data-active:text-ink">一线员工</TabsTrigger></TabsList></Tabs>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metricsByRole[role].map(([label, value, delta]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><p className="text-xs text-white/38">{label}</p><p className="mt-4 text-2xl font-semibold tracking-[-.04em] lg:text-3xl">{value}</p><p className="mt-3 text-xs text-[#7f9eff]">{delta}</p></div>)}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5 lg:p-6">
          <div className="flex items-start justify-between"><div><p className="font-semibold">增长与质量风险</p><p className="mt-1 text-xs text-white/35">7 日支付金额 / 退款率</p></div><BarChart3 className="size-5 text-[#7f9eff]" /></div>
          <div className="mt-8 grid h-64 grid-cols-7 items-end gap-2 border-b border-white/10 px-1">
            {trends.map((day) => <div key={day.date} className="group relative flex h-full flex-col items-center justify-end gap-2"><span className="absolute top-[calc(100%-var(--refund-y))] z-10 size-2 rounded-full bg-[#ffbd59] shadow-[0_0_0_4px_rgba(255,189,89,.12)]" style={{ '--refund-y': `${day.refund * 16}px` } as React.CSSProperties} title={`退款率 ${day.refund}%`} /><div className="w-full max-w-11 rounded-t-md bg-gradient-to-t from-[#174fe6] to-[#6f92ff] transition group-hover:brightness-125" style={{ height: `${(day.gmv / 70000) * 82}%` }} title={`GMV ¥${day.gmv.toLocaleString()}`} /><span className="pb-3 text-[10px] text-white/32">{day.date}</span></div>)}
          </div>
          <div className="mt-4 flex gap-5 text-xs text-white/35"><span className="flex items-center gap-2"><span className="size-2 rounded-sm bg-[#4f7bff]" />支付金额</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#ffbd59]" />退款率节点</span></div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[.045] p-5 lg:p-6">
          <div className="flex items-start justify-between"><div><p className="font-semibold">需要处理的判断</p><p className="mt-1 text-xs text-white/35">{role === 'boss' ? '只显示经营异常与待审批事项' : role === 'ops' ? '风险、任务、负责人和截止时间' : '只显示分配给我的任务'}</p></div><span className="rounded-full bg-[#ffbd59]/12 px-3 py-1 text-xs text-[#ffd28e]">{filteredItems.length} 项</span></div>
          <Accordion className="mt-5 border-t border-white/10">
            {filteredItems.map((item) => <AccordionItem key={item.id} value={item.id} className="border-white/10"><AccordionTrigger className="py-5 text-white hover:no-underline"><span className="pr-3 text-left"><span className={`text-[10px] font-semibold uppercase tracking-[.12em] ${item.tone === 'amber' ? 'text-[#ffd28e]' : 'text-[#8da9ff]'}`}>{item.id} · {item.level}</span><span className="mt-2 block text-sm font-medium leading-6">{item.title}</span><span className="mt-2 block text-xs font-normal leading-5 text-white/35">{item.evidence}</span></span></AccordionTrigger><AccordionContent className="pb-5"><Explain icon={Database} label="数据从哪里来" copy={item.source} /><Explain icon={CircleAlert} label="系统为什么这样判断" copy={item.decision} /><Explain icon={UsersRound} label="接下来由谁做什么" copy={item.action} /><Explain icon={ShieldCheck} label="人工闸门" copy={item.gate} /></AccordionContent></AccordionItem>)}
          </Accordion>
        </section>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SmallPanel icon={Database} title="数据来源" copy="订单、客户标签、售后、商品资料与员工跟进记录。" />
        <SmallPanel icon={CircleAlert} title="系统判断" copy="每个异常都显示规则、基线、样本与关联证据。" />
        <SmallPanel icon={CheckCircle2} title="下一步动作" copy="任务有负责人、期限和人工确认，不让建议停在看板里。" />
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#174fe6] p-6 sm:flex-row sm:items-center"><div><p className="text-xs uppercase tracking-[.16em] text-white/55">把你的数据变成什么</p><p className="mt-2 text-xl font-semibold">先用 3 分钟体检一条真实流程。</p></div><a href="/audit?process=%E7%BB%8F%E8%90%A5%E6%8A%A5%E8%A1%A8" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-accent">体检我的流程 <ArrowRight className="size-4" /></a></div>
    </div>
  );
}

function Explain({ icon: Icon, label, copy }: { icon: typeof Clock3; label: string; copy: string }) { return <div className="mt-3 rounded-xl bg-white/[.045] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-[#8da9ff]"><Icon className="size-3.5" />{label}</div><p className="mt-2 text-xs leading-5 text-white/42">{copy}</p></div>; }
function SmallPanel({ icon: Icon, title, copy }: { icon: typeof Clock3; title: string; copy: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><Icon className="size-4 text-[#7f9eff]" /><p className="mt-5 text-sm font-semibold">{title}</p><p className="mt-2 text-xs leading-5 text-white/35">{copy}</p></div>; }
