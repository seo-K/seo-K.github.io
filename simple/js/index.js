// AOS
AOS.init();

$(function () {
  // =========== COMMON ===========
  // =========== 모든 a태그
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // =========== 로딩 기능

  // =========== 다크모드

  // =========== HEADER ===========
  const main = document.querySelector("#main");
  const mainInner = document.querySelector(".main_inner");
  const menuList = document.querySelectorAll(".menu > li");
  const articleList = document.querySelectorAll(".main_inner > article");
  const moonBg = document.querySelector(".moon_bg");
  let pageWidth = main.clientWidth;

  for (var i = 0; i < menuList.length; i++) {
    menuList[i]
      .querySelector(".menu_button")
      .addEventListener("click", function (e) {
        let activeIndex = [...menuList].indexOf(this.parentNode);
        let movePx = pageWidth * activeIndex; // inner 움직일 양

        e.preventDefault();
        for (var j = 0; j < menuList.length; j++) {
          menuList[j].classList.remove("active");
          articleList[j].classList.remove("show");
        }
        this.parentNode.classList.add("active");
        articleList[activeIndex].classList.add("show");
        mainInner.style.transform = `translateX(-${movePx}px)`;

        // moonBg animation
        if (activeIndex == "1") {
          moonBg.classList.add("active");
        } else {
          moonBg.classList.remove("active");
        }
      });
  }

  // info show 일시

  // =========== SWIPER ===========
  let width = main.clientWidth;
  console.log(width);

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
    watchSlidesProgress: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true, // 스와이퍼에 grab cursor

    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },

    pagination: {
      el: ".pagination_cate",
      clickable: true,
      bulletActiveClass: "active",
      bulletClass: "project_cate_list",
      // Bullet Numbering 설정
      renderBullet: function (index, className) {
        return `<li class="${className}" style="--rotate: ${index}"><b> ${category[index]}</b></li>`;
      },
    },

    scrollbar: {
      el: ".swiper-scrollbar",
      // Makes the Scrollbar Draggable
      draggable: true,
      // Snaps slider position to slides when you release Scrollbar
      snapOnRelease: true,
      // Size (Length) of Scrollbar Draggable Element in px
      dragSize: "auto",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      slideChangeTransitionStart: function () {
        document.querySelector(".project_swiper").classList.add("active");
      },
      slideChangeTransitionEnd: function () {
        document.querySelector(".project_swiper").classList.remove("active");
      },
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
    thumbs: {
      swiper: swiper,
    },
    mousewheel: {
      releaseOnEdges: true,
    },

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
  });

  // =========== Cursor ===========
  const customCursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => {
      customCursor.style.top = `${e.clientY - customCursor.offsetHeight / 2}px`;
      customCursor.style.left = `${e.clientX - customCursor.offsetWidth / 2}px`;
    });
  });

  function disableAnimation() {
    const hasActiveClass = customCursor.classList.contains("active");
    if (hasActiveClass) {
      customCursor.classList.remove("active");
    } else {
      customCursor.classList.add("active");
    }
  }

  const Link = document.querySelectorAll("a");

  [...Link].map((item) =>
    item.addEventListener("mouseenter", disableAnimation)
  );
  [...Link].map((item) =>
    item.addEventListener("mouseleave", disableAnimation)
  );

  // Modal
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".close_button");
  const projectList = document.querySelectorAll(".slide_inner");

  projectList.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  closeBtn.addEventListener("click", closeModal);

  function openModal() {
    let activeIndex = [...projectList].indexOf(this);
    console.log(activeIndex);

    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
  }
});
