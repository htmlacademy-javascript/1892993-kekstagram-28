import { initBigPicture } from './big-picture.js';

const thumbnailsContainer = document.querySelector('.js-thumbnails');

let thumbnails = [];

const getThumbnailsTemplate = ({id, url, description, likes, comments}) => `<a href="#" id="${id}" class="picture js-thumbnail">
  <img class="picture__img" src="${url}" width="182" height="182" alt="${description}">
  <p class="picture__info">
    <span class="picture__comments">${comments.length}</span>
    <span class="picture__likes">${likes}</span>
  </p>
</a>`;

const onThumbnailsContainerClick = (evt) => {
  evt.preventDefault();

  const targetThumbnailElement = evt.target.closest('.js-thumbnail');

  if (targetThumbnailElement) {
    const targetThumbnailId = targetThumbnailElement.id;
    const targetThumbnailData = thumbnails.find((thumbnail) => thumbnail.id === +targetThumbnailId);

    initBigPicture(targetThumbnailData);
  }
};

const addClickHandlerToContainer = () => {
  thumbnailsContainer.addEventListener('click', onThumbnailsContainerClick);
};

const renderThumbnails = () => {
  thumbnails.forEach((thumbnail) => thumbnailsContainer.insertAdjacentHTML('beforeend', getThumbnailsTemplate(thumbnail)));
};

export const initThumbnails = (data) => {
  thumbnails = data.slice();

  renderThumbnails();
  addClickHandlerToContainer();
};
