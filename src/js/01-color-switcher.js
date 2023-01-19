const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', e => {
  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  e.currentTarget.disabled = true;
  btnStop.disabled = false;
});

btnStop.addEventListener('click', e => {
  clearInterval(timerId);
  e.currentTarget.disabled = true;
  btnStart.disabled = false;
});

