'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BadgeDollarSign, BarChart3, Boxes, BriefcaseBusiness,
  CalendarCheck2, Check, CheckCircle2, ChevronRight, CircleAlert, ClipboardCheck,
  Coins, Database, Info, LayoutDashboard, Megaphone, Menu, MessageSquareText,
  RefreshCcw, RotateCcw, ShieldAlert, ShieldCheck, Sparkles, Truck, UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator,
  SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  demoChannels, demoDecisions, demoModules, demoPeriods, demoRoles, roleBrief,
  type DemoChannel, type DemoDecision, type DemoMetric, type DemoModuleId,
  type DemoPeriod, type DemoRole,
} from '@/lib/cross-border-demo';
import { cn } from '@/lib/utils';

const moduleIcons: Record<DemoModuleId, LucideIcon> = {
  overview: LayoutDashboard, profit: BadgeDollarSign, ads: Megaphone,
  inventory: Boxes, fulfillment: Truck, returns: RotateCcw,
  voice: MessageSquareText, supplier: UsersRound, settlement: Coins,
  compliance: ShieldAlert, weekly: CalendarCheck2,
};

const moduleGroups: { label: string; ids: DemoModuleId[] }[] = [
  { label: '经营结果', ids: ['overview', 'profit', 'ads'] },
  { label: '商品与交付', ids: ['inventory', 'fulfillment', 'returns', 'voice'] },
  { label: '供应与风险', ids: ['supplier', 'settlement', 'compliance'] },
  { label: '团队协同', ids: ['weekly'] },
];

const roleDefaultModule: Record<DemoRole, DemoModuleId> = {
  owner: 'overview', operator: 'ads', supply: 'inventory',
};

const trend = [
  ['25', 22280, 18.4], ['26', 24160, 18.1], ['27', 23640, 17.8],
  ['28', 25290, 17.5], ['29', 27640, 16.9], ['30', 30280, 16.4],
  ['31', 30970, 16.1],
] as const;

const waterfall = [
  ['净销售额', 184260, '#6f92ff'], ['货品成本', 63240, '#5d6b80'],
  ['平台费用', 24680, '#5d6b80'], ['广告', 28690, '#e7a84a'],
  ['履约仓储', 22170, '#5d6b80'], ['退款货损', 8000, '#e36d5b'],
  ['其他变动成本', 6000, '#5d6b80'],
  ['贡献利润', 31480, '#55c99a'],
] as const;

export function DemoDashboard() {
  return (
    <SidebarProvider
      defaultOpen
      className="bg-[#080c13] text-white"
      style={{
        '--sidebar-width': '15.5rem', '--sidebar': '#0c111a',
        '--sidebar-foreground': '#ffffff', '--sidebar-border': 'rgba(255,255,255,.09)',
        '--sidebar-accent': 'rgba(255,255,255,.07)', '--sidebar-accent-foreground': '#ffffff',
        '--sidebar-ring': '#6f92ff',
      } as React.CSSProperties}
    >
      <DashboardWorkspace />
    </SidebarProvider>
  );
}

