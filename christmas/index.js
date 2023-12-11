const calendarWrap = document.querySelector("main");
const cardTemplate = document.getElementById("card-list");
const main = document.querySelector("main");
const dialog = document.querySelector("dialog");

// Function to create a card element
function createCard(index) {
  let cardEl = document.importNode(cardTemplate.content, true);
  cardEl.querySelector(".card-wrap").style.gridArea = `d${index}`;
  cardEl.querySelector('slot[name="date"]').textContent = index;

  let defaultCardImgSlot = cardEl.querySelector(
    'slot[name="default-card-img"]'
  );
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

// Function to toggle the modal and handle card activation
const toggleButton = (el) => {
  const cardWrap = el.closest(".card-wrap");
  const isActive = cardWrap.classList.contains("active");
  let currentIndex;

  currentIndex =
    Array.from(main.querySelectorAll(".card-wrap")).indexOf(cardWrap) + 1;

  const figureElement = dialog.querySelector("figure");
  figureElement.innerHTML = "";

  if (!isActive) {
    let modalCardImg = document.createElement("img");
    modalCardImg.src = `./image/card/card-${currentIndex}.png`;
    modalCardImg.alt = `${currentIndex}일`;
    figureElement.appendChild(modalCardImg);

    dialog.showModal();
    cardWrap.classList.add("active");
  } else {
    cardWrap.classList.remove("active");
  }
};

const closeModal = (el) => {
  dialog.close();
};
