# TelegramApiLib - Библиотека Google Apps Script для Telegram Bot API

Эта библиотека предоставляет удобный и структурированный интерфейс для взаимодействия с Telegram Bot API из среды Google Apps Script. Она позволяет легко отправлять сообщения, управлять чатами, обрабатывать входящие обновления и многое другое.

## Содержание

- [Установка и подключение](#установка-и-подключение)
- [Управление токеном бота](#управление-токеном-бота)
- [Настройка вебхука](#настройка-вебхука)
- [Использование в качестве библиотеки](#использование-в-качестве-библиотеки)
- [Документация функций API](#документация-функций-api)
- [Примеры использования](#примеры-использования)

## Установка и подключение

### Через `clasp` (рекомендуемый способ для разработчиков)

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/Gakuzi/TelegramApiLib.git
    cd TelegramApiLib
    ```
2.  **Установите `clasp`:** Если у вас еще нет `clasp`, установите его глобально:
    ```bash
    npm install -g @google/clasp
    ```
3.  **Войдите в аккаунт Google:**
    ```bash
    clasp login
    ```
4.  **Создайте новый проект Apps Script или свяжитесь с существующим:**
    *   **Создать новый:**
        ```bash
        clasp create --type library --title TelegramApiLib
        ```
    *   **Связаться с существующим:**
        ```bash
        clasp clone <Script ID> --rootDir .
        ```
        (Где `<Script ID>` - это идентификатор вашего проекта Apps Script, который можно найти в URL проекта: `script.google.com/d/<Script ID>/edit`)
5.  **Загрузите код:**
    ```bash
    clasp push
    ```

### Вручную (для пользователей библиотеки)

1.  **Создайте новый проект Apps Script:** Перейдите в [Google Apps Script](https://script.google.com/home) и создайте новый проект.
2.  **Скопируйте файлы:** Откройте каждый `.gs` файл из этого репозитория (например, `BotManagement.gs`, `SendingMessages.gs` и т.д.) и скопируйте его содержимое в соответствующие файлы в вашем проекте Apps Script. Убедитесь, что имена файлов совпадают.
3.  **Скопируйте `appsscript.json`:** Скопируйте содержимое файла `appsscript.json` в файл манифеста вашего проекта Apps Script (Вид -> Показать файл манифеста).

## Управление токеном бота

Токен вашего Telegram бота должен храниться безопасно, и `PropertiesService` в Google Apps Script идеально подходит для этой цели. Библиотека использует свойство `TELEGRAM_BOT_TOKEN`.

### Установка токена

Вы можете установить токен программно, вызвав функцию `setBotToken` из `Settings.gs` один раз:

```javascript
function setMyBotToken() {
  // Замените 'YOUR_BOT_TOKEN' на фактический токен вашего бота
  setBotToken('YOUR_BOT_TOKEN');
}
```

Или вручную:

1.  Откройте ваш проект Apps Script.
2.  Перейдите в `Настройки проекта` (значок шестеренки).
3.  Прокрутите вниз до раздела `Свойства скрипта`.
4.  Добавьте новое свойство:
    *   **Ключ:** `TELEGRAM_BOT_TOKEN`
    *   **Значение:** `ВАШ_ТОКЕН_БОТА`
5.  Нажмите `Сохранить свойства`.

### Получение токена

Токен автоматически извлекается функцией `getBotToken()` внутри библиотеки. Вам не нужно вызывать ее напрямую.

## Настройка вебхука

Для получения обновлений от Telegram ваш бот должен иметь настроенный вебхук. Это URL вашего развернутого скрипта Apps Script.

1.  **Разверните скрипт как веб-приложение:**
    *   В вашем проекте Apps Script перейдите в `Развертывания` (значок `</>`).
    *   Нажмите `Новое развертывание`.
    *   Выберите тип `Веб-приложение`.
    *   Настройте:
        *   **Выполнять как:** `Я` (ваш аккаунт Google)
        *   **Кто имеет доступ:** `Любой` (или `Любой, даже анонимный`, если бот публичный)
    *   Нажмите `Развернуть`.
    *   Скопируйте `URL веб-приложения`.
2.  **Установите вебхук с помощью библиотеки:**
    Используйте функцию `setWebhook` из `BotManagement.gs`:
    ```javascript
    function setupWebhook() {
      const webAppUrl = 'ВАШ_URL_ВЕБ_ПРИЛОЖЕНИЯ'; // Вставьте скопированный URL
      setWebhook(webAppUrl);
      Logger.log('Вебхук успешно установлен.');
    }
    ```
    Выполните эту функцию один раз в вашем проекте Apps Script.

### Проверка и удаление вебхука

-   **Получить информацию о вебхуке:**
    ```javascript
    function checkWebhookInfo() {
      const info = getWebhookInfo();
      Logger.log(JSON.stringify(info, null, 2));
    }
    ```
-   **Удалить вебхук:**
    ```javascript
    function removeWebhook() {
      deleteWebhook();
      Logger.log('Вебхук успешно удален.');
    }
    ```

## Использование в качестве библиотеки

Чтобы использовать `TelegramApiLib` в другом проекте Google Apps Script:

1.  **Получите ID проекта библиотеки:**
    *   Откройте проект `TelegramApiLib` в Google Apps Script.
    *   Перейдите в `Настройки проекта` (значок шестеренки).
    *   Скопируйте `Идентификатор скрипта`.
2.  **Добавьте библиотеку в ваш проект:**
    *   Откройте проект Apps Script, в котором вы хотите использовать `TelegramApiLib`.
    *   В левой панели навигации найдите `Библиотеки` и нажмите `+`.
    *   Вставьте `Идентификатор скрипта` библиотеки `TelegramApiLib`.
    *   Нажмите `Найти`.
    *   Выберите последнюю версию (рекомендуется использовать фиксированную версию, а не `Head`).
    *   Оставьте идентификатор по умолчанию (`TelegramApiLib`) или задайте свой.
    *   Нажмите `Добавить`.

Теперь вы можете вызывать функции из `TelegramApiLib` в вашем проекте, например: `TelegramApiLib.sendMessage(...)`.

## Документация функций API

Ниже представлена подробная документация по всем реализованным функциям, сгруппированным по модулям. Каждая функция соответствует методу Telegram Bot API.

### BotManagement.gs - Общие функции для управления ботом

### `setWebhook(url, options)`

Устанавливает вебхук для получения обновлений от Telegram.

*   `url` (`string`): URL, на который Telegram будет отправлять обновления.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `certificate`, `ip_address`, `max_connections`, `allowed_updates`, `drop_pending_updates`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteWebhook(options)`

Удаляет текущий вебхук Telegram.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `drop_pending_updates`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerCallbackQuery(callbackQueryId, text, showAlert, url, cacheTime)`

Отвечает на колбэк-запрос.

*   `callbackQueryId` (`string`): Уникальный идентификатор колбэк-запроса.
*   `text` (`string`, `optional`): Текст уведомления, которое будет показано пользователю.
*   `showAlert` (`boolean`, `optional`): Если true, уведомление будет показано как всплывающее окно.
*   `url` (`string`, `optional`): URL для открытия в браузере пользователя.
*   `cacheTime` (`number`, `optional`): Максимальное время в секундах, в течение которого результат колбэк-запроса может быть кэширован на стороне клиента.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerInlineQuery(inlineQueryId, results, options)`

Отвечает на инлайн-запрос.

*   `inlineQueryId` (`string`): Уникальный идентификатор инлайн-запроса.
*   `results` (`Array<object>`): Массив объектов InlineQueryResult.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `cache_time`, `is_personal`, `next_offset`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setGameScore(userId, score, options)`

Устанавливает счет для пользователя в игре.

*   `userId` (`number`): ID пользователя.
*   `score` (`number`): Счет пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `force`, `disable_edit_message`, `chat_id`, `message_id`, `inline_message_id`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getGameHighScores(userId, options)`

Получает таблицу рекордов для игры.

*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `chat_id`, `message_id`, `inline_message_id`).
*   **Возвращает:** (`Array<object>`) Массив объектов GameHighScore.

### `answerShippingQuery(shippingQueryId, ok, options)`

Отвечает на запрос на доставку.

*   `shippingQueryId` (`string`): Уникальный идентификатор запроса на доставку.
*   `ok` (`boolean`): True, если запрос на доставку был успешно обработан.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `shipping_options`, `error_message`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage)`

Отвечает на запрос перед оплатой.

*   `preCheckoutQueryId` (`string`): Уникальный идентификатор запроса перед оплатой.
*   `ok` (`boolean`): True, если запрос перед оплатой был успешно обработан.
*   `errorMessage` (`string`, `optional`): Сообщение об ошибке, если ok равно false.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getFile(fileId)`

Получает информацию о файле.

*   `fileId` (`string`): File ID файла.
*   **Возвращает:** (`object`) Объект File.

### `downloadFile(filePath)`

Скачивает файл с серверов Telegram.

*   `filePath` (`string`): Путь к файлу, полученный из getFile.
*   **Возвращает:** (`GoogleAppsScript.URL_Fetch.HTTPResponse`) HTTPResponse объект, содержащий файл.

### `getUserProfilePhotos(userId, options)`

Получает фотографии профиля пользователя.

*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `offset`, `limit`).
*   **Возвращает:** (`object`) Объект UserProfilePhotos.

### `getMe()`

Получает информацию о боте.

*   **Возвращает:** (`object`) Объект User.

### `setMyCommands(commands, options)`

Устанавливает список команд бота.

*   `commands` (`Array<object>`): Массив объектов BotCommand.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteMyCommands(options)`

Удаляет список команд бота.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getMyCommands(options)`

Получает список команд бота.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`Array<object>`) Массив объектов BotCommand.

### `setChatMenuButton(chatId, menuButton)`

Устанавливает меню-кнопку бота.

*   `chatId` (`string`): ID чата.
*   `menuButton` (`object`): Объект MenuButton.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getChatMenuButton(chatId)`

Получает меню-кнопку бота.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Объект MenuButton.

### `setMyDefaultAdministratorRights(rights, options)`

Устанавливает права администратора бота по умолчанию.

*   `rights` (`object`): Объект ChatAdministratorRights.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `for_channels`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getMyDefaultAdministratorRights(options)`

Получает права администратора бота по умолчанию.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `for_channels`).
*   **Возвращает:** (`object`) Объект ChatAdministratorRights.

### `getUpdates(options)`

Получает входящие обновления.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `offset`, `limit`, `timeout`, `allowed_updates`).
*   **Возвращает:** (`Array<object>`) Массив объектов Update.

