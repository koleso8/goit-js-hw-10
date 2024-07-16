import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  bntEl: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(refs.formEl);
  const delay = formData.get('delay');
  const status = formData.get('state');

  const isSuccess = status === 'fulfilled';

  // if (isSuccess) {
  //   console.log(`✅ Fulfilled promise in ${delay}ms`);
  // } else {
  //   console.log(`❌ Rejected promise in ${delay}ms`);
  // }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  // Registering promise callbacks
  promise
    .then(value =>
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
      }),
    )
    .catch(error =>
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
      }),
    );
});
