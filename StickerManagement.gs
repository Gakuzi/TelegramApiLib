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
