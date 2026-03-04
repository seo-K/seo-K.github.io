export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
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

export const portfolioItems: ContentItem[] = [
  {
    slug: "time-tracker",
    title: "Time Tracker",
    excerpt: "개인 생산성 추적 웹앱",
    content:
      "할 일, 소요 시간, 주간 통계를 한 화면에서 확인할 수 있도록 설계한 프로젝트입니다.",
  },
  {
    slug: "design-system",
    title: "Design System Kit",
    excerpt: "컴포넌트 기반 UI 라이브러리",
    content:
      "일관된 버튼, 타이포그래피, 레이아웃 규칙을 문서화하고 재사용할 수 있게 만든 UI 킷입니다.",
  },
];

export const libraryItems: ContentItem[] = [
  {
    slug: "clean-code-notes",
    title: "Clean Code Notes",
    excerpt: "클린 코드 핵심 정리",
    content:
      "가독성 높은 네이밍, 짧은 함수, 테스트 가능성을 중심으로 정리한 개발 노트입니다.",
  },
  {
    slug: "frontend-architecture",
    title: "Frontend Architecture",
    excerpt: "프론트엔드 구조 설계 메모",
    content:
      "라우팅, 상태관리, 데이터 패칭 계층을 분리해서 확장성을 높이는 방법을 다룹니다.",
  },
];
