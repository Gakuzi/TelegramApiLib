/**
 * @fileoverview Функции для управления стикерами в Telegram.
 */

/**
 * Получает информацию о наборе стикеров.
 * @param {string} name Название набора стикеров.
 * @returns {object} Объект StickerSet.
 */
function getStickerSet(name) {
  const data = {
    name: name
  };
  return makeTelegramApiRequest('getStickerSet', data);
}

/**
 * Загружает новый файл стикера на сервер Telegram.
 * @param {number} userId ID пользователя.
 * @param {GoogleAppsScript.Base.BlobSource} sticker Объект BlobSource, представляющий файл стикера.
 * @param {string} stickerFormat Формат стикера (e.g., 'static', 'animated', 'video').
 * @returns {object} Объект File.
 */
function uploadStickerFile(userId, sticker, stickerFormat) {
  const botToken = getBotToken();
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/uploadStickerFile`;

  const formData = {
    'user_id': userId,
    'sticker': sticker,
    'sticker_format': stickerFormat
  };

  const options = {
    method: 'post',
    payload: formData,
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(telegramApiUrl, options);
    const jsonResponse = JSON.parse(response.getContentText());

    if (!jsonResponse.ok) {
      Logger.log(`Ошибка загрузки файла стикера: ${jsonResponse.description}`);
      throw new Error(`Telegram API Error: ${jsonResponse.description}`);
    }
    return jsonResponse.result;
  } catch (e) {
    Logger.log(`Исключение при загрузке файла стикера: ${e.message}`);
    throw e;
  }
}

/**
 * Создает новый набор стикеров.
 * @param {number} userId ID пользователя.
 * @param {string} name Название набора стикеров.
 * @param {string} title Заголовок набора стикеров.
 * @param {string} stickerFormat Формат стикера (e.g., 'static', 'animated', 'video').
 * @param {object} sticker Объект InputSticker.
 * @param {object} [options] Дополнительные параметры (например, sticker_type, needs_repainting).
 * @returns {boolean} True в случае успеха.
 */
function createNewStickerSet(userId, name, title, stickerFormat, sticker, options) {
  const data = {
    user_id: userId,
    name: name,
    title: title,
    sticker_format: stickerFormat,
    stickers: JSON.stringify([sticker]),
    ...options
  };
  return makeTelegramApiRequest('createNewStickerSet', data);
}

/**
 * Добавляет новый стикер в существующий набор.
 * @param {number} userId ID пользователя.
 * @param {string} name Название набора стикеров.
 * @param {object} sticker Объект InputSticker.
 * @param {object} [options] Дополнительные параметры (например, sticker_format).
 * @returns {boolean} True в случае успеха.
 */
function addStickerToSet(userId, name, sticker, options) {
  const data = {
    user_id: userId,
    name: name,
    sticker: JSON.stringify(sticker),
    ...options
  };
  return makeTelegramApiRequest('addStickerToSet', data);
}

/**
 * Перемещает стикер в наборе.
 * @param {string} sticker File ID стикера.
 * @param {number} position Новая позиция стикера в наборе.
 * @returns {boolean} True в случае успеха.
 */
function setStickerPositionInSet(sticker, position) {
  const data = {
    sticker: sticker,
    position: position
  };
  return makeTelegramApiRequest('setStickerPositionInSet', data);
}

/**
 * Удаляет стикер из набора.
 * @param {string} sticker File ID стикера.
 * @returns {boolean} True в случае успеха.
 */
function deleteStickerFromSet(sticker) {
  const data = {
    sticker: sticker
  };
  return makeTelegramApiRequest('deleteStickerFromSet', data);
}

/**
 * Устанавливает миниатюру для набора стикеров.
 * @param {string} name Название набора стикеров.
 * @param {number} userId ID пользователя.
 * @param {string} [thumb] File ID или URL миниатюры.
 * @returns {boolean} True в случае успеха.
 */
function setStickerSetThumb(name, userId, thumb) {
  const data = {
    name: name,
    user_id: userId,
  };
  if (thumb) data.thumb = thumb;
  return makeTelegramApiRequest('setStickerSetThumb', data);
}

/**
 * Отправляет стикер.
 * @param {number} chatId Уникальный идентификатор целевого чата или имя пользователя целевого канала (в формате @channelusername).
 * @param {string} sticker File ID стикера, который нужно отправить.
 * @param {object} [options] Дополнительные параметры (например, message_thread_id, disable_notification, protect_content, reply_parameters, reply_markup).
 * @returns {object} Объект Message.
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
 * Заменяет стикер в наборе.
 * @param {string} sticker File ID стикера, который нужно заменить.
 * @param {object} oldSticker Объект InputSticker, представляющий новый стикер.
 * @returns {boolean} True в случае успеха.
 */
function replaceStickerInSet(sticker, oldSticker) {
  const data = {
    sticker: sticker,
    old_sticker: JSON.stringify(oldSticker)
  };
  return makeTelegramApiRequest('replaceStickerInSet', data);
}

/**
 * Устанавливает список эмодзи для стикера.
 * @param {string} sticker File ID стикера.
 * @param {string[]} emojiList Массив строк с эмодзи.
 * @returns {boolean} True в случае успеха.
 */
function setStickerEmojiList(sticker, emojiList) {
  const data = {
    sticker: sticker,
    emoji_list: JSON.stringify(emojiList)
  };
  return makeTelegramApiRequest('setStickerEmojiList', data);
}

/**
 * Устанавливает ключевые слова для стикера.
 * @param {string} sticker File ID стикера.
 * @param {string[]} keywords Массив строк с ключевыми словами.
 * @returns {boolean} True в случае успеха.
 */
function setStickerKeywords(sticker, keywords) {
  const data = {
    sticker: sticker,
    keywords: JSON.stringify(keywords)
  };
  return makeTelegramApiRequest('setStickerKeywords', data);
}

/**
 * Устанавливает позицию маски для стикера.
 * @param {string} sticker File ID стикера.
 * @param {object} [maskPosition] Объект MaskPosition.
 * @returns {boolean} True в случае успеха.
 */
function setStickerMaskPosition(sticker, maskPosition) {
  const data = {
    sticker: sticker,
  };
  if (maskPosition) data.mask_position = JSON.stringify(maskPosition);
  return makeTelegramApiRequest('setStickerMaskPosition', data);
}

/**
 * Устанавливает заголовок набора стикеров.
 * @param {string} name Название набора стикеров.
 * @param {string} title Новый заголовок набора стикеров.
 * @returns {boolean} True в случае успеха.
 */
function setStickerSetTitle(name, title) {
  const data = {
    name: name,
    title: title
  };
  return makeTelegramApiRequest('setStickerSetTitle', data);
}

/**
 * Устанавливает миниатюру для набора стикеров.
 * @param {string} name Название набора стикеров.
 * @param {number} userId ID пользователя.
 * @param {string} [thumb] File ID или URL миниатюры.
 * @returns {boolean} True в случае успеха.
 */
function setStickerSetThumbnail(name, userId, thumb) {
  const data = {
    name: name,
    user_id: userId,
  };
  if (thumb) data.thumb = thumb;
  return makeTelegramApiRequest('setStickerSetThumbnail', data);
}

/**
 * Устанавливает миниатюру для набора стикеров с пользовательскими эмодзи.
 * @param {string} name Название набора стикеров.
 * @param {string} [customEmojiId] Идентификатор пользовательского эмодзи.
 * @returns {boolean} True в случае успеха.
 */
function setCustomEmojiStickerSetThumbnail(name, customEmojiId) {
  const data = {
    name: name,
  };
  if (customEmojiId) data.custom_emoji_id = customEmojiId;
  return makeTelegramApiRequest('setCustomEmojiStickerSetThumbnail', data);
}

/**
 * Удаляет набор стикеров.
 * @param {string} name Название набора стикеров.
 * @returns {boolean} True в случае успеха.
 */
function deleteStickerSet(name) {
  const data = {
    name: name
  };
  return makeTelegramApiRequest('deleteStickerSet', data);
}

