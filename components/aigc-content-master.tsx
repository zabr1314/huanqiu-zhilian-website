'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  ArrowRight, Ban, CheckCircle2, ChevronRight, CircleAlert, Copy, Database,
  FileCheck2, FileText, Film, ImageIcon, Languages, LayoutTemplate, PenLine,
  PlayCircle, ScanSearch, ShieldCheck, ShoppingBag, Sparkles, Store,
  WandSparkles, type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  blockedClaims, campaignBrief, contentChannels, contentLocales,
  listingVariants, productFacts, type AigcModuleId, type AigcStage,
} from '@/lib/aigc-demo';
import { cn } from '@/lib/utils';

const sourceCards = [
  {
    id: 'image',
    filter: '商品图',
    label: '商品图',
    title: 'IMG_R08_hero.jpg',
    meta: '支持 2 项事实',
    image: '/aigc/lantern-catalog-4x5.png',
  },
  {
    id: 'manual',
    filter: '说明书',
    label: '说明书与报告',
    title: 'MAN-R08 · TR-0828',
    meta: '支持 5 项事实',
    image: null,
  },
  {
    id: 'listing',
    filter: 'Listing',
    label: 'Listing',
    title: 'Amazon US · v6',
    meta: '支持 1 项事实',
    image: null,
  },
  {
    id: 'synthetic',
    filter: '合成数据',
    label: '合成数据',
    title: 'AIGC 场景素材',
    meta: '仅用于演示',
    image: '/aigc/lantern-campsite-16x9.png',
  },
] as const;

const masterSellingPoints = [
  { title: '灵活固定', copy: '磁吸底座与折叠挂钩，可吸附、悬挂或放置使用。' },
  { title: '轻量便携', copy: '280g 机身，适合放入背包或车载应急箱。' },
  {
    title: '按场景调节',
    copy: '三档亮度；经记录测试，不同档位下续航为 4–8 小时。',
  },
] as const;

const channelIcons = {
  'amazon-us': ShoppingBag,
  'shopify-us': Store,
  'tiktok-us': PlayCircle,
} as const;

type PreviewCopy = {
  draftTitle: string;
  safeTitle: string;
  note: string;
  bullets: readonly string[];
  hero: string;
};

