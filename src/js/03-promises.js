import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function formSubmit(e) {
  e.preventDefault();
  const formEl = e.currentTarget.elements;
  let delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);
  for (let i = 1; i <= amount; i++) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
