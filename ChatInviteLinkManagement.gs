/**
 * @fileoverview Функции для управления пригласительными ссылками в Telegram.
 */

/**
 * Создает новую пригласительную ссылку для чата.
 * @param {string} chatId ID чата.
 * @param {object} [options] Дополнительные параметры (например, name, expire_date, member_limit).
 * @returns {object} Объект ChatInviteLink.
 */
function createChatInviteLink(chatId, options) {
  const data = {
    chat_id: chatId,
    ...options
  };
  return makeTelegramApiRequest('createChatInviteLink', data);
}

/**
 * Редактирует существующую пригласительную ссылку для чата.
 * @param {string} chatId ID чата.
 * @param {string} inviteLink Пригласительная ссылка для редактирования.
 * @param {object} [options] Дополнительные параметры (например, name, expire_date, member_limit).
 * @returns {object} Объект ChatInviteLink.
 */
function editChatInviteLink(chatId, inviteLink, options) {
  const data = {
    chat_id: chatId,
    invite_link: inviteLink,
    ...options
  };
  return makeTelegramApiRequest('editChatInviteLink', data);
}

/**
 * Отзывает пригласительную ссылку для чата.
 * @param {string} chatId ID чата.
 * @param {string} inviteLink Пригласительная ссылка для отзыва.
 * @returns {object} Объект ChatInviteLink.
 */
function revokeChatInviteLink(chatId, inviteLink) {
  const data = {
    chat_id: chatId,
    invite_link: inviteLink
  };
  return makeTelegramApiRequest('revokeChatInviteLink', data);
}

/**
 * Экспортирует основную пригласительную ссылку для чата.
 * @param {string} chatId ID чата.
 * @returns {string} Основная пригласительная ссылка.
 */
function exportChatInviteLink(chatId) {
  const data = {
    chat_id: chatId
  };
  return makeTelegramApiRequest('exportChatInviteLink', data);
}