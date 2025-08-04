/**
 * @fileoverview Обработчики входящих событий Telegram.
 */

/**
 * Объект для хранения зарегистрированных обработчиков обновлений.
 * Ключи - типы обновлений (например, 'message', 'callback_query').
 * Значения - массивы функций-обработчиков.
 * @private
 */
const updateHandlers = {};

/**
 * Регистрирует функцию-обработчик для определенного типа обновления Telegram.
 * @param {string} type Тип обновления (например, 'message', 'callback_query', 'inline_query').
 * @param {function(object): void} handler Функция, которая будет вызвана при получении обновления указанного типа.
 */
function onUpdate(type, handler) {
  if (!updateHandlers[type]) {
    updateHandlers[type] = [];
  }
  updateHandlers[type].push(handler);
  Logger.log(`Зарегистрирован обработчик для типа обновления: ${type}`);
}

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

  try {
    const update = JSON.parse(e.postData.contents);
    Logger.log('Получено обновление от Telegram: ' + JSON.stringify(update));

    let handled = false;

    // Проверяем и вызываем обработчики для каждого типа обновления
    if (update.message && updateHandlers.message) {
      updateHandlers.message.forEach(handler => handler(update.message));
      handled = true;
    }
    if (update.edited_message && updateHandlers.edited_message) {
      updateHandlers.edited_message.forEach(handler => handler(update.edited_message));
      handled = true;
    }
    if (update.channel_post && updateHandlers.channel_post) {
      updateHandlers.channel_post.forEach(handler => handler(update.channel_post));
      handled = true;
    }
    if (update.edited_channel_post && updateHandlers.edited_channel_post) {
      updateHandlers.edited_channel_post.forEach(handler => handler(update.edited_channel_post));
      handled = true;
    }
    if (update.inline_query && updateHandlers.inline_query) {
      updateHandlers.inline_query.forEach(handler => handler(update.inline_query));
      handled = true;
    }
    if (update.chosen_inline_result && updateHandlers.chosen_inline_result) {
      updateHandlers.chosen_inline_result.forEach(handler => handler(update.chosen_inline_result));
      handled = true;
    }
    if (update.callback_query && updateHandlers.callback_query) {
      updateHandlers.callback_query.forEach(handler => handler(update.callback_query));
      handled = true;
    }
    if (update.shipping_query && updateHandlers.shipping_query) {
      updateHandlers.shipping_query.forEach(handler => handler(update.shipping_query));
      handled = true;
    }
    if (update.pre_checkout_query && updateHandlers.pre_checkout_query) {
      updateHandlers.pre_checkout_query.forEach(handler => handler(update.pre_checkout_query));
      handled = true;
    }
    if (update.poll && updateHandlers.poll) {
      updateHandlers.poll.forEach(handler => handler(update.poll));
      handled = true;
    }
    if (update.poll_answer && updateHandlers.poll_answer) {
      updateHandlers.poll_answer.forEach(handler => handler(update.poll_answer));
      handled = true;
    }
    if (update.my_chat_member && updateHandlers.my_chat_member) {
      updateHandlers.my_chat_member.forEach(handler => handler(update.my_chat_member));
      handled = true;
    }
    if (update.chat_member && updateHandlers.chat_member) {
      updateHandlers.chat_member.forEach(handler => handler(update.chat_member));
      handled = true;
    }
    if (update.chat_join_request && updateHandlers.chat_join_request) {
      updateHandlers.chat_join_request.forEach(handler => handler(update.chat_join_request));
      handled = true;
    }
    if (update.business_connection && updateHandlers.business_connection) {
      updateHandlers.business_connection.forEach(handler => handler(update.business_connection));
      handled = true;
    }

    if (!handled) {
      Logger.log('Неизвестный или необработанный тип обновления: ' + JSON.stringify(update));
    }

  } catch (error) {
    Logger.log('Ошибка при обработке обновления: ' + error.message);
  }

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

// Удаляем старые функции-заглушки, так как теперь используется диспетчер
function handleMessage(message) { Logger.log(`Обработчик по умолчанию для сообщения: ${message.text}`); }
function handleEditedMessage(editedMessage) { Logger.log(`Обработчик по умолчанию для отредактированного сообщения: ${editedMessage.text}`); }
function handleChannelPost(channelPost) { Logger.log(`Обработчик по умолчанию для сообщения канала: ${channelPost.text}`); }
function handleEditedChannelPost(editedChannelPost) { Logger.log(`Обработчик по умолчанию для отредактированного сообщения канала: ${editedChannelPost.text}`); }
function handleInlineQuery(inlineQuery) { Logger.log(`Обработчик по умолчанию для инлайн-запроса: ${inlineQuery.query}`); }
function handleChosenInlineResult(chosenInlineResult) { Logger.log(`Обработчик по умолчанию для выбранного инлайн-результата: ${chosenInlineResult.query}`); }
function handleCallbackQuery(callbackQuery) { Logger.log(`Обработчик по умолчанию для колбэка: ${callbackQuery.data}`); }
function handleShippingQuery(shippingQuery) { Logger.log(`Обработчик по умолчанию для запроса на доставку: ${shippingQuery.invoice_payload}`); }
function handlePreCheckoutQuery(preCheckoutQuery) { Logger.log(`Обработчик по умолчанию для запроса перед оплатой: ${preCheckoutQuery.invoice_payload}`); }
function handlePoll(poll) { Logger.log(`Обработчик по умолчанию для опроса: ${poll.question}`); }
function handlePollAnswer(pollAnswer) { Logger.log(`Обработчик по умолчанию для ответа на опрос от ${pollAnswer.user.first_name}`); }
function handleMyChatMember(myChatMember) { Logger.log(`Обработчик по умолчанию для обновления членства бота в чате: ${myChatMember.new_chat_member.status}`); }
function handleChatMember(chatMember) { Logger.log(`Обработчик по умолчанию для обновления членства пользователя в чате: ${chatMember.new_chat_member.status}`); }
function handleChatJoinRequest(chatJoinRequest) { Logger.log(`Обработчик по умолчанию для запроса на присоединение к чату от ${chatJoinRequest.from.first_name}`); }
function handleBusinessConnection(businessConnection) { Logger.log(`Обработчик по умолчанию для бизнес-соединения: ${businessConnection.id}`); }