### `getWebhookInfo()`

Получает текущую информацию о вебхуке.

*   **Возвращает:** (`object`) Объект WebhookInfo.

### `getFileLink(fileId)`

Получает прямую ссылку для скачивания файла.

*   `fileId` (`string`): File ID файла.
*   **Возвращает:** (`string`) Прямая ссылка на файл.

### `logOut()`

Выходит из системы бота.

*   **Возвращает:** (`boolean`) True в случае успеха.

### `close()`

Закрывает экземпляр бота.

*   **Возвращает:** (`boolean`) True в случае успеха.

### BotManagement.gs - Общие функции для управления ботом

### `setWebhook(url, options)`

Устанавливает вебхук для получения обновлений от Telegram.

*   `url` (`string`): URL, на который Telegram будет отправлять обновления.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `certificate`, `ip_address`, `max_connections`, `allowed_updates`, `drop_pending_updates`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteWebhook(options)`

Удаляет текущий вебхук Telegram.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `drop_pending_updates`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerCallbackQuery(callbackQueryId, text, showAlert, url, cacheTime)`

Отвечает на колбэк-запрос.

*   `callbackQueryId` (`string`): Уникальный идентификатор колбэк-запроса.
*   `text` (`string`, `optional`): Текст уведомления, которое будет показано пользователю.
*   `showAlert` (`boolean`, `optional`): Если true, уведомление будет показано как всплывающее окно.
*   `url` (`string`, `optional`): URL для открытия в браузере пользователя.
*   `cacheTime` (`number`, `optional`): Максимальное время в секундах, в течение которого результат колбэк-запроса может быть кэширован на стороне клиента.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerInlineQuery(inlineQueryId, results, options)`

Отвечает на инлайн-запрос.

*   `inlineQueryId` (`string`): Уникальный идентификатор инлайн-запроса.
*   `results` (`Array<object>`): Массив объектов InlineQueryResult.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `cache_time`, `is_personal`, `next_offset`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setGameScore(userId, score, options)`

