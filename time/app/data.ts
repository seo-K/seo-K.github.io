export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

export type PortfolioItem = ContentItem & {
  year: string;
  role: string;
  projectType: string;
  highlight: string;
  tags: string[];
};

export type LibraryItem = ContentItem & {
  category: "Swiper";
  previewHtml: string;
  code: string;
};

export const blogPosts: ContentItem[] = [
  {
    slug: "next-routing-basics",
    title: "Next.js App Router 기본 라우팅",
    excerpt: "App Router에서 List/Detail 패턴을 빠르게 만드는 방법",
    content:
      "App Router는 파일 기반 라우팅이라 blog/page.tsx와 blog/[slug]/page.tsx만으로도 리스트/상세 구조를 깔끔하게 만들 수 있습니다.",
  },
  {
    slug: "minimal-css-system",
    title: "미니멀 CSS 시스템",
    excerpt: "변수 중심으로 라이트/다크 테마를 관리하는 방법",
    content:
      "글로벌 CSS에서 color token을 정의하고 class 기반 다크모드를 적용하면 컴포넌트 스타일이 단순해지고 유지보수가 쉬워집니다.",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "event-promotion-publishing",
    title: "이벤트 기획전 퍼블리싱",
    excerpt: "3년간 브랜드 이벤트 기획전과 프로모션 랜딩 페이지를 운영한 작업",
    content:
      "3년간 이벤트 기획전 퍼블리싱을 중심으로 다양한 프로모션 페이지를 제작했습니다. 짧은 일정 안에서 브랜드 톤을 유지하면서도 운영과 수정이 가능한 구조, 접근성을 고려한 화면 구성을 반복적으로 다뤘습니다.",
    year: "3년",
    role: "퍼블리싱",
    projectType: "프로모션 / 기획전",
    highlight: "브랜드별 기획전을 지속적으로 운영하며 실무 대응력을 쌓은 핵심 경험",
    tags: ["이벤트", "운영", "브랜드", "구조 개선"],
  },
  {
    slug: "agency-projects-archive",
    title: "사이트 제작 프로젝트 아카이브",
    excerpt: "그 이전 2년간 쇼핑몰, 어드민, 랜딩 사이트를 구축한 작업",
    content:
      "그 이전 2년 동안 에이전시에서 비타알고, 뉴런, 푸드잇다, 브이드림, 신도리코 등 다양한 프로젝트를 맡았습니다. 쇼핑몰, 어드민, 구인구직, 랜딩 사이트 등 여러 유형의 사이트를 제작하며 HTML, CSS, JavaScript 기반 퍼블리싱 역량을 넓혔습니다.",
    year: "2년",
    role: "퍼블리싱",
    projectType: "사이트 구축",
    highlight: "다양한 도메인의 사이트를 구축하며 기본기와 대응 범위를 넓힌 기반 경험",
    tags: ["에이전시", "구축", "쇼핑몰", "랜딩"],
  },
  {
    slug: "mardi-renina-campaign",
    title: "마르디 · 르니나 기획전",
    excerpt: "브랜드별 무드에 맞춘 기획전 퍼블리싱 작업",
    content:
      "요일에서 마르디, 르니나 브랜드 기획전 퍼블리싱을 맡았습니다. 브랜드별 톤을 해치지 않으면서도 운영 환경에서 적용 가능한 구조를 만드는 데 집중했습니다.",
    year: "2023-현재",
    role: "퍼블리싱",
    projectType: "브랜드 캠페인",
    highlight: "브랜드 무드와 운영 구조를 동시에 맞춘 기획전 작업",
    tags: ["브랜드", "캠페인", "톤앤매너"],
  },
  {
    slug: "tir-robotics-toyota-app",
    title: "티로보틱스 · 도요타 앱",
    excerpt: "앱 및 서비스 화면 퍼블리싱 프로젝트 참여",
    content:
      "아이오센트레 재직 시 티로보틱스와 도요타 앱 프로젝트에 참여했습니다. 서비스 성격에 맞는 UI 구조를 빠르게 파악하고, 화면 단위 퍼블리싱과 협업 대응 경험을 쌓았습니다.",
    year: "2023",
    role: "퍼블리싱",
    projectType: "앱 / 서비스",
    highlight: "서비스 성격에 맞춰 화면 구조와 협업 대응을 빠르게 수행한 프로젝트",
    tags: ["앱", "서비스", "협업"],
  },
  {
    slug: "mlb-global-renewal",
    title: "MLB 글로벌 사이트 리뉴얼",
    excerpt: "쇼피파이 기반 글로벌 사이트 리뉴얼에 참여한 작업",
    content:
      "MLB 쇼피파이 글로벌 사이트 리뉴얼 작업은 잠시 참여한 프로젝트였습니다. 공통 UI 정리와 운영 관점에서 유지보수 가능한 마크업/스타일 구성 경험을 보완한 작업으로 정리할 수 있습니다.",
    year: "단기 참여",
    role: "퍼블리싱",
    projectType: "글로벌 커머스",
    highlight: "메인 경력이라기보다 글로벌 운영 구조를 경험한 보조 프로젝트",
    tags: ["Shopify", "글로벌", "운영"],
  },
];

