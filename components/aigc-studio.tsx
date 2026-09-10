'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Archive, ArrowLeft, ArrowRight, BadgeCheck, BookOpenCheck, Boxes, Check,
  CheckCircle2, ChevronRight, CircleAlert, ClipboardCheck, Database, FileText,
  Film, Globe2, ImageIcon, Languages, LayoutTemplate, Menu, PackageCheck,
  RefreshCcw, ScanSearch, ShieldCheck, Sparkles, type LucideIcon,
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  aigcModules, blockedClaims, campaignBrief, contentChannels, contentLocales,
  contentTasks, listingVariants, localizationRows, pipelineSteps, productFacts,
  reviewChecks, storyboard, versionRows, stageIndex, stageLabel,
  type AigcModuleId, type AigcStage,
} from '@/lib/aigc-demo';
import { cn } from '@/lib/utils';

const moduleIcons: Record<AigcModuleId, LucideIcon> = {
  workspace: LayoutTemplate, facts: Database, listing: FileText, images: ImageIcon,
  video: Film, localization: Languages, review: ClipboardCheck, versions: Archive,
};

export type AigcInitialState = {
  moduleId: AigcModuleId;
  channel: string;
  locale: string;
  variant: string;
};

const defaultInitialState: AigcInitialState = {
  moduleId: 'workspace', channel: 'amazon-us', locale: 'en-US', variant: 'a',
};

export function AigcStudio({ initialState = defaultInitialState }: { initialState?: AigcInitialState }) {
  return (
    <SidebarProvider
      defaultOpen
      className="bg-[#080b12] text-white"
      style={{
        '--sidebar-width': '15.5rem', '--sidebar': '#0d111b', '--sidebar-foreground': '#fff',
        '--sidebar-border': 'rgba(255,255,255,.09)', '--sidebar-accent': 'rgba(255,255,255,.07)',
        '--sidebar-accent-foreground': '#fff', '--sidebar-ring': '#9b87ff',
      } as React.CSSProperties}
    >
      <StudioWorkspace initialState={initialState} />
    </SidebarProvider>
  );
}

