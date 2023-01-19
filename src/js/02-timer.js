import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const datePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dateItems = document.querySelectorAll('.field');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
btnStart.disabled = true;
document.querySelector('.timer').style.cssText = `
display:flex;
gap: 15px;
margin-top: 10px;
`;
dateItems.forEach(item => {
  item.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;
  item.firstElementChild.style.cssText = `
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
    `;
});
let selectedTime;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0];
    if (selectedTime - new Date() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    } else {
      btnStart.disabled = false;
      btnStart.addEventListener('click', () => {
        clickStart(selectedTime);
        btnStart.disabled = true;
      });
    }
  },
};

flatpickr(datePicker, options);

function clickStart(e) {
  timerId = setInterval(() => {
    btnStart.disabled = true;
    const currentTime = Date.now();
    let diff = e - new Date();
    let countTime = convertMs(diff);
    refs.days.textContent = countTime.days;
    refs.hours.textContent = countTime.hours;
    refs.minutes.textContent = countTime.minutes;
    refs.seconds.textContent = countTime.seconds;
    if (selectedTime - currentTime < 1000) {
      clearInterval(timerId);
      timerId = null;
      Notiflix.Notify.success('Time is over');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
