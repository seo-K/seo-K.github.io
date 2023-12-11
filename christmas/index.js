const calendarWrap = document.querySelector("main");
const cardTemplate = document.getElementById("card-list");

for (let i = 1; i < 25; i++) {
  // console.log(i);
  let cardEl = document.importNode(cardTemplate.content, true);
  cardEl.querySelector(".card-wrap").style.gridArea = `d${i}`;
  cardEl.querySelector('slot[name="date"]').textContent = i;

  let defaultCardImgSlot = cardEl.querySelector(
    'slot[name="default-card-img"]'
  );
  let defaultCardImg = document.createElement("img");
  defaultCardImg.src = `./image/frame/frame${i}.png`;
  defaultCardImg.alt = `${i}일`;
  defaultCardImgSlot.appendChild(defaultCardImg);

  let openedCardImgSlot = cardEl.querySelector('slot[name="opened-card-img"]');
  let openedCardImg = document.createElement("img");
  openedCardImg.src = `./image/card/card-${i}.png`;
  openedCardImg.alt = `${i}일`;
  openedCardImgSlot.appendChild(openedCardImg);

  calendarWrap.append(cardEl); // 캘린더 안에 템플릿 넣기
}

const toggleButton = (el) => {
  const Active = el.classList.contains("active");
  // if (Active) {
  //   el.classList.remove("active");
   
  // } else {
  //   el.classList.add("active");
  
  // }
};
// const card = document.querySelector(".card-wrap");
// const Active = card.classList.contains("active")

// if(Active){
//   document.querySelector("main").setAttribute('inert', '');
// } else{
//   document.querySelector("main").removeAttribute('inert');
// }


const isOpen = document.querySelector("dialog:popover-open");

if(isOpen){
  console.log("열림")
} else{
  console.log("닫힘")
}



// const DIALOG = document.getElementById('modal');
// const MAIN = document.querySelector("main");
// document.querySelector("[popovertarget]").addEventListener("click", () => {
//   if(DIALOG.matches(':popover-open')) {
//     console.log("열림")
//     MAIN.removeAttribute('inert');
//   } else{
//     MAIN.setAttribute('inert', '');
//   }
//   console.log(DIALOG.matches(':popover-open'));
// })
// console.dir(DIALOG)
// isInert = DIALOG.inert;



// DIALOG.inert = true | false;
// // 또는
//  // 요소에 inert 속성 적용
// DIALOG.removeAttribute('inert'); // 요소에 inert 속성 제거