const previewCopyByChannel: Record<string, Record<string, PreviewCopy>> = {
  'amazon-us': {
    'en-US': {
      draftTitle:
        'TrailBeam Mini Camping Lantern, IPX7 Waterproof, 12-Hour Runtime',
      safeTitle:
        'TrailBeam Mini Camping Lantern, IPX4 Water-Resistant, 4–8 Hour Runtime',
      note: 'Runtime varies by brightness setting.',
      bullets: [
        'Magnetic base and foldable hanging hook.',
        'Three brightness levels for changing scenes.',
        'Compact 280g body with USB-C input.',
      ],
      hero: 'Light where you need it.',
    },
    'de-DE': {
      draftTitle:
        'TrailBeam Mini Campinglampe, IPX7 wasserdicht, 12 Stunden Laufzeit',
      safeTitle:
        'TrailBeam Mini Campinglampe, IPX4 spritzwassergeschützt, 4–8 Stunden Laufzeit',
      note: 'Die Laufzeit hängt von der Helligkeitsstufe ab.',
      bullets: [
        'Magnetfuß und klappbarer Haken.',
        'Drei Helligkeitsstufen für verschiedene Situationen.',
        'Kompaktes 280-g-Gehäuse mit USB-C-Eingang.',
      ],
      hero: 'Licht, wo du es brauchst.',
    },
    'ja-JP': {
      draftTitle: 'TrailBeam Mini キャンプランタン、IPX7 防水、12時間連続点灯',
      safeTitle: 'TrailBeam Mini キャンプランタン、IPX4 防滴、実測4〜8時間',
      note: '点灯時間は明るさ設定により異なります。',
      bullets: [
        'マグネット式ベースと折りたたみフック。',
        'シーンに合わせて選べる3段階の明るさ。',
        'USB-C入力対応の軽量280gボディ。',
      ],
      hero: '必要な場所に、ちょうどいい灯り。',
    },
  },
  'shopify-us': {
    'en-US': {
      draftTitle: 'Light anywhere for 12 hours — fully waterproof.',
      safeTitle: 'Light where you need it.',
      note: 'Attach it, hang it or place it nearby. Every specification links back to a verified source.',
      bullets: [
        'Magnetic base for metal surfaces.',
        'Foldable hook for tents and overhead use.',
        'IPX4 · documented 4–8 hour runtime · 280g.',
      ],
      hero: 'Attach it. Hang it. Set it down.',
    },
    'de-DE': {
      draftTitle: 'Überall Licht für 12 Stunden — vollständig wasserdicht.',
      safeTitle: 'Licht genau dort, wo du es brauchst.',
      note: 'Befestigen, aufhängen oder aufstellen. Jede Angabe verweist auf eine geprüfte Quelle.',
      bullets: [
        'Magnetfuß für Metallflächen.',
        'Klappbarer Haken für Zelt und Überkopf-Nutzung.',
        'IPX4 · dokumentierte Laufzeit 4–8 Stunden · 280 g.',
      ],
      hero: 'Befestigen. Aufhängen. Aufstellen.',
    },
    'ja-JP': {
      draftTitle: '完全防水で、どこでも12時間照らす。',
      safeTitle: '必要な場所に、ちょうどいい灯り。',
      note: '吸着、吊り下げ、据え置き。すべての仕様を確認済みの根拠に紐づけています。',
      bullets: [
        '金属面に固定できるマグネット式ベース。',
        'テント内でも使いやすい折りたたみフック。',
        'IPX4 · 実測4〜8時間 · 280g。',
      ],
      hero: '吸着する。吊るす。置いて使う。',
    },
  },
  'tiktok-us': {
    'en-US': {
      draftTitle: '12 hours. Waterproof. Ready for everything.',
      safeTitle: 'Magnetic. Hangable. Ready for the campsite.',
      note: '15-second hook: show three ways to place one compact light.',
      bullets: [
        '0–2s · Light turns on in a dark campsite.',
        '2–8s · Magnet, hook and tabletop placement.',
        '8–15s · IPX4, 4–8h documented runtime, 280g.',
      ],
      hero: '3 ways to place one light',
    },
    'de-DE': {
      draftTitle: '12 Stunden. Wasserdicht. Für alles bereit.',
      safeTitle: 'Magnetisch. Aufhängbar. Bereit fürs Camp.',
      note: '15-Sekunden-Hook: drei Möglichkeiten, eine kompakte Lampe zu platzieren.',
      bullets: [
        '0–2 s · Licht geht im dunklen Camp an.',
        '2–8 s · Magnet, Haken und Tischaufstellung.',
        '8–15 s · IPX4, dokumentierte 4–8 Std., 280 g.',
      ],
      hero: 'Ein Licht, drei Platzierungen',
    },
    'ja-JP': {
      draftTitle: '12時間。完全防水。どんな場面にも。',
      safeTitle: '吸着できる。吊るせる。キャンプに連れ出せる。',
      note: '15秒フック：コンパクトなライトの3つの置き方を見せます。',
      bullets: [
        '0〜2秒 · 暗いキャンプ場で点灯。',
        '2〜8秒 · マグネット、フック、卓上を切り替え。',
        '8〜15秒 · IPX4、実測4〜8時間、280g。',
      ],
      hero: '1つのライト、3つの置き方',
    },
  },
};

