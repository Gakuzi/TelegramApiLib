/**
 * @fileoverview Вспомогательные функции для работы с Telegram API.
 */

/**
 * Выполняет запрос к Telegram Bot API.
 * @param {string} method Метод Telegram API (например, 'sendMessage', 'setWebhook').
 * @param {object} [data] Данные для отправки в запросе (payload).
 * @returns {object} Ответ от Telegram API.
 * @throws {Error} Если запрос к Telegram API завершился ошибкой.
 */
function makeTelegramApiRequest(method, data) {
  const botToken = getBotToken(); // Получаем токен из Settings.gs
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/${method}`;

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(telegramApiUrl, options);
    const jsonResponse = JSON.parse(response.getContentText());

    if (!jsonResponse.ok) {
      Logger.log(`Ошибка Telegram API (${method}): ${jsonResponse.description}`);
      throw new Error(`Telegram API Error (${method}): ${jsonResponse.description}`);
    }
    return jsonResponse;
  } catch (e) {
    Logger.log(`Исключение при запросе к Telegram API (${method}): ${e.message}`);
    throw e;
  }
}
