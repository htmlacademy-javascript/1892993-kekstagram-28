import { getData, sendData } from './api.js';
import { initUploadImage } from './upload-image.js';
import { initFilter } from './filter.js';
import { destroyForm, setOnFormSubmit } from './form.js';
import { showAlert, showErrorMessage, showSuccessMessage } from './utils.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    showSuccessMessage();
    destroyForm();
  } catch (err) {
    showErrorMessage();
  }
});


initUploadImage();

try {
  const data = await getData();
  initFilter(data);
} catch (err) {
  showAlert(err.message);
}

