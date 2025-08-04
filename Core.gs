/**
 * @fileoverview Основные функции для взаимодействия с Telegram API.
 */

/**
 * Отправляет текстовое сообщение в указанный чат Telegram.
 * @param {string} chatId ID чата, куда будет отправлено сообщение.
 * @param {string} text Текст сообщения.
 * @returns {object} Ответ от Telegram API.
 */
function sendMessage(chatId, text) {
  const botToken = getBotToken(); // Получаем токен из Settings.gs
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload = {
    method: 'post',
    payload: {
      chat_id: chatId,
      text: text
    },
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(telegramApiUrl, payload);
    const jsonResponse = JSON.parse(response.getContentText());
    if (!jsonResponse.ok) {
      Logger.log(`Ошибка отправки сообщения: ${jsonResponse.description}`);
      throw new Error(`Telegram API Error: ${jsonResponse.description}`);
    }
    Logger.log(`Сообщение успешно отправлено в чат ${chatId}.`);
    return jsonResponse;
  } catch (e) {
    Logger.log(`Исключение при отправке сообщения: ${e.message}`);
    throw e;
  }
}
