$(function () {
  //기본
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");

  //리사이즈
  window.addEventListener("resize", function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  });
});