export const homePageData = {
  mainVisual: {
    eyebrow: "TIME ARCHIVE",
    lines: ["OPERABLE", "EDITORIAL", "INTERACTION"],
    statement: "구조와 움직임이 함께 읽히는 화면을 만듭니다.",
    supporting: "작업과 기록이 한 흐름으로 이어지는 웹 퍼블리싱 아카이브.",
    scrollLabel: "selected work / writing / library",
  },
  aboutTeaser: {
    title: "작업 기준",
    description:
      "소개는 뒤로 두고, 여기서는 어떤 화면을 만드는지보다 어떤 기준으로 다듬는지에 집중합니다.",
    principles: [
      "웹 표준과 읽기 순서를 먼저 정리합니다.",
      "운영 중 수정과 확장이 가능한 구조를 우선합니다.",
      "보여주기 위한 모션보다 이해를 돕는 동작만 남깁니다.",
    ],
    ctaLabel: "About 보기",
  },
  strengths: [
    "시맨틱 마크업",
    "운영 가능한 CSS",
    "자연스러운 UX 인터랙션",
  ],
  featuredPortfolioSlugs: ["event-promotion-publishing", "agency-projects-archive"],
  featuredBlogSlugs: ["next-routing-basics", "minimal-css-system"],
  featuredLibrarySlugs: ["swiper-basic", "swiper-fade"],
};

const basePreviewStyle = `
  body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f6f8fb; }
  .preview-wrap { width: min(560px, 100%); margin: 0 auto; }
  .demo-swiper { width: 100%; border-radius: 12px; overflow: hidden; background: #fff; }
  .swiper-slide { height: 280px; color: #fff; font-size: 24px; font-weight: 700; display: grid; place-items: center; }
  .swiper-slide:nth-child(1) { background: #3b82f6; }
  .swiper-slide:nth-child(2) { background: #14b8a6; }
  .swiper-slide:nth-child(3) { background: #f97316; }
  .swiper-slide:nth-child(4) { background: #a855f7; }
  .swiper-slide:nth-child(5) { background: #ef4444; }
  .swiper-pagination-bullet { background: #111; }
  .swiper-button-next, .swiper-button-prev { color: #111; }
`;

function previewDoc(configScript: string, withNav = false) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://static.mlb-korea.com/motioneye/common/css/swiper-bundle.min.css" />
    <style>${basePreviewStyle}</style>
  </head>
  <body>
    <div class="preview-wrap">
      <div class="swiper demo-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
        </div>
        <div class="swiper-pagination"></div>
        ${withNav ? '<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>' : ""}
      </div>
    </div>

    <script src="https://static.mlb-korea.com/motioneye/common/js/swiper/swiper-bundle.min.js"></script>
    <script>
      new Swiper(".demo-swiper", ${configScript});
    </script>
  </body>
</html>`;
}

export const libraryItems: LibraryItem[] = [
  {
    slug: "swiper-basic",
    title: "Basic Swiper",
    excerpt: "기본 슬라이드 + pagination",
    content: "가장 기본적인 Swiper 설정입니다. loop와 pagination을 포함합니다.",
    category: "Swiper",
    previewHtml: previewDoc(`{
  loop: true,
  speed: 600,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
}`),
    code: `const basicSwiper = new Swiper(".basicSwiper", {
  loop: true,
  speed: 600,
  pagination: {
    el: ".basicSwiper .event__swiper-pagination",
    clickable: true,
  },
});`,
  },
  {
    slug: "swiper-fade",
    title: "Fade Swiper",
    excerpt: "fade 효과 + autoplay",
    content: "슬라이드 전환을 페이드로 처리하고 자동재생을 적용한 샘플입니다.",
    category: "Swiper",
    previewHtml: previewDoc(`{
  effect: "fade",
  fadeEffect: { crossFade: true },
  loop: true,
  speed: 900,
  autoplay: {
    delay: 1600,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
}`),
    code: `const fadeSwiper = new Swiper(".fadeSwiper", {
  effect: "fade",
  fadeEffect: { crossFade: true },
  loop: true,
  speed: 900,
  autoplay: {
    delay: 1600,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".fadeSwiper .event__swiper-pagination",
    clickable: true,
  },
});`,
  },
  {
    slug: "swiper-rolling",
    title: "Rolling Swiper",
    excerpt: "끊김 없이 흐르는 롤링 슬라이드",
    content: "slidesPerView:auto와 linear 타이밍으로 연속 롤링 효과를 만드는 샘플입니다.",
    category: "Swiper",
    previewHtml: previewDoc(`{
  slidesPerView: "auto",
  loop: true,
  speed: 3500,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
}`),
    code: `const rollingSwiper = new Swiper(".rollingSwiper", {
  slidesPerView: "auto",
  loop: true,
  speed: 3500,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
});`,
  },
  {
    slug: "swiper-coverflow",
    title: "Coverflow Swiper",
    excerpt: "3D coverflow 효과",
    content: "centeredSlides와 coverflowEffect 설정으로 입체적인 캐러셀을 구현합니다.",
    category: "Swiper",
    previewHtml: previewDoc(`{
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  coverflowEffect: {
    rotate: 20,
    stretch: 30,
    depth: 180,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
}`),
    code: `const coverflowSwiper = new Swiper(".coverflowSwiper", {
  effect: "coverflow",
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  coverflowEffect: {
    rotate: 20,
    stretch: 30,
    depth: 180,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".coverflowSwiper .event__swiper-pagination",
    clickable: true,
  },
});`,
  },
  {
    slug: "swiper-cards",
    title: "Cards Swiper",
    excerpt: "카드 스택 전환 효과",
    content: "effect: cards와 navigation 버튼을 결합한 카드형 슬라이더 샘플입니다.",
    category: "Swiper",
    previewHtml: previewDoc(`{
  effect: "cards",
  grabCursor: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
}`, true),
    code: `const cardSwiper = new Swiper(".cardSwiper", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  navigation: {
    nextEl: ".cardSwiper .event__swiper-button-next",
    prevEl: ".cardSwiper .event__swiper-button-prev",
  },
  pagination: {
    el: ".cardSwiper .event__swiper-pagination",
    clickable: true,
  },
});`,
  },
];
