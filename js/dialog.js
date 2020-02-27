'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupWizard = document.querySelector('.setup-wizard');
  var userSetup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var inputCoat = userSetup.querySelector('[name=coat-color]');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var inputEyes = userSetup.querySelector('[name=eyes-color]');
  var wizardFireball = userSetup.querySelector('.setup-fireball-wrap');
  var inputFireball = wizardFireball.querySelector('[name=fireball-color]');
  var setupClose = userSetup.querySelector('.setup-close');
  var setupUserName = userSetup.querySelector('.setup-user-name');

  // меняет цвет заданного элемента
  var getElementColor = function (array, element, input) {
    var currentColor = array[window.setup.getRandomInteger(0, array.length)];
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
})();
