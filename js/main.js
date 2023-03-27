import { getData } from './api.js';
import { initThumbnails } from './thumbnails.js';

const data = await getData();

initThumbnails(data);
