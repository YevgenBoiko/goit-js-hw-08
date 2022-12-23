import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

populateTextarea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onTextareaInput, 500));
const allData = {};

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput() {
  const formData = new FormData(form);
  formData.forEach((value, name) => (allData[name] = value));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const savedSettings = JSON.parse(savedMessage);
    const formEl = form.elements;

    formEl[1].value = savedSettings.message;
    formEl[0].value = savedSettings.email;
  }
}
