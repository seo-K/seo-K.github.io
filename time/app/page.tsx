import Link from "next/link";
import HomeHero from "../components/home/HomeHero";
import { blogPosts, homePageData, libraryItems, portfolioItems } from "./data";

export default function HomePage() {
  const featuredProjects = homePageData.featuredPortfolioSlugs
    .map((slug) => portfolioItems.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
  const latestPosts = homePageData.featuredBlogSlugs
    .map((slug) => blogPosts.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);
  const featuredLibrary = homePageData.featuredLibrarySlugs
    .map((slug) => libraryItems.find((item) => item.slug === slug))
    .filter((item) => item !== undefined);

  return (
    <div className="home-shell">
      <div className="home-visual-wrap">
        <HomeHero
          eyebrow={homePageData.mainVisual.eyebrow}
          lines={homePageData.mainVisual.lines}
          statement={homePageData.mainVisual.statement}
          supporting={homePageData.mainVisual.supporting}
          scrollLabel={homePageData.mainVisual.scrollLabel}
        />
      </div>

      <div className="home-content">
        <section id="selected-work" className="page-section home-section" data-reveal="section">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">Selected Work</p>
            <h2>대표 작업</h2>
            <p className="page-description">
              실무 안에서 반복해 다듬은 화면과 구조를 먼저 묶었습니다. 결과물보다
              판단 기준이 드러나는 작업을 골랐습니다.
            </p>
          </div>

          <div className="home-featured-grid">
            {featuredProjects.map((item, index) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className={`home-feature-card home-card ${index === 0 ? "is-primary" : ""}`}
              >
                <div className="home-feature-card__visual" aria-hidden="true">
                  <span className="home-feature-card__glow" />
                  <span className="home-feature-card__mesh" />
                </div>
                <span className="home-feature-card__meta">Project {index + 1}</span>
                <span className="home-feature-card__number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p className="home-feature-card__highlight">{item.highlight}</p>
                <dl className="home-feature-card__facts">
                  <div>
                    <dt>Role</dt>
                    <dd>{item.role}</dd>
                  </div>
                  <div>
                    <dt>Type</dt>
                    <dd>{item.projectType}</dd>
                  </div>
                  <div>
                    <dt>Period</dt>
                    <dd>{item.year}</dd>
                  </div>
                </dl>
                <p className="home-feature-card__excerpt">{item.excerpt}</p>
                <ul className="home-feature-card__tags" aria-label={`${item.title} tags`}>
                  {item.tags.slice(0, 3).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="home-feature-card__action">상세 보기</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-section home-section home-writing" data-reveal="section">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">Latest Writing</p>
            <h2>기록</h2>
            <p className="page-description">
              구현 메모, 접근성 점검, 작업 중 남겨둔 판단을 기록합니다. 만든 뒤에
              남는 문제와 기준을 글로 정리합니다.
            </p>
          </div>

          <div className="home-list-grid">
            {latestPosts.map((post) => (
              <article key={post.slug} className="home-list-card home-card">
                <p className="home-list-card__eyebrow">Writing</p>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section home-section home-library" data-reveal="section">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">Library</p>
            <h2>라이브러리</h2>
            <p className="page-description">
              반복해서 쓰는 패턴과 인터랙션을 정리한 코드 아카이브입니다. 실무에서
              검증한 UI 조각을 재사용 가능한 형태로 모았습니다.
            </p>
          </div>

          <div className="home-list-grid home-list-grid--library">
            {featuredLibrary.map((item) => (
              <article key={item.slug} className="home-list-card home-card">
                <p className="home-list-card__eyebrow">{item.category}</p>
                <h3>
                  <Link href={`/library/${item.slug}`}>{item.title}</Link>
                </h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section home-section home-about-teaser" data-reveal="section">
          <div className="home-section__heading">
            <p className="home-section__eyebrow">About</p>
            <h2>{homePageData.aboutTeaser.title}</h2>
            <p className="page-description">{homePageData.aboutTeaser.description}</p>
          </div>

          <div className="home-about-teaser__grid">
            <div className="home-about-teaser__panel home-card">
              <p className="home-about-teaser__name">강서영</p>
              <p className="home-about-teaser__role">Web Publisher</p>
              <p className="home-about-teaser__copy">
                3년간 기획전 퍼블리싱을 중심으로 일했고, 그 이전 2년 동안 다양한
                사이트 구축 프로젝트를 경험했습니다.
              </p>
              <Link href="/about" className="home-inline-link">
                {homePageData.aboutTeaser.ctaLabel}
              </Link>
            </div>
            <ul className="home-about-teaser__list">
              {homePageData.aboutTeaser.principles.map((item) => (
                <li key={item} className="home-card">
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
