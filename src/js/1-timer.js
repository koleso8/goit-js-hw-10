import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  element: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  value: document.querySelectorAll('.value'),
};

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    refs.btn.removeAttribute('disabled');
  },
};
flatpickr(refs.element, options);
let currentTime = new Date();

refs.btn.addEventListener('click', e => {
  if (userSelectedDate <= currentTime) {
    return iziToast.error({
      message: 'Please choose a date in the future',
      backgroundColor: 'red',
      messageColor: '#fff',
      position: 'bottomLeft',
      icon: 'icon-cancel-circle',
      close: false,
    });
  }
  timer(userSelectedDate);
  console.log();
  refs.btn.disabled = true;
  refs.element.disabled = true;
});

const timer = date => {
  setInterval(() => {
    const currentTime = new Date();
    const timeLeft = date - currentTime;
    renderTime(timeLeft);
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

  return { days, hours, minutes, seconds };
}
function time2Str({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  refs.value[0].textContent = days;
  refs.value[1].textContent = hours;
  refs.value[2].textContent = minutes;
  refs.value[3].textContent = seconds;
}

function renderTime(ms) {
  const parsedTime = convertMs(ms);
  time2Str(parsedTime);
}
