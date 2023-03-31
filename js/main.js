import { getData } from './api.js';
import { initThumbnails } from './thumbnails.js';
import { initUploadImage } from './upload-image.js';

const data = await getData();

initUploadImage();
initThumbnails(data);
