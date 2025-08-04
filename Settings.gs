/**
 * @fileoverview Настройки библиотеки Telegram API.
 */

/**
 * Получает токен Telegram бота из PropertiesService.
 * @returns {string} Токен Telegram бота.
 */
function getBotToken() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const botToken = scriptProperties.getProperty('TELEGRAM_BOT_TOKEN');
  if (!botToken) {
    throw new Error('Telegram Bot Token не установлен в PropertiesService. Пожалуйста, установите свойство TELEGRAM_BOT_TOKEN.');
  }
  return botToken;
}

/**
 * Устанавливает токен Telegram бота в PropertiesService.
 * Используйте эту функцию для инициализации или обновления токена.
 * @param {string} token Токен Telegram бота.
 */
function setBotToken(token) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('TELEGRAM_BOT_TOKEN', token);
  Logger.log('Telegram Bot Token успешно установлен.');
}
