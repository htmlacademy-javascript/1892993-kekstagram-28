import { isEscapeKey } from './utils.js';

const TAG_COUNT_MAX = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessage = {
  BAD_HASTAGS_LENGTH: 'Ограничение поля - до 5 комментариев. Исправьте количество тегов.',
  BAD_PATTERN: 'Тег начинается с #. Внутри только латинские буквы, кириллица и числа.',
  BAD_UNIQUE_TAGS: 'Ваши теги повторяются. Проверьте уникальность каждого.',
};

// Константа с путем к дефолтной картинке

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
// элемент картинки

let isHashtagFieldOrCommentFieldFocus = false;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
}, true);

const isValidTag = (tag) => TAG_PATTERN.test(tag);

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidTagLength = (tags) => tags.length <= TAG_COUNT_MAX;

const removeEmptyTags = (tags) => tags.trim().split(' ').filter((tag) => tag.trim().length);

const validateTagsPattern = (value) => removeEmptyTags(value).every(isValidTag);
const validateTagsLength = (value) => isValidTagLength(removeEmptyTags(value));
const validateUniqueTags = (value) => hasUniqueTags(removeEmptyTags(value));

const onUploadFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const onCancelButtonClick = () => {
  destroyForm();
  closeForm();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isHashtagFieldOrCommentFieldFocus) {
    destroyForm();
    closeForm();
  }
};

const onHashtagFieldBlur = () => {
  isHashtagFieldOrCommentFieldFocus = false;
  hashtagField.removeEventListener('blur', onHashtagFieldBlur);
};

const onCommentFieldBlur = () => {
  isHashtagFieldOrCommentFieldFocus = false;
  commentField.removeEventListener('blur', onCommentFieldBlur);
};

const onHashtagFieldFocus = () => {
  isHashtagFieldOrCommentFieldFocus = true;
  hashtagField.addEventListener('blur', onHashtagFieldBlur);
};

const onCommentFieldFocus = () => {
  isHashtagFieldOrCommentFieldFocus = true;
  commentField.addEventListener('blur', onCommentFieldBlur);
};

const openForm = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function destroyForm() {
  uploadForm.reset();
  pristine.reset();

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  hashtagField.removeEventListener('focus', onHashtagFieldFocus);
  commentField.removeEventListener('focus', onCommentFieldFocus);

  isHashtagFieldOrCommentFieldFocus = false;

  // подставить в src картинки путь к дефолтной картинке
  // дестроить scale
  // дестроить effect-image
}

function closeForm() {
  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

const initForm = () => {
  openForm();

  pristine.addValidator(hashtagField, validateTagsPattern, ErrorMessage.BAD_PATTERN);
  pristine.addValidator(hashtagField, validateUniqueTags, ErrorMessage.BAD_UNIQUE_TAGS);
  pristine.addValidator(hashtagField, validateTagsLength, ErrorMessage.BAD_HASTAGS_LENGTH);

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  hashtagField.addEventListener('focus', onHashtagFieldFocus);
  commentField.addEventListener('focus', onCommentFieldFocus);

  // подставить в src картинки путь к картинке
  // инициализировать scale
  // инициализировать effect-image
};

export {initForm, uploadForm};

// и не забыть заэкспортить элемент картинки
// завести модуль scale, который имеет destroy init changeSizeImage
// завести модуль effect-image, который умеет менять фильтры и инициализирует в себе slider, так же имеет destroy, init, changeEffectImage
