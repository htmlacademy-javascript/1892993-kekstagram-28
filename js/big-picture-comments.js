const SHOW_COMMENTS = 5;

const bigPictureCommentsContainer = document.querySelector ('.social__comments');
const commentsLoader = document.querySelector ('.comments-loader');
const commentCount = document.querySelector ('.js-social-comment-count');
const getCommentTemplate = ({avatar, name, message}) => `<li class="social__comment">
<img
    class="social__picture"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
<p class="social__text">${message}</p>
</li>`;

let shownComments = 0;

const renderComments = (data) => {
  shownComments += SHOW_COMMENTS;
  if (shownComments >= data.length) {
    commentsLoader.classList.add('hidden');
    shownComments = data.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  bigPictureCommentsContainer.innerHTML = '';
  for (let i = 0; i < shownComments; i++) {
    bigPictureCommentsContainer.insertAdjacentHTML('beforeend', getCommentTemplate(data[i]));
  }
  commentCount.innerHTML = '';
  if (shownComments > 0) {
    commentCount.innerHTML = `${shownComments} из <span class="comments-count">${data.length} комментариев</span>`;
  }
};

export const initBigPictureComments = (data) => {
  renderComments(data);
  commentsLoader.classList.add('hidden');
};

export const destroyBigPictureComments = () => {
  // eslint-disable-next-line no-console
  console.log('destroy');
};
