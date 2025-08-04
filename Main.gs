/**
 * Обрабатывает HTTP GET-запросы к веб-приложению.
 * Отображает HTML-интерфейс для настройки бота.
 * @returns {GoogleAppsScript.HTML.HtmlOutput} HTML-страница для пользовательского интерфейса.
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html')
      .setTitle('Настройки Telegram Бота');
}

/**
 * Обрабатывает HTTP POST-запросы, которые должны быть вебхуками от Telegram.
 * @param {object} e Параметр события, содержащий POST-данные.
 */
function doPost(e) {
  try {
    // Парсим обновление от Telegram
    const update = JSON.parse(e.postData.contents);

    // TODO: Реализуйте здесь логику вашего бота.
    // Например, можно проверять наличие сообщения и отвечать на него.
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Пример: Отправляем эхо-сообщение обратно
      if (text) {
        sendMessage(chatId, `Вы написали: ${text}`);
      }
    }

    // Также можно обрабатывать колбэк-запросы, инлайн-запросы и т.д.
    if (update.callback_query) {
      const callbackQueryId = update.callback_query.id;
      const data = update.callback_query.data;
      const chatId = update.callback_query.message.chat.id;

      // Отвечаем на колбэк-запрос, чтобы убрать состояние "загрузки" на кнопке
      answerCallbackQuery(callbackQueryId, `Вы нажали ${data}`);

      // Выполняем действие на основе данных из колбэка
      sendMessage(chatId, `Получены данные из колбэка: ${data}`);
    }

  } catch (error) {
    Logger.log(error.toString());
    // Рекомендуется логировать ошибки, возможно, даже отправлять уведомление администратору.
  }

  // Telegram не требует определенного ответа, но вернуть что-то — хорошая практика.
  return ContentService.createTextOutput(JSON.stringify({ "status": "ok" })).setMimeType(ContentService.MimeType.JSON);
}


// --- Функции, вызываемые из HTML-интерфейса ---

/**
 * Устанавливает токен бота из веб-интерфейса.
 * @param {string} token Токен Telegram-бота.
 * @returns {string} Сообщение о статусе.
 */
function setBotTokenFromModal(token) {
  if (!token) return 'Ошибка: Токен не может быть пустым.';
  try {
    setBotToken(token);
    return 'Токен успешно сохранен.';
  } catch (e) {
    return 'Ошибка при сохранении токена: ' + e.toString();
  }
}

/**
 * Устанавливает вебхук из веб-интерфейса.
 * @param {string} url URL вебхука.
 * @returns {string} Сообщение о статусе.
 */
function setWebhookFromModal(url) {
  if (!url) return 'Ошибка: URL вебхука не может быть пустым.';
  try {
    const response = setWebhook(url);
    return 'Результат установки вебхука:\n' + JSON.stringify(response, null, 2);
  } catch (e) {
    return 'Ошибка при установке вебхука: ' + e.toString();
  }
}

/**
 * Удаляет вебхук из веб-интерфейса.
 * @returns {string} Сообщение о статусе.
 */
function deleteWebhookFromModal() {
  try {
    const response = deleteWebhook();
    return 'Результат удаления вебхука:\n' + JSON.stringify(response, null, 2);
  } catch (e) {
    return 'Ошибка при удалении вебхука: ' + e.toString();
  }
}

/**
 * Получает информацию о вебхуке из веб-интерфейса.
 * @returns {string} Сообщение о статусе с информацией о вебхуке.
 */
function getWebhookInfoFromModal() {
  try {
    const info = getWebhookInfo();
    return 'Информация о вебхуке:\n' + JSON.stringify(info, null, 2);
  } catch (e) {
    return 'Ошибка при получении информации о вебхуке: ' + e.toString();
  }
}