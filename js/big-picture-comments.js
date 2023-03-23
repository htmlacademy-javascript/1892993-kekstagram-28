const bigPictureCommentsContainer = document.querySelector ('.social__comments');
const commentCount = document.querySelector ('.social__comment-count');
const commentsLoader = document.querySelector ('.comments-loader');
const getCommentTemplate = ({avatar, name, message}) => `<li class="social__comment">
<img
    class="social__picture"
    src="${avatar}"
    alt="${name}"
    width="35" height="35">
<p class="social__text">${message}</p>
</li>`;
let comments = [];

const addCommentList = () => {
  bigPictureCommentsContainer.innerHTML = '';
  comments.forEach((comment) => bigPictureCommentsContainer.insertAdjacentHTML('beforeend', getCommentTemplate(comment)));
};

export const initBigPictureComments = (data) => {
  comments = data.slice();
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  addCommentList();
};

export const destroyBigPictureComments = () => {
  // eslint-disable-next-line no-console
  console.log('destroy');
};
