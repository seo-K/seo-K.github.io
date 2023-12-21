// ARTICLE 애니메이션
const observeElements = document.querySelectorAll(".visual > article");
const stickyContent = document.querySelector(".sticky-content");
let winWidth = window.innerWidth;
let activeIndex = 0;
function skillAnimation() {
  observeElements.forEach((item, index) => {
    if (0 < item.getBoundingClientRect().bottom && item.getBoundingClientRect().bottom < item.getBoundingClientRect().height) {
      stickyContent.classList.add(`active_${index}`);
    } else {
      stickyContent.classList.remove(`active_${index}`);
    }
  });
  // isScrolling = false;
}

function stickAnimation() {
  // if (!isScrolling) {
  //   isScrolling = true;
  // }
  requestAnimationFrame(skillAnimation);
}

// PROJECT PROGRESS
const projectWrap = document.querySelector(".project");
const projectList = document.querySelectorAll(".project-list");
let isScrolling = false;

const scrollTop = window.scrollY;
const windowHeight = window.innerHeight;
const headerHeight = document.querySelector("#header").getBoundingClientRect().height * 2;

function handleScroll() {
  if (projectWrap.getBoundingClientRect().top < 0 && windowHeight < projectWrap.getBoundingClientRect().bottom) {
    projectList.forEach((item, index) => {
      const startScroll = windowHeight * index;
      const endScroll = windowHeight * (index + 1);
      const targetScroll = -projectWrap.getBoundingClientRect().top;

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

  isScrolling = false;
}

function scrollHandler() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(handleScroll);
  }
}

window.addEventListener("scroll", stickAnimation);
window.addEventListener("scroll", scrollHandler);
