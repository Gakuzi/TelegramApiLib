function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Telegram Bot API')
      .addItem('Настройки бота', 'openSettingsModal')
      .addToUi();
}

function openSettingsModal() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('index')
      .setWidth(600)
      .setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Настройки Telegram Bot');
}

function setBotTokenFromModal(token) {
  try {
    setBotToken(token); // Вызов функции из Settings.gs
    return 'Токен бота успешно сохранен.';
  } catch (e) {
    return 'Ошибка сохранения токена: ' + e.message;
  }
}

function setWebhookFromModal(url) {
  try {
    var result = setWebhook(url); // Вызов функции из BotManagement.gs
    return 'Вебхук успешно установлен: ' + JSON.stringify(result);
  } catch (e) {
    return 'Ошибка установки вебхука: ' + e.message;
  }
}

function deleteWebhookFromModal() {
  try {
    var result = deleteWebhook(); // Вызов функции из BotManagement.gs
    return 'Вебхук успешно удален: ' + JSON.stringify(result);
  } catch (e) {
    return 'Ошибка удаления вебхука: ' + e.message;
  }
}

function getWebhookInfoFromModal() {
  try {
    var info = getWebhookInfo(); // Вызов функции из BotManagement.gs
    return 'Информация о вебхуке: ' + JSON.stringify(info, null, 2);
  } catch (e) {
    return 'Ошибка получения информации о вебхуке: ' + e.message;
  }
}