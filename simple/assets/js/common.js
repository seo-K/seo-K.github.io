// 공통 변수
const windowHeight = window.innerHeight;

// ARTICLE 애니메이션
const observeElements = document.querySelectorAll(".visual > article");
const stickyContent = document.querySelector(".sticky-content");

const handleArticleScroll = () => {
  observeElements.forEach((item, index) => {
    const bottom = item.getBoundingClientRect().bottom;
    stickyContent.classList.toggle(`active_${index}`, 0 < bottom && bottom < item.getBoundingClientRect().height);
  });
};

// PROJECT SCROLL
const projectWrap = document.querySelector(".project");
const projectList = document.querySelectorAll(".project-list");
const headerHeight = document.querySelector("#header").getBoundingClientRect().height * 2;

const handleProjectScroll = () => {
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
};

// CODE SCROLL
const codeWrap = document.querySelector(".code");
const codeButton = document.querySelectorAll(".code__button-list button");

const handleCodeScroll = () => {
  if (codeWrap.getBoundingClientRect().top < 0 && windowHeight < codeWrap.getBoundingClientRect().bottom) {
    const targetScroll = -codeWrap.getBoundingClientRect().top;

    function setGradient(el, percentage) {
      const gradientValue = `linear-gradient(90deg, white ${percentage}%, transparent 0%)`;
      el.style.background = gradientValue;
    }

    codeButton.forEach((item, index) => {
      const startScroll = windowHeight * index;
      const endScroll = windowHeight * (index + 1);

      setGradient(item, 0);

      if (startScroll < targetScroll && targetScroll < endScroll) {
        const progressValue = ((targetScroll - startScroll) / windowHeight) * 100;
        setGradient(item, progressValue);
      }
    });
  }
};

// 스크롤 이벤트 리스너
function scrollHandler() {
  handleArticleScroll();
  handleProjectScroll();
  handleCodeScroll();
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
if (stickyContent) {
  window.addEventListener("scroll", throttledScrollHandler);
}

projectList.forEach((item, index) => {
  item.addEventListener("click", () => scrollToList(index));
});

const scrollToList = (index) => {
  // +1 은 넘어가야 details 가 open 되어서 추가함.
  let y = windowHeight * (index + 1) + 1;
  window.scrollTo(0, y);
};

const onClickVideoBtn = (el) => {
  const videoWrap = el.closest(".sticky-content__video");
  let mobileMode = videoWrap.classList.contains("mobile-mode");

  videoWrap.classList.toggle("mobile-mode");
  el.innerText = mobileMode ? "MOBILE" : "PC";
};
