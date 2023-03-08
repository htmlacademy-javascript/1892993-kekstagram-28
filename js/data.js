import { getRandomInteger, getRandomArrayElement} from './utils.js';
import { MAX_COUNT_THUMBNAIL } from './consts.js';

const LikeCoint = {
  MIN: 15,
  MAX: 200
};
const AvatarPicture = {
  MIN: 1,
  MAX: 6
};
const CommentCoint = {
  MIN: 1,
  MAX: 2
};
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

const getComment = (_, id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(AvatarPicture.MIN, AvatarPicture.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const getComments = () => Array.from({length: getRandomInteger(CommentCoint.MIN, CommentCoint.MAX)}, getComment);

const getThumbnail = (_, id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LikeCoint.MIN, LikeCoint.MAX),
  comments: getComments()
});

export const getThumbnails = () => Array.from({length: MAX_COUNT_THUMBNAIL}, getThumbnail);
