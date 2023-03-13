import { getThumbnails } from './data.js';

const thumbnailsTemplate = document.querySelector ('#picture').content.querySelector('.picture');
const boxPictures = document.querySelector ('.pictures');
const createThumbnails = getThumbnails();
const thumbnailsListFragments = document.createDocumentFragment();

createThumbnails.forEach(({url, likes, comments}) => {
  const thumbnail = thumbnailsTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsListFragments.appendChild(thumbnail);
});

boxPictures.appendChild(thumbnailsListFragments);
