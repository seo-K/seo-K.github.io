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
  // projectList click Event + modal
  const projectList = document.querySelectorAll(".project-list-wrap > li");
  const projectTextList = document.querySelectorAll(".project-text-list > li");
  const modalList = document.querySelector(".modal-wrap ");
  const modal = document.querySelectorAll(".modal-wrap > li");
  const CloseBtn = document.querySelectorAll(".modal .close-button");

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

  // Project Modal
  const Modal = [...modal];
  projectTextList.forEach((item) => {
    item.addEventListener("click", () => setShowModal(item));
  });

  const setShowModal = (el) => {
    let index = $(el).index();
    OpenModal(index);
  };
  CloseBtn.forEach((item) => {
    item.addEventListener("click", () => CloseModal());
  });

  // CloseBtn.addEventListener("click", () => console.log("first"));
  // CloseBtn.addEventListener("click", () => CloseModal());

  function OpenModal(index) {
    modalList.style.display = "grid";
    Modal[index].style.display = "block";
    // scrollOff();
  }

  function CloseModal() {
    // modalList.style.display = "none";
    Modal.style.display = "none";
    // scrollOn();
  }

  // 프로젝트 터치/마우스 휠 이벤트
  const RotateArea = document.querySelector(".wheel-slide .swiper-wrapper");
  const RotateSlider = document.querySelectorAll(".wheel-wrap .wheel-list");
  const RotateText = document.querySelectorAll(".wheel-slide .swiper-wrapper b");
  let rotateDeg = 0;

  function WheelEvent() {
    let startY, endY;

    winWidth = window.innerWidth;

    if (winWidth > 1200) {
      RotateArea.addEventListener("mousedown", mouseStart);
      RotateArea.addEventListener("mouseup", mouseEnd);

      function mouseStart(e) {
        startY = e.clientY;
        e.preventDefault();
      }
      function mouseEnd(e) {
        endY = e.clientY;
        RotateEvent();
      }
    } else {
      RotateArea.addEventListener("touchstart", touchStart);
      RotateArea.addEventListener("touchend", touchEnd);

      function touchStart(e) {
        startY = e.touches[0].pageY;
        e.preventDefault();
      }

      function touchEnd(e) {
        endY = e.changedTouches[0].pageY;
        RotateEvent();
      }
    }

    function getCurrentRotation(element, num) {
      var st = window.getComputedStyle(element, null);
      var tr =
        st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

      if (tr !== "none") {
        var values = tr.split("(")[1];
        values = values.split(")")[0];
        values = values.split(",");
        var a = values[0];
        var b = values[1];

        var radians = Math.atan2(b, a);
        var angle = Math.round(radians * (180 / Math.PI));
      } else {
        var angle = 0;
      }

      // works!
      // console.log("Rotate: " + angle + "deg", num);

      element.style.transform = `rotate(${angle + num}deg)`;
    }

    function RotateEvent() {
      console.log(endY - startY, "값");
      if (endY - startY > 100) {
        rotateDeg = rotateDeg + 36;
        RotateArea.style.transform = `rotate(${rotateDeg}deg)`;
        [...RotateText].map((item) => getCurrentRotation(item, -36));
        console.log("+");
      } else if (endY - startY < 0) {
        rotateDeg = rotateDeg - 36;
        RotateArea.style.transform = `rotate(${rotateDeg}deg)`;
        [...RotateText].map((item) => getCurrentRotation(item, 36));
        console.log("-");
      } else {
        return;
      }
    }
  }

  // WheelEvent();

  /** 스와이퍼 액션 */
  function SwiperAction(element, num) {
    var Slider = window.getComputedStyle(element, null);
    var RotateValue = Slider.getPropertyValue("--rotate") || "fail...";

    let newTr = Number(RotateValue) + num;
    element.style.setProperty("--rotate", newTr);
  }

  // Initialize Swiper
  // const swiper = new Swiper(".wheel-slide", {
  //   allowTouchMove: true,
  //   spaceBetween: 0,
  //   slidesPerView: 1,
  //   freeMode: true,
  //   watchSlidesProgress: true,
  //   // direction: "vertical",
  //   // mousewheel: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   breakpoints: {
  //     1200: {
  //       allowTouchMove: false,
  //     },
  //   },
  // });

  let projectListText = ["비타알고", "푸드잇다", "브이드림", "신도리코 해외", "엔픽셀 관리자", "신도리코샵", "요일 관리자", "국룰", "두루퍼", "쿨화이트"];
  const swiper = new Swiper(".project-img-box", {
    spaceBetween: 10,
    slidesPerView: 1,
    speed: 500,
    watchSlidesProgress: true,
    lazy: true,
    lazy: {
      loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
      loadPrevNextAmount: 2, //or, if you wish, preload the next 2 images
    },
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: ["-100%", "50%", -400],
      },
      next: {
        translate: ["100%", "50%", 0],
      },
    },
  });

  const swiper2 = new Swiper(".project-detail-box", {
    direction: "vertical",
    autoHeight: true,
    mousewheel: true,
    watchOverflow: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true, // 스와이퍼에 grab cursor
    thumbs: {
      swiper: swiper,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".wheel-wrap",
      // type: "custom",
      bulletActiveClass: "active",
      bulletClass: "wheel-list",
      clickable: true,

      renderBullet: function (index, className) {
        return `<li class="${className}" style="--rotate: ${index}"><b>${index + 1}. ${projectListText[index]} </b></li>`;
      },
    },

    on: {
      slideNextTransitionStart: function () {
        [...RotateSlider].map((item) => SwiperAction(item, -1));
        console.log("딤");
      },
      slidePrevTransitionStart: function () {
        [...RotateSlider].map((item) => SwiperAction(item, 1));
        console.log("이전");
      },
    },
  });

  // =========== Contact Section
  // const
  // const password = document.querySelector(".");

  // const helperText = {
  //   charLength: document.querySelector("#pwChar"),
  //   lowercase: document.querySelector("#pwLower"),
  //   uppercase: document.querySelector("#pwCap"),
  //   number: document.querySelector("#pwNum"),
  // };

  // =========== Modal
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
});
