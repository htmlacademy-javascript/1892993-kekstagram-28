import { initBigPictureComments, destroyBigPictureComments } from './big-picture-comments.js';
import { isEscapeKey } from './utils.js';

const body = document.querySelector ('body');
const bigPictureContainer = document.querySelector('.js-big-picture');
const bigPictureImgElement = bigPictureContainer.querySelector('.js-big-picture-img img');
const likesCountPicture = document.querySelector('.js-likes-count');
const buttonCancel = document.querySelector('.js-button-close');
const descriptionPictureContainer = document.querySelector('.js-social__caption');

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    destroyBigPicture();
  }
};

const onButtonCancelClick = () => {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  destroyBigPictureComments();
};

const renderBigPictureData = ({url,likes, description}) => {
  bigPictureImgElement.src = url;
  likesCountPicture.innerText = likes;
  descriptionPictureContainer.innerText = description;
};

const addEventsHandlers = () => {
  document.addEventListener('keydown', onDocumentEscKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);
};

const removeEventsHandlers = () => {
  document.removeEventListener('keydown', onDocumentEscKeydown);
  buttonCancel.removeEventListener('click', onButtonCancelClick);
};

function destroyBigPicture() {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  destroyBigPictureComments();
  removeEventsHandlers();
}

export const initBigPicture = (data) => {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  renderBigPictureData(data);
  initBigPictureComments(data.comments);
  addEventsHandlers();
};
