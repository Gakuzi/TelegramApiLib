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

/**
 * Отправляет фотографию.
 * @param {string} chatId ID чата, куда будет отправлена фотография.
 * @param {string} photo File ID или URL фотографии.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode).
 * @returns {object} Ответ от Telegram API.
 */
function sendPhoto(chatId, photo, options) {
  const data = {
    chat_id: chatId,
    photo: photo,
    ...options
  };
  return makeTelegramApiRequest('sendPhoto', data);
}

/**
 * Отправляет аудиофайл.
 * @param {string} chatId ID чата, куда будет отправлен аудиофайл.
 * @param {string} audio File ID или URL аудиофайла.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, duration, performer, title).
 * @returns {object} Ответ от Telegram API.
 */
function sendAudio(chatId, audio, options) {
  const data = {
    chat_id: chatId,
    audio: audio,
    ...options
  };
  return makeTelegramApiRequest('sendAudio', data);
}

/**
 * Отправляет документ.
 * @param {string} chatId ID чата, куда будет отправлен документ.
 * @param {string} document File ID или URL документа.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, disable_content_type_detection).
 * @returns {object} Ответ от Telegram API.
 */
function sendDocument(chatId, document, options) {
  const data = {
    chat_id: chatId,
    document: document,
    ...options
  };
  return makeTelegramApiRequest('sendDocument', data);
}

/**
 * Отправляет видеофайл.
 * @param {string} chatId ID чата, куда будет отправлен видеофайл.
 * @param {string} video File ID или URL видеофайла.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, duration, width, height, thumbnail, supports_streaming).
 * @returns {object} Ответ от Telegram API.
 */
function sendVideo(chatId, video, options) {
  const data = {
    chat_id: chatId,
    video: video,
    ...options
  };
  return makeTelegramApiRequest('sendVideo', data);
}

/**
 * Отправляет анимацию (GIF или H.264/MPEG-4 AVC видео без звука).
 * @param {string} chatId ID чата, куда будет отправлена анимация.
 * @param {string} animation File ID или URL анимации.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, duration, width, height, thumbnail).
 * @returns {object} Ответ от Telegram API.
 */
function sendAnimation(chatId, animation, options) {
  const data = {
    chat_id: chatId,
    animation: animation,
    ...options
  };
  return makeTelegramApiRequest('sendAnimation', data);
}

/**
 * Отправляет голосовое сообщение.
 * @param {string} chatId ID чата, куда будет отправлено голосовое сообщение.
 * @param {string} voice File ID или URL голосового сообщения.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, duration).
 * @returns {object} Ответ от Telegram API.
 */
function sendVoice(chatId, voice, options) {
  const data = {
    chat_id: chatId,
    voice: voice,
    ...options
  };
  return makeTelegramApiRequest('sendVoice', data);
}

/**
 * Отправляет видеосообщение (круглое видео).
 * @param {string} chatId ID чата, куда будет отправлено видеосообщение.
 * @param {string} videoNote File ID или URL видеосообщения.
 * @param {object} [options] Дополнительные параметры (например, duration, length, thumbnail).
 * @returns {object} Ответ от Telegram API.
 */
function sendVideoNote(chatId, videoNote, options) {
  const data = {
    chat_id: chatId,
    video_note: videoNote,
    ...options
  };
  return makeTelegramApiRequest('sendVideoNote', data);
}
