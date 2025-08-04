/**
 * @fileoverview Функции для отправки сообщений и медиафайлов в Telegram.
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

/**
 * Отправляет стикер.
 * @param {string} chatId ID чата, куда будет отправлен стикер.
 * @param {string} sticker File ID или URL стикера.
 * @param {object} [options] Дополнительные параметры (например, disable_notification, reply_to_message_id).
 * @returns {object} Ответ от Telegram API.
 */
function sendSticker(chatId, sticker, options) {
  const data = {
    chat_id: chatId,
    sticker: sticker,
    ...options
  };
  return makeTelegramApiRequest('sendSticker', data);
}

/**
 * Отправляет местоположение.
 * @param {string} chatId ID чата, куда будет отправлено местоположение.
 * @param {number} latitude Широта местоположения.
 * @param {number} longitude Долгота местоположения.
 * @param {object} [options] Дополнительные параметры (например, horizontal_accuracy, live_period).
 * @returns {object} Ответ от Telegram API.
 */
function sendLocation(chatId, latitude, longitude, options) {
  const data = {
    chat_id: chatId,
    latitude: latitude,
    longitude: longitude,
    ...options
  };
  return makeTelegramApiRequest('sendLocation', data);
}

/**
 * Отправляет контакт.
 * @param {string} chatId ID чата, куда будет отправлен контакт.
 * @param {string} phoneNumber Номер телефона контакта.
 * @param {string} firstName Имя контакта.
 * @param {object} [options] Дополнительные параметры (например, last_name, vcard).
 * @returns {object} Ответ от Telegram API.
 */
function sendContact(chatId, phoneNumber, firstName, options) {
  const data = {
    chat_id: chatId,
    phone_number: phoneNumber,
    first_name: firstName,
    ...options
  };
  return makeTelegramApiRequest('sendContact', data);
}

/**
 * Отправляет опрос.
 * @param {string} chatId ID чата, куда будет отправлен опрос.
 * @param {string} question Текст вопроса опроса.
 * @param {Array<string>} options Массив строк, представляющих варианты ответа.
 * @param {object} [extraOptions] Дополнительные параметры (например, is_anonymous, type, allows_multiple_answers).
 * @returns {object} Ответ от Telegram API.
 */
function sendPoll(chatId, question, options, extraOptions) {
  const data = {
    chat_id: chatId,
    question: question,
    options: JSON.stringify(options),
    ...extraOptions
  };
  return makeTelegramApiRequest('sendPoll', data);
}

/**
 * Отправляет статус действия чата.
 * @param {string} chatId ID чата.
 * @param {string} action Тип действия (например, 'typing', 'upload_photo').
 * @returns {object} Ответ от Telegram API.
 */
function sendChatAction(chatId, action) {
  const data = {
    chat_id: chatId,
    action: action
  };
  return makeTelegramApiRequest('sendChatAction', data);
}