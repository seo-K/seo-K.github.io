// AOS
AOS.init();

$(function () {
  // =========== COMMON ===========
  // ========= 모든 a태그
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // ========= 로딩 기능

  // ========= 다크모드

  // =========== HEADER ===========
  const main = document.querySelector("#main");
  const mainInner = document.querySelector(".main_inner");
  const menuList = document.querySelectorAll(".menu > li");
  const articleList = document.querySelectorAll(".main_inner > article");
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
      });
  }

  let width = main.clientWidth;
  console.log(width);

  const category = ["html", "react", "app"];

  const swiper = new Swiper(".project_swiper", {
    speed: 500,
    direction: "vertical",
    mousewheel: {
      releaseOnEdges: true,
    },
    slidesPerView: "3.5",
    watchSlidesProgress: true, // 슬라이드가 1개일때 기능 없애기
    grabCursor: true, // 스와이퍼에 grab cursor
    lazy: true,
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
  });
});
