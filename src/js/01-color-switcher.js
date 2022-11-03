const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerID;

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;

  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  clearInterval(timerID);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
