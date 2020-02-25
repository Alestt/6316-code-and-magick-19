'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var AMOUNT_WIZARDS = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var wizards = [];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var userSetup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userSetup.querySelector('.setup-close');
var setupUserName = userSetup.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var inputCoat = userSetup.querySelector('[name=coat-color]');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var inputEyes = userSetup.querySelector('[name=eyes-color]');
var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');
var inputFireball = wizardFireball.querySelector('[name=fireball-color]');

// функция возвращает случайное целое число от min(вкл) до max(не вкл)
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomWizards = function () {
  for (var i = 0; i < AMOUNT_WIZARDS; i++) {
    wizards[i] = {
      name: NAMES[getRandomInteger(0, NAMES.length)] + ' ' + SURNAMES[getRandomInteger(0, SURNAMES.length)],
      coatColor: COAT_COLORS[getRandomInteger(0, COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomInteger(0, EYES_COLORS.length)],
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createWizard = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AMOUNT_WIZARDS; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
};

userSetup.querySelector('.setup-similar').classList.remove('hidden');

getRandomWizards();
createWizard();

// меняет цвет заданного элемента
var getElementColor = function (array, element, input) {
  var currentColor = array[getRandomInteger(0, array.length)];
  if (element === wizardFireball) {
    element.style.backgroundColor = currentColor;
  }
  element.style.fill = currentColor;
  input.value = currentColor;
};

var onCoatClick = function () {
  getElementColor(COAT_COLORS, wizardCoat, inputCoat);
};

var onEyesClick = function () {
  getElementColor(EYES_COLORS, wizardEyes, inputEyes);
};

var onFireballClick = function () {
  getElementColor(FIREBALL_COLORS, wizardFireball, inputFireball);
};

// закрытие попапа при нажатии Escape с условием, что фокус не на форме ввода имени
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && setupUserName !== document.activeElement) {
    closePopup();
  }
};

// действия при открытии попапа
var openPopup = function () {
  userSetup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardCoat.addEventListener('click', onCoatClick);
  wizardEyes.addEventListener('click', onEyesClick);
  wizardFireball.addEventListener('click', onFireballClick);
};

// действия при закрытии попапа
var closePopup = function () {
  userSetup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardCoat.removeEventListener('click', onCoatClick);
  wizardEyes.removeEventListener('click', onEyesClick);
  wizardFireball.removeEventListener('click', onFireballClick);
};

// обработчики событий
setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    userSetup.classList.add('hidden');
  }
});
