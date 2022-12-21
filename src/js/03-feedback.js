import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));
const allData = {};

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput() {
  const formData = new FormData(refs.form);
  formData.forEach((value, name) => (allData[name] = value));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const savedSettings = JSON.parse(savedMessage);
    refs.textarea.value = savedSettings.message;

    refs.input.value = savedSettings.email;
  }
}
