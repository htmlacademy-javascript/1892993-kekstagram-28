const EFFECTS = {
  none: {
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
};

const defaultEffect = EFFECTS.none;
let chosenEffect = defaultEffect;

const imageElement = document.querySelector('.img-upload__preview img');
const effectsListElements = document.querySelector('.effects');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');
const effectLevelElement = sliderContainerElement.querySelector('.effect-level__value');

const isDefault = () => chosenEffect === defaultEffect;

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const updateEffects = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.start,
    step: chosenEffect.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS[evt.target.value];
  imageElement.className = (`effects__preview--${chosenEffect.name}`);
  updateEffects();
};

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.start,
  step: defaultEffect.step,
  connect: 'lower',
});

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageElement.style.filter = isDefault() ? defaultEffect.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

export const resetEffects = () => {
  chosenEffect = defaultEffect;
  imageElement.className = (`effects__preview--${chosenEffect.name}`);
  updateEffects();

  effectsListElements.removeEventListener('change', onEffectsChange);
};

export const initEffects = () => {
  effectsListElements.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);

  if (isDefault()) {
    hideSlider();
  }
};
