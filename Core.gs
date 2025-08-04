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
