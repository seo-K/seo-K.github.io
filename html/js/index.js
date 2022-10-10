// AOS
AOS.init();

//기본 세팅
// common a
$(function () {
  /*모든 a태그*/
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });
}); //기본 세팅 END

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

//header menu
$(function () {
  const header = document.getElementById("header");
  const headerMenu = header.querySelector(".menu-button");

  headerMenu.addEventListener("click", () => MenuClickEvent());

  function MenuClickEvent() {
    header.classList.toggle("show");
  }

  // 젤리 폰트
  const EachText = document.querySelectorAll(".jelly_text > span");

  EachText.forEach((item) => {
    item.addEventListener("mouseover", toggleRubberBand);

    function toggleRubberBand(e) {
      item.classList.add("active");
      item.addEventListener("animationend", () => {
        item.classList.remove("active");
      });
    }
  });
  // 문의하기 팝업
  $(function () {
    var $con = $("#wrap_content"),
      $inquiry_Btn = $con.find(".inquiry_btn"),
      $modal = $con.find(".modal"),
      $overlay = $modal.find("> li"),
      $closeBtn = $modal.find(".close_btn"),
      $submitBtn = $modal.find(".submit_btn");

    function closed() {
      $overlay.eq(1).hide();
    }

    function autoClose() {
      setTimeout(closed, 2000);
    }

    //섹션 클릭하면 팝업창 모달상태로 나타내기!!
    $inquiry_Btn.click(function (e) {
      e.stopPropagation();
      e.preventDefault();
      $overlay.eq(0).show();
      scrollOff();
    });

    //닫기버튼
    $closeBtn.on("click", function (e) {
      e.preventDefault();
      $modal.removeClass("show");
      $overlay.hide();
      scrollOn();
    });

    //제출버튼
    $submitBtn.on("click", function (e) {
      e.preventDefault();
      $overlay.eq(0).hide();
      $overlay.eq(1).show();
      autoClose();
    });

    //타겟 이외 클릭시 닫기
    $("body").click(function (e) {
      if ($(e.target).hasClass("overlay")) {
        $modal.removeClass("show");
        $overlay.hide();
        scrollOn();
      }
    });
  }); //회원가입 더보기 popup 옵션
});
