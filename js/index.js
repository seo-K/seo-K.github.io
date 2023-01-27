$(function () {
  // =========== COMMON ===========
  // =========== 모든 a태그
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // =========== HEADER ===========
  const main = document.querySelector("#main");
  const mainInner = document.querySelector(".main_inner");
  const menuList = document.querySelectorAll(".menu > li");
  const articleList = document.querySelectorAll(".main_inner > article");
  const moonBg = document.querySelector(".moon_bg");
  let activeIndex = 0;

  // 페이지 이동 함수
  function pageTransformEvent(idx) {
    if (idx >= 0 && idx < 3) {
      let movePercent = 100 * idx; // inner 움직일 양
      activeIndex = idx;

      // 초기화
      [...menuList].map((menu) => menu.classList.remove("active"));
      [...articleList].map((menu) => menu.classList.remove("show"));

      menuList[idx].classList.add("active");
      articleList[idx].classList.add("show");

      mainInner.style.transform = `translateX(-${movePercent}%)`;

      // moonBg animation
      if (idx == "1") {
        moonBg.classList.add("active");
      } else {
        moonBg.classList.remove("active");
      }
    }
  }

  // 메뉴 클릭 시
  menuList.forEach((list, idx) => {
    list.addEventListener("click", function (e) {
      e.preventDefault();

      pageTransformEvent(idx);
    });
  });

  // 페이지 터치 시
  function TouchEvent() {
    let startXY, endXY;

    winWidth = window.innerWidth;

    if (winWidth > 1024) {
      main.addEventListener("mousedown", mouseStart);
      main.addEventListener("mouseup", mouseEnd);

      function mouseStart(e) {
        startXY = e.clientX;
        e.preventDefault();
      }
      function mouseEnd(e) {
        endXY = e.clientX;
        PageTransform();
      }
    }

    // else {
    //   main.addEventListener("touchstart", touchStart);
    //   main.addEventListener("touchend", touchEnd);

    //   function touchStart(e) {
    //     startXY = e.touches[0].pageX;
    //     e.preventDefault();
    //   }

    //   function touchEnd(e) {
    //     endXY = e.changedTouches[0].pageX;
    //     PageTransform();
    //   }
    // }

    function PageTransform() {
      if (endXY - startXY > 50) {
        pageTransformEvent(activeIndex - 1);
      } else if (endXY - startXY < 0) {
        pageTransformEvent(activeIndex + 1);
      } else {
        pageTransformEvent(activeIndex);
      }
    }
  }

  TouchEvent();

  // =========== INFO ===========
  winWidth = window.innerWidth;
  let delay = 1000;
  let timer = null;

  //Javascript
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      console.log("resize");
    }, delay);
  });

  // =========== SWIPER ===========
  const category = ["html", "react", "app"];

  // project-swiper
  const swiper = new Swiper(".project_swiper", {
    speed: 500,
    direction: "vertical",
    observer: true,
    observeParents: true,
    mousewheel: {
      releaseOnEdges: true,
    },
    slidesPerView: "3.5",
    slidesPerGroup: 4,
    watchSlidesProgress: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true, // 스와이퍼에 grab cursor
    loopFillGroupWithBlank: true,
    // passiveListeners: false,

    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },

    pagination: {
      el: ".pagination_cates",
      clickable: true,
      bulletActiveClass: "active",
      bulletClass: "project_cate_list",
      renderBullet: function (index, className) {
        return `<li class="${className}" style="--rotate: ${index}"><button type="button">${category[index]}</button></li>`;
      },
    },

    navigation: {
      nextEl: ".project_swiper_next",
      prevEl: ".project_swiper_prev",
    },

    a11y: {
      prevSlideMessage: "이전 슬라이드",
      nextSlideMessage: "다음 슬라이드",
      slideLabelMessage:
        "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    },
  });

  // modal-swiper
  const ModalSwiper = new Swiper(".modal_swiper", {
    speed: 500,
    parallax: true,
    watchSlidesProgress: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true,
    thumbs: {
      swiper: swiper,
    },
    mousewheel: {
      releaseOnEdges: true,
    },

    observer: true,
    observeParents: true,

    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },

    navigation: {
      nextEl: ".modal_swiper_next",
      prevEl: ".modal_swiper_prev",
    },

    a11y: {
      prevSlideMessage: "이전 슬라이드",
      nextSlideMessage: "다음 슬라이드",
      slideLabelMessage:
        "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
    },

    on: {
      slideChange: function () {
        const progressBar = document.querySelector(".bar");
        let val = 135 * ModalSwiper.progress;

        progressBar.style.transform = `rotate(${val}deg)`;
      },
    },
  });

  // =========== Cursor ===========
  const customCursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => {
      customCursor.style.top = `${e.clientY - customCursor.offsetHeight / 2}px`;
      customCursor.style.left = `${e.clientX - customCursor.offsetWidth / 2}px`;
    });
  });

  const Link = document.querySelectorAll("a");
  const Menu = document.querySelectorAll("button");

  [...Link].map((item) =>
    item.addEventListener("mouseenter", () => {
      customCursor.classList.add("active");
    })
  );

  [...Link].map((item) =>
    item.addEventListener("mouseleave", () => {
      customCursor.classList.remove("active");
    })
  );

  [...Menu].map((item) =>
    item.addEventListener("mouseenter", () => {
      customCursor.classList.add("menu_active");
    })
  );
  [...Menu].map((item) =>
    item.addEventListener("mouseleave", () => {
      customCursor.classList.remove("menu_active");
    })
  );

  // Modal
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelectorAll(".close_button, .modal_bg");
  const projectList = document.querySelectorAll(".slide_inner");

  projectList.forEach((item) => {
    item.addEventListener("click", () => {
      modal.classList.add("show");
    });
  });

  closeBtn.forEach((item) => {
    item.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  });
});
