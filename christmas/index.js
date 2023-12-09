const calendarWrap = document.querySelector("main");
const cardTemplate = document.getElementById("card-list");

for (let i = 1; i < 25; i++) {
  console.log(i);
  let cardEl = document.importNode(cardTemplate.content, true);
  let cardWRaper = document.importNode;
  cardEl.querySelector(".card-wrap").style.gridArea = `d${i}`;
  cardEl.querySelector('slot[name="date"]').textContent = i;

  let defaultCardImgSlot = cardEl.querySelector(
    'slot[name="default-card-img"]'
  );
  let defaultCardImg = document.createElement("img");
  defaultCardImg.src = `./image/frame/frame${i}.png`;
  defaultCardImg.alt = "";
  defaultCardImgSlot.appendChild(defaultCardImg);

  let openedCardImgSlot = cardEl.querySelector('slot[name="opened-card-img"]');
  let openedCardImg = document.createElement("img");
  openedCardImg.src = `./image/frame/frame${i}.png`;
  openedCardImg.alt = "";
  openedCardImgSlot.appendChild(openedCardImg);

  calendarWrap.append(cardEl); // 캘린더 안에 템플릿 넣기
}
