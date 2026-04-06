$(function () {
  // =========== COMMON ===========
  // =========== 모든 a태그
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

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
  const headerMenu = ["Main", "Info", "Projects"];
  const ariaControls = ["tab_main", "tab_info", "tab_project"];
  const section = document.querySelectorAll(".main_inner > section");
  const headerSwiper = new Swiper(".main_swiper", {
    speed: 700,
    slideActiveClass: "show",
    followFinger: false,
    mousewheel: {
      sensitivity: 2,
      releaseOnEdges: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: ".menu",
      clickable: true,
      bulletActiveClass: "active",
      bulletClass: "menulist",
      renderBullet: function (index, className) {
        return `<li class="${className}" role="tab" aria-controls="${ariaControls[index]}"><span class="menu_text cursor_event">${headerMenu[index]}</span></li>`;
      },
    },

    on: {
      slideChange: function () {
        const moonBg = document.querySelector(".moon_bg");
        let currentIndex = this.realIndex;

        // swiper 초기화
        if (currentIndex != "2") {
          swiper.slideTo(1, 1000, false);
          ModalSwiper.slideTo(1, 1000, false);
        }

        if (currentIndex == "1") {
          moonBg.classList.add("active");
        } else {
          moonBg.classList.remove("active");
        }
      },
    },
  });

  // 탭 포커스 이벤트
  const menuPage = document.querySelectorAll(".menu > li");
  menuPage.forEach((item) =>
    item.addEventListener("click", () => {
      const sectionList = [...section];
      let currentIndex = headerSwiper.realIndex;

      sectionList.map((list) => {
        list.setAttribute("tabindex", "-1");
      });

      sectionList[currentIndex].setAttribute("tabindex", "0");
      sectionList[currentIndex].querySelector(".focus_title").focus();
    })
  );

  const category = ["html", "react", "app"];

  // project-swiper
  const swiper = new Swiper(".project_swiper", {
    speed: 500,
    direction: "vertical",
    observer: true,
    observeParents: true,
    slidesPerView: "3.5",
    slidesPerGroup: 4,
    watchSlidesProgress: true, // 슬라이드가 1개일때 기능 없애기
    // passiveListeners: false,

    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    pagination: {
      el: ".pagination_cates",
      clickable: true,
      bulletActiveClass: "active",
      bulletClass: "project_cate_list",
      renderBullet: function (index, className) {
        return `<li class="${className}" style="--rotate: ${index}"><span class="cursor_event">${category[index]}</span></li>`;
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
      firstSlideMessage: "첫번째 슬라이드 입니다",
      lastSlideMessage: "마지막 슬라이드 입니다",
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

    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },

    mousewheel: {
      releaseOnEdges: true,
    },

    a11y: {
      prevSlideMessage: "이전 슬라이드",
      nextSlideMessage: "다음 슬라이드",
      slideLabelMessage:
        "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
      firstSlideMessage: "첫번째 슬라이드 입니다",
      lastSlideMessage: "마지막 슬라이드 입니다",
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
  const Menu = document.querySelectorAll(".cursor_event, button");

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
  const closeBtn = document.querySelectorAll(
    ".close_button, .modal_bg, .skip_close"
  );
  let projectSlider = document.querySelectorAll(".project_swiper li");
  const projectList = document.querySelectorAll(".slide_inner");

  projectList.forEach((item) => {
    item.addEventListener("click", (e) => {
      let activeIndex = [...projectSlider].indexOf(item.parentNode);
      modal.classList.add("show");
      modal.focus();
      ModalSwiper.slideTo(activeIndex, 100, false);
    });

    item.addEventListener("keyup", function (e) {
      if (e.keyCode == 13) {
        console.log("enter");
      }
    });
  });

  const ModalClose = () => {
    let activeIndex = ModalSwiper.activeIndex;

    modal.classList.remove("show");
    [...projectList][activeIndex].focus();
  };

  closeBtn.forEach((item) => {
    item.addEventListener("click", () => {
      ModalClose();
    });
  });

  // 모달 오픈시 모달에서 포커스가 나가지 않도록!
  document.addEventListener(
    "focus",
    function (e) {
      if (modal.classList.contains("show") && !modal.contains(e.target)) {
        e.stopPropagation();
        modal.focus();
      }
    },
    true
  );

  modal.addEventListener("keydown", (e) => {
    //keyCode 구 브라우저, which 현재 브라우저
    const code = e.keyCode || e.which;

    if (code == 27) {
      ModalClose();
    }
  });
});
