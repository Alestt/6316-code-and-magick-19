'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_RADIUS = 15;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHADOW_GAP = 10;
var TEXT_X = 120;
var TEXT_Y = 45;
var TEXT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_X = 140;
var BAR_Y = 240;
var BAR_TEXT_Y = 260;
var BAR_MY_COLOR = 'rgba(255, 0, 0, 1)';
var font = '16px PT Mono';
var cloudColor = 'rgba(255, 255, 255, 1)';
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var textColor = 'rgba(0, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + CLOUD_RADIUS);
  ctx.lineTo(x, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x + CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_RADIUS);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH - CLOUD_RADIUS, y);
  ctx.lineTo(x + CLOUD_RADIUS, y);
  ctx.quadraticCurveTo(x, y, x, y + CLOUD_RADIUS);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, text, x, y) {
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
};

var getRandomNumber = function () {
  return Math.floor(Math.random() * 100);
};

var getColorBar = function () {
  var randomNumber = getRandomNumber();
  return 'hsl(240, ' + randomNumber + '%, 50%)';
};

var getMaxElement = function (array) {
  var maxElement = array[0];

  for (var i = 0; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }

  return maxElement;
};

var renderHistogram = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.fillText(names[i], BAR_X + (BAR_GAP + BAR_WIDTH) * i, BAR_TEXT_Y);
    ctx.fillText(Math.floor(times[i]), BAR_X + (BAR_GAP + BAR_WIDTH) * i, BAR_Y + (BAR_HEIGHT * times[i]) / -maxTime - 10);
    ctx.fillStyle = names[i] === 'Вы' ? BAR_MY_COLOR : getColorBar();
    ctx.fillRect(BAR_X + (BAR_GAP + BAR_WIDTH) * i, BAR_Y, BAR_WIDTH, (BAR_HEIGHT * times[i]) / -maxTime);
  }
};

window.renderStatistics = function (ctx, names, times) {
  var shadowX = CLOUD_X + SHADOW_GAP;
  var shadowY = CLOUD_Y + SHADOW_GAP;

  renderCloud(ctx, shadowX, shadowY, shadowColor);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, cloudColor);

  renderText(ctx, 'Ура вы победили!', TEXT_X, TEXT_Y);
  renderText(ctx, 'Список результатов:', TEXT_X, TEXT_Y + TEXT_GAP);

  renderHistogram(ctx, names, times);
};
