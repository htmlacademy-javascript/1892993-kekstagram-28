import { getThumbnails } from './mock.js';

const getRequestImitation = (cb) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(cb()), 500);
  });

export const getData = async () => {
  let data = [];

  await getRequestImitation(getThumbnails).then((loadedData) => {
    data = loadedData;
  // eslint-disable-next-line no-console
  }).catch(() => console.log('Открытие попапа ошибки'));

  return data;
};
