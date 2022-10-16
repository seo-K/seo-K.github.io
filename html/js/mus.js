// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————— Piano HERO section
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————

const whites = ["m", "b", "a", "i", "c"];
const blacks = ["u", "s"];
const keys = document.querySelectorAll(".piano__key");
const whiteKeys = document.querySelectorAll(".piano__key.white");
const blackKeys = document.querySelectorAll(".piano__key.black");

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

let playNote = (key) => {
  const noteSound = document.getElementById(key.dataset.note);
  noteSound.currentTime = 0;
  noteSound.play();
  key.classList.add("active");
  noteSound.addEventListener("ended", () => {
    key.classList.remove("active");
  });
};

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key;
  const whiteKeyIndex = whites.indexOf(key);
  const blackKeyIndex = blacks.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

// DISABLE PIANO SOUND WHEN FORM IS IN FOCUS
$(".input-field").on("focus", function () {
  document.querySelectorAll("audio").forEach((el) => (el.muted = true));
});

$(".input-field").on("focusout", function () {
  document.querySelectorAll("audio").forEach((el) => (el.muted = false));
});

// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————— Genres/moods section
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// Set up variables based on html embed ID's in Webflow

var quirky = document.getElementById("quirky");
var sleep = document.getElementById("sleep");
var characters = document.getElementById("characters");
var movement = document.getElementById("movement");
var holidays = document.getElementById("holidays");
var playtime = document.getElementById("playtime");
var educational = document.getElementById("educational");

// Set triggers
$(".play-circle.quirky, .tab-menu.quirky").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  quirky.currentTime = 0;
  quirky.play();
});

$(".play-circle.sleep, .tab-menu.sleep").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  sleep.currentTime = 0;
  sleep.play();
});

$(".play-circle.characters, .tab-menu.characters").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  characters.currentTime = 0;
  characters.play();
});

$(".play-circle.movement, .tab-menu.movement").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  movement.currentTime = 0;
  movement.play();
});

$(".play-circle.holidays, .tab-menu.holidays").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  holidays.currentTime = 0;
  holidays.play();
});

$(".play-circle.playtime, .tab-menu.playtime").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  playtime.currentTime = 0;
  playtime.play();
});

$(".play-circle.educational, .tab-menu.educational").on("click", function () {
  document.querySelectorAll("audio").forEach((el) => el.pause());
  educational.currentTime = 0;
  educational.play();
});

// This button pauses all audio on site
$(".pause-circle, .pause-circle.mobile").on("click", function () {
  //playtime.pause();
  document.querySelectorAll("audio").forEach((el) => el.pause());
});

// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————— TEXT ANIMATIONS
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————

let windowWidth = window.outerWidth;

$(".split-text").each(function (index) {
  let myText = $(this);
  let mySplitText;
  function createSplits() {
    mySplitText = new SplitText(myText, {
      type: "chars,words,lines",
      charsClass: "split-chars",
      wordsClass: "split-words",
      linesClass: "split-lines",
    });
  }
  createSplits();
  $(window).resize(function () {
    if (window.outerWidth !== windowWidth) {
      mySplitText.revert();
      location.reload();
    }
    windowWidth = window.outerWidth;
  });
});

gsap.registerPlugin(ScrollTrigger);

function createTextAnimations() {
  // Line Animation
  $(".line-animation").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-lines");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 0.6,
      delay: 0.1,
      y: "110%",
      rotationX: -90,
      opacity: 0,
      ease: "power1.inOut",
      stagger: {
        amount: 0.4,
        from: "0",
      },
    });
  });
  // Word Animation
  $(".word-animation").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 0.3,
      y: "80%",
      rotationX: -90,
      opacity: 0,
      ease: "power1.inOut",
      stagger: {
        amount: 0.9,
        from: "0",
      },
    });
  });
  // Letter Animation
  $(".letter-animation").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-chars");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 0.7,
      y: "60%",
      opacity: 0.8,
      rotationX: -90,
      ease: "bounce",
      delay: "2.0",
      stagger: {
        amount: 1.0,
        from: "0",
      },
    });
  });

  // Letter Animation FAST
  $(".letter-animation-fast").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-chars");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 0.6,
      y: "30%",
      opacity: 0.8,
      rotationX: -90,
      ease: "bounce",
      stagger: {
        amount: 0.4,
        from: "0",
      },
    });
  });

  // Letter Animation footer
  $(".letter-animation-footer").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-chars");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 1.2,
      y: "50%",
      opacity: 0.8,
      rotationX: -90,
      ease: "bounce",
      stagger: {
        amount: 0.4,
        from: "0",
      },
    });
  });

  // Letter Animation 0.2 DELAY
  $(".letter-animation-medium").each(function (index) {
    let triggerElement = $(this);
    let myText = $(this).find(".split-text");
    let targetElement = $(this).find(".split-chars");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: "top bottom",
        end: "bottom top",
        toggleActions: "restart none none none",
      },
    });
    tl.from(targetElement, {
      duration: 0.5,
      y: "30%",
      opacity: 0.8,
      rotationX: -90,
      ease: "bounce",
      delay: 0.2,
      stagger: {
        amount: 0.4,
        from: "0",
      },
    });
  });
}
createTextAnimations();

// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————— CMS TABS (FINSWEET)
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// This function executes right away
/*(function () {
  // create a new Library instance and store it in a variable called "fsTabs"
  var fsTabs = new FsLibrary(".fs-dynamic-feed"); // Class of your hidden CMS collection list // run tabs on our instance
  fsTabs.tabs({
    tabComponent: ".fs-tabs", // Webflow Tabs component
    tabContent: ".fs-tab-content" // class of the element that will be used for the content of the tab
  });
})();*/

// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// ————— MATTER.JS
// ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// CODE IS BEFORE /BODY TAG
