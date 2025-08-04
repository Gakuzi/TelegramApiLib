/**
 * @fileoverview Настройки библиотеки Telegram API.
 */

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
