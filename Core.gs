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

/**
 * Устанавливает вебхук для получения обновлений от Telegram.
 * @param {string} url URL, на который Telegram будет отправлять обновления.
 * @returns {object} Ответ от Telegram API.
 */
function setWebhook(url) {
  const botToken = getBotToken();
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/setWebhook`;

  const payload = {
    method: 'post',
    payload: {
      url: url
    },
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(telegramApiUrl, payload);
    const jsonResponse = JSON.parse(response.getContentText());
    if (!jsonResponse.ok) {
      Logger.log(`Ошибка установки вебхука: ${jsonResponse.description}`);
      throw new Error(`Telegram API Error: ${jsonResponse.description}`);
    }
    Logger.log(`Вебхук успешно установлен на ${url}.`);
    return jsonResponse;
  } catch (e) {
    Logger.log(`Исключение при установке вебхука: ${e.message}`);
    throw e;
  }
}

/**
 * Удаляет текущий вебхук Telegram.
 * @returns {object} Ответ от Telegram API.
 */
function deleteWebhook() {
  const botToken = getBotToken();
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/deleteWebhook`;

  const payload = {
    method: 'post',
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(telegramApiUrl, payload);
    const jsonResponse = JSON.parse(response.getContentText());
    if (!jsonResponse.ok) {
      Logger.log(`Ошибка удаления вебхука: ${jsonResponse.description}`);
      throw new Error(`Telegram API Error: ${jsonResponse.description}`);
    }
    Logger.log(`Вебхук успешно удален.`);
    return jsonResponse;
  } catch (e) {
    Logger.log(`Исключение при удалении вебхука: ${e.message}`);
    throw e;
  }
}