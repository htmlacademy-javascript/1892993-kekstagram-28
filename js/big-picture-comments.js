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
let countShownComments = 0;

const renderComments = () => {
  countShownComments += DRAWING_COMMENTS;
  if (countShownComments >= comments.length) {
    commentsLoader.classList.add('hidden');
    countShownComments = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  bigPictureCommentsContainer.innerHTML = '';
  const commentsTemplate = comments.slice(0, countShownComments).map((comment) => getCommentTemplate(comment)).join('');
  bigPictureCommentsContainer.insertAdjacentHTML('beforeend',commentsTemplate);
  commentCount.innerHTML = '';
  if (countShownComments > 0) {
    commentCount.innerHTML = `${countShownComments} из <span class="comments-count">${comments.length} комментариев</span>`;
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

export const initBigPictureComments = (data) => {
  comments = data.slice();
  renderComments();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export const destroyBigPictureComments = () => {
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  countShownComments = 0;
  comments = [];
};