export function ContentMasterWorkspace({
  stage,
  isRevised,
  hasChecked,
  activeVariant,
  channel,
  locale,
  variant,
  message,
  onChannelChange,
  onLocaleChange,
  onVariantChange,
  onPrimaryAction,
  onMasterChange,
  onOpenModule,
}: {
  stage: AigcStage;
  isRevised: boolean;
  hasChecked: boolean;
  activeVariant: (typeof listingVariants)[number];
  channel: string;
  locale: string;
  variant: string;
  message: string;
  onChannelChange: (value: string) => void;
  onLocaleChange: (value: string) => void;
  onVariantChange: (value: string) => void;
  onPrimaryAction: () => void;
  onMasterChange: () => void;
  onOpenModule: (value: AigcModuleId) => void;
}) {
  const [brief, setBrief] = React.useState(
    '以同一份商品事实完成 Amazon、Shopify 与 TikTok Shop 上新内容，不添加未证实参数或效果承诺。',
  );
  const [brandTone, setBrandTone] = React.useState(
    '清晰、克制、场景化。避免绝对化承诺，优先说明具体使用方式。',
  );
  const [sourceFilter, setSourceFilter] = React.useState('全部');
  const [selectedSource, setSelectedSource] = React.useState('manual');
  const [copied, setCopied] = React.useState('');
  const blocked = hasChecked && !isRevised;
  const generated = ['review', 'approved', 'exported'].includes(stage);
  const activeChannel =
    contentChannels.find((item) => item.id === channel) ?? contentChannels[0];
  const filteredSources =
    sourceFilter === '全部'
      ? sourceCards
      : sourceCards.filter((item) => item.filter === sourceFilter);
  const selectedPreview =
    previewCopyByChannel[channel]?.[locale] ??
    previewCopyByChannel['amazon-us']['en-US'];
  const previewTitle =
    channel === 'amazon-us' && locale === 'en-US'
      ? isRevised
        ? activeVariant.revisedTitle
        : activeVariant.title
      : isRevised
        ? selectedPreview.safeTitle
        : selectedPreview.draftTitle;
  const previewBullets =
    channel === 'amazon-us' && locale === 'en-US'
      ? activeVariant.bullets.slice(0, 3)
      : selectedPreview.bullets;

  const productionSteps = [
    {
      label: 'Listing 文案',
      icon: FileText,
      status: blocked ? '1 项阻断' : isRevised ? '已修订' : '草稿待校验',
    },
    {
      label: '商品图',
      icon: ImageIcon,
      status: generated ? '3 张已生成' : blocked ? '暂停生成' : '等待母版',
    },
    {
      label: '短视频',
      icon: Film,
      status: generated ? '15s 分镜已生成' : blocked ? '暂停生成' : '等待母版',
    },
    {
      label: '多语言',
      icon: Languages,
      status: generated
        ? stage === 'review'
          ? '2 项待确认'
          : '3 个语言版本'
        : blocked
          ? '暂停生成'
          : '等待母版',
    },
  ];

  const primaryLabel = {
    draft: '从母版生成多平台版本',
    checked: '从母版生成多平台版本',
    revised: '从母版生成多平台版本',
    review: '人工确认通过',
    approved: '生成渠道交接包',
    exported: '重新演示',
  }[stage];

  function updateBrief(value: string) {
    setBrief(value);
    onMasterChange();
  }

  function updateTone(value: string) {
    setBrandTone(value);
    onMasterChange();
  }

  async function copyTitle() {
    try {
      await navigator.clipboard.writeText(previewTitle);
      setCopied('标题已复制');
    } catch {
      setCopied('当前浏览器未开放复制权限');
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#8f7cff]/18 bg-white/[.03]">
      <div className="flex flex-col gap-5 border-b border-white/10 bg-[linear-gradient(120deg,rgba(65,73,180,.1),rgba(114,92,255,.055),transparent)] p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#b9aaff]">
            <WandSparkles className="size-4" />
            内容生产台
            <span className="font-normal text-white/32">
              · {campaignBrief.id}
            </span>
            <span className="rounded-full bg-[#725cff]/16 px-2 py-1 text-[10px] text-[#c9bdff]">
              合成数据
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-.035em] lg:text-3xl">
            内容母版
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/48">
            商品事实、核心卖点和禁用表述只维护一次；渠道内容从母版生成，并保留来源与审核记录。
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {stage === 'draft' || stage === 'checked' ? (
            <Button
              onClick={onPrimaryAction}
              variant="outline"
              className="h-11 border-[#8f7cff]/35 bg-[#725cff]/[.06] text-[#d3caff] hover:bg-[#725cff]/15 hover:text-white"
            >
              {stage === 'draft' ? (
                <ScanSearch className="size-4" />
              ) : (
                <ShieldCheck className="size-4" />
              )}
              {stage === 'draft' ? '校验母版事实' : '应用安全修订'}
            </Button>
          ) : (
            <Button
              onClick={() => onOpenModule('facts')}
              variant="outline"
              className="h-11 border-white/10 bg-white/[.035] text-white/58 hover:bg-white/[.07] hover:text-white"
            >
              <Database className="size-4" />
              查看事实来源
            </Button>
          )}
          <Button
            onClick={onPrimaryAction}
            disabled={!isRevised}
            className="h-11 bg-[linear-gradient(135deg,#725cff,#247dff)] px-5 text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <Sparkles className="size-4" />
            {primaryLabel}
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 xl:grid-cols-[1.03fr_.72fr_1.25fr]">
        <div className="min-w-0 border-b border-white/10 p-4 lg:p-5 xl:border-b-0 xl:border-r">
          <SectionLabel
            icon={PenLine}
            title="母版编辑"
            meta="修改后自动重新校验"
          />
          <label
            className="mt-5 block text-[11px] font-semibold text-white/42"
            htmlFor="campaign-brief"
          >
            活动简报
          </label>
          <Textarea
            id="campaign-brief"
            value={brief}
            onChange={(event) => updateBrief(event.target.value)}
            className="mt-2 min-h-20 resize-none border-white/10 bg-black/15 text-sm leading-6 text-white/72 focus-visible:border-[#8f7cff]/60 focus-visible:ring-[#725cff]/20"
          />

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold text-white/42">
              核心卖点
            </span>
            <span className="text-[10px] text-white/28">3 / 6</span>
          </div>
          <div className="mt-2 grid gap-2">
            {masterSellingPoints.map((point, index) => (
              <article
                key={point.title}
                className="grid grid-cols-[28px_1fr] gap-3 rounded-xl border border-white/[.08] bg-black/15 p-2.5"
              >
                <span className="grid size-7 place-items-center rounded-lg bg-white/[.055] font-mono text-[10px] text-[#b9aaff]">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-xs font-semibold text-white/78">
                    {point.title}
                  </h2>
                  <p className="mt-1 text-[11px] leading-4 text-white/42">
                    {point.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-white/42">
                <CheckCircle2 className="size-3.5 text-[#6ad5a7]" />
                可用事实
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {productFacts.slice(2, 8).map((fact) => (
                  <button
                    key={fact.field}
                    onClick={() =>
                      setSelectedSource(
                        fact.source.includes('MAN')
                          ? 'manual'
                          : fact.source.includes('TR')
                            ? 'manual'
                            : 'listing',
                      )
                    }
                    className="rounded-lg border border-white/[.08] bg-white/[.025] px-2 py-1.5 text-left text-[10px] text-white/48 transition hover:border-[#8f7cff]/35 hover:text-white/72"
                  >
                    {fact.value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#ffad9f]">
                <Ban className="size-3.5" />
                禁用表述
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {blockedClaims.slice(0, 3).map((claim) => (
                  <span
                    key={claim}
                    className="rounded-lg border border-[#ff7c66]/16 bg-[#ff7c66]/[.055] px-2 py-1.5 text-[10px] text-white/45"
                  >
                    {claim}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <label
            className="mt-5 block text-[11px] font-semibold text-white/42"
            htmlFor="brand-tone"
          >
            品牌语气
          </label>
          <Textarea
            id="brand-tone"
            value={brandTone}
            onChange={(event) => updateTone(event.target.value)}
            className="mt-2 min-h-12 resize-none border-white/10 bg-black/15 text-xs leading-5 text-white/62 focus-visible:border-[#8f7cff]/60 focus-visible:ring-[#725cff]/20"
          />
        </div>

        <div className="min-w-0 border-b border-white/10 p-4 lg:p-5 xl:border-b-0 xl:border-r">
          <SectionLabel
            icon={Database}
            title="事实来源"
            meta="每条内容都可追溯"
          />
          <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
            {['全部', '商品图', '说明书', 'Listing', '合成数据'].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setSourceFilter(filter)}
                  className={cn(
                    'shrink-0 rounded-lg px-2.5 py-1.5 text-[10px] transition',
                    sourceFilter === filter
                      ? 'bg-[#725cff] text-white'
                      : 'bg-white/[.04] text-white/38 hover:text-white/68',
                  )}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
          <div className="mt-3 grid gap-2">
            {filteredSources.map((source) => (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className={cn(
                  'grid min-w-0 grid-cols-[44px_1fr] gap-3 rounded-xl border p-2.5 text-left transition',
                  selectedSource === source.id
                    ? 'border-[#8f7cff]/42 bg-[#725cff]/[.08]'
                    : 'border-white/[.08] bg-black/15 hover:border-white/15',
                )}
              >
                <span className="relative grid size-11 place-items-center overflow-hidden rounded-lg bg-white/[.05]">
                  {source.image ? (
                    <Image
                      src={source.image}
                      alt="虚构露营灯演示素材"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    <FileCheck2 className="size-4 text-[#b9aaff]" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold text-[#b9aaff]">
                    {source.label}
                  </span>
                  <span className="mt-1 block truncate text-xs font-medium text-white/72">
                    {source.title}
                  </span>
                  <span className="mt-1 block text-[10px] text-white/32">
                    {source.meta}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div
            className={cn(
              'mt-4 rounded-xl border p-4',
              blocked
                ? 'border-[#ff7c66]/28 bg-[#ff7c66]/[.07]'
                : isRevised
                  ? 'border-[#6ad5a7]/22 bg-[#6ad5a7]/[.055]'
                  : 'border-[#e7a84a]/22 bg-[#e7a84a]/[.055]',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2 text-xs font-semibold',
                blocked
                  ? 'text-[#ffad9f]'
                  : isRevised
                    ? 'text-[#83e5ba]'
                    : 'text-[#ffd28e]',
              )}
            >
              {blocked ? (
                <CircleAlert className="size-4" />
              ) : isRevised ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <ScanSearch className="size-4" />
              )}
              {blocked
                ? '发现 1 项事实阻断'
                : isRevised
                  ? '母版事实校验通过'
                  : '等待校验母版'}
            </div>
            <p className="mt-3 text-xs leading-5 text-white/50">
              {blocked
                ? '“IPX7 waterproof / 12-hour runtime” 强于现有依据，不能进入渠道版本。'
                : isRevised
                  ? '高风险声明已改为报告支持的 IPX4 与 4–8 小时。'
                  : '系统会先核对商品事实，再允许生成各渠道版本。'}
            </p>
            <button
              onClick={() => onOpenModule('facts')}
              className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#c9bdff]"
            >
              查看原始依据 <ChevronRight className="size-3" />
            </button>
          </div>
        </div>

        <div className="min-w-0 p-4 lg:p-5">
          <SectionLabel
            icon={LayoutTemplate}
            title="渠道预览"
            meta={`${activeChannel.label} · ${locale}`}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex max-w-full gap-1 overflow-x-auto">
              {contentChannels.map((item) => {
                const Icon = channelIcons[item.id];
                return (
                  <button
                    key={item.id}
                    onClick={() => onChannelChange(item.id)}
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-semibold transition',
                      channel === item.id
                        ? 'border-[#8f7cff]/40 bg-[#725cff]/16 text-white'
                        : 'border-white/[.08] text-white/38 hover:text-white/68',
                    )}
                  >
                    <Icon className="size-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="flex max-w-full gap-1 overflow-x-auto">
              {contentLocales.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onLocaleChange(item.id)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-md px-2 py-1.5 text-[10px]',
                    locale === item.id
                      ? 'bg-[#725cff] text-white'
                      : 'bg-white/[.04] text-white/35 hover:text-white/65',
                  )}
                >
                  {item.id}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#101621] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#725cff]/16 px-2.5 py-1 text-[10px] font-semibold text-[#c9bdff]">
                  {activeVariant.label}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-semibold',
                    blocked
                      ? 'text-[#ffad9f]'
                      : isRevised
                        ? 'text-[#83e5ba]'
                        : 'text-[#ffd28e]',
                  )}
                >
                  {blocked
                    ? '已阻断'
                    : generated
                      ? '待人工复核'
                      : isRevised
                        ? '安全母版就绪'
                        : '未校验草稿'}
                </span>
              </div>
              <Tabs value={variant} onValueChange={onVariantChange}>
                <TabsList className="h-8 bg-white/[.045] p-1">
                  {listingVariants.map((item) => (
                    <TabsTrigger
                      key={item.id}
                      value={item.id}
                      className="h-6 px-2 text-[10px] text-white/38 data-active:bg-white data-active:text-[#111722]"
                    >
                      {item.id.toUpperCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <h2 className="text-base font-semibold leading-6 tracking-[-.015em] text-white/86">
                {previewTitle}
              </h2>
              <button
                onClick={copyTitle}
                aria-label="复制渠道标题"
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 text-white/38 hover:bg-white/[.06] hover:text-white"
              >
                <Copy className="size-3.5" />
              </button>
            </div>
            <p className="mt-2 text-xs leading-5 text-white/38">
              {activeVariant.angle} · {selectedPreview.note}
            </p>
            <div className="mt-4 grid gap-2">
              {previewBullets.map((bullet, index) => (
                <div
                  key={bullet}
                  className="flex gap-2 rounded-lg bg-white/[.03] p-2.5 text-[11px] leading-5 text-white/56"
                >
                  <span className="font-mono text-[#b9aaff]">0{index + 1}</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
            <p
              aria-live="polite"
              className="mt-2 min-h-4 text-right text-[10px] text-[#83e5ba]"
            >
              {copied}
            </p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
            <button
              onClick={() => onOpenModule('images')}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/15 text-left transition hover:border-[#8f7cff]/30"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src="/aigc/lantern-campsite-16x9.png"
                  alt="虚构露营灯渠道主图预览"
                  fill
                  sizes="(min-width: 1280px) 28vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3">
                  <span className="text-[10px] text-white/62">
                    Hero image · 合成素材
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    {selectedPreview.hero}
                  </span>
                </div>
              </div>
            </button>
            <button
              onClick={() => onOpenModule('video')}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/15 text-left transition hover:border-[#8f7cff]/30"
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  src="/aigc/lantern-social-9x16.png"
                  alt="虚构露营灯短视频预览"
                  fill
                  sizes="(min-width: 1280px) 18vw, 100vw"
                  className="object-cover object-[50%_55%]"
                />
                <div className="absolute inset-0 bg-black/35" />
                <PlayCircle className="absolute left-3 top-3 size-7 text-white" />
                <span className="absolute inset-x-3 bottom-3 text-[11px] font-semibold">
                  15 秒短视频分镜
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/15 p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {productionSteps.map((item, index) => {
            const Icon = item.icon;
            const success = generated || (isRevised && index === 0);
            const danger = blocked && index === 0;
            return (
              <button
                key={item.label}
                onClick={() =>
                  onOpenModule(
                    (
                      [
                        'listing',
                        'images',
                        'video',
                        'localization',
                      ] as AigcModuleId[]
                    )[index],
                  )
                }
                className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.025] p-2.5 text-left transition hover:bg-white/[.045]"
              >
                <span
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-lg',
                    danger
                      ? 'bg-[#ff7c66]/14 text-[#ffad9f]'
                      : success
                        ? 'bg-[#6ad5a7]/12 text-[#83e5ba]'
                        : 'bg-[#725cff]/12 text-[#c9bdff]',
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-white/72">
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      'mt-1 block text-[10px]',
                      danger
                        ? 'text-[#ffad9f]'
                        : success
                          ? 'text-[#83e5ba]'
                          : 'text-white/32',
                    )}
                  >
                    {item.status}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/38">
            <span>
              <strong className="font-semibold text-white/68">v3.1</strong>{' '}
              当前母版
            </span>
            <span>
              事实引用{' '}
              <strong className="font-semibold text-[#83e5ba]">
                {isRevised ? '8 / 8' : '7 / 8'}
              </strong>
            </span>
            <span>
              人工复核{' '}
              <strong
                className={cn(
                  'font-semibold',
                  stage === 'approved' || stage === 'exported'
                    ? 'text-[#83e5ba]'
                    : 'text-[#ffd28e]',
                )}
              >
                {stage === 'approved' || stage === 'exported'
                  ? '已确认'
                  : '待确认'}
              </strong>
            </span>
            <span>
              发布动作{' '}
              <strong className="font-semibold text-white/62">仅模拟</strong>
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => onOpenModule('versions')}
              variant="outline"
              className="h-10 border-white/10 bg-white/[.025] text-white/55 hover:bg-white/[.06] hover:text-white"
            >
              查看版本记录
            </Button>
            <Button
              onClick={onPrimaryAction}
              disabled={!isRevised}
              className="h-10 bg-[#6754f4] text-white hover:bg-[#7765f6] disabled:opacity-35"
            >
              <ArrowRight className="size-4" />
              {primaryLabel}
            </Button>
          </div>
        </div>
        {message ? (
          <output className="mt-3 flex items-center gap-2 rounded-lg border border-[#8f7cff]/16 bg-[#725cff]/[.055] px-3 py-2 text-[11px] text-[#d3caff]">
            <CheckCircle2 className="size-3.5 shrink-0" />
            {message}
          </output>
        ) : null}
      </div>
    </section>
  );
}

function SectionLabel({
  icon: Icon,
  title,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 text-[#b9aaff]" />
        {title}
      </div>
      <span className="text-[10px] text-white/28">{meta}</span>
    </div>
  );
}