Устанавливает счет для пользователя в игре.

*   `userId` (`number`): ID пользователя.
*   `score` (`number`): Счет пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `force`, `disable_edit_message`, `chat_id`, `message_id`, `inline_message_id`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getGameHighScores(userId, options)`

Получает таблицу рекордов для игры.

*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `chat_id`, `message_id`, `inline_message_id`).
*   **Возвращает:** (`Array<object>`) Массив объектов GameHighScore.

### `answerShippingQuery(shippingQueryId, ok, options)`

Отвечает на запрос на доставку.

*   `shippingQueryId` (`string`): Уникальный идентификатор запроса на доставку.
*   `ok` (`boolean`): True, если запрос на доставку был успешно обработан.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `shipping_options`, `error_message`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `answerPreCheckoutQuery(preCheckoutQueryId, ok, errorMessage)`

Отвечает на запрос перед оплатой.

*   `preCheckoutQueryId` (`string`): Уникальный идентификатор запроса перед оплатой.
*   `ok` (`boolean`): True, если запрос перед оплатой был успешно обработан.
*   `errorMessage` (`string`, `optional`): Сообщение об ошибке, если ok равно false.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getFile(fileId)`

Получает информацию о файле.

*   `fileId` (`string`): File ID файла.
*   **Возвращает:** (`object`) Объект File.

