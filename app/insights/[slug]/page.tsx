import { ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { insights } from '@/lib/site-data';

const articleCopy: Record<string, { intro: string; sections: { title: string; copy: string }[]; cta: { label: string; href: string } }> = {
  'why-not-ai-customer-service-first': {
    intro: '高频不等于适合优先自动化。客服同时涉及对外承诺、复杂异常和品牌责任，改错一次的成本可能远高于省下的时间。',
    sections: [
      { title: '先看结果能不能判断对错', copy: '如果同一句回复在不同客户、订单状态和政策下含义不同，模型很难靠统一规则稳定运行。先从工单摘要、资料检索和回复草稿开始，更容易验收。' },
      { title: '先把不可逆动作拿出来', copy: '退款、补偿、交期承诺和公开回复不能藏在“智能客服”四个字里。它们需要权限、审批、记录和明确责任人。' },
      { title: '更好的第一个试点', copy: '选择高频、规则清楚、历史样本充足的辅助环节。用首次处理时间、摘要准确率和漏处理数量做两周验收。' },
    ],
    cta: { label: '体检我的客服流程', href: '/audit?process=%E5%AE%A2%E6%9C%8D%E5%94%AE%E5%90%8E' },
  },
  'from-orders-to-repeat-purchase': {
    intro: '订单只是交易记录。要把它变成复购流程，还要解决客户身份、商品周期、售后状态、跟进责任和人工确认。',
    sections: [
      { title: '先统一客户与订单', copy: '同一客户可能出现在微信、多个店铺和不同表格里。第一步不是预测，而是建立可解释、可回查的客户归一规则。' },
      { title: '窗口不是群发名单', copy: '复购窗口只是一条系统判断。未完成售后、明确拒绝营销或信息不完整的客户应先排除，再由员工确认沟通内容。' },
      { title: '最终交付是下一步动作', copy: '好的系统不只显示“126 人可能复购”，还要说明为什么、由谁跟进、什么时候完成，以及结果怎样写回。' },
    ],
    cta: { label: '查看私域增长方案', href: '/solutions/private-domain' },
  },
  'dashboard-to-weekly-actions': {
    intro: '把六个后台的数据放进一张大屏，只解决了“看见”。真正的经营系统还要把异常变成有负责人、有期限、有证据的动作。',
    sections: [
      { title: '每个指标都要能追溯', copy: '订单、退款、复购的口径必须写清。数字异常时，负责人可以下钻到来源和样本，而不是争论哪张表才是对的。' },
      { title: '判断需要基线', copy: '“退款率 7.5%”本身不说明问题。需要与历史、品类、厂家或批次比较，明确触发异常的规则。' },
      { title: '动作需要人工闸门', copy: '系统可以建议暂停加投、检查批次或回访客户，但停投、停采、报价等关键动作仍由有权限的人确认。' },
    ],
    cta: { label: '进入经营驾驶舱 Demo', href: '/demo' },
  },
};

export function generateStaticParams() { return insights.map((item) => ({ slug: item.slug })); }

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = insights.find((item) => item.slug === slug);
  const copy = articleCopy[slug];
  if (!insight || !copy) notFound();
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <article>
        <header className="border-b border-ink/10 bg-white"><div className="mx-auto max-w-[980px] px-5 py-16 lg:px-10 lg:py-24"><p className="section-kicker">{insight.category}</p><h1 className="mt-7 text-[clamp(2.8rem,6vw,5.6rem)] font-semibold leading-[1.02] tracking-[-.06em] text-ink">{insight.title}</h1><p className="mt-8 max-w-3xl text-xl leading-9 text-ink/55">{copy.intro}</p></div></header>
        <div className="mx-auto max-w-[860px] px-5 py-14 lg:px-10 lg:py-20">
          {copy.sections.map((section, index) => <section key={section.title} className="grid gap-5 border-t border-ink/12 py-10 md:grid-cols-[80px_1fr]"><span className="font-mono text-xs text-accent">0{index + 1}</span><div><h2 className="text-2xl font-semibold tracking-[-.035em] text-ink">{section.title}</h2><p className="mt-4 text-lg leading-8 text-ink/58">{section.copy}</p></div></section>)}
          <a href={copy.cta.href} className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white">{copy.cta.label} <ArrowRight className="size-4" /></a>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
