export default function AboutPage() {
  return (
    <section className="page-section about-page">
      <div className="about-page__hero">
        <p className="home-section__eyebrow">About</p>
        <h1>강서영</h1>
        <p className="page-description">
          웹 표준과 접근성을 기반으로 화면 구조를 설계하는 웹 퍼블리셔입니다.
        </p>
      </div>

      <div className="about-page__grid">
        <section className="about-page__panel card-line">
          <h2>소개</h2>
          <p>
            안녕하세요. 퍼블리싱을 좋아하는 강서영입니다. 2020년 개인 판매를 준비하며
            상세페이지를 만들기 시작한 것이 웹에 관심을 갖게 된 계기였습니다.
          </p>
          <p>
            이후 2년 동안 웹에이전시에서 쇼핑몰, 어드민, 구인구직, 랜딩 사이트 등
            다양한 유형의 사이트를 제작했고, 그 다음 3년간은 브랜드 이벤트 기획전과
            프로모션 페이지 퍼블리싱을 중심으로 일하고 있습니다.
          </p>
        </section>

        <section className="about-page__panel card-line">
          <h2>기본 정보</h2>
          <dl className="about-page__info">
            <div>
              <dt>Name</dt>
              <dd>강서영</dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>dkasid@naver.com</dd>
            </div>
            <div>
              <dt>Current Focus</dt>
              <dd>이벤트 기획전 퍼블리싱, CSS 확장 문법, 웹 접근성</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="about-page__grid">
        <section className="about-page__panel card-line">
          <h2>기술 스택</h2>
          <ul className="about-page__chips">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Bootstrap</li>
            <li>Git</li>
          </ul>
          <p className="about-page__note">학습 중: three.js, 웹 접근성</p>
        </section>

        <section className="about-page__panel card-line">
          <h2>선호하는 작업 방식</h2>
          <ul className="about-page__list">
            <li>시맨틱 구조와 읽기 흐름을 먼저 정리합니다.</li>
            <li>운영과 유지보수를 고려해 스타일 규칙을 잡습니다.</li>
            <li>브랜드 톤을 해치지 않는 선에서 인터랙션을 설계합니다.</li>
          </ul>
        </section>
      </div>

      <section className="about-page__panel card-line">
        <h2>경력</h2>
        <ul className="about-page__timeline">
          <li>
            <strong>2021.07</strong>
            <p>프래프 재직, 13개 프로젝트 담당</p>
            <span>비타알고, 뉴런, 푸드잇다, 브이드림, 신도리코 등 다양한 구축 프로젝트 경험</span>
          </li>
          <li>
            <strong>2023.02</strong>
            <p>아이오센트레 재직</p>
            <span>티로보틱스, 도요타 앱 프로젝트 참여</span>
          </li>
          <li>
            <strong>2023.10 ~ 현재</strong>
            <p>요일 재직</p>
            <span>마르디, 르니나 기획전과 MLB 이벤트 기획전 퍼블리싱을 중심으로 담당. MLB 쇼피파이 글로벌 사이트 리뉴얼은 단기 참여 프로젝트</span>
          </li>
        </ul>
      </section>
    </section>
  );
}
