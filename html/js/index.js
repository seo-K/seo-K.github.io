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

    function toggleRubberBand() {
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
  // 프로젝트 터치/마우스 휠 이벤트
  const RotateArea = document.querySelector(".tv-layout-wrap");

  let rotateDeg = 0;

  function WheelEvent() {
    let startX, endX;

    winWidth = window.innerWidth;

    if (winWidth > 1200) {
      RotateArea.addEventListener("mousedown", mouseStart);
      RotateArea.addEventListener("mouseup", mouseEnd);

      function mouseStart(e) {
        startX = e.clientX;
        e.preventDefault();
      }
      function mouseEnd(e) {
        endX = e.clientX;
        RotateEvent();
      }
    } else {
      RotateArea.addEventListener("touchstart", touchStart);
      RotateArea.addEventListener("touchend", touchEnd);

      function touchStart(e) {
        startX = e.touches[0].pageX;
        e.preventDefault();
      }

      function touchEnd(e) {
        endX = e.changedTouches[0].pageX;
        RotateEvent();
      }
    }

    function RotateEvent() {
      // console.log(endX - startX, "값");
      if (endX - startX > 100) {
        swiper.slidePrev();
      } else if (endX - startX < 0) {
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
    buttonRotateDeg = buttonRotateDeg + num;
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
    speed: 900,
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
      customCursor.classList.add("inactive");
      customCursor.classList.remove("active");
    } else {
      customCursor.classList.add("active");
      customCursor.classList.remove("inactive");
    }
  }
  // const projectImg = document.querySelector(".modal .project-img");

  // projectImg.addEventListener("mouseover", disableAnimation);
  // projectImg.addEventListener("mouseleave", disableAnimation);

  // Top Button
  const TopButton = document.querySelector(".top-button");
  TopButton.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });

  document.querySelector(".project-img-box  li").addEventListener("click", () => console.log("first"));
});
