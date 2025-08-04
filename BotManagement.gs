/**
 * @fileoverview Общие функции для управления ботом Telegram.
 */

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

/**
 * Отвечает на инлайн-запрос.
 * @param {string} inlineQueryId Уникальный идентификатор инлайн-запроса.
 * @param {Array<object>} results Массив объектов InlineQueryResult.
 * @param {object} [options] Дополнительные параметры (например, cache_time, is_personal, next_offset).
 * @returns {object} Ответ от Telegram API.
 */
function answerInlineQuery(inlineQueryId, results, options) {
  const data = {
    inline_query_id: inlineQueryId,
    results: JSON.stringify(results),
    ...options
  };
  return makeTelegramApiRequest('answerInlineQuery', data);
}

/**
 * Устанавливает счет для пользователя в игре.
 * @param {number} userId ID пользователя.
 * @param {number} score Счет пользователя.
 * @param {object} [options] Дополнительные параметры (например, force, disable_edit_message, chat_id, message_id, inline_message_id).
 * @returns {object} Ответ от Telegram API.
 */
function setGameScore(userId, score, options) {
  const data = {
    user_id: userId,
    score: score,
    ...options
  };
  return makeTelegramApiRequest('setGameScore', data);
}

/**
 * Получает таблицу рекордов для игры.
 * @param {number} userId ID пользователя.
 * @param {object} [options] Дополнительные параметры (например, chat_id, message_id, inline_message_id).
 * @returns {Array<object>} Массив объектов GameHighScore.
 */
function getGameHighScores(userId, options) {
  const data = {
    user_id: userId,
    ...options
  };
  return makeTelegramApiRequest('getGameHighScores', data);
}

/**
 * Отвечает на запрос на доставку.
 * @param {string} shippingQueryId Уникальный идентификатор запроса на доставку.
 * @param {boolean} ok True, если запрос на доставку был успешно обработан.
 * @param {object} [options] Дополнительные параметры (например, shipping_options, error_message).
 * @returns {object} Ответ от Telegram API.
 */
function answerShippingQuery(shippingQueryId, ok, options) {
  const data = {
    shipping_query_id: shippingQueryId,
    ok: ok,
    ...options
  };
  return makeTelegramApiRequest('answerShippingQuery', data);
}

/**
 * Отвечает на запрос перед оплатой.
 * @param {string} preCheckoutQueryId Уникальный идентификатор запроса перед оплатой.
 * @param {boolean} ok True, если запрос перед оплатой был успешно обработан.
 * @param {string} [errorMessage] Сообщение об ошибке, если ok равно false.
 * @returns {object} Ответ от Telegram API.
 */
function answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage) {
  const data = {
    pre_checkout_query_id: preCheckoutQueryId,
    ok: ok,
  };
  if (errorMessage) data.error_message = errorMessage;
  return makeTelegramApiRequest('answerPreCheckoutQuery', data);
}

/**
 * Получает информацию о файле.
 * @param {string} fileId File ID файла.
 * @returns {object} Объект File.
 */
function getFile(fileId) {
  const data = {
    file_id: fileId
  };
  return makeTelegramApiRequest('getFile', data);
}

/**
 * Скачивает файл с серверов Telegram.
 * @param {string} filePath Путь к файлу, полученный из getFile.
 * @returns {GoogleAppsScript.URL_Fetch.HTTPResponse} HTTPResponse объект, содержащий файл.
 */
function downloadFile(filePath) {
  const botToken = getBotToken();
  const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
  return UrlFetchApp.fetch(fileUrl);
}

/**
 * Получает фотографии профиля пользователя.
 * @param {number} userId ID пользователя.
 * @param {object} [options] Дополнительные параметры (например, offset, limit).
 * @returns {object} Объект UserProfilePhotos.
 */
function getUserProfilePhotos(userId, options) {
  const data = {
    user_id: userId,
    ...options
  };
  return makeTelegramApiRequest('getUserProfilePhotos', data);
}

/**
 * Получает информацию о боте.
 * @returns {object} Объект User.
 */
function getMe() {
  return makeTelegramApiRequest('getMe');
}

/**
 * Устанавливает список команд бота.
 * @param {Array<object>} commands Массив объектов BotCommand.
 * @param {object} [options] Дополнительные параметры (например, scope, language_code).
 * @returns {object} Ответ от Telegram API.
 */
function setMyCommands(commands, options) {
  const data = {
    commands: JSON.stringify(commands),
    ...options
  };
  return makeTelegramApiRequest('setMyCommands', data);
}

/**
 * Удаляет список команд бота.
 * @param {object} [options] Дополнительные параметры (например, scope, language_code).
 * @returns {object} Ответ от Telegram API.
 */
function deleteMyCommands(options) {
  const data = {
    ...options
  };
  return makeTelegramApiRequest('deleteMyCommands', data);
}

/**
 * Получает список команд бота.
 * @param {object} [options] Дополнительные параметры (например, scope, language_code).
 * @returns {Array<object>} Массив объектов BotCommand.
 */
function getMyCommands(options) {
  const data = {
    ...options
  };
  return makeTelegramApiRequest('getMyCommands', data);
}