import { addFormListeners } from './form.js';

const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

const successTemplate = document.querySelector('#success');
const successSection = successTemplate.content.querySelector('.success');
const successInner = document.querySelector('.success__inner');
const errorTemplate = document.querySelector('#error');
const errorSection = errorTemplate.content.querySelector('.error');
const errorInner = document.querySelector('.error__inner');

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export const showSuccessMessage = () => {
  const success = successSection.cloneNode(true);
  const successButton = success.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    success.remove();
  });

  document.body.append(success);

  const isSuccessInnerFocused = () =>
    document.activeElement === successInner;

  const clickHandler = () => {
    if (!isSuccessInnerFocused()) {
      success.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      success.remove();
      document.removeEventListener('mousedown', clickHandler);
    }
  });

  document.addEventListener('mousedown', clickHandler);
};

export const showErrorMessage = () => {
  const error = errorSection.cloneNode(true);
  const errorButton = error.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    error.remove();
    addFormListeners();
  });

  document.body.append(error);

  const isErrorInnerFocused = () =>
    document.activeElement === errorInner;

  const clickHandler = () => {
    if (!isErrorInnerFocused()) {
      error.remove();
      addFormListeners();
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      error.remove();
      addFormListeners();
      document.removeEventListener('mousedown', clickHandler);
    }
  });

  document.addEventListener('mousedown', clickHandler);
};

export const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
