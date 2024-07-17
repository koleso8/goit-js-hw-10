import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      startButton.disabled = true;
      startButton.classList.remove('active-btn');
      datetimePicker.classList.remove('active-input');
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
      startButton.classList.add('active-btn');
      datetimePicker.classList.add('active-input');
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let countdownInterval = null;

startButton.disabled = true;
flatpickr(datetimePicker, options);
startButton.addEventListener('click', startCountdown);

function startCountdown() {
  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;
    datetimePicker.classList.add('active-clock');

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      datetimePicker.disabled = false;
      datetimePicker.classList.remove('active-clock');
      return;
    }

    const timeLeft = convertMs(timeDifference);
    updateTimerDisplay(
      timeLeft.days,
      timeLeft.hours,
      timeLeft.minutes,
      timeLeft.seconds,
    );
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}
