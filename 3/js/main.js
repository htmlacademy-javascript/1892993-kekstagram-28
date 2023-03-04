const LIKE_MIN_COINT = 15;
const LIKE_MAX_COINT = 200;
const AVATAR_MIN_PICTURE = 1;
const AVATAR_MAX_PICTURE = 6;
const MAX_COUNT_COMMENT = 2;
const MAX_COUNT_USER = 25;
const NAMES = [
  'Лиза',
  'Катя',
  'Леша',
  'Эдуард',
  'Максим',
  'Эдик',
  'Вася',
  'Ваня',
  'Валя',
  'Иннокентий'
];
const DESCRIPTIONS = [
  'Шалтай балтай',
  'Аля Улю',
  'Галя гуляй',
  'А мне бы в небо',
  'Сим салабим',
  'Было бы всё перекрасно, если бы не было всё так плохо'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const getComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_PICTURE, AVATAR_MAX_PICTURE)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const getComments = () => Array.from({length: getRandomInteger(1, MAX_COUNT_COMMENT)}, getComment);

const getUser = (_, id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COINT, LIKE_MAX_COINT),
  comments: getComments()
});

const getUsers = () => Array.from({length: MAX_COUNT_USER}, getUser);

getUsers();
