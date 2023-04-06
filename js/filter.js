import { destroyThumbnails, initThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const MAX_RANDOM_THUMBNAILS_COUNT = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let thumbnailData = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

export const getFilteredThumbnails = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...thumbnailData].sort(sortRandomly).slice(0, MAX_RANDOM_THUMBNAILS_COUNT);
    case Filter.DISCUSSED:
      return [...thumbnailData].sort(sortByComments);
    default:
      return [...thumbnailData];
  }
};

const onFilterElementClick = (evt) => {
  evt.preventDefault();
  const targetClick = evt.target;

  if (evt.target.tagName === 'BUTTON') {
    if (targetClick.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    targetClick.classList.add('img-filters__button--active');

    destroyThumbnails();
    currentFilter = targetClick.id;
    initThumbnails(getFilteredThumbnails());
  }
};

export const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', debounce(onFilterElementClick));
  thumbnailData = data;
  initThumbnails(data);
};
