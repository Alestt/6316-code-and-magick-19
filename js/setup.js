'use strict';

(function () {
  var AMOUNT_WIZARDS = 4;

  var userSetup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // функция возвращает случайное целое число от min(вкл) до max(не вкл)
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var userForm = userSetup.querySelector('.setup-wizard-form');

  // при успешном выполнении отправки данных закрывает попап
  var onSuccess = function () {
    window.dialog.setupClose();
  };

  // при ошибочном выполнении (отправки, получении данных) выводит сообщение об ошибке
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // при успешном получении данных с сервера - выводит похожих волшебников
  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < AMOUNT_WIZARDS; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userSetup.querySelector('.setup-similar').classList.remove('hidden');
  };

  // отправляет данные на сервер
  userForm.addEventListener('submit', function (evt) {
    var formData = new FormData(userForm);
    window.backend.save(formData, onSuccess, onError);
    evt.preventDefault();
  });

  // получаем данные о похожих волшебниках
  window.backend.load(onLoad, onError);

  window.setup = {
    getRandomInteger: getRandomInteger
  };

})();