### `downloadFile(filePath)`

Скачивает файл с серверов Telegram.

*   `filePath` (`string`): Путь к файлу, полученный из getFile.
*   **Возвращает:** (`GoogleAppsScript.URL_Fetch.HTTPResponse`) HTTPResponse объект, содержащий файл.

### `getUserProfilePhotos(userId, options)`

Получает фотографии профиля пользователя.

*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `offset`, `limit`).
*   **Возвращает:** (`object`) Объект UserProfilePhotos.

### `getMe()`

Получает информацию о боте.

*   **Возвращает:** (`object`) Объект User.

### `setMyCommands(commands, options)`

Устанавливает список команд бота.

*   `commands` (`Array<object>`): Массив объектов BotCommand.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteMyCommands(options)`

Удаляет список команд бота.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getMyCommands(options)`

Получает список команд бота.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `scope`, `language_code`).
*   **Возвращает:** (`Array<object>`) Массив объектов BotCommand.

### `setChatMenuButton(chatId, menuButton)`

Устанавливает меню-кнопку бота.

*   `chatId` (`string`): ID чата.
*   `menuButton` (`object`): Объект MenuButton.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getChatMenuButton(chatId)`

Получает меню-кнопку бота.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Объект MenuButton.

### `setMyDefaultAdministratorRights(rights, options)`

Устанавливает права администратора бота по умолчанию.

*   `rights` (`object`): Объект ChatAdministratorRights.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `for_channels`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `getMyDefaultAdministratorRights(options)`

Получает права администратора бота по умолчанию.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `for_channels`).
*   **Возвращает:** (`object`) Объект ChatAdministratorRights.

### `getUpdates(options)`

Получает входящие обновления.

*   `options` (`object`, `optional`): Дополнительные параметры (например, `offset`, `limit`, `timeout`, `allowed_updates`).
*   **Возвращает:** (`Array<object>`) Массив объектов Update.

### `getWebhookInfo()`

Получает текущую информацию о вебхуке.

*   **Возвращает:** (`object`) Объект WebhookInfo.

### `getFileLink(fileId)`

Получает прямую ссылку для скачивания файла.

*   `fileId` (`string`): File ID файла.
*   **Возвращает:** (`string`) Прямая ссылка на файл.

### `logOut()`

Выходит из системы бота.

*   **Возвращает:** (`boolean`) True в случае успеха.

### `close()`

Закрывает экземпляр бота.

*   **Возвращает:** (`boolean`) True в случае успеха.

<!-- BOT_MANAGEMENT_FUNCTIONS -->

### ChatManagement.gs - Функции для управления информацией о чатах

### `getChat(chatId)`

Получает информацию о чате.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Объект Chat.

### `getChatAdministrators(chatId)`

Получает список администраторов чата.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`Array<object>`) Массив объектов ChatMember.

### `getChatMember(chatId, userId)`

Получает информацию о члене чата.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   **Возвращает:** (`object`) Объект ChatMember.

### `getChatMembersCount(chatId)`

Получает количество членов чата.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`number`) Количество членов чата.

### `leaveChat(chatId)`

Покидает чат.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatPhoto(chatId, photo)`

