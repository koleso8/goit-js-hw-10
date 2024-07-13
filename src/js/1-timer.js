import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  element: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  value: document.querySelectorAll('.value'),
};
let userSelectedDate;
refs.btn.classList.add('none-pointer');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    refs.btn.classList.remove('none-pointer');
  },
};
flatpickr(refs.element, options);
let currentTime = new Date();

refs.btn.addEventListener('click', e => {
  if (userSelectedDate <= currentTime) {
    return window.alert('Please choose a date in the future');
  }
  timer(userSelectedDate);
  console.log('click');
  refs.btn.classList.add('none-pointer');
  refs.element.classList.add('none-pointer');
});

let IsActive = false;
const timer = date => {
  setInterval(() => {
    const currentTime = new Date();
    const timeLeft = date - currentTime;
    renderTime(convertMs(timeLeft));
  }, 1000);
};

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

  return { days: days, hours: hours, minute: minutes, seconds: seconds };
}

function time2Str({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
}

function renderTime(ms) {
  const parsedTime = convertMs(ms);
  const timeStr = time2Str(parsedTime);
  console.log(timeStr);
  refs.value[0].textContent = timeStr;
  refs.value[1].textContent = timeStr;
  refs.value[2].textContent = timeStr;
  refs.value[3].textContent = timeStr;
  //console.log(time2Str());
}
