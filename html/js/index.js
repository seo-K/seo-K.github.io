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
  //header menu
  const header = document.getElementById("header");
  const headerMenu = header.querySelector(".menu-button");

  headerMenu.addEventListener("click", () => MenuClickEvent());

  function MenuClickEvent() {
    header.classList.toggle("show");
  }

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

  // project list tab with data
  const ProjectListBox = document.querySelector(".project-list-box");
  const ProjectListWrap = ProjectListBox.querySelector(".project-list-wrap");
  const ProjectList = ProjectListWrap.querySelectorAll("li");
  const ProjectDetail = document.querySelectorAll(".project-detail-wrap > li");

  ProjectList.forEach((list) => {
    list.addEventListener("click", (e) => setActive(list));
  });

  const setActive = (el) => {
    let index = $(el).index();
    let project = [...ProjectDetail];

    // tab
    [...ProjectList].forEach((list) => list.classList.remove("active"));
    el.classList.add("active");

    // content
    project.forEach((list) => list.classList.remove("active"));
    project[index].classList.add("active");
  };

  // resize 함수
  let winWidth = $(window).innerWidth();
  const timer = null;
  const delay = 300;

  if (winWidth <= 1300) {
    ProjectList.forEach((list) => {
      list.addEventListener("click", showProjectDetailFunction);
    });
  }

  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (winWidth <= 1300) {
        ProjectList.forEach((list) => {
          list.addEventListener("click", showProjectDetailFunction);
        });
      }
    }, delay);
  });

  function showProjectDetailFunction() {
    ProjectListBox.classList.add("small-list");
    console.log("누럼");
  }

  // $(function() {
  //   setTimeout(function() {
  //     $('.info-skill-box').addClass('active');
  //   }, 1000);
  // });

  const SkillList = document.querySelectorAll(".info-skill-box  li");

  function SkillListMouseOverEvent() {
    SkillList.forEach((list) => {
      list.addEventListener("mouseover", (e) => list.classList.add("active"));
    });
  }

  function SkillListMouseLeaveEvent() {
    SkillList.forEach((list) => {
      list.addEventListener("mouseleave", (e) => list.classList.remove("active"));
    });
  }

  setTimeout(SkillListMouseOverEvent, 2000);
  setTimeout(SkillListMouseLeaveEvent, 2000);

  // function resizeWidth() {
  //   let ww = $(window).width();
  //   let timer = null;
  //   let sec = 300;
  //   $(window).on('resize', function () {
  //     clearTimeout(timer);
  //     timer = setTimeout(function () {
  //       ww = $(window).width();
  //       if (ww < 600) {
  //         mobileBox();
  //       } else {
  //         pcBox();
  //       }
  //     }, sec);
  //   });
  // }

  // resizeWidth();

  // GSAP

  // TweenMax.to(document.getElementById("myDiv"), 5, {
  //   bezier: {
  //     curviness: 1.25,
  //     values: [
  //       { x: 100, y: 250 },
  //       { x: 300, y: 0 },
  //       { x: 500, y: 400 },
  //     ],
  //     autoRotate: true,
  //   },
  //   backgroundColor: "#f00",
  //   ease: Power1.easeInOut,
  // });
});
