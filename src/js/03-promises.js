const form = document.querySelector("form.form");

const delayElem = document.querySelector("input[name=delay]");
const stepElem = document.querySelector("input[name=step]");
const amountElem = document.querySelector("input[name=amount]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const delay = parseInt(delayElem.value);
  const step = parseInt(stepElem.value);
  const amount = parseInt(amountElem.value);

  for(let i = 1; i <= amount; i++) {
    createPromise(i, delay + i*step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
})


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({position, delay}), delay)
    })
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({position, delay}), delay)
    })
  }
}
