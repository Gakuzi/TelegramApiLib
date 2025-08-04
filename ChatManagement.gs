/**
 * @fileoverview Функции для управления информацией о чатах в Telegram.
 */

/**
 * Получает информацию о чате.
 * @param {string} chatId ID чата.
 * @returns {object} Объект Chat.
 */
function getChat(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('getChat', data);
}

/**
 * Получает список администраторов чата.
 * @param {string} chatId ID чата.
 * @returns {Array<object>} Массив объектов ChatMember.
 */
function getChatAdministrators(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('getChatAdministrators', data);
}

/**
 * Получает информацию о члене чата.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @returns {object} Объект ChatMember.
 */
function getChatMember(chatId, userId) {
  const data = {
    chat_id: chatId,
    user_id: userId
  };
  return makeTelegramApiRequest('getChatMember', data);
}

/**
 * Получает количество членов чата.
 * @param {string} chatId ID чата.
 * @returns {number} Количество членов чата.
 */
function getChatMembersCount(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('getChatMembersCount', data);
}

/**
 * Покидает чат.
 * @param {string} chatId ID чата.
 * @returns {object} Ответ от Telegram API.
 */
function leaveChat(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('leaveChat', data);
}

/**
 * Устанавливает новую фотографию чата.
 * @param {string} chatId ID чата.
 * @param {string} photo File ID или URL фотографии.
 * @returns {object} Ответ от Telegram API.
 */
function setChatPhoto(chatId, photo) {
  const data = {
    chat_id: chatId,
    photo: photo
  };
  return makeTelegramApiRequest('setChatPhoto', data);
}

/**
 * Удаляет фотографию чата.
 * @param {string} chatId ID чата.
 * @returns {object} Ответ от Telegram API.
 */
function deleteChatPhoto(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('deleteChatPhoto', data);
}

/**
 * Устанавливает новое название чата.
 * @param {string} chatId ID чата.
 * @param {string} title Новое название чата.
 * @returns {object} Ответ от Telegram API.
 */
function setChatTitle(chatId, title) {
  const data = {
    chat_id: chatId,
    title: title
  };
  return makeTelegramApiRequest('setChatTitle', data);
}

/**
 * Устанавливает новое описание чата.
 * @param {string} chatId ID чата.
 * @param {string} description Новое описание чата.
 * @returns {object} Ответ от Telegram API.
 */
function setChatDescription(chatId, description) {
  const data = {
    chat_id: chatId,
    description: description
  };
  return makeTelegramApiRequest('setChatDescription', data);
}

/**
 * Закрепляет сообщение в чате.
 * @param {string} chatId ID чата.
 * @param {number} messageId ID сообщения для закрепления.
 * @param {object} [options] Дополнительные параметры (например, disable_notification).
 * @returns {object} Ответ от Telegram API.
 */
function pinChatMessage(chatId, messageId, options) {
  const data = {
    chat_id: chatId,
    message_id: messageId,
    ...options
  };
  return makeTelegramApiRequest('pinChatMessage', data);
}

/**
 * Открепляет сообщение в чате.
 * @param {string} chatId ID чата.
 * @param {number} messageId ID сообщения для открепления.
 * @returns {object} Ответ от Telegram API.
 */
function unpinChatMessage(chatId, messageId) {
  const data = {
    chat_id: chatId,
    message_id: messageId
  };
  return makeTelegramApiRequest('unpinChatMessage', data);
}

/**
 * Открепляет все сообщения в чате.
 * @param {string} chatId ID чата.
 * @returns {object} Ответ от Telegram API.
 */
function unpinAllChatMessages(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('unpinAllChatMessages', data);
}