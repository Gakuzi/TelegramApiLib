/**
 * @fileoverview Функции для управления сообщениями в Telegram.
 */

/**
 * Редактирует текстовое сообщение.
 * @param {string} chatId ID чата, содержащего сообщение.
 * @param {number} messageId ID сообщения для редактирования.
 * @param {string} text Новый текст сообщения.
 * @param {object} [options] Дополнительные параметры (например, parse_mode, reply_markup).
 * @returns {object} Ответ от Telegram API.
 */
function editMessageText(chatId, messageId, text, options) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    ...options
  };
  return makeTelegramApiRequest('editMessageText', data);
}

/**
 * Редактирует подпись к сообщению.
 * @param {string} chatId ID чата, содержащего сообщение.
 * @param {number} messageId ID сообщения для редактирования.
 * @param {string} [caption] Новая подпись к сообщению.
 * @param {object} [options] Дополнительные параметры (например, parse_mode, reply_markup).
 * @returns {object} Ответ от Telegram API.
 */
function editMessageCaption(chatId, messageId, caption, options) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
  };
  if (caption) data.caption = caption;
  Object.assign(data, options);
  return makeTelegramApiRequest('editMessageCaption', data);
}

/**
 * Редактирует медиафайл сообщения.
 * @param {string} chatId ID чата, содержащего сообщение.
 * @param {number} messageId ID сообщения для редактирования.
 * @param {object} media Объект InputMedia.
 * @param {object} [options] Дополнительные параметры (например, reply_markup).
 * @returns {object} Ответ от Telegram API.
 */
function editMessageMedia(chatId, messageId, media, options) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
    media: JSON.stringify(media),
    ...options
  };
  return makeTelegramApiRequest('editMessageMedia', data);
}

/**
 * Редактирует разметку ответа сообщения.
 * @param {string} chatId ID чата, содержащего сообщение.
 * @param {number} messageId ID сообщения для редактирования.
 * @param {object} [replyMarkup] Новая разметка ответа.
 * @returns {object} Ответ от Telegram API.
 */
function editMessageReplyMarkup(chatId, messageId, replyMarkup) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
  };
  if (replyMarkup) data.reply_markup = JSON.stringify(replyMarkup);
  return makeTelegramApiRequest('editMessageReplyMarkup', data);
}

/**
 * Удаляет сообщение.
 * @param {string} chatId ID чата, содержащего сообщение.
 * @param {number} messageId ID сообщения для удаления.
 * @returns {object} Ответ от Telegram API.
 */
function deleteMessage(chatId, messageId) {
  const data = {
    chat_id: chatId,
    message_id: messageId
  };
  return makeTelegramApiRequest('deleteMessage', data);
}

/**
 * Копирует сообщение.
 * @param {string} chatId ID целевого чата.
 * @param {string} fromChatId ID исходного чата.
 * @param {number} messageId ID сообщения для копирования.
 * @param {object} [options] Дополнительные параметры (например, caption, parse_mode, reply_markup).
 * @returns {object} Объект MessageId.
 */
function copyMessage(chatId, fromChatId, messageId, options) {
  const data = {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId,
    ...options
  };
  return makeTelegramApiRequest('copyMessage', data);
}

/**
 * Пересылает сообщение.
 * @param {string} chatId ID целевого чата.
 * @param {string} fromChatId ID исходного чата.
 * @param {number} messageId ID сообщения для пересылки.
 * @param {object} [options] Дополнительные параметры (например, disable_notification, protect_content).
 * @returns {object} Объект MessageId.
 */
function forwardMessage(chatId, fromChatId, messageId, options) {
  const data = {
    chat_id: chatId,
    from_chat_id: fromChatId,
    message_id: messageId,
    ...options
  };
  return makeTelegramApiRequest('forwardMessage', data);
}

/**
 * Останавливает опрос.
 * @param {string} chatId ID чата, содержащего опрос.
 * @param {number} messageId ID сообщения с опросом.
 * @param {object} [options] Дополнительные параметры (например, reply_markup).
 * @returns {object} Объект Poll.
 */
function stopPoll(chatId, messageId, options) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
    ...options
  };
  return makeTelegramApiRequest('stopPoll', data);
}

