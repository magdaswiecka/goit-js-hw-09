import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("button[data-start]");

const daysElem = document.querySelector("span[data-days]");
const hoursElem = document.querySelector("span[data-hours]");
const minutesElem = document.querySelector("span[data-minutes]");
const secondsElem = document.querySelector("span[data-seconds]");

startButton.disabled = true;

let selectedDate;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date()

    if(selectedDate < now) {
      alert("Please choose a date in the future")
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;

  setInterval(() => {
    const now = new Date();
    const milliseconds = selectedDate - now;
    const objDiff = convertMs(milliseconds);

    daysElem.textContent = objDiff.days
    addLeadingZero(daysElem);
    hoursElem.textContent = objDiff.hours
    addLeadingZero(hoursElem);
    minutesElem.textContent = objDiff.minutes
    addLeadingZero(minutesElem);
    secondsElem.textContent = objDiff.seconds
    addLeadingZero(secondsElem);

  }, 1000)
});

function addLeadingZero(elem) {

  if (elem.textContent.length < 2) {
    elem.textContent = `0${elem.textContent}`
    
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}