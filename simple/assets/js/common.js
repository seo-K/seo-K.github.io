// 공통 변수
const windowHeight = window.innerHeight;

// ARTICLE 애니메이션
const observeElements = document.querySelectorAll(".visual > article");
const stickyContent = document.querySelector(".sticky-content");

function handleArticleScroll() {
  observeElements.forEach((item, index) => {
    const bottom = item.getBoundingClientRect().bottom;
    stickyContent.classList.toggle(`active_${index}`, 0 < bottom && bottom < item.getBoundingClientRect().height);
  });
}

// PROJECT PROGRESS
const projectWrap = document.querySelector(".project");
const projectList = document.querySelectorAll(".project-list");
const headerHeight = document.querySelector("#header").getBoundingClientRect().height * 2;

function handleProjectScroll() {
  if (projectWrap.getBoundingClientRect().top < 0 && windowHeight < projectWrap.getBoundingClientRect().bottom) {
    const targetScroll = -projectWrap.getBoundingClientRect().top;

    projectList.forEach((item, index) => {
      const startScroll = windowHeight * index;
      const endScroll = windowHeight * (index + 1);

      item.querySelector("progress").value = 0;
      item.classList.remove("opened");
      item.querySelector("details").open = false;

      if (startScroll < targetScroll && targetScroll < endScroll) {
        const progressValue = ((targetScroll - startScroll) / windowHeight) * 100;
        item.querySelector("progress").value = progressValue;
        item.classList.add("opened");
        item.querySelector("details").open = true;
      }
    });
  }
}

// 스크롤 이벤트 리스너
function scrollHandler() {
  handleArticleScroll();
  handleProjectScroll();
}

// 스크롤 이벤트에 딜레이 적용하여 최적화
let isScrolling = false;
function throttledScrollHandler() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      scrollHandler();
      isScrolling = false;
    });
  }
}

// 스크롤 이벤트 리스너 등록
window.addEventListener("scroll", throttledScrollHandler);