Устанавливает новую фотографию чата.

*   `chatId` (`string`): ID чата.
*   `photo` (`string`): File ID или URL фотографии.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteChatPhoto(chatId)`

Удаляет фотографию чата.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatTitle(chatId, title)`

Устанавливает новое название чата.

*   `chatId` (`string`): ID чата.
*   `title` (`string`): Новое название чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatDescription(chatId, description)`

Устанавливает новое описание чата.

*   `chatId` (`string`): ID чата.
*   `description` (`string`): Новое описание чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `pinChatMessage(chatId, messageId, options)`

Закрепляет сообщение в чате.

*   `chatId` (`string`): ID чата.
*   `messageId` (`number`): ID сообщения для закрепления.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `disable_notification`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `unpinChatMessage(chatId, messageId)`

Открепляет сообщение в чате.

*   `chatId` (`string`): ID чата.
*   `messageId` (`number`): ID сообщения для открепления.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `unpinAllChatMessages(chatId)`

Открепляет все сообщения в чате.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatPermissions(chatId, permissions)`

Устанавливает разрешения для всех членов чата по умолчанию.

*   `chatId` (`string`): ID чата.
*   `permissions` (`object`): Объект ChatPermissions.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatStickerSet(chatId, stickerSetName)`

Устанавливает набор стикеров для чата.

*   `chatId` (`string`): ID чата.
*   `stickerSetName` (`string`): Название набора стикеров.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteChatStickerSet(chatId)`

Удаляет набор стикеров для чата.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`object`) Ответ от Telegram API.

<!-- CHAT_MANAGEMENT_FUNCTIONS -->

### ChatMemberManagement.gs - Функции для управления членами чата и их правами

### `restrictChatMember(chatId, userId, permissions, options)`

Ограничивает права пользователя в чате.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   `permissions` (`object`): Объект ChatPermissions.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `use_independent_chat_permissions`, `until_date`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `promoteChatMember(chatId, userId, options)`

Повышает или понижает пользователя в чате.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `is_anonymous`, `can_manage_chat`, `can_post_messages`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `setChatAdministratorCustomTitle(chatId, userId, customTitle)`

Устанавливает пользовательское название для администратора чата.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   `customTitle` (`string`): Пользовательское название.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `banChatMember(chatId, userId, options)`

Банит пользователя в чате.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `until_date`, `revoke_messages`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `unbanChatMember(chatId, userId, options)`

Разбанивает пользователя в чате.

*   `chatId` (`string`): ID чата.
*   `userId` (`number`): ID пользователя.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `only_if_banned`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `banChatSenderChat(chatId, senderChatId)`

Банит отправителя чата.

*   `chatId` (`string`): ID чата.
*   `senderChatId` (`number`): ID чата отправителя.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `unbanChatSenderChat(chatId, senderChatId)`

Разбанивает отправителя чата.

*   `chatId` (`string`): ID чата.
*   `senderChatId` (`number`): ID чата отправителя.
*   **Возвращает:** (`object`) Ответ от Telegram API.

<!-- CHAT_MEMBER_MANAGEMENT_FUNCTIONS -->

### ChatInviteLinkManagement.gs - Функции для управления пригласительными ссылками

### `createChatInviteLink(chatId, options)`

Создает новую пригласительную ссылку для чата.

*   `chatId` (`string`): ID чата.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `name`, `expire_date`, `member_limit`).
*   **Возвращает:** (`object`) Объект ChatInviteLink.

### `editChatInviteLink(chatId, inviteLink, options)`

Редактирует существующую пригласительную ссылку для чата.

