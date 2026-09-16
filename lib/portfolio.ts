export type WorkImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type PortfolioWork = {
  slug: string;
  title: string;
  subtitle: string;
  category: '品牌与宣传影像' | 'AI 模特与商品视觉' | '叙事短片';
  label: string;
  cover: WorkImage;
  description: string;
  highlights: string[];
  video?: {
    src: string;
    duration: string;
    portrait?: boolean;
    poster?: string;
  };
  galleryTitle: string;
  images: WorkImage[];
  related: string[];
};

const media = (slug: string, file: string) => `/works/${slug}/${file}`;
const still = (
  slug: string,
  file: string,
  caption: string,
  width = 1600,
  height = 900,
): WorkImage => ({
  src: media(slug, file),
  alt: caption,
  caption,
  width,
  height,
});
const sageCaptions: Record<number, string> = {
  1: '背面轮廓',
  2: '领口与饰件',
  3: '坐姿与场景',
  4: '拱廊里的浅绿套装',
  5: '腰线与比例',
  6: '光影中的人物',
};
const ivoryCaptions: Record<number, string> = {
  1: '翻领与面料纹理',
  2: '背面剪裁',
  3: '奶油白西装全身造型',
  4: '上装与层次',
  5: '细节与姿态',
  6: '简洁室内的穿着状态',
};
const sageImages = [4, 5, 1, 2, 3, 6].map((n) =>
  still(
    'sage-tailoring',
    `${n}.webp`,
    sageCaptions[n],
    n <= 2 ? 1087 : 1536,
    n <= 2 ? 1447 : 1152,
  ),
);
const ivoryImages = [3, 4, 2, 1, 5, 6].map((n) =>
  still(
    'ivory-tailoring',
    `${n}.webp`,
    ivoryCaptions[n],
    n <= 2 ? 1087 : 1152,
    n <= 2 ? 1447 : 1536,
  ),
);

