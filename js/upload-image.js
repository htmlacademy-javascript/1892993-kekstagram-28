import { initForm } from './form.js';

const RIGHT_FILE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

const uploadImageElement = document.querySelector('.js-upload-image');

const onUploadImageElementChange = (evt) => {
  if (RIGHT_FILE_TYPES.includes(evt.target.files[0].type)) {
    const file = uploadImageElement.files[0];
    initForm(file);
  }
};

export const initUploadImage = () => {
  uploadImageElement.addEventListener('change', onUploadImageElementChange);
};
