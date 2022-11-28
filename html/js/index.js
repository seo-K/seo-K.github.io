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

  /** Open Modal */
  function OpenModal(index) {
    modalList.style.display = "grid";
    Modal[index].style.display = "block";
    // scrollOff();
  }
  /** Close Modal */
  function CloseModal() {
    // modalList.style.display = "none";
    Modal.style.display = "none";
    // scrollOn();
  }

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
  const modalCursor = document.querySelector(".modal-cursor");

  document.addEventListener("mousemove", (e) => {
    window.requestAnimationFrame(() => {
      modalCursor.style.top = `${e.clientY - modalCursor.offsetHeight / 2}px`;
      modalCursor.style.left = `${e.clientX - modalCursor.offsetWidth / 2}px`;
    });
  });

  function disableAnimation() {
    const hasActiveClass = modalCursor.classList.contains("active");

    if (hasActiveClass) {
      modalCursor.classList.add("inactive");
      modalCursor.classList.remove("active");
    } else {
      modalCursor.classList.add("active");
      modalCursor.classList.remove("inactive");
    }
  } // check for when the mouse is being moving
  const projectImg = document.querySelector(".modal .project-img");

  projectImg.addEventListener("mouseover", disableAnimation);
  projectImg.addEventListener("mouseleave", disableAnimation);

  // Top Button
  const TopButton = document.querySelector(".top-button");
  TopButton.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
});