function DashboardWorkspace() {
  const { setOpenMobile } = useSidebar();
  const [role, setRole] = React.useState<DemoRole>('owner');
  const [moduleId, setModuleId] = React.useState<DemoModuleId>('overview');
  const [channel, setChannel] = React.useState<DemoChannel>('all');
  const [period, setPeriod] = React.useState<DemoPeriod>('30d');
  const [selected, setSelected] = React.useState<DemoDecision | null>(null);
  const [dataOpen, setDataOpen] = React.useState(false);
  const [planned, setPlanned] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams({ module: moduleId, role, channel, period });
    window.history.replaceState(null, '', window.location.pathname + '?' + params.toString());
  }, [moduleId, role, channel, period]);

  const activeModule = demoModules.find((item) => item.id === moduleId) ?? demoModules[0];
  const channelMeta = demoChannels.find((item) => item.id === channel) ?? demoChannels[0];
  const periodMeta = demoPeriods.find((item) => item.id === period) ?? demoPeriods[1];
  const scoped = demoDecisions.filter((item) =>
    item.roles.includes(role) && (channel === 'all' ? item.scopes.includes('all') : item.scopes.includes(channel)),
  );
  const priorities = [...scoped].sort((a, b) => severityRank(a.level) - severityRank(b.level)).slice(0, 3);
  const moduleDecisions = moduleId === 'overview' ? priorities : scoped.filter((item) => item.module === moduleId);

  function chooseModule(next: DemoModuleId) {
    setModuleId(next);
    setOpenMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function chooseRole(next: DemoRole) {
    setRole(next);
    setModuleId(roleDefaultModule[next]);
    setSelected(null);
  }

  function togglePlan(decision: DemoDecision) {
    const exists = planned.includes(decision.id);
    setPlanned((current) => exists ? current.filter((id) => id !== decision.id) : [...current, decision.id]);
    setMessage(exists ? '已从行动清单移除：' + decision.title : '已加入行动清单：' + decision.title);
  }

  function addPriorities() {
    setPlanned((current) => Array.from(new Set([...current, ...priorities.map((item) => item.id)])));
    setMessage('已将优先判断加入本周行动清单。');
  }

  function resetDemo() {
    setRole('owner'); setModuleId('overview'); setChannel('all'); setPeriod('30d');
    setSelected(null); setPlanned([]); setMessage('已恢复演示初始状态。');
  }

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r border-white/10">
        <SidebarHeader className="gap-0 border-b border-white/10 p-5">
          <Link href="/" className="flex items-center gap-3" aria-label="返回官网首页">
            <span className="grid size-9 place-items-center rounded-xl bg-[#174fe6] text-sm font-bold">NX</span>
            <span><span className="block text-sm font-semibold">NORTHSTAR LABS</span><span className="mt-0.5 block text-xs text-white/45">跨境经营驾驶舱</span></span>
          </Link>
          <Link href="/" className="mt-5 inline-flex items-center gap-2 text-xs text-white/45 hover:text-white"><ArrowLeft className="size-3.5" />返回 AI 改造局</Link>
        </SidebarHeader>
        <SidebarContent className="px-2 py-3">
          {moduleGroups.map((group) => (
            <SidebarGroup key={group.label} className="px-1 py-2">
              <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white/30">{group.label}</SidebarGroupLabel>
              <SidebarGroupContent><SidebarMenu>
                {group.ids.map((id) => {
                  const item = demoModules.find((module) => module.id === id)!;
                  const Icon = moduleIcons[id];
                  const count = scoped.filter((decision) => decision.module === id && decision.level !== '增长机会').length;
                  return <SidebarMenuItem key={id}>
                    <SidebarMenuButton isActive={moduleId === id} onClick={() => chooseModule(id)} className="h-10 rounded-lg px-3 text-[13px] text-white/55 hover:bg-white/[.06] hover:text-white data-active:bg-[#174fe6] data-active:text-white">
                      <Icon className="size-4" /><span>{item.label}</span>
                    </SidebarMenuButton>
                    {count > 0 && <SidebarMenuBadge className="text-[10px] text-[#ffd28e]">{count}</SidebarMenuBadge>}
                  </SidebarMenuItem>;
                })}
              </SidebarMenu></SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarSeparator className="bg-white/10" />
        <SidebarFooter className="p-4">
          <div className="rounded-xl border border-white/10 bg-white/[.035] p-4">
            <div className="flex items-center justify-between"><span className="text-xs text-white/45">行动清单</span><span className="rounded-full bg-[#174fe6]/25 px-2 py-0.5 text-xs font-semibold text-[#9db3ff]">{planned.length}</span></div>
            <p className="mt-3 text-xs leading-5 text-white/42">演示操作只改变本页状态，不会写入真实系统。</p>
            <button onClick={() => chooseModule('weekly')} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/72 hover:text-white">查看本周行动 <ChevronRight className="size-3.5" /></button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-[#080c13] text-white">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080c13]/92 backdrop-blur-xl">
          <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-3 lg:px-7">
            <SidebarTrigger className="size-10 shrink-0 rounded-xl border border-white/10 text-white hover:bg-white/10 md:hidden"><Menu className="size-4" /></SidebarTrigger>
            <div className="mr-auto min-w-0">
              <div className="flex items-center gap-2"><span className="truncate text-sm font-semibold">北辰户外 · 北美业务</span><span className="hidden rounded-full bg-[#174fe6]/18 px-2 py-1 text-[11px] font-semibold text-[#9db3ff] sm:inline">全量合成数据</span></div>
              <p className="mt-1 hidden text-xs text-white/38 sm:block">截至 2026-08-31 23:59 · UTC+8 · 结算币种 USD</p>
            </div>
            <Select value={channel} onValueChange={(value) => setChannel(value as DemoChannel)}>
              <SelectTrigger aria-label="选择渠道" className="h-10 min-w-36 border-white/10 bg-white/[.04] px-3 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#111722] text-white">{demoChannels.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={period} onValueChange={(value) => setPeriod(value as DemoPeriod)}>
              <SelectTrigger aria-label="选择时间范围" className="h-10 min-w-28 border-white/10 bg-white/[.04] px-3 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#111722] text-white">{demoPeriods.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <button onClick={resetDemo} className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-white/48 hover:bg-white/[.06] hover:text-white lg:inline-flex"><RefreshCcw className="size-3.5" />恢复演示</button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 lg:px-7 lg:pb-12 lg:pt-7">
          <div className="mb-5 overflow-x-auto pb-1">
            <Tabs value={role} onValueChange={(value) => chooseRole(value as DemoRole)}>
              <TabsList className="h-10 min-w-max rounded-xl bg-white/[.055] p-1">{demoRoles.map((item) => <TabsTrigger key={item.id} value={item.id} className="h-8 min-w-28 px-4 text-white/48 data-active:bg-white data-active:text-[#111722]">{item.label}</TabsTrigger>)}</TabsList>
            </Tabs>
          </div>

          <section className="relative overflow-hidden rounded-2xl border border-[#6f92ff]/18 bg-[linear-gradient(125deg,rgba(23,79,230,.18),rgba(255,255,255,.025)_52%,rgba(255,189,89,.06))] p-5 lg:p-7">
            <div className="pointer-events-none absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#174fe6]/12 blur-3xl" />
            <div className="relative grid gap-6 xl:grid-cols-[1fr_.9fr] xl:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#8da9ff]"><Sparkles className="size-4" />今日经营简报<span className="font-normal normal-case tracking-normal text-white/35">· {channelMeta.label} · {periodMeta.label}</span></div>
                <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-.045em] lg:text-5xl">{roleBrief(role, channelMeta.short)}</h1>
                <p className="mt-5 max-w-3xl text-sm leading-6 text-white/52">订单、广告、库存、履约、退款和结算已统一到同一经营口径。这里先给判断，再让你追溯证据。</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={addPriorities} className="h-11 rounded-xl bg-white px-5 text-[#111722] hover:bg-[#dce5ff]"><ClipboardCheck className="size-4" />生成本周行动清单</Button>
                  <button onClick={() => chooseModule('profit')} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/72 hover:bg-white/[.06]">先看利润口径 <ArrowRight className="size-4" /></button>
                  <button onClick={() => setDataOpen(true)} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/72 hover:bg-white/[.06]"><Database className="size-4" />查看接入数据</button>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
                {priorities.map((decision, index) => <button key={decision.id} onClick={() => { setModuleId(decision.module); setSelected(decision); }} className="group flex min-h-20 items-center gap-4 rounded-xl border border-white/10 bg-black/15 p-4 text-left hover:border-[#6f92ff]/35 hover:bg-white/[.055]">
                  <span className={cn('grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold', decision.level === '高风险' ? 'bg-[#e36d5b]/18 text-[#ff9f8f]' : decision.level === '增长机会' ? 'bg-[#55c99a]/15 text-[#7ee0b6]' : 'bg-[#e7a84a]/16 text-[#ffd28e]')}>0{index + 1}</span>
                  <span className="min-w-0 flex-1"><span className="block text-[11px] text-white/38">{decision.owner} · {decision.deadline}</span><span className="mt-1 line-clamp-2 block text-sm font-medium leading-5 text-white/78">{decision.title}</span></span>
                  <ChevronRight className="size-4 shrink-0 text-white/25 group-hover:text-white" />
                </button>)}
              </div>
            </div>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {activeModule.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} channelFactor={channelMeta.scopeFactor} periodFactor={periodMeta.factor} />)}
          </section>

          <section className="mt-5 rounded-2xl border border-white/10 bg-white/[.035]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6">
              <div><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#8da9ff]">{React.createElement(moduleIcons[activeModule.id], { className: 'size-4' })}{activeModule.label}</div><h2 className="mt-4 text-2xl font-semibold tracking-[-.035em] lg:text-3xl">{activeModule.title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">{activeModule.description}</p></div>
              <div className="shrink-0 rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-xs leading-5 text-white/42"><span className="font-semibold text-white/68">口径：</span>{activeModule.metricNote}</div>
            </div>
            <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[1.08fr_.92fr]">
              <div className="min-w-0">
                {activeModule.id === 'overview' && <SalesTrend channelFactor={channelMeta.scopeFactor} />}
                {activeModule.id === 'profit' && <ProfitWaterfall channelFactor={channelMeta.scopeFactor} periodFactor={periodMeta.factor} />}
                <ModuleTable module={activeModule} channel={channel} />
                {activeModule.id === 'weekly' && <PlannedActions decisions={demoDecisions.filter((item) => planned.includes(item.id))} onOpen={setSelected} />}
              </div>
              <div className="min-w-0 rounded-xl border border-white/10 bg-black/15 p-4 lg:p-5">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">需要处理的判断</p><p className="mt-1 text-xs leading-5 text-white/38">每条都能追溯数据、规则、负责人和人工边界。</p></div><span className="rounded-full bg-[#e7a84a]/14 px-2.5 py-1 text-xs font-semibold text-[#ffd28e]">{moduleDecisions.length} 项</span></div>
                <div className="mt-4 grid gap-3">
                  {moduleDecisions.length > 0 ? moduleDecisions.map((decision) => <DecisionCard key={decision.id} decision={decision} planned={planned.includes(decision.id)} onOpen={setSelected} onToggle={togglePlan} />) : <EmptyDecision />}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 grid gap-3 md:grid-cols-4">
            <ExplainMini icon={Database} label="数据输入" copy="订单、广告、库存、仓配、退款、结算与平台通知。" />
            <ExplainMini icon={BarChart3} label="统一口径" copy="净销售额、贡献利润、ACOS、覆盖天数都有明确公式。" />
            <ExplainMini icon={BriefcaseBusiness} label="行动闭环" copy="异常进入负责人、截止时间、验收条件与周会议题。" />
            <ExplainMini icon={ShieldCheck} label="人工闸门" copy="改价、停投、采购、退款、下架与承诺不自动执行。" />
          </section>
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[.025] p-4 text-xs leading-5 text-white/42 lg:flex-row lg:items-center lg:justify-between">
            <p><span className="font-semibold text-white/65">演示声明：</span>品牌、店铺、SKU、供应商、订单与金额均为虚构合成数据，不代表任何客户业绩，也不构成投放、采购、财务或合规建议。</p>
            <button onClick={resetDemo} className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#9db3ff] hover:text-white"><RefreshCcw className="size-3.5" />恢复初始场景</button>
          </div>
          <p aria-live="polite" className="sr-only">{message}</p>
        </div>

        <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-white/10 bg-[#0c111a]/96 p-1.5 shadow-2xl backdrop-blur-xl md:hidden" aria-label="Demo 快捷导航">
          {([['overview', LayoutDashboard, '总览'], ['profit', BadgeDollarSign, '利润'], ['inventory', Boxes, '库存'], ['weekly', ClipboardCheck, '行动']] as const).map(([id, Icon, label]) => <button key={id} onClick={() => chooseModule(id)} className={cn('flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px]', moduleId === id ? 'bg-[#174fe6] text-white' : 'text-white/48')}><Icon className="size-4" />{label}</button>)}
        </nav>
      </SidebarInset>

      <DecisionSheet decision={selected} planned={selected ? planned.includes(selected.id) : false} onOpenChange={(open) => !open && setSelected(null)} onToggle={togglePlan} />
      <DataRequirementsSheet open={dataOpen} onOpenChange={setDataOpen} />
    </>
  );
}

function MetricCard({ metric, channelFactor, periodFactor }: { metric: DemoMetric; channelFactor: number; periodFactor: number }) {
  const value = formatMetric(metric, channelFactor, periodFactor);
  const tone = metric.tone === 'warn' ? 'text-[#ffd28e]' : metric.tone === 'good' ? 'text-[#7ee0b6]' : 'text-[#9db3ff]';
  return (
    <article className="min-h-36 rounded-2xl border border-white/10 bg-white/[.04] p-4 lg:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-white/45">{metric.label}</p>
        <span title={metric.help} aria-label={metric.help} className="grid size-6 cursor-help place-items-center rounded-full text-white/25 hover:bg-white/[.06] hover:text-white"><Info className="size-3.5" /></span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-[-.035em] lg:text-3xl">{value}</p>
      <p className={cn('mt-3 text-xs', tone)}>{metric.delta}</p>
    </article>
  );
}

function formatMetric(metric: DemoMetric, channelFactor: number, periodFactor: number) {
  if (typeof metric.value === 'string') return metric.value;
  const scale = metric.scale === 'scope-period' ? channelFactor * periodFactor : metric.scale === 'scope' ? channelFactor : 1;
  const value = metric.value * scale;
  if (metric.format === 'currency') return 'US$' + Math.round(value).toLocaleString('en-US');
  if (metric.format === 'integer') {
    const rounded = Math.round(value);
    return (metric.value > 0 && metric.scale && rounded < 1 ? 1 : rounded).toLocaleString('en-US');
  }
  if (metric.format === 'percent') return value.toFixed(Math.abs(value) < 1 ? 2 : 1) + '%';
  if (metric.format === 'ratio') return value.toFixed(2) + '×';
  if (metric.format === 'rating') return value.toFixed(2) + ' / 5';
  if (metric.format === 'days') return value.toFixed(Number.isInteger(value) ? 0 : 1) + ' 天';
  return String(value);
}

function SalesTrend({ channelFactor }: { channelFactor: number }) {
  const max = Math.max(...trend.map((item) => item[1]));
  return (
    <section className="mb-4 rounded-xl border border-white/10 bg-white/[.025] p-4 lg:p-5">
      <div className="flex items-start justify-between gap-4">
        <div><h3 className="text-sm font-semibold">7 日净销售额与贡献利润率</h3><p className="mt-1 text-xs text-white/38">销售继续增长，但贡献利润率连续四天下滑。</p></div>
        <div className="hidden gap-3 text-[11px] text-white/38 sm:flex"><span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-[#174fe6]" />净销售额</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-[#ffd28e]" />利润率</span></div>
      </div>
      <div className="mt-6 grid h-52 grid-cols-7 items-end gap-2 border-b border-white/10">
        {trend.map(([day, sales, margin]) => {
          const title = '8 月 ' + day + ' 日：US$' + Math.round(sales * channelFactor).toLocaleString() + '，贡献利润率 ' + margin + '%';
          return <div key={day} className="group relative flex h-full flex-col items-center justify-end">
            <span className="absolute left-1/2 z-10 size-2 -translate-x-1/2 rounded-full bg-[#ffd28e] shadow-[0_0_0_4px_rgba(255,210,142,.1)]" style={{ bottom: Math.max(28, margin * 5.3) + 'px' }} />
            <div className="w-full max-w-12 rounded-t-md bg-gradient-to-t from-[#174fe6] to-[#6f92ff] transition group-hover:brightness-125" style={{ height: Math.max(12, (sales / max) * 72) + '%' }} title={title} />
            <span className="py-2 text-[11px] text-white/38">{day}</span>
          </div>;
        })}
      </div>
    </section>
  );
}

function ProfitWaterfall({ channelFactor, periodFactor }: { channelFactor: number; periodFactor: number }) {
  const max = waterfall[0][1];
  return (
    <section className="mb-4 rounded-xl border border-white/10 bg-white/[.025] p-4 lg:p-5">
      <h3 className="text-sm font-semibold">贡献利润拆解</h3>
      <p className="mt-1 text-xs text-white/38">从净销售额扣除可归集的变动成本，不把贡献利润称为净利润。</p>
      <div className="mt-6 grid gap-3">
        {waterfall.map(([label, amount, color], index) => {
          const shown = amount * channelFactor * periodFactor;
          return <div key={label} className="grid grid-cols-[76px_1fr_92px] items-center gap-3">
            <span className="text-xs text-white/48">{label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-white/[.06]"><span className="block h-full rounded-full" style={{ width: Math.max(4, (amount / max) * 100) + '%', background: color }} /></span>
            <span className={cn('text-right font-mono text-xs', index === 0 || index === waterfall.length - 1 ? 'text-white' : 'text-white/48')}>
              {index > 0 && index < waterfall.length - 1 ? '−' : ''}{'US$' + Math.round(shown).toLocaleString()}
            </span>
          </div>;
        })}
      </div>
    </section>
  );
}

function ModuleTable({ module, channel }: { module: (typeof demoModules)[number]; channel: DemoChannel }) {
  const rows = module.rows.filter((row) => channel === 'all' ? row.scopes.includes('all') : row.scopes.includes(channel));
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <Table>
        <TableHeader className="bg-white/[.045]"><TableRow className="border-white/10 hover:bg-transparent">{module.columns.map((column) => <TableHead key={column} className="h-11 px-4 text-xs font-semibold text-white/38">{column}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{rows.map((row, index) => <TableRow key={row.cells[0] + '-' + index} className="border-white/10 hover:bg-white/[.035]">{row.cells.map((cell, cellIndex) => <TableCell key={cell + '-' + cellIndex} className={cn('px-4 py-4 text-[13px]', cellIndex === 0 ? 'font-medium text-white/78' : cellIndex === row.cells.length - 1 ? rowTone(row.tone) : 'text-white/48')}>{cell}</TableCell>)}</TableRow>)}</TableBody>
      </Table>
    </div>
  );
}

function DecisionCard({ decision, planned, onOpen, onToggle }: { decision: DemoDecision; planned: boolean; onOpen: (decision: DemoDecision) => void; onToggle: (decision: DemoDecision) => void }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[.035] p-4">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', levelTone(decision.level))}>{decision.level}</span>
        {planned && <span className="inline-flex items-center gap-1 text-[11px] text-[#7ee0b6]"><Check className="size-3" />已加入行动</span>}
      </div>
      <h3 className="mt-4 text-sm font-semibold leading-6 text-white/82">{decision.title}</h3>
      <p className="mt-2 text-xs leading-5 text-white/42">{decision.impact}</p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-[11px] text-white/38"><span>{decision.owner}</span><span>{decision.deadline}</span></div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => onOpen(decision)} className="h-9 rounded-lg border border-white/10 text-xs font-semibold text-white/62 hover:bg-white/[.06] hover:text-white">查看判断依据</button>
        <button onClick={() => onToggle(decision)} className={cn('h-9 rounded-lg text-xs font-semibold', planned ? 'bg-white/[.07] text-white/58 hover:bg-white/[.1]' : 'bg-[#174fe6] text-white hover:bg-[#285fe8]')}>{planned ? '移出行动清单' : '加入行动清单'}</button>
      </div>
    </article>
  );
}

function DecisionSheet({ decision, planned, onOpenChange, onToggle }: { decision: DemoDecision | null; planned: boolean; onOpenChange: (open: boolean) => void; onToggle: (decision: DemoDecision) => void }) {
  return (
    <Sheet open={Boolean(decision)} onOpenChange={onOpenChange}>
      {decision && <SheetContent side="right" className="w-full max-w-xl gap-0 overflow-y-auto border-white/10 bg-[#0c111a] p-0 text-white sm:max-w-xl">
        <SheetHeader className="border-b border-white/10 p-6 pr-14 text-left">
          <span className={cn('mb-3 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold', levelTone(decision.level))}>{decision.level}</span>
          <SheetTitle className="text-2xl font-semibold leading-tight tracking-[-.03em] text-white">{decision.title}</SheetTitle>
          <SheetDescription className="mt-3 leading-6 text-white/48">{decision.impact}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 p-6">
          <EvidenceBlock icon={Database} label="数据从哪里来" copy={decision.source} />
          <EvidenceBlock icon={CircleAlert} label="系统为什么这样判断" copy={decision.rule} />
          <EvidenceBlock icon={BriefcaseBusiness} label="接下来由谁做什么" copy={decision.action + ' 负责人：' + decision.owner + '；截止：' + decision.deadline + '。'} />
          <EvidenceBlock icon={ShieldCheck} label="人工闸门" copy={decision.gate} accent />
          <div className="mt-2 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-black/15 p-4 text-xs"><div><span className="block text-white/35">规则版本</span><span className="mt-1 block text-white/68">OPS-RULE 2.4</span></div><div><span className="block text-white/35">最后计算</span><span className="mt-1 block text-white/68">2026-09-01 09:10</span></div></div>
        </div>
        <SheetFooter className="border-t border-white/10 p-6">
          <Button onClick={() => onToggle(decision)} className={cn('h-11 w-full rounded-xl', planned ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-[#174fe6] text-white hover:bg-[#285fe8]')}>{planned ? '从演示行动清单移除' : '加入本周行动清单'}</Button>
          <p className="text-center text-[11px] leading-5 text-white/32">演示操作不会改价、停投、采购、退款、下架或发送消息。</p>
        </SheetFooter>
      </SheetContent>}
    </Sheet>
  );
}

const dataRequirements = [
  ['订单与商品', 'Amazon、Shopify、TikTok Shop 等店铺', '订单号、渠道、站点、SKU、数量、币种、成交价、折扣、税费、订单状态'],
  ['广告投放', 'Amazon Ads、Meta、Google、TikTok Ads', '活动与广告组、花费、点击、归因销售、归因窗口、搜索词或素材'],
  ['商品成本', 'ERP、采购表、财务成本表', '采购单价、头程、关税、清关、包装、平台费率、仓储与尾程费用'],
  ['库存与采购', 'FBA、海外仓、WMS、采购单', '可售、预留、在途、预计到仓、供应商、生产批次、安全库存'],
  ['履约与物流', 'OMS、WMS、承运商轨迹', '承诺发货、出库扫描、承运扫描、预计妥投、实际妥投、异常原因'],
  ['退款与客户声音', '退款、评价、客服工单、退货备注', '退款金额与原因、评价文本、问题主题、处理结果、关联 SKU 与批次'],
  ['结算与汇率', '平台结算、支付网关、银行到账', '预计回款、实际到账、准备金、拒付、手续费、预算与实际汇率'],
  ['账号与合规', '账号健康中心、政策邮件、资料库', '事项类型、影响商品、截止时间、缺失材料、负责人、处理状态'],
] as const;

function DataRequirementsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-2xl gap-0 overflow-y-auto border-white/10 bg-[#0c111a] p-0 text-white sm:max-w-2xl">
        <SheetHeader className="border-b border-white/10 p-6 pr-14 text-left">
          <span className="mb-3 w-fit rounded-full bg-[#174fe6]/20 px-2.5 py-1 text-[11px] font-semibold text-[#9db3ff]">最小数据清单</span>
          <SheetTitle className="text-2xl font-semibold tracking-[-.03em] text-white">跨境经营驾驶舱一般需要接入什么</SheetTitle>
          <SheetDescription className="mt-3 leading-6 text-white/48">第一阶段不需要打通所有系统。先用近 90 天脱敏订单、SKU 成本、广告和当前库存，验证利润与库存两条主线。</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 p-6">
          {dataRequirements.map(([title, source, fields], index) => <article key={title} className="rounded-xl border border-white/10 bg-white/[.035] p-4">
            <div className="flex items-start gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[.06] font-mono text-[10px] text-[#9db3ff]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs text-white/38">{source}</p><p className="mt-3 text-xs leading-5 text-white/58">{fields}</p></div></div>
          </article>)}
          <div className="mt-2 rounded-xl border border-[#e7a84a]/20 bg-[#e7a84a]/[.07] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-[#ffd28e]"><ShieldCheck className="size-4" />接入边界</div><p className="mt-3 text-sm leading-6 text-white/55">公开 Demo 只使用合成数据。真实项目先接脱敏导出文件或只读接口；改价、停投、采购、退款、下架与对外承诺必须保留人工确认。</p></div>
        </div>
        <SheetFooter className="border-t border-white/10 p-6"><Link href="/audit?process=%E7%BB%8F%E8%90%A5%E6%8A%A5%E8%A1%A8" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#174fe6] px-5 text-sm font-semibold text-white hover:bg-[#285fe8]">体检我的跨境经营流程 <ArrowRight className="size-4" /></Link></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function EvidenceBlock({ icon: Icon, label, copy, accent = false }: { icon: LucideIcon; label: string; copy: string; accent?: boolean }) {
  return <div className={cn('rounded-xl border p-4', accent ? 'border-[#e7a84a]/20 bg-[#e7a84a]/[.07]' : 'border-white/10 bg-white/[.035]')}><div className={cn('flex items-center gap-2 text-xs font-semibold', accent ? 'text-[#ffd28e]' : 'text-[#9db3ff]')}><Icon className="size-4" />{label}</div><p className="mt-3 text-sm leading-6 text-white/55">{copy}</p></div>;
}

function PlannedActions({ decisions, onOpen }: { decisions: DemoDecision[]; onOpen: (decision: DemoDecision) => void }) {
  if (!decisions.length) return <div className="mt-4 rounded-xl border border-dashed border-white/12 p-5"><p className="text-sm font-medium">还没有新增的演示行动</p><p className="mt-2 text-xs leading-5 text-white/38">从任意模块把一条经营判断加入行动清单，它会出现在这里。</p></div>;
  return <div className="mt-4 rounded-xl border border-[#6f92ff]/18 bg-[#174fe6]/[.08] p-4"><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#9db3ff]">本次演示新增 · {decisions.length} 项</p><div className="mt-3 grid gap-2">{decisions.map((decision) => <button key={decision.id} onClick={() => onOpen(decision)} className="flex items-center justify-between gap-3 rounded-lg bg-white/[.05] p-3 text-left text-xs text-white/65 hover:bg-white/[.08]"><span>{decision.title}</span><ChevronRight className="size-3.5 shrink-0" /></button>)}</div></div>;
}

function EmptyDecision() {
  return <div className="rounded-xl border border-dashed border-white/12 p-8 text-center"><CheckCircle2 className="mx-auto size-6 text-[#55c99a]" /><p className="mt-3 text-sm font-medium">当前范围没有需要升级的异常</p><p className="mt-2 text-xs leading-5 text-white/38">切换渠道、角色或时间范围查看其他演示场景。</p></div>;
}

function ExplainMini({ icon: Icon, label, copy }: { icon: LucideIcon; label: string; copy: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><Icon className="size-4 text-[#8da9ff]" /><p className="mt-5 text-sm font-semibold">{label}</p><p className="mt-2 text-xs leading-5 text-white/38">{copy}</p></div>;
}

function severityRank(level: DemoDecision['level']) {
  return level === '高风险' ? 0 : level === '需关注' ? 1 : 2;
}

function levelTone(level: DemoDecision['level']) {
  if (level === '高风险') return 'bg-[#e36d5b]/16 text-[#ff9f8f]';
  if (level === '增长机会') return 'bg-[#55c99a]/14 text-[#7ee0b6]';
  return 'bg-[#e7a84a]/14 text-[#ffd28e]';
}

function rowTone(tone?: 'normal' | 'good' | 'warn' | 'critical') {
  if (tone === 'critical') return 'font-semibold text-[#ff9f8f]';
  if (tone === 'warn') return 'font-semibold text-[#ffd28e]';
  if (tone === 'good') return 'font-semibold text-[#7ee0b6]';
  return 'text-white/55';
}
