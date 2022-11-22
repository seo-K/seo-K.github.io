// AOS
AOS.init();

//기본 세팅
// common a
$(function () {
  /*모든 a태그*/
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // 팝업용 함수
  // body 스크롤 막음
  function scrollOff() {
    $("body")
      .addClass("scrollOff")
      .on("scroll touchmove mousewheel", function (e) {
        e.stopPropagation();
      });
  }

  // body 스크롤 풀기
  function scrollOn() {
    $("body").removeClass("scrollOff").off("scroll touchmove mousewheel");
  } // 팝업용 함수 END
}); //기본 세팅 END

$(function () {
  // =========== COMMON
  // 젤리 폰트
  const EachText = document.querySelectorAll(".jelly-text > span");

  EachText.forEach((item) => {
    item.addEventListener("mouseover", toggleRubberBand);

    function toggleRubberBand(e) {
      item.classList.add("active");
      item.addEventListener("animationend", () => {
        item.classList.remove("active");
      });
    }
  });

  // =========== HEADER
  /** Logo Scroll event (scale + opacity animation) */
  function onScroll() {
    let value = 1 - window.scrollY / 500;

    if (window.scrollY < logoHeight) {
      logo.style.transform = `scale(${value}) translateY(${window.scrollY}px)`;
      logo.style.opacity = value;
    }
  }
  const logo = document.querySelector(".top-content");
  const logoHeight = document.querySelector(".top-content").clientHeight;

  //   const passiveEvent = passiveEventSupported
  //   ? { capture: false, passive: true }
  //   : false
  // window.addEventListener('scroll', onScroll, passiveEvent)

  window.addEventListener("scroll", onScroll, { passive: true });

  /** header menu 마우스 엔터이벤트 */
  function MouseEnterEvent(e) {
    if (this.classList.contains("orange-card")) {
      this.classList.remove("show");
    } else {
      this.classList.add("hidden");
    }
    // console.log("마우스");
  }

  function MouseLeaveEvent(e) {
    if (this.classList.contains("orange-card")) {
      this.classList.add("show");
    } else {
      this.classList.remove("hidden");
    }
    // console.log("마우스 나감");
  }

  function PianoEvent() {
    if (this.contain(".orange-card")) {
    }
  }
  const menu = document.querySelectorAll(".menu-card");

  menu.forEach((menuList) => {
    menuList.addEventListener("mouseover", MouseEnterEvent);
    menuList.addEventListener("mouseleave", MouseLeaveEvent);
  });

  // =========== MAIN
  // projectList Event
  const projectList = document.querySelectorAll(".project-img-list > li");
  const projectTextList = document.querySelectorAll(".project-text-list > li");

  projectList.forEach((list) => {
    list.addEventListener("click", (e) => setActive(list));
  });

  const setActive = (el) => {
    let index = $(el).index();
    let projectText = [...projectTextList];

    // tab
    [...projectList].forEach((list) => list.classList.remove("active"));
    el.classList.add("active");

    // content
    projectText[index].scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // project scroll connect 스크롤 연동 실패
  // const projectSection = document.querySelector(".project-section");
  // const projectListContainer = document.querySelector(".project-list-container");
  // const projectTextContainer = document.querySelector(".project-text-container");

  // projectListContainer.addEventListener("wheel", function (e) {
  //   projectTextContainer.scrollTop = this.scrollTop;
  //   // console.log(e.deltaY, e, e.deltaX);
  //   // console.log("first");
  // });

  // projectTextContainer.addEventListener("wheel", function (e) {
  //   projectListContainer.scrollTop = this.scrollTop;
  //   console.log(e.deltaY, e, e.deltaX);
  //   console.log("움직인다");
  // });

  // function zoom(e) {
  //   e.preventDefault();

  //   let scale = e.deltaY * -0.01;

  //   scale = Math.min(Math.max(0.125, scale), 4);

  //   projectListContainer.style.transform = `scale(${scale})`;
  // }

  // let scale = 1;
  // const el = document.querySelector('div');
  // el.onwheel = zoom;
});