*   `chatId` (`string`): ID чата.
*   `inviteLink` (`string`): Пригласительная ссылка для редактирования.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `name`, `expire_date`, `member_limit`).
*   **Возвращает:** (`object`) Объект ChatInviteLink.

### `revokeChatInviteLink(chatId, inviteLink)`

Отзывает пригласительную ссылку для чата.

*   `chatId` (`string`): ID чата.
*   `inviteLink` (`string`): Пригласительная ссылка для отзыва.
*   **Возвращает:** (`object`) Объект ChatInviteLink.

### `exportChatInviteLink(chatId)`

Экспортирует основную пригласительную ссылку для чата.

*   `chatId` (`string`): ID чата.
*   **Возвращает:** (`string`) Основная пригласительная ссылка.

<!-- CHAT_INVITE_LINK_MANAGEMENT_FUNCTIONS -->

### MessageManagement.gs - Функции для управления сообщениями

### `editMessageText(chatId, messageId, text, options)`

Редактирует текстовое сообщение.

*   `chatId` (`string`): ID чата, содержащего сообщение.
*   `messageId` (`number`): ID сообщения для редактирования.
*   `text` (`string`): Новый текст сообщения.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `parse_mode`, `reply_markup`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `editMessageCaption(chatId, messageId, caption, options)`

Редактирует подпись к сообщению.

*   `chatId` (`string`): ID чата, содержащего сообщение.
*   `messageId` (`number`): ID сообщения для редактирования.
*   `caption` (`string`, `optional`): Новая подпись к сообщению.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `parse_mode`, `reply_markup`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `editMessageMedia(chatId, messageId, media, options)`

Редактирует медиафайл сообщения.

*   `chatId` (`string`): ID чата, содержащего сообщение.
*   `messageId` (`number`): ID сообщения для редактирования.
*   `media` (`object`): Объект InputMedia.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `reply_markup`).
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `editMessageReplyMarkup(chatId, messageId, replyMarkup)`

Редактирует разметку ответа сообщения.

*   `chatId` (`string`): ID чата, содержащего сообщение.
*   `messageId` (`number`): ID сообщения для редактирования.
*   `replyMarkup` (`object`, `optional`): Новая разметка ответа.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `deleteMessage(chatId, messageId)`

Удаляет сообщение.

*   `chatId` (`string`): ID чата, содержащего сообщение.
*   `messageId` (`number`): ID сообщения для удаления.
*   **Возвращает:** (`object`) Ответ от Telegram API.

### `copyMessage(chatId, fromChatId, messageId, options)`

Копирует сообщение.

*   `chatId` (`string`): ID целевого чата.
*   `fromChatId` (`string`): ID исходного чата.
*   `messageId` (`number`): ID сообщения для копирования.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `caption`, `parse_mode`, `reply_markup`).
*   **Возвращает:** (`object`) Объект MessageId.

### `forwardMessage(chatId, fromChatId, messageId, options)`

Пересылает сообщение.

*   `chatId` (`string`): ID целевого чата.
*   `fromChatId` (`string`): ID исходного чата.
*   `messageId` (`number`): ID сообщения для пересылки.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `disable_notification`, `protect_content`).
*   **Возвращает:** (`object`) Объект MessageId.

### `sendMediaGroup(chatId, media, options)`

Отправляет группу медиафайлов.

*   `chatId` (`string`): ID чата, куда будет отправлена группа медиафайлов.
*   `media` (`Array<object>`): Массив объектов InputMedia.
*   `options` (`object`, `optional`): Дополнительные параметры (например, `disable_notification`, `reply_to_message_id`).
*   **Возвращает:** (`Array<object>`) Массив объектов Message.

<!-- MESSAGE_MANAGEMENT_FUNCTIONS -->

### SendingMessages.gs - Функции для отправки сообщений и медиафайлов

<!-- SENDING_MESSAGES_FUNCTIONS -->

### StickerManagement.gs - Функции для управления стикерами

<!-- STICKER_MANAGEMENT_FUNCTIONS -->

### Settings.gs - Функции для управления настройками

<!-- SETTINGS_FUNCTIONS -->

### Utils.gs - Вспомогательные функции

<!-- UTILS_FUNCTIONS -->

## Примеры использования

(Будут добавлены позже)
