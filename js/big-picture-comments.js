const DRAWING_COMMENTS = 5;

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

let comments = [];
let shownComments = 0;

const renderComments = () => {
  shownComments += DRAWING_COMMENTS;
  if (shownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    shownComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  bigPictureCommentsContainer.innerHTML = '';
  for (let i = 0; i < shownComments; i++) {
    bigPictureCommentsContainer.insertAdjacentHTML('beforeend', getCommentTemplate(comments[i]));
  }
  commentCount.innerHTML = '';
  if (shownComments > 0) {
    commentCount.innerHTML = `${shownComments} из <span class="comments-count">${comments.length} комментариев</span>`;
  }
};

export const initBigPictureComments = (data) => {
  comments = data.slice();
  renderComments();
  commentsLoader.addEventListener('click', renderComments);
};

export const destroyBigPictureComments = () => {
  commentsLoader.removeEventListener('click', renderComments);
  shownComments = 0;
};


