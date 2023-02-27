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

const DESCRIPTION = [
  'Шалтай балтай',
  'Аля Улю',
  'Галя гуляй',
  'А мне бы в небо',
  'Сим салабим',
  'Было бы всё перекрасно, если бы не было всё так плохо'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NUMBER_USERS = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const getUser = (_, id) => ({
  id: id + 1,
  url: `photos/${id + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomNumber(15, 150),
  comments: [{
    id: getRandomNumber(1, 300),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES)
  },
  {
    id: getRandomNumber(1, 300),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES)
  }]
});

const totalUsers = Array.from({length: NUMBER_USERS}, getUser);

//console.log(totalUsers);
