'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var AMOUNT_WIZARDS = 4;

  var wizards = [];

  var userSetup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

  window.setup = {
    getRandomInteger: getRandomInteger,
  };
})();
