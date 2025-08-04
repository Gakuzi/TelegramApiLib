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
  const data = {
    chat_id: chatId,
    text: text
  };
  return makeTelegramApiRequest('sendMessage', data);
}

/**
 * Устанавливает вебхук для получения обновлений от Telegram.
 * @param {string} url URL, на который Telegram будет отправлять обновления.
 * @returns {object} Ответ от Telegram API.
 */
function setWebhook(url) {
  const data = {
    url: url
  };
  return makeTelegramApiRequest('setWebhook', data);
}

/**
 * Удаляет текущий вебхук Telegram.
 * @returns {object} Ответ от Telegram API.
 */
function deleteWebhook() {
  return makeTelegramApiRequest('deleteWebhook');
}

/**
 * Отвечает на колбэк-запрос.
 * @param {string} callbackQueryId Уникальный идентификатор колбэк-запроса.
 * @param {string} [text] Текст уведомления, которое будет показано пользователю.
 * @param {boolean} [showAlert] Если true, уведомление будет показано как всплывающее окно.
 * @param {string} [url] URL для открытия в браузере пользователя.
 * @param {number} [cacheTime] Максимальное время в секундах, в течение которого результат колбэк-запроса может быть кэширован на стороне клиента.
 * @returns {object} Ответ от Telegram API.
 */
function answerCallbackQuery(callbackQueryId, text, showAlert, url, cacheTime) {
  const data = {
    callback_query_id: callbackQueryId,
  };
  if (text) data.text = text;
  if (showAlert) data.show_alert = showAlert;
  if (url) data.url = url;
  if (cacheTime) data.cache_time = cacheTime;

  return makeTelegramApiRequest('answerCallbackQuery', data);
}