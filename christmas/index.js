const calendarWrap = document.querySelector("main");
const cardTemplate = document.getElementById("card-list");
const main = document.querySelector("main");
const dialog = document.querySelector("dialog");
let currentIndex;

// Function to create a card element
function createCard(index) {
  let cardEl = document.importNode(cardTemplate.content, true);
  cardEl.querySelector(".card-wrap").style.gridArea = `d${index}`;
  cardEl.querySelector('slot[name="date"]').textContent = index;

  let defaultCardImgSlot = cardEl.querySelector('slot[name="default-card-img"]');
  let defaultCardImg = document.createElement("img");
  defaultCardImg.src = `./image/frame/frame${index}.png`;
  defaultCardImg.alt = `${index}일`;
  defaultCardImgSlot.appendChild(defaultCardImg);

  let openedCardImgSlot = cardEl.querySelector('slot[name="opened-card-img"]');
  let openedCardImg = document.createElement("img");
  openedCardImg.src = `./image/card/card-${index}.png`;
  openedCardImg.alt = `${index}일`;
  openedCardImgSlot.appendChild(openedCardImg);

  return cardEl;
}

// Populate the calendar with cards
for (let i = 1; i < 25; i++) {
  let cardEl = createCard(i);
  calendarWrap.append(cardEl);
}


// Dates for countdown and modal opening
const todayDate = new Date();
const christmasDate = new Date("2023-12-25");



// Function to toggle the modal and handle card activation
const toggleButton = (el) => {
  const cardWrap = el.closest(".card-wrap");
  const isActive = cardWrap.classList.contains("active");

  currentIndex = Array.from(main.querySelectorAll(".card-wrap")).indexOf(cardWrap) + 1;
  
  if (!isActive) {
    const openDate = new Date(2023, 11, currentIndex + 1); // 2023년 12월 1일부터 시작
    console.log(openDate < todayDate, currentIndex);
    
    
    if (openDate < todayDate) {
      const figureElement = dialog.querySelector("figure");
      figureElement.innerHTML = "";

      const modalCardImg = document.createElement("img");
      modalCardImg.src = `./image/card/card-${currentIndex}.png`;
      modalCardImg.alt = `${currentIndex}일`;
      figureElement.appendChild(modalCardImg);

      const modalCardText = document.createElement("figcaption");
      // console.log(modalMessageList[currentIndex-1].message);
      modalCardText.innerText = modalMessageList[currentIndex - 1].message;
      figureElement.appendChild(modalCardText);

      dialog.showModal();
      cardWrap.classList.add("active");
    } else {
      const daysRemaining = Math.floor((openDate - todayDate) / (1000 * 60 * 60 * 24));
      alert(`이 카드는 ${daysRemaining}일 후에 열 수 있어요!`);

    }
  } else {
    cardWrap.classList.remove("active");
  }
};

const closeModal = () => {
  dialog.close();
};


const updateCountdown = () => {
  // const todayDate =  new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));;
  const counterText = document.querySelector(".counter");
  let timeRemaining = christmasDate - todayDate;
  let day = String(Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
  let hour = String(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  let minutes = String(Math.floor((timeRemaining / (1000 * 60)) % 60)).padStart(2, "0");
  let seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2, "0");

  counterText.innerText = `D-${day} ${hour}시간 ${minutes}분 ${seconds}초`;
};

// Initial call and interval for countdown
updateCountdown();
setInterval(updateCountdown, 1000);



const modalMessageList = [
  { number: 1, message: "행복의 계절, 모두가 함께하는 24일!" },
  { number: 2, message: "이 12월, 행복한 순간이 우리를 감싸네요." },
  { number: 3, message: "다 같이 즐겁게 보내는 24일, 행복이 가득합니다!" },
  { number: 4, message: "12월의 특별함을 모두와 함께 나누어요." },
  { number: 5, message: "각자의 작은 행복이 모여 만드는 특별한 24일!" },
  { number: 6, message: "행복이라는 이름의 캘린더, 모두에게 열려 있어요." },
  { number: 7, message: "함께 하는 즐거움, 24일 동안 계속되길 바랍니다." },
  { number: 8, message: "12월은 행복한 순간들이 가득한 달이에요." },
  { number: 9, message: "우리 모두에게 찾아온 특별한 행복의 계절!" },
  { number: 10, message: "매일 매일이 행복으로 가득찬 24일이 되길." },
  { number: 11, message: "12월, 행복이 가득한 당신과 나누는 소중한 시간." },
  { number: 12, message: "다 함께하는 24일, 행복이 여러 가지 모습으로 찾아올 거예요." },
  { number: 13, message: "행복의 파도가 모두에게 찾아오는 특별한 24일!" },
  { number: 14, message: "12월, 각자의 작은 행복이 모여 큰 기쁨이 되길." },
  { number: 15, message: "모두에게 행복이 넘치는 24일을 기대해봐요." },
  { number: 16, message: "12월의 특별한 순간, 행복이 퍼져나가길." },
  { number: 17, message: "모두에게 행복한 24일이 될 것을 기대합니다!" },
  { number: 18, message: "12월, 행복이 가득찬 마음으로 채워져 있는 시간." },
  { number: 19, message: "다양한 행복이 모여 하나로 뭉쳐지는 24일!" },
  { number: 20, message: "12월, 당신과 나누는 특별한 행복의 순간들." },
  { number: 21, message: "모두에게 다가오는 24일, 행복이 함께하기를!" },
  { number: 22, message: "12월의 행복한 기운이 모두를 감싸네요." },
  { number: 23, message: "다 함께하는 24일, 행복한 느낌이 가득할 거예요." },
  { number: 24, message: "12월, 모두에게 기쁨과 행복이 넘치는 달이에요." },
];
