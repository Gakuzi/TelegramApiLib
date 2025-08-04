/**
 * @fileoverview Обработчики входящих событий Telegram.
 */

/**
 * Функция doPost обрабатывает входящие POST-запросы от Telegram (вебхуки).
 * Это основная точка входа для обработки обновлений от Telegram.
 * @param {GoogleAppsScript.Events.DoPost} e Объект события POST-запроса.
 */
function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    Logger.log('Некорректный POST-запрос.');
    return ContentService.createTextOutput('Некорректный запрос').setMimeType(ContentService.MimeType.TEXT);
  }

  const update = JSON.parse(e.postData.contents);
  Logger.log('Получено обновление от Telegram: ' + JSON.stringify(update));

  // Здесь будет логика обработки различных типов обновлений (сообщения, колбэки и т.д.)
  // Пока просто отвечаем, что запрос обработан.
  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}
