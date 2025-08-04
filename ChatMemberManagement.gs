/**
 * @fileoverview Функции для управления членами чата и их правами в Telegram.
 */

/**
 * Ограничивает права пользователя в чате.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @param {object} permissions Объект ChatPermissions.
 * @param {object} [options] Дополнительные параметры (например, use_independent_chat_permissions, until_date).
 * @returns {object} Ответ от Telegram API.
 */
function restrictChatMember(chatId, userId, permissions, options) {
  const data = {
    chat_id: chatId,
    user_id: userId,
    permissions: permissions,
    ...options
  };
  return makeTelegramApiRequest('restrictChatMember', data);
}

/**
 * Повышает или понижает пользователя в чате.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @param {object} [options] Дополнительные параметры (например, is_anonymous, can_manage_chat, can_post_messages).
 * @returns {object} Ответ от Telegram API.
 */
function promoteChatMember(chatId, userId, options) {
  const data = {
    chat_id: chatId,
    user_id: userId,
    ...options
  };
  return makeTelegramApiRequest('promoteChatMember', data);
}

/**
 * Устанавливает пользовательское название для администратора чата.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @param {string} customTitle Пользовательское название.
 * @returns {object} Ответ от Telegram API.
 */
function setChatAdministratorCustomTitle(chatId, userId, customTitle) {
  const data = {
    chat_id: chatId,
    user_id: userId,
    custom_title: customTitle
  };
  return makeTelegramApiRequest('setChatAdministratorCustomTitle', data);
}

/**
 * Банит пользователя в чате.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @param {object} [options] Дополнительные параметры (например, until_date, revoke_messages).
 * @returns {object} Ответ от Telegram API.
 */
function banChatMember(chatId, userId, options) {
  const data = {
    chat_id: chatId,
    user_id: userId,
    ...options
  };
  return makeTelegramApiRequest('banChatMember', data);
}

/**
 * Разбанивает пользователя в чате.
 * @param {string} chatId ID чата.
 * @param {number} userId ID пользователя.
 * @param {object} [options] Дополнительные параметры (например, only_if_banned).
 * @returns {object} Ответ от Telegram API.
 */
function unbanChatMember(chatId, userId, options) {
  const data = {
    chat_id: chatId,
    user_id: userId,
    ...options
  };
  return makeTelegramApiRequest('unbanChatMember', data);
}

/**
 * Банит отправителя чата.
 * @param {string} chatId ID чата.
 * @param {number} senderChatId ID чата отправителя.
 * @returns {object} Ответ от Telegram API.
 */
function banChatSenderChat(chatId, senderChatId) {
  const data = {
    chat_id: chatId,
    sender_chat_id: senderChatId
  };
  return makeTelegramApiRequest('banChatSenderChat', data);
}

/**
 * Разбанивает отправителя чата.
 * @param {string} chatId ID чата.
 * @param {number} senderChatId ID чата отправителя.
 * @returns {object} Ответ от Telegram API.
 */
function unbanChatSenderChat(chatId, senderChatId) {
  const data = {
    chat_id: chatId,
    sender_chat_id: senderChatId
  };
  return makeTelegramApiRequest('unbanChatSenderChat', data);
}