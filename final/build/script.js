
const backgroundContainer = document.querySelector(".background");
const image = document.getElementById("image");
const drinkName = document.getElementById("drink-name");
const drinkDescription = document.getElementById("drink-description");
const slideCounter = document.getElementById("slide-counter");

let backgroundIndex = 0;
const totalImages = 4;
let timer;

const texts = [
  {
    name: "STRAWBERRY",
    description:
      "Cool down with our freshly made strawberry sparkling refresher. The mixture of the house made puree which is made from organic strawberries handpicked from one of the top-quality strawberry farms in the US.",
    color: "color-1",
  },
  {
    name: "TARO MILK TEA",
    description:
      "Rich-tasting taro milk tea has a deep natural sweetness and a nutty flavor that brings harmony to the mouth. Taro milk tea not only tastes rich but the taro root also contains many health benefits.",
    color: "color-2",
  },
  {
    name: "MANGO",
    description:
      "A delightful fusion of premium apple essence with our signature milk tea. Each sip is an adventure, offering a perfect balance between the fruity zest of apples and the comforting creaminess of our tea blend.",
    color: "color-3",
  },
  {
    name: "APPLE TANGO",
    description:
      "Our unique taste of mango that is blended with premium green tea provides multiple health benefits. It creates the illusion of swimming in a mango ocean.",
    color: "color-4",
  },
];

function updateBackground() {
  const nextIndex = backgroundIndex % totalImages;
  var translateValue = -nextIndex * 25;
  backgroundContainer.style.transition = "transform 0.275s ease-in";
  backgroundContainer.style.transform = `translateX(${translateValue}%)`;
  backgroundIndex = nextIndex;
}

function updateTransform() {
  if (backgroundIndex == 0) {
    image.style.transform = `rotateY(1turn)`;
  } else {
    image.style.transform = `rotate(${
      backgroundIndex * (360 / totalImages)
    }deg)`;
  }
}
function updateText() {
  const currentText = texts[backgroundIndex];
  drinkName.textContent = currentText.name;
  drinkName.className = `drink-name ${currentText.color}`;
  drinkDescription.textContent = currentText.description;
  slideCounter.textContent = `${backgroundIndex + 1} / ${totalImages}`;
}

function updateIndicatorLines() {
  const indicatorLines = document.querySelectorAll(".indicatorLine");

  indicatorLines.forEach((line, index) => {
    line.classList.toggle("active", index === backgroundIndex);
  });
}

let restartTimerDelay = 3000;
let restartTimerTimeout;

function stopTimer() {
  clearInterval(timer);
}

function startTimerWithDelay() {
  restartTimerTimeout = setTimeout(() => {
    startTimer();
  }, restartTimerDelay);
}

function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    nextImage();
  }, 4000);
}

document.querySelector(".prev").addEventListener("mouseenter", stopTimer);
document.querySelector(".next").addEventListener("mouseenter", stopTimer);

const indicatorWrappers = document.querySelectorAll(".indicator-wrapper");

indicatorWrappers.forEach((wrapper, index) => {
  wrapper.addEventListener("mouseenter", () => {
    stopTimer();
  });

  wrapper.addEventListener("mouseleave", () => {
    clearTimeout(restartTimerTimeout);
    startTimerWithDelay();
  });
});

function currentSlide(index) {
  backgroundIndex = index;
  updateBackground();
  updateTransform();
  updateText();
  updateIndicatorLines();
  startTimer();
}

function previousImage() {
  backgroundIndex = (backgroundIndex - 1 + totalImages) % totalImages;
  updateBackground();
  updateTransform();
  updateText();
  updateIndicatorLines();
  startTimer();
}

function nextImage() {
  backgroundIndex = (backgroundIndex + 1) % totalImages;
  updateBackground();
  updateTransform();
  updateText();
  updateIndicatorLines();
  startTimer();
  if (backgroundIndex === 0) {
    setTimeout(() => {
      updateBackground();
      updateTransform();
      updateText();
      updateIndicatorLines();
    }, 400);
  }
}

startTimer();

document.querySelector(".prev").addEventListener("click", stopTimer);
document.querySelector(".next").addEventListener("click", stopTimer);