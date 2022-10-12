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
  const ProjectListWrap = document.querySelector(".project-list-wrap");
  const ProjectList = ProjectListWrap.querySelectorAll(".project-list");
  const ProjectDetail = document.querySelector(".project-detail-box");

  let projectListData = [
    {
      id: 1,
      name: "FullPage",
      icon: `<i class="fa-solid fa-comment-medical"></i>`,
      setting: "HTML",
      img: "./image/foodyitda-long.png",
    },
    {
      id: 2,
      name: "Badd",
      icon: `<i class="fa-solid fa-comment-medical"></i>`,
      setting: "HTML",
      img: "./image/foodyitda-long.png",
    },
    {
      id: 3,
      name: "React",
      icon: `<i class="fa-solid fa-comment-medical"></i>`,
      setting: "React",
      img: "./image/foodyitda-long.png",
    },
  ];

  ProjectListWrap.innerHTML = projectListData
    .map(function (list) {
      return `<li class="project-list">` + list.icon + "<b>" + list.name + "</b></li>";
    })
    .join("");

  function Lo() {
    console.log(ProjectList);
  }
  Lo();
  ProjectList.forEach((item, idx) => {
    item.addEventListener("click", () => {
      console.log(ProjectList);
      let has = item.classList.contains("active");

      if (has) {
        // return false;
        console.log("이미있음");
      } else {
        // tab.forEach((items, indx) => {
        //   items.classList.remove("active");
        // });
        // tabSect.forEach((items, indx) => {
        //   items.style.display = "none";
        // });

        // let val = item.getAttribute("data-tab");
        // let el = document.getElementById(val);

        // item.classList.add("active");
        // el.style.display = "block";

        console.log("djqtdma");
      }
    });
  });
});