export const portfolioWorks: PortfolioWork[] = [
  {
    slug: 'china-bank',
    title: '中国银行',
    subtitle: '海外生活主题宣传片',
    category: '品牌与宣传影像',
    label: '正式客户项目 · 商业宣传片',
    cover: still(
      'china-bank',
      'cover.jpg',
      '中国银行宣传片：海外街头的生活场景',
      1920,
      1080,
    ),
    description:
      '从留学缴费到海外生活，以多人物、多场景串联中行银联信用卡的业务表达。让具体的信息，进入真实可感的生活语境。',
    highlights: ['海外生活场景', '多人物叙事', '业务信息表达'],
    video: { src: media('china-bank', 'film.mp4'), duration: '01:32' },
    galleryTitle: '从远行，到日常',
    images: [
      still('china-bank', 'still-1.jpg', '城市与远行'),
      still('china-bank', 'still-2.jpg', '海外生活片刻'),
      still('china-bank', 'still-3.jpg', '多人物的品牌表达'),
    ],
    related: ['shanxia-yousong', 'sage-tailoring'],
  },
  {
    slug: 'shanxia-yousong',
    title: '山下有松',
    subtitle: '慢一点',
    category: '品牌与宣传影像',
    label: '品牌影像 · 平面视觉',
    cover: still(
      'shanxia-yousong',
      'film-poster.jpg',
      '山下有松《慢一点》品牌片画面',
      1920,
      1080,
    ),
    description:
      '把日常的松弛，写进品牌的画面。从一支品牌片，到两幅平面表达，让人物、材质与生活气息相互呼应。',
    highlights: ['品牌气质', '生活方式', '横竖版视觉'],
    video: { src: media('shanxia-yousong', 'film.mp4'), duration: '00:25' },
    galleryTitle: '同一份气质，两种画幅',
    images: [
      still(
        'shanxia-yousong',
        'poster-landscape.png',
        '编织日常 · 横版视觉',
        1448,
        1086,
      ),
      still(
        'shanxia-yousong',
        'poster-portrait.png',
        '把日子，一点点收好 · 竖版视觉',
        1086,
        1448,
      ),
    ],
    related: ['lifestyle', 'china-bank'],
  },
  {
    slug: 'sage-tailoring',
    title: '浅绿套装',
    subtitle: '从场景，到细节',
    category: 'AI 模特与商品视觉',
    label: 'AI 服装视觉 · 场景系列',
    cover: sageImages[0],
    description:
      '浅绿套装置于暖金色拱廊中。以全身、背面、半身与饰件特写，组织一组有统一光线和氛围的服装视觉，再延伸为动态展示。',
    highlights: ['场景视觉', '服装细节', '静态与动态'],
    video: {
      src: media('sage-tailoring', 'film.mp4'),
      duration: '00:10',
      portrait: true,
      poster: media('sage-tailoring', 'video-poster.jpg'),
    },
    galleryTitle: '一个造型，完整的视觉系列',
    images: sageImages,
    related: ['ivory-tailoring', 'lifestyle'],
  },
  {
    slug: 'twenty-four',
    title: '第二十四张',
    subtitle: '一卷胶片，一段未说出口的心事',
    category: '叙事短片',
    label: '叙事短片 · AI 影像探索',
    cover: still(
      'twenty-four',
      'cover.jpg',
      '《第二十四张》：夕阳中举起相机的人物',
      992,
      432,
    ),
    description:
      '用一卷胶片串联校园、相处与告白。取景器里的目光、相机上的计数和江边的夕阳，共同留下关系慢慢靠近的痕迹。',
    highlights: ['人物关系', '情绪表达', '连续叙事'],
    video: { src: media('twenty-four', 'film.mp4'), duration: '02:51' },
    galleryTitle: '被记住的片刻',
    images: [
      still('twenty-four', 'still-1.jpg', '取景器里的目光', 992, 432),
      still('twenty-four', 'still-2.jpg', '江边的相处', 992, 432),
      still('twenty-four', 'still-3.jpg', '夕阳里的回应', 992, 432),
    ],
    related: ['shanxia-yousong', 'china-bank'],
  },
  {
    slug: 'ivory-tailoring',
    title: '奶油白西装',
    subtitle: '让轮廓与纹理成为主角',
    category: 'AI 模特与商品视觉',
    label: 'AI 服装视觉 · 商品目录',
    cover: ivoryImages[0],
    description:
      '简洁的浅灰室内，把注意力留给服装本身。从整体穿着到翻领、面料与背面剪裁，以多角度图片和短片呈现同一套造型。',
    highlights: ['商品目录', '多角度展示', '面料与剪裁'],
    video: {
      src: media('ivory-tailoring', 'film.mp4'),
      duration: '00:08',
      portrait: true,
      poster: media('ivory-tailoring', 'video-poster.jpg'),
    },
    galleryTitle: '从完整造型，看到局部纹理',
    images: ivoryImages,
    related: ['sage-tailoring', 'lifestyle'],
  },
  {
    slug: 'lifestyle',
    title: '包袋与生活方式',
    subtitle: '让商品走进日常',
    category: 'AI 模特与商品视觉',
    label: 'AI 模特 · 商品与场景',
    cover: still(
      'ai-model-editorial',
      'window-bag.png',
      '窗边木桌上的米白编织包与人物',
      2048,
      1152,
    ),
    description:
      '窗边的暖光、推门的片刻、街角的一束花。以人物、商品和生活场景，构建柔和而有细节的品牌表达。',
    highlights: ['模特形象', '商品搭配', '生活场景'],
    galleryTitle: '光线里的日常',
    images: [
      still('ai-model-editorial', 'window-bag.png', '窗边的片刻', 2048, 1152),
      still(
        'ai-model-editorial',
        'doorway-bag.png',
        '带着日常出发',
        2048,
        1152,
      ),
      still(
        'ai-model-editorial',
        'ivory-editorial.png',
        '留一点柔软',
        2048,
        1152,
      ),
      still(
        'ai-model-editorial',
        'cafe-portrait.png',
        '午后的目光',
        2048,
        1152,
      ),
      still('lifestyle', 'wall-shadow.webp', '树影经过的墙面'),
      still(
        'ai-model-editorial',
        'orange-knit.png',
        '街角，一束花',
        1536,
        2048,
      ),
    ],
    related: ['shanxia-yousong', 'sage-tailoring'],
  },
];

export const featuredWorks = portfolioWorks.slice(0, 4);
export const workCategories = [
  '全部',
  '品牌与宣传影像',
  'AI 模特与商品视觉',
  '叙事短片',
] as const;
export const findWork = (slug: string) =>
  portfolioWorks.find((work) => work.slug === slug);