function StudioWorkspace({ initialState }: { initialState: AigcInitialState }) {
  const { setOpenMobile } = useSidebar();
  const [moduleId, setModuleId] = React.useState<AigcModuleId>(initialState.moduleId);
  const [channel, setChannel] = React.useState(initialState.channel);
  const [locale, setLocale] = React.useState(initialState.locale);
  const [variant, setVariant] = React.useState(initialState.variant);
  const [stage, setStage] = React.useState<AigcStage>('draft');
  const [dataOpen, setDataOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const activeVariant = listingVariants.find((item) => item.id === variant) ?? listingVariants[0];
  const isRevised = ['revised', 'review', 'approved', 'exported'].includes(stage);
  const hasChecked = stage !== 'draft';
  const activeStep = stageIndex(stage);

  React.useEffect(() => {
    const params = new URLSearchParams({ task: moduleId, channel, lang: locale, version: variant });
    window.history.replaceState(null, '', window.location.pathname + '?' + params.toString());
  }, [moduleId, channel, locale, variant]);

  function chooseModule(next: AigcModuleId) {
    setModuleId(next);
    setOpenMobile(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetDemo() {
    setModuleId('workspace'); setChannel('amazon-us'); setLocale('en-US');
    setVariant('a'); setStage('draft'); setMessage('演示已恢复到初始草稿。');
  }

  function primaryAction() {
    if (stage === 'draft') { setStage('checked'); setMessage('事实检查完成：发现 1 项无依据声明。'); return; }
    if (stage === 'checked') { setStage('revised'); setMessage('已生成修订版，并移除无依据承诺。'); return; }
    if (stage === 'revised') { setStage('review'); setMessage('修订版已送交人工审核。'); return; }
    if (stage === 'review') { setStage('approved'); setMessage('人工审核已确认通过。'); return; }
    if (stage === 'approved') { setStage('exported'); setMessage('演示发布交接包已生成。'); return; }
    resetDemo();
  }

  const actionLabel = {
    draft: '运行事实检查', checked: '生成安全修订版', revised: '送交人工审核',
    review: '人工确认通过', approved: '生成发布交接包', exported: '重新演示',
  }[stage];

  return (
    <>
      <Sidebar collapsible="offcanvas" className="border-r border-white/10">
        <SidebarHeader className="gap-0 border-b border-white/10 p-5">
          <Link href="/" className="flex items-center gap-3" aria-label="返回官网首页">
            <span className="grid size-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#6f5bff,#1c9dff)] text-sm font-bold">AI</span>
            <span><span className="block text-sm font-semibold">CONTENT LAB</span><span className="mt-0.5 block text-xs text-white/45">AIGC 内容工厂</span></span>
          </Link>
          <div className="mt-5 grid gap-2">
            <Link href="/demo" className="inline-flex items-center gap-2 text-xs font-semibold text-[#b9aaff] hover:text-white"><ArrowLeft className="size-3.5" />返回样板中心</Link>
            <Link href="/demo/commerce" className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"><ArrowRight className="size-3.5" />切换到跨境经营驾驶舱</Link>
            <Link href="/" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white"><ArrowLeft className="size-3.5" />返回官网</Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 py-3">
          {['生产工作台', '内容产物', '质量与交付'].map((group) => (
            <SidebarGroup key={group} className="px-1 py-2">
              <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white/30">{group}</SidebarGroupLabel>
              <SidebarGroupContent><SidebarMenu>
                {aigcModules.filter((item) => item.group === group).map((item) => {
                  const Icon = moduleIcons[item.id];
                  return <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton isActive={moduleId === item.id} onClick={() => chooseModule(item.id)} className="h-10 rounded-lg px-3 text-[13px] text-white/55 hover:bg-white/[.06] hover:text-white data-active:bg-[#6754f4] data-active:text-white">
                      <Icon className="size-4" /><span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.count ? <SidebarMenuBadge className="text-[10px] text-[#c9bdff]">{item.count}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>;
                })}
              </SidebarMenu></SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarSeparator className="bg-white/10" />
        <SidebarFooter className="p-4">
          <div className="rounded-xl border border-white/10 bg-white/[.035] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#b9aaff]"><ShieldCheck className="size-4" />发布前人工确认</div>
            <p className="mt-3 text-xs leading-5 text-white/42">AI 可以生成和检查草稿，但不会虚构参数、自动发布或修改线上商品。</p>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-[#080b12] text-white">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080b12]/92 backdrop-blur-xl">
          <div className="flex min-h-16 flex-wrap items-center gap-3 px-4 py-3 lg:px-7">
            <SidebarTrigger className="size-10 shrink-0 rounded-xl border border-white/10 text-white hover:bg-white/10 md:hidden"><Menu className="size-4" /></SidebarTrigger>
            <div className="mr-auto min-w-0">
              <div className="flex items-center gap-2"><span className="truncate text-sm font-semibold">TrailBeam Mini · {campaignBrief.name}</span><span className="hidden rounded-full bg-[#725cff]/18 px-2 py-1 text-[11px] font-semibold text-[#c9bdff] sm:inline">全量合成数据</span></div>
              <p className="mt-1 hidden text-xs text-white/38 sm:block">{campaignBrief.id} · 商品事实版本 R08-V4 · 内容规则 2.4</p>
            </div>
            <Select value={channel} onValueChange={(value) => value && setChannel(value)}>
              <SelectTrigger aria-label="选择目标渠道" className="h-10 min-w-36 border-white/10 bg-white/[.04] px-3 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#111722] text-white">{contentChannels.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={locale} onValueChange={(value) => value && setLocale(value)}>
              <SelectTrigger aria-label="选择内容语言" className="h-10 min-w-36 border-white/10 bg-white/[.04] px-3 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="border border-white/10 bg-[#111722] text-white">{contentLocales.map((item) => <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>)}</SelectContent>
            </Select>
            <button onClick={() => setDataOpen(true)} className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-white/48 hover:bg-white/[.06] hover:text-white xl:inline-flex"><Database className="size-3.5" />接入要求</button>
            <button onClick={resetDemo} className="hidden h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-white/48 hover:bg-white/[.06] hover:text-white lg:inline-flex"><RefreshCcw className="size-3.5" />恢复演示</button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1500px] px-4 pb-28 pt-5 lg:px-7 lg:pb-12 lg:pt-7">
          <section className="relative overflow-hidden rounded-2xl border border-[#8f7cff]/20 bg-[radial-gradient(circle_at_80%_0%,rgba(130,92,255,.2),transparent_30%),linear-gradient(125deg,rgba(20,75,220,.16),rgba(255,255,255,.025)_55%,rgba(255,126,95,.055))] p-5 lg:p-7">
            <div className="grid gap-7 xl:grid-cols-[1.15fr_.85fr] xl:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-[#b9aaff]"><Sparkles className="size-4" />AIGC 内容任务<span className="font-normal normal-case tracking-normal text-white/35">· {campaignBrief.id}</span></div>
                <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-[-.045em] lg:text-5xl">同一份商品事实，生成 4 类可审核内容。</h1>
                <p className="mt-5 max-w-3xl text-sm leading-6 text-white/52">从 Listing、商品图到 15 秒视频和多语言版本，每个结果都保留来源、版本与发布前人工确认。</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[['事实引用', isRevised ? '8 / 8' : '7 / 8'], ['规则检查', hasChecked ? (isRevised ? '全部通过' : '1 项阻断') : '等待运行'], ['当前状态', stageLabel(stage)]].map(([label, value]) => <div key={label} className="min-h-24 rounded-xl border border-white/10 bg-black/15 p-4"><p className="text-[11px] text-white/38">{label}</p><p className="mt-3 text-sm font-semibold leading-5 text-white/78">{value}</p></div>)}
              </div>
            </div>
          </section>

          {moduleId === 'workspace' && <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
            <div className="grid grid-cols-5 border-b border-white/10">
              {pipelineSteps.map((item, index) => <div key={item.id} className={cn('relative min-h-20 border-r border-white/10 p-4 last:border-r-0', index <= activeStep ? 'bg-[#725cff]/[.08]' : '')}>
                <div className="flex items-center gap-2"><span className={cn('grid size-6 place-items-center rounded-full text-[10px] font-bold', index < activeStep || stage === 'exported' ? 'bg-[#6ad5a7] text-[#07140f]' : index === activeStep ? 'bg-[#725cff] text-white' : 'bg-white/[.06] text-white/35')}>{index < activeStep || stage === 'exported' ? <Check className="size-3.5" /> : index + 1}</span><span className={cn('hidden text-xs font-semibold sm:block', index <= activeStep ? 'text-white/75' : 'text-white/30')}>{item.label}</span></div>
              </div>)}
            </div>

            <div className="grid xl:grid-cols-[1.15fr_.85fr]">
              <div className="min-w-0 border-b border-white/10 p-4 lg:p-6 xl:border-b-0 xl:border-r">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#b9aaff]">Listing 版本对比</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.035em]">Amazon US 商品内容包</h2></div>
                  <Tabs value={variant} onValueChange={setVariant}><TabsList className="h-10 bg-white/[.055] p-1">{listingVariants.map((item) => <TabsTrigger key={item.id} value={item.id} className="h-8 px-3 text-white/45 data-active:bg-white data-active:text-[#111722]">{item.id.toUpperCase()}</TabsTrigger>)}</TabsList></Tabs>
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-[#101621] p-5 lg:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-[#725cff]/18 px-3 py-1 text-xs font-semibold text-[#c9bdff]">{activeVariant.label}</span><span className="text-xs text-white/35">字段完整 15 / 15 · 需人工确认</span></div>
                  <h3 className="mt-5 text-xl font-semibold leading-8 tracking-[-.02em] text-white/88">{isRevised ? activeVariant.revisedTitle : activeVariant.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/42">{activeVariant.angle}</p>
                  <div className="mt-6 grid gap-3">{activeVariant.bullets.map((bullet, index) => <div key={bullet} className="flex items-start gap-3 rounded-lg bg-white/[.035] p-3 text-sm leading-6 text-white/62"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/[.06] font-mono text-[10px] text-[#b9aaff]">{index + 1}</span><span>{bullet}</span></div>)}</div>
                  <div className="mt-5 flex flex-wrap gap-2">{productFacts.slice(1, 6).map((fact) => <span key={fact.field} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/48"><BadgeCheck className="size-3.5 text-[#6ad5a7]" />{fact.value}</span>)}</div>
                </div>
              </div>

              <aside className="min-w-0 p-4 lg:p-6">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#ffb18e]">发布前质检</p><h2 className="mt-3 text-xl font-semibold">事实、品牌、平台和权属</h2></div><span className={cn('rounded-full px-3 py-1 text-xs font-semibold', isRevised ? 'bg-[#6ad5a7]/15 text-[#83e5ba]' : hasChecked ? 'bg-[#ff7c66]/15 text-[#ffad9f]' : 'bg-white/[.06] text-white/45')}>{stageLabel(stage)}</span></div>
                <div className="mt-5 grid grid-cols-2 gap-2">{reviewChecks.map((check) => <div key={check.label} className="rounded-xl border border-white/10 bg-black/15 p-3"><div className="flex items-center justify-between"><span className="text-xs text-white/42">{check.label}</span><span className={cn('text-xs font-semibold', check.tone === 'good' ? 'text-[#83e5ba]' : isRevised ? 'text-[#83e5ba]' : 'text-[#ffd28e]')}>{isRevised && check.label === '商品事实' ? '25 / 25' : `${check.passed} / ${check.total}`}</span></div></div>)}</div>

                <div className={cn('mt-4 rounded-xl border p-4 transition', !hasChecked ? 'border-white/10 bg-white/[.025]' : isRevised ? 'border-[#6ad5a7]/20 bg-[#6ad5a7]/[.06]' : 'border-[#ff7c66]/25 bg-[#ff7c66]/[.07]')}>
                  {!hasChecked ? <><ScanSearch className="size-5 text-white/35" /><p className="mt-4 text-sm font-semibold">还没有运行事实检查</p><p className="mt-2 text-xs leading-5 text-white/40">系统会逐句核对商品事实、品牌规范和平台字段。</p></> : isRevised ? <><CheckCircle2 className="size-5 text-[#6ad5a7]" /><p className="mt-4 text-sm font-semibold text-[#9be9c6]">阻断项已修订</p><p className="mt-2 text-xs leading-5 text-white/48">已将 “IPX7 waterproof / 12-hour runtime” 替换为报告支持的 IPX4 与 4–8 小时。</p></> : <><CircleAlert className="size-5 text-[#ff9d8d]" /><p className="mt-4 text-sm font-semibold text-[#ffb0a4]">发现无依据的产品承诺</p><p className="mt-2 text-sm font-medium text-white/78">“IPX7 waterproof / 12-hour runtime”</p><p className="mt-2 text-xs leading-5 text-white/46">有效资料只支持 IPX4 与 4–8 小时。系统已阻止该版本进入发布交接。</p><button onClick={() => chooseModule('facts')} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#c9bdff]">查看事实来源 <ChevronRight className="size-3.5" /></button></>}
                </div>

                <Button onClick={primaryAction} className="mt-5 h-12 w-full rounded-xl bg-[linear-gradient(135deg,#725cff,#247dff)] text-sm font-semibold text-white hover:brightness-110">
                  {stage === 'draft' ? <ScanSearch className="size-4" /> : stage === 'exported' ? <RefreshCcw className="size-4" /> : <ArrowRight className="size-4" />}{actionLabel}
                </Button>
                <p className="mt-3 text-center text-[11px] leading-5 text-white/30">所有操作只改变本页演示状态，不会调用真实模型、上传素材或向平台发布。</p>
              </aside>
            </div>
          </section>}

          {moduleId === 'workspace' && <TaskQueue />}

          {moduleId !== 'workspace' && <ModuleView
            moduleId={moduleId}
            stage={stage}
            isRevised={isRevised}
            hasChecked={hasChecked}
            activeVariant={activeVariant}
            variant={variant}
            onVariantChange={setVariant}
            onPrimaryAction={primaryAction}
            actionLabel={actionLabel}
            locale={locale}
          />}

          <section className="mt-5 grid gap-3 md:grid-cols-4">
            <MiniProof icon={Database} label="有来源" copy="参数和声明可反查商品资料，不让模型补猜。" />
            <MiniProof icon={Boxes} label="一次输入" copy="同一 Brief 生成文案、图片、视频和多语言版本。" />
            <MiniProof icon={BookOpenCheck} label="能审核" copy="错误声明会被阻断，修订和批准都有记录。" />
            <MiniProof icon={PackageCheck} label="可交付" copy="审核通过后形成字段包、素材清单和版本记录。" />
          </section>
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[.025] p-4 text-xs leading-5 text-white/42 lg:flex-row lg:items-center lg:justify-between"><p><span className="font-semibold text-white/65">演示声明：</span>商品、品牌、文件、内容和指标均为虚构合成数据；不构成平台、合规或营销建议。</p><Link href="/audit?process=%E5%95%86%E5%93%81%E5%86%85%E5%AE%B9&utm_source=content_factory_demo" className="inline-flex shrink-0 items-center gap-2 font-semibold text-[#b9aaff] hover:text-white">体检我的内容流程 <ArrowRight className="size-3.5" /></Link></div>
          <p aria-live="polite" className="sr-only">{message}</p>
        </main>

        <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-4 rounded-2xl border border-white/10 bg-[#0d111b]/96 p-1.5 shadow-2xl backdrop-blur-xl md:hidden" aria-label="内容工厂快捷导航">
          {([['workspace', LayoutTemplate, '任务'], ['listing', FileText, '生成'], ['review', ClipboardCheck, '审核'], ['versions', Archive, '版本']] as const).map(([id, Icon, label]) => <button key={id} onClick={() => chooseModule(id)} className={cn('flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px]', moduleId === id ? 'bg-[#6754f4] text-white' : 'text-white/48')}><Icon className="size-4" />{label}</button>)}
        </nav>
      </SidebarInset>
      <DataRequirementsSheet open={dataOpen} onOpenChange={setDataOpen} />
    </>
  );
}

function ModuleView({
  moduleId, stage, isRevised, hasChecked, activeVariant, variant, onVariantChange,
  onPrimaryAction, actionLabel, locale,
}: {
  moduleId: Exclude<AigcModuleId, 'workspace'>;
  stage: AigcStage;
  isRevised: boolean;
  hasChecked: boolean;
  activeVariant: (typeof listingVariants)[number];
  variant: string;
  onVariantChange: (value: string) => void;
  onPrimaryAction: () => void;
  actionLabel: string;
  locale: string;
}) {
  if (moduleId === 'facts') return <FactsModule hasChecked={hasChecked} isRevised={isRevised} onAction={onPrimaryAction} actionLabel={actionLabel} />;
  if (moduleId === 'listing') return <ListingModule activeVariant={activeVariant} variant={variant} onVariantChange={onVariantChange} isRevised={isRevised} />;
  if (moduleId === 'images') return <ImagesModule />;
  if (moduleId === 'video') return <VideoModule />;
  if (moduleId === 'localization') return <LocalizationModule locale={locale} />;
  if (moduleId === 'review') return <ReviewModule stage={stage} isRevised={isRevised} hasChecked={hasChecked} onAction={onPrimaryAction} actionLabel={actionLabel} />;
  return <VersionsModule stage={stage} onAction={onPrimaryAction} actionLabel={actionLabel} />;
}

function ModuleHeader({ eyebrow, title, description, meta }: { eyebrow: string; title: string; description: string; meta: string }) {
  return <div className="flex flex-col gap-4 border-b border-white/10 p-5 lg:flex-row lg:items-end lg:justify-between lg:p-6"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-[#b9aaff]">{eyebrow}</p><h2 className="mt-3 text-2xl font-semibold tracking-[-.035em] lg:text-3xl">{title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">{description}</p></div><span className="w-fit rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/42">{meta}</span></div>;
}

function FactsModule({ hasChecked, isRevised, onAction, actionLabel }: { hasChecked: boolean; isRevised: boolean; onAction: () => void; actionLabel: string }) {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="商品事实中心" title="模型只能使用已经确认的事实" description="参数、认证、使用限制和品牌表达都要有来源。缺少依据时，系统标记待补资料，而不是让模型猜。" meta="R08-V4 · 8 项已确认" />
    <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[1.25fr_.75fr]">
      <div className="grid gap-3 sm:grid-cols-2">{productFacts.map((fact) => <article key={fact.field} className="rounded-xl border border-white/10 bg-black/15 p-4"><div className="flex items-center justify-between gap-3"><span className="text-xs text-white/40">{fact.field}</span><span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#83e5ba]"><CheckCircle2 className="size-3.5" />{fact.status}</span></div><p className="mt-4 text-base font-semibold text-white/82">{fact.value}</p><p className="mt-2 text-xs text-white/36">来源：{fact.source}</p></article>)}</div>
      <div className="grid content-start gap-4">
        <div className="rounded-xl border border-[#ff7c66]/20 bg-[#ff7c66]/[.06] p-5"><div className="flex items-center gap-2 text-xs font-semibold text-[#ffb0a4]"><CircleAlert className="size-4" />禁止模型自行扩写</div><div className="mt-4 flex flex-wrap gap-2">{blockedClaims.map((claim) => <span key={claim} className="rounded-full border border-[#ff7c66]/18 bg-black/15 px-3 py-1.5 text-xs text-white/55">{claim}</span>)}</div><p className="mt-4 text-xs leading-5 text-white/40">这些表达没有有效资料支撑，任何草稿命中后都会阻断发布交接。</p></div>
        <div className="rounded-xl border border-white/10 bg-black/15 p-5"><p className="text-xs font-semibold text-[#b9aaff]">活动 Brief</p><h3 className="mt-3 text-lg font-semibold">{campaignBrief.name}</h3><dl className="mt-4 grid gap-3 text-xs leading-5"><div><dt className="text-white/35">目标</dt><dd className="mt-1 text-white/64">{campaignBrief.goal}</dd></div><div><dt className="text-white/35">受众</dt><dd className="mt-1 text-white/64">{campaignBrief.audience}</dd></div><div><dt className="text-white/35">批准角度</dt><dd className="mt-1 text-white/64">{campaignBrief.angle}</dd></div></dl></div>
        <Button onClick={onAction} className="h-11 rounded-xl bg-[#6754f4] text-white hover:bg-[#7765f6]">{hasChecked ? <ArrowRight className="size-4" /> : <ScanSearch className="size-4" />}{isRevised ? '继续送交人工审核' : actionLabel}</Button>
      </div>
    </div>
  </section>;
}

function ListingModule({ activeVariant, variant, onVariantChange, isRevised }: { activeVariant: (typeof listingVariants)[number]; variant: string; onVariantChange: (value: string) => void; isRevised: boolean }) {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="Listing 文案" title="不是一句提示词，而是一份可追溯内容包" description="三个版本共享同一组商品事实与品牌规则，但创意角度、字段长度和市场语言分别适配。" meta="3 个版本 · 15 个字段" />
    <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-xl border border-white/10 bg-[#101621] p-5 lg:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><Tabs value={variant} onValueChange={onVariantChange}><TabsList className="h-10 bg-white/[.055] p-1">{listingVariants.map((item) => <TabsTrigger key={item.id} value={item.id} className="h-8 px-4 text-white/45 data-active:bg-white data-active:text-[#111722]">{item.label}</TabsTrigger>)}</TabsList></Tabs><span className="text-xs text-[#83e5ba]">事实引用 {isRevised ? '8 / 8' : '7 / 8'}</span></div><h3 className="mt-6 text-2xl font-semibold leading-9 tracking-[-.025em]">{isRevised ? activeVariant.revisedTitle : activeVariant.title}</h3><div className="mt-6 grid gap-3">{activeVariant.bullets.map((bullet, index) => <div key={bullet} className="flex items-start gap-3 rounded-lg border border-white/[.06] bg-white/[.025] p-3 text-sm leading-6 text-white/62"><span className="font-mono text-[11px] text-[#b9aaff]">0{index + 1}</span>{bullet}</div>)}</div></div>
      <div className="grid content-start gap-3"><div className="rounded-xl border border-white/10 bg-black/15 p-5"><p className="text-xs font-semibold text-[#b9aaff]">这份内容由什么组成</p>{[['商品事实', 'R08-V4 · 8 项'], ['品牌语气', '清晰、克制、场景化'], ['平台模板', 'Amazon US Listing v6'], ['评论洞察', '1,846 条合成样本'], ['内容规则', 'CLAIM-GATE 2.4']].map(([label, value]) => <div key={label} className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs"><span className="text-white/36">{label}</span><span className="text-right text-white/68">{value}</span></div>)}</div><div className="rounded-xl border border-[#8f7cff]/20 bg-[#725cff]/[.07] p-5"><p className="text-sm font-semibold">版本建议</p><p className="mt-2 text-xs leading-5 text-white/48">B 场景型在合成测试中兼顾点击、转化与利润护栏。结果只用于演示，不替代真实 A/B 测试。</p></div></div>
    </div>
  </section>;
}

function TaskQueue() {
  return <section className="mt-5 grid gap-3 lg:grid-cols-3">{contentTasks.map((task) => <article key={task.id} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[11px] text-[#b9aaff]">{task.id}</span><span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', task.status === '已批准' ? 'bg-[#6ad5a7]/14 text-[#83e5ba]' : task.blocked > 0 ? 'bg-[#ff7c66]/12 text-[#ffad9f]' : 'bg-[#725cff]/15 text-[#c9bdff]')}>{task.status}</span></div><h3 className="mt-4 text-sm font-semibold">{task.title}</h3><div className="mt-4 grid grid-cols-3 border-t border-white/10 pt-3 text-[11px]"><div><span className="block text-white/30">变体</span><span className="mt-1 block text-white/62">{task.variants}</span></div><div><span className="block text-white/30">阻断</span><span className="mt-1 block text-white/62">{task.blocked}</span></div><div><span className="block text-white/30">截止</span><span className="mt-1 block text-white/62">{task.due}</span></div></div></article>)}</section>;
}

const imageAssets = [
  { src: '/aigc/lantern-catalog-4x5.png', ratio: 'aspect-[4/5]', label: '电商目录图', use: 'Amazon 主图候选', version: 'IMG-A · v3' },
  { src: '/aigc/lantern-campsite-16x9.png', ratio: 'aspect-video', label: '露营场景图', use: 'A+ / Shopify 横幅', version: 'IMG-B · v2' },
  { src: '/aigc/lantern-social-9x16.png', ratio: 'aspect-[9/16]', label: '竖版广告图', use: 'TikTok / Reels', version: 'IMG-C · v3' },
] as const;

function ImagesModule() {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="AI 商品图" title="三种渠道构图，共享同一产品身份" description="每张图都保留源素材、构图任务、生成版本与权属状态。图片是预生成演示素材，不会在公开页面上传客户原图。" meta="3 张候选 · 权属已确认" />
    <div className="grid items-start gap-4 p-4 lg:grid-cols-[.76fr_1.5fr_.72fr] lg:p-6">{imageAssets.map((asset) => <article key={asset.src} className="overflow-hidden rounded-xl border border-white/10 bg-black/15"><div className={cn('relative overflow-hidden bg-[#111722]', asset.ratio)}><Image src={asset.src} alt={`${asset.label}：虚构便携露营灯演示素材`} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover" /></div><div className="p-4"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold">{asset.label}</span><span className="text-[11px] text-[#83e5ba]">已通过</span></div><p className="mt-2 text-xs text-white/42">{asset.use}</p><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/34"><span>{asset.version}</span><span>自有合成素材</span></div></div></article>)}</div>
    <div className="mx-4 mb-4 grid gap-3 rounded-xl border border-white/10 bg-black/15 p-4 text-xs leading-5 text-white/46 sm:grid-cols-3 lg:mx-6 lg:mb-6"><div><span className="block font-semibold text-white/72">产品身份锁定</span><span className="mt-1 block">石墨色灯体、橙色提手、蓝色按钮。</span></div><div><span className="block font-semibold text-white/72">生成约束</span><span className="mt-1 block">无品牌、无文字、无虚构功能演示。</span></div><div><span className="block font-semibold text-white/72">发布边界</span><span className="mt-1 block">设计师选图，品牌负责人最终批准。</span></div></div>
  </section>;
}

function VideoModule() {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="15 秒短视频" title="先把卖点变成可审核分镜，再进入制作" description="画面、旁白、参数和来源按时间轴组织；AI 生成分镜草案，剪辑与品牌负责人确认最终成片。" meta="6 个镜头 · 15 秒" />
    <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[.9fr_1.1fr]"><div className="overflow-hidden rounded-xl border border-white/10 bg-black/20"><div className="relative aspect-video overflow-hidden"><Image src="/aigc/lantern-campsite-16x9.png" alt="虚构露营灯短视频场景预览" fill sizes="(min-width: 1280px) 42vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><span className="rounded-full bg-black/45 px-3 py-1 text-[11px] backdrop-blur">分镜预览 · 合成素材</span><p className="mt-3 text-xl font-semibold">Light, right where you need it.</p></div><span className="grid size-12 place-items-center rounded-full bg-white text-[#111722]"><Film className="size-5" /></span></div></div><div className="grid grid-cols-3 border-t border-white/10 text-center text-xs"><div className="p-4"><span className="block text-white/35">画幅</span><span className="mt-1 block font-semibold">9:16</span></div><div className="border-x border-white/10 p-4"><span className="block text-white/35">时长</span><span className="mt-1 block font-semibold">15s</span></div><div className="p-4"><span className="block text-white/35">状态</span><span className="mt-1 block font-semibold text-[#ffd28e]">待剪辑确认</span></div></div></div><div className="grid gap-2">{storyboard.map((item, index) => <article key={item.second} className="grid grid-cols-[46px_1fr] gap-3 rounded-xl border border-white/10 bg-black/15 p-3"><span className="grid size-10 place-items-center rounded-lg bg-[#725cff]/15 font-mono text-[10px] text-[#c9bdff]">{item.second}</span><div><div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">{index + 1}. {item.shot}</h3><span className="text-[11px] text-white/30">{item.copy}</span></div><p className="mt-1 text-xs leading-5 text-white/42">{item.visual}</p></div></article>)}</div></div>
  </section>;
}

function LocalizationModule({ locale }: { locale: string }) {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="多语言与渠道适配" title="翻译之后，还要重新核对承诺和字段" description="同一英文表达在不同市场可能被放大或改变含义。系统负责字段映射与提示，目标市场审核人负责最终批准。" meta={`当前语言 · ${locale}`} />
    <div className="p-4 lg:p-6"><div className="overflow-hidden rounded-xl border border-white/10"><Table><TableHeader className="bg-white/[.045]"><TableRow className="border-white/10 hover:bg-transparent"><TableHead className="text-white/38">渠道</TableHead><TableHead className="text-white/38">语言</TableHead><TableHead className="text-white/38">交付字段</TableHead><TableHead className="text-white/38">状态</TableHead></TableRow></TableHeader><TableBody>{localizationRows.map((row) => <TableRow key={row.channel} className="border-white/10 hover:bg-white/[.035]"><TableCell className="font-medium text-white/76">{row.channel}</TableCell><TableCell className="text-white/48">{row.locale}</TableCell><TableCell className="text-white/48">{row.fields}</TableCell><TableCell className={row.tone === 'good' ? 'font-semibold text-[#83e5ba]' : row.tone === 'warn' ? 'font-semibold text-[#ffd28e]' : 'text-[#b9aaff]'}>{row.status}</TableCell></TableRow>)}</TableBody></Table></div><div className="mt-4 grid gap-3 md:grid-cols-3"><RiskNote title="承诺强度" copy="德语草稿把 water-resistant 扩写成更强的防水承诺，已要求人工复核。" /><RiskNote title="单位换算" copy="英制尺寸已生成，但包装标注仍等待商品负责人确认。" /><RiskNote title="平台模板" copy="标题与五点按渠道分别校验，不用一份内容直接复制到全部平台。" /></div></div>
  </section>;
}

function ReviewModule({ stage, isRevised, hasChecked, onAction, actionLabel }: { stage: AigcStage; isRevised: boolean; hasChecked: boolean; onAction: () => void; actionLabel: string }) {
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="审核中心" title="把生成速度变成合格内容，而不是返工" description="事实、品牌、平台和素材权属分别检查。AI 给出建议，员工决定修订，负责人批准发布交接。" meta={stageLabel(stage)} />
    <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[.78fr_1.22fr]"><div className="grid content-start gap-3"><div className="grid grid-cols-2 gap-3">{reviewChecks.map((check) => <article key={check.label} className="rounded-xl border border-white/10 bg-black/15 p-4"><span className="text-xs text-white/38">{check.label}</span><p className={cn('mt-3 text-2xl font-semibold', check.tone === 'warn' && !isRevised ? 'text-[#ffd28e]' : 'text-[#83e5ba]')}>{isRevised && check.label === '商品事实' ? '25 / 25' : `${check.passed} / ${check.total}`}</p></article>)}</div><div className="rounded-xl border border-white/10 bg-black/15 p-5"><p className="text-xs font-semibold text-[#b9aaff]">审核责任</p>{[['商品参数', '商品负责人'], ['品牌语气', '品牌负责人'], ['目标语言', '当地市场运营'], ['最终发布包', '渠道负责人']].map(([label, owner]) => <div key={label} className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs"><span className="text-white/38">{label}</span><span className="text-white/68">{owner}</span></div>)}</div></div><div className="grid content-start gap-3"><article className={cn('rounded-xl border p-5', hasChecked && !isRevised ? 'border-[#ff7c66]/25 bg-[#ff7c66]/[.07]' : 'border-[#6ad5a7]/20 bg-[#6ad5a7]/[.055]')}><div className="flex items-start gap-4">{hasChecked && !isRevised ? <CircleAlert className="mt-0.5 size-5 shrink-0 text-[#ff9d8d]" /> : <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#6ad5a7]" />}<div><span className="text-xs font-semibold uppercase tracking-[.12em] text-white/40">QF-01 · 商品事实</span><h3 className="mt-3 text-lg font-semibold">{hasChecked && !isRevised ? 'IPX7 waterproof 没有资料依据' : '高风险声明已修订为 IPX4 water-resistant'}</h3><p className="mt-3 text-sm leading-6 text-white/50">{hasChecked && !isRevised ? '草稿声明强于检测报告 QA-118，且把 4–8 小时扩大为 12 小时。此版本不能进入发布包。' : '修订版与检测报告和续航测试保持一致，可进入人工审核。最终发布仍需渠道负责人确认。'}</p></div></div></article><article className="rounded-xl border border-[#e7a84a]/18 bg-[#e7a84a]/[.055] p-5"><div className="flex items-start gap-4"><CircleAlert className="mt-0.5 size-5 shrink-0 text-[#ffd28e]" /><div><span className="text-xs font-semibold uppercase tracking-[.12em] text-white/40">QF-02 · 承诺边界</span><h3 className="mt-3 text-lg font-semibold">“Power through the entire night” 建议改写</h3><p className="mt-3 text-sm leading-6 text-white/50">表达可能被理解为整夜续航承诺。建议使用 “Up to 8 hours under tested settings”。</p></div></div></article><Button onClick={onAction} className="h-12 rounded-xl bg-[linear-gradient(135deg,#725cff,#247dff)] text-white hover:brightness-110">{hasChecked ? <ArrowRight className="size-4" /> : <ScanSearch className="size-4" />}{actionLabel}</Button></div></div>
  </section>;
}

function VersionsModule({ stage, onAction, actionLabel }: { stage: AigcStage; onAction: () => void; actionLabel: string }) {
  const ready = stage === 'approved' || stage === 'exported';
  return <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]">
    <ModuleHeader eyebrow="版本与发布交接" title="每份交付都能追溯、回退和验收" description="审核通过后形成按渠道命名的字段包、素材清单和审核记录。公开 Demo 只模拟导出，不连接真实店铺。" meta="内容包 PKG-041-US-AMZ" />
    <div className="grid gap-5 p-4 lg:p-6 xl:grid-cols-[1.15fr_.85fr]"><div className="overflow-hidden rounded-xl border border-white/10"><Table><TableHeader className="bg-white/[.045]"><TableRow className="border-white/10 hover:bg-transparent"><TableHead className="text-white/38">版本</TableHead><TableHead className="text-white/38">状态</TableHead><TableHead className="text-white/38">主要变化</TableHead><TableHead className="text-white/38">记录</TableHead></TableRow></TableHeader><TableBody>{versionRows.map((row) => <TableRow key={row.version} className="border-white/10 hover:bg-white/[.035]"><TableCell className="font-mono text-[#c9bdff]">{row.version}</TableCell><TableCell className="text-white/55">{row.status}</TableCell><TableCell className="text-white/55">{row.change}</TableCell><TableCell className="text-xs text-white/35">{row.author}<br />{row.time}</TableCell></TableRow>)}</TableBody></Table></div><div className="grid content-start gap-4"><div className={cn('rounded-xl border p-5', stage === 'exported' ? 'border-[#6ad5a7]/20 bg-[#6ad5a7]/[.06]' : 'border-white/10 bg-black/15')}><div className="flex items-center gap-2 text-xs font-semibold text-[#b9aaff]"><PackageCheck className="size-4" />Amazon US 发布包</div><div className="mt-4 grid grid-cols-2 gap-2">{[['标题', '1'], ['五点', '5'], ['搜索词', '1'], ['商品图', '7'], ['A+ 模块', '4'], ['15s 视频', '1']].map(([label, value]) => <div key={label} className="rounded-lg bg-white/[.04] p-3"><span className="text-[11px] text-white/35">{label}</span><span className="mt-1 block text-sm font-semibold">{value}</span></div>)}</div><p className={cn('mt-4 text-xs font-semibold', stage === 'exported' ? 'text-[#83e5ba]' : ready ? 'text-[#ffd28e]' : 'text-white/38')}>{stage === 'exported' ? '交接包已生成，可由渠道负责人下载' : ready ? '已批准，等待生成交接包' : '等待人工审核通过'}</p></div><div className="rounded-xl border border-[#8f7cff]/18 bg-[#725cff]/[.06] p-5"><p className="text-xs font-semibold text-[#c9bdff]">试点产能估算</p><div className="mt-4 grid grid-cols-3 gap-2 text-center"><div><span className="text-xl font-semibold">32</span><span className="mt-1 block text-[11px] text-white/35">SKU / 月</span></div><div><span className="text-xl font-semibold">6.8h</span><span className="mt-1 block text-[11px] text-white/35">当前 / SKU</span></div><div><span className="text-xl font-semibold">1.9h</span><span className="mt-1 block text-[11px] text-white/35">试点假设</span></div></div><p className="mt-4 text-[11px] leading-5 text-white/35">这是基于可编辑工时假设的可释放产能估算，不等于现金节省或收入承诺。</p></div><Button onClick={onAction} className="h-12 rounded-xl bg-[#6754f4] text-white hover:bg-[#7765f6]">{actionLabel}<ArrowRight className="size-4" /></Button></div></div>
  </section>;
}

function RiskNote({ title, copy }: { title: string; copy: string }) {
  return <article className="rounded-xl border border-white/10 bg-black/15 p-4"><Globe2 className="size-4 text-[#b9aaff]" /><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-white/42">{copy}</p></article>;
}

const dataRequirements = [
  ['商品事实', 'SKU、材质、尺寸、功能、限制、认证与对应资料来源'],
  ['品牌规范', '语气、视觉颜色、禁用表达、批准与例外规则'],
  ['历史内容', '5–10 个已通过和被退回的代表性内容包'],
  ['平台模板', '目标市场、字段结构、字数、图片与视频要求'],
  ['自有素材', '商品图、包装图、使用场景及素材授权范围'],
  ['市场洞察', '脱敏评论、搜索主题与历史表现数据，可后续接入'],
] as const;

function DataRequirementsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent side="right" className="w-full max-w-2xl gap-0 overflow-y-auto border-white/10 bg-[#0d111b] p-0 text-white sm:max-w-2xl"><SheetHeader className="border-b border-white/10 p-6 pr-14 text-left"><span className="mb-3 w-fit rounded-full bg-[#725cff]/18 px-3 py-1 text-xs font-semibold text-[#c9bdff]">最小试点清单</span><SheetTitle className="text-2xl font-semibold tracking-[-.03em] text-white">AIGC 内容工厂一般需要接入什么</SheetTitle><SheetDescription className="mt-3 leading-6 text-white/48">第一阶段用 5–10 个代表性 SKU 验证即可，不需要客户名单、店铺管理员密码或广告账户写权限。</SheetDescription></SheetHeader><div className="grid gap-3 p-6">{dataRequirements.map(([title, copy], index) => <article key={title} className="flex gap-3 rounded-xl border border-white/10 bg-white/[.035] p-4"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/[.06] font-mono text-[10px] text-[#c9bdff]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-white/50">{copy}</p></div></article>)}<div className="rounded-xl border border-[#e7a84a]/20 bg-[#e7a84a]/[.07] p-4"><div className="flex items-center gap-2 text-xs font-semibold text-[#ffd28e]"><ShieldCheck className="size-4" />数据与发布边界</div><p className="mt-3 text-sm leading-6 text-white/55">真实试点先使用脱敏导出文件或只读接口。未经批准的原始素材不进入模型；生成结果不会自动发布、改价或投放。</p></div></div><SheetFooter className="border-t border-white/10 p-6"><Link href="/audit?process=%E5%95%86%E5%93%81%E5%86%85%E5%AE%B9&utm_source=content_factory_demo" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6754f4] px-5 text-sm font-semibold text-white hover:bg-[#7765f6]">体检我的内容流程 <ArrowRight className="size-4" /></Link></SheetFooter></SheetContent></Sheet>;
}

function MiniProof({ icon: Icon, label, copy }: { icon: LucideIcon; label: string; copy: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[.03] p-4"><Icon className="size-4 text-[#b9aaff]" /><p className="mt-5 text-sm font-semibold">{label}</p><p className="mt-2 text-xs leading-5 text-white/38">{copy}</p></div>;
}
