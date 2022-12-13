// AOS
AOS.init();

$(function () {
  // =========== COMMON
  /*모든 a태그*/
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // 로딩 기능
  window.onbeforeunload = function () {
    $(".loading").show();
  }; //현재 페이지에서 다른 페이지로 넘어갈 때 표시해주는 기능
  $(window).on("load", function () {
    //페이지가 로드 되면 로딩 화면을 없애주는 것
    $(".loading").hide();
  });

  // 젤리 폰트
  const EachText = document.querySelectorAll(".jelly-text > span");

  EachText.forEach((item) => {
    item.addEventListener("mouseover", toggleRubberBand);

    function toggleRubberBand() {
      item.classList.add("active");
      item.addEventListener("animationend", () => {
        item.classList.remove("active");
      });
    }
  });

  // 눈오는 효과
  function createSnow() {
    const el = document.createElement("div");
    el.classList.add("snow");
    el.style.marginLeft = randomPosition() + "px";
    el.innerText = "❄";
    document.querySelector(".snow-wrap").appendChild(el);
  }
  function randomPosition() {
    return Math.floor(Math.random() * window.innerWidth);
  }
  for (let i = 0; i < 300; i++) {
    createSnow();
  }

  // ========= 다크모드
  const userTheme = localStorage.getItem("color-theme"); // 유저가 localStorage에 저장한테마가 있는지 확인
  const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const getUserTheme = () => (userTheme ? userTheme : osTheme); // color-theme 확인 - localStorage에 저장된게 있는지, 없으면 OS의 color-theme로 설정
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  const themeSwitch = document.querySelector(".theme-mode i"); // 다크모드 스위치
  if (getUserTheme() === "dark") {
    DarkMode();
  } else {
    LightMode();
  }

  themeSwitch.addEventListener("click", function (e) {
    let switchThemeData = e.target.getAttribute("data-theme");
    if (switchThemeData === "dark") {
      DarkMode();
    } else {
      LightMode();
    }
  });

  function DarkMode() {
    localStorage.setItem("color-theme", "dark");
    document.documentElement.setAttribute("color-theme", "dark");
    themeSwitch.setAttribute("data-theme", "light");
    themeSwitch.setAttribute("class", "fa-solid fa-sun");
    themeSwitch.setAttribute("class", "fa-regular fa-lightbulb");
  }

  function LightMode() {
    localStorage.setItem("color-theme", "light");
    document.documentElement.setAttribute("color-theme", "light");
    themeSwitch.setAttribute("data-theme", "dark");
    themeSwitch.setAttribute("class", "fa-solid fa-ghost");
    // themeSwitch.setAttribute("class", "fa-solid fa-moon");
  }

  // =========== HEADER
  const logo = document.querySelector(".top-content");
  const logoHeight = document.querySelector(".top-content").clientHeight;

  /** Logo Scroll event (scale + opacity animation) */
  function onScroll() {
    let value = 1 - window.scrollY / 500;

    if (window.scrollY < logoHeight) {
      logo.style.transform = `scale(${value}) translateY(${window.scrollY}px)`;
      logo.style.opacity = value;
    }
  }

  //   const passiveEvent = passiveEventSupported
  //   ? { capture: false, passive: true }
  //   : false
  // window.addEventListener('scroll', onScroll, passiveEvent)

  window.addEventListener("scroll", onScroll, { passive: true });

  // 헤더 카드 메뉴 리스트 이벤트
  const menu = document.querySelectorAll(".menu-card");
  const pianoOddList = document.querySelectorAll(".card-piano li:nth-child(odd)");
  const OrangeCard = document.querySelector(".orange-card");

  const OrangeClass = "orange-card";

  function MouseEnterEvent() {
    OrangeCard.classList.remove("show");

    if (!this.classList.contains(OrangeClass)) {
      this.classList.add("hidden");
      if (this.classList.contains("yellow-card")) {
        document.querySelector(".card-piano li:nth-child(1)").classList.add("active");
      } else if (this.classList.contains("beige-card")) {
        document.querySelector(".card-piano li:nth-child(5)").classList.add("active");
      } else if (this.classList.contains("purple-card")) {
        document.querySelector(".card-piano li:nth-child(3)").classList.add("active");
        document.querySelector(".card-piano li:nth-child(9)").classList.add("active");
      }
    }
  }

  function MouseLeaveEvent() {
    OrangeCard.classList.add("show");
    [...pianoOddList].map((oddList) => oddList.classList.remove("active"));

    if (!this.classList.contains(OrangeClass)) {
      this.classList.remove("hidden");
    }
  }

  menu.forEach((menuList) => {
    menuList.addEventListener("mouseover", MouseEnterEvent);
    menuList.addEventListener("mouseleave", MouseLeaveEvent);
  });

  // =========== MAIN
  // 스킬 스크롤 이벤트
  const observeElements = document.querySelectorAll(".skill-list-wrap >li");

  const options = {
    threshold: 0.5,
  };

  const inViewCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  };
  let observer = new IntersectionObserver(inViewCallback, options);

  observeElements.forEach((element) => {
    observer.observe(element); // 옵저버 실행
  });

  // const SkillList = document.querySelectorAll(".skill-section .right-box");
  // const screenHeight = screen.availHeight;

  // function Scroll2(element) {
  //   let skillList = element.getBoundingClientRect();
  //   let overValue = skillList.top - screenHeight;
  //   if (overValue <= -100) {
  //     let newValue = ((1 - overValue) / skillList.height) * 100 - 100;
  //     element.style.transform = ` translateX(${newValue < 0 ? newValue : 0}%)`;
  //   } else return;
  // }
  // window.addEventListener("scroll", () => [...SkillList].map((item) => Scroll2(item)));

  // 프로젝트 터치/마우스 휠 이벤트
  const RotateArea = document.querySelector(".tv-layout-wrap");

  function WheelEvent() {
    let startXY, endXY;

    winWidth = window.innerWidth;

    if (winWidth > 1500) {
      RotateArea.addEventListener("mousedown", mouseStart);
      RotateArea.addEventListener("mouseup", mouseEnd);

      function mouseStart(e) {
        startXY = e.clientX;
        e.preventDefault();
      }
      function mouseEnd(e) {
        endXY = e.clientX;
        RotateEvent();
      }
    } else {
      RotateArea.addEventListener("touchstart", touchStart);
      RotateArea.addEventListener("touchend", touchEnd);

      function touchStart(e) {
        startXY = e.touches[0].pageY;
        e.preventDefault();
      }

      function touchEnd(e) {
        endXY = e.changedTouches[0].pageY;
        RotateEvent();
      }
    }

    function RotateEvent() {
      // console.log(endXY - startXY, "값");
      if (endXY - startXY > 100) {
        swiper.slidePrev();
      } else if (endXY - startXY < 0) {
        swiper.slideNext();
      } else {
        return;
      }
    }
  }

  WheelEvent();

  /** 스와이퍼 액션 */
  let buttonRotateDeg = 90;
  function SwiperAction(num) {
    const rotateButton = document.querySelector(".switch-button");
    // buttonRotateDeg = buttonRotateDeg + num;
    buttonRotateDeg += num;
    rotateButton.style.transform = `translate(-50%, -70%) rotate(${buttonRotateDeg}deg)`;
  }

  // Initialize Swiper
  let arr = [0];
  const swiper = new Swiper(".project-img-box", {
    speed: 500,
    watchSlidesProgress: true,
    effect: "fade",
    lazy: true,
    lazy: {
      loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".wheel-wrap",
      bulletActiveClass: "active",
      bulletClass: "wheel-list",
      // clickable: true,
      renderBullet: function (index, className) {
        return `<li class="${className}" style="--rotate: ${index}"><b>${index + 1}</b></li>`;
      },
    },
    on: {
      slideChange: function () {
        let currentIndex = this.activeIndex;
        const lastIndex = arr[arr.length - 1];

        arr.push(currentIndex);

        if (currentIndex > lastIndex) {
          SwiperAction(36);
        } else {
          SwiperAction(-36);
        }
      },
      // slideNextTransitionStart: function () {
      //   SwiperAction(36);
      //   console.log("두분되는듯");
      // },
      // slidePrevTransitionStart: function () {
      //   SwiperAction(-36);
      //   console.log("마이너스");
      // },
    },
  });

  const swiperText = new Swiper(".project-detail-box", {
    mousewheel: {
      releaseOnEdges: true,
    },
    watchOverflow: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true, // 스와이퍼에 grab cursor
    parallax: true,
    // speed: 900,
  });

  swiper.controller.control = swiperText;
  swiperText.controller.control = swiper;

  // =========== Contact Section

  // =========== Cursor
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
      // customCursor.classList.add("inactive");
      customCursor.classList.remove("active");
    } else {
      customCursor.classList.add("active");
      // customCursor.classList.remove("inactive");
    }
  }
  const Link = document.querySelectorAll(".menu-card");

  [...Link].map((item) => item.addEventListener("mouseover", (e) => console.log(e.target)));
  [...Link].map((item) => item.addEventListener("mouseleave", (e) => console.log(e.target)));
  // [...pianoOddList].map((oddList) => oddList.classList.remove("active"));

  // [...link].addEventListener("mouseover", disableAnimation);
  // [...link].addEventListener("mouseleave", disableAnimation);

  // Top Button
  const TopButton = document.querySelector(".top-button");
  TopButton.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });

  document.querySelector(".project-img-box  li").addEventListener("click", () => console.log("first"));
});
