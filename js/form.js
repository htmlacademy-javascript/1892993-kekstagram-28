import { initEffects, resetEffects } from './effect-image.js';
import { initScale, resetScale } from './scale.js';
import { isEscapeKey } from './utils.js';

const TAG_COUNT_MAX = 5;
const TAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorMessage = {
  BAD_HASHTAGS_LENGTH: 'Ограничение поля - до 5 комментариев. Исправьте количество тегов.',
  BAD_PATTERN: 'Тег начинается с #. Внутри только латинские буквы, кириллица и числа.',
  BAD_UNIQUE_TAGS: 'Ваши теги повторяются. Проверьте уникальность каждого.',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadImage = document.querySelector('.js-upload-image');
const loadingPicture = document.querySelector('.img-upload__preview img');

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

export const onCancelButtonClick = () => {
  destroyForm();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isHashtagFieldOrCommentFieldFocus) {
    destroyForm();
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

const openForm = (file) => {
  if (file) {
    loadingPicture.src = URL.createObjectURL(file);
  }
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  uploadImageOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

export function destroyForm(withResetFormData = true) {
  if (withResetFormData) {
    uploadForm.reset();
  }
  uploadImage.value = '';
  resetScale(withResetFormData);
  resetEffects(withResetFormData);
  pristine.reset();
  closeForm();

  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  uploadForm.removeEventListener('submit', onUploadFormSubmit);
  hashtagField.removeEventListener('focus', onHashtagFieldFocus);
  commentField.removeEventListener('focus', onCommentFieldFocus);

  isHashtagFieldOrCommentFieldFocus = false;
}

export const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener ('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      await cb(new FormData(uploadForm));
    }
  });
};


export const initForm = (file) => {
  openForm(file);
  initScale();
  initEffects();

  pristine.addValidator(hashtagField, validateTagsPattern, ErrorMessage.BAD_PATTERN);
  pristine.addValidator(hashtagField, validateUniqueTags, ErrorMessage.BAD_UNIQUE_TAGS);
  pristine.addValidator(hashtagField, validateTagsLength, ErrorMessage.BAD_HASHTAGS_LENGTH);

  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  hashtagField.addEventListener('focus', onHashtagFieldFocus);
  commentField.addEventListener('focus', onCommentFieldFocus);
};
