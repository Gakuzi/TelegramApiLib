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

  try {
    const update = JSON.parse(e.postData.contents);
    Logger.log('Получено обновление от Telegram: ' + JSON.stringify(update));

    if (update.message) {
      handleMessage(update.message);
    } else if (update.edited_message) {
      handleEditedMessage(update.edited_message);
    } else if (update.channel_post) {
      handleChannelPost(update.channel_post);
    } else if (update.edited_channel_post) {
      handleEditedChannelPost(update.edited_channel_post);
    } else if (update.inline_query) {
      handleInlineQuery(update.inline_query);
    } else if (update.chosen_inline_result) {
      handleChosenInlineResult(update.chosen_inline_result);
    } else if (update.callback_query) {
      handleCallbackQuery(update.callback_query);
    } else if (update.shipping_query) {
      handleShippingQuery(update.shipping_query);
    } else if (update.pre_checkout_query) {
      handlePreCheckoutQuery(update.pre_checkout_query);
    } else if (update.poll) {
      handlePoll(update.poll);
    } else if (update.poll_answer) {
      handlePollAnswer(update.poll_answer);
    } else if (update.my_chat_member) {
      handleMyChatMember(update.my_chat_member);
    } else if (update.chat_member) {
      handleChatMember(update.chat_member);
    } else if (update.chat_join_request) {
      handleChatJoinRequest(update.chat_join_request);
    } else if (update.business_connection) {
      handleBusinessConnection(update.business_connection);
    } else {
      Logger.log('Получен неизвестный тип обновления: ' + JSON.stringify(update));
    }

  } catch (error) {
    Logger.log('Ошибка при обработке обновления: ' + error.message);
  }

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Обрабатывает входящие текстовые сообщения.
 * @param {object} message Объект сообщения от Telegram.
 */
function handleMessage(message) {
  Logger.log(`Получено сообщение от ${message.from.first_name} (${message.from.id}): ${message.text}`);
  // Здесь можно добавить логику для ответа на сообщения
}

/**
 * Обрабатывает отредактированные сообщения.
 * @param {object} edited_message Объект отредактированного сообщения от Telegram.
 */
function handleEditedMessage(edited_message) {
  Logger.log(`Получено отредактированное сообщение от ${edited_message.from.first_name} (${edited_message.from.id}): ${edited_message.text}`);
}

/**
 * Обрабатывает сообщения канала.
 * @param {object} channel_post Объект сообщения канала от Telegram.
 */
function handleChannelPost(channel_post) {
  Logger.log(`Получено сообщение канала от ${channel_post.chat.title} (${channel_post.chat.id}): ${channel_post.text}`);
}

/**
 * Обрабатывает отредактированные сообщения канала.
 * @param {object} edited_channel_post Объект отредактированного сообщения канала от Telegram.
 */
function handleEditedChannelPost(edited_channel_post) {
  Logger.log(`Получено отредактированное сообщение канала от ${edited_channel_post.chat.title} (${edited_channel_post.chat.id}): ${edited_channel_post.text}`);
}

/**
 * Обрабатывает входящие инлайн-запросы.
 * @param {object} inline_query Объект инлайн-запроса от Telegram.
 */
function handleInlineQuery(inline_query) {
  Logger.log(`Получен инлайн-запрос от ${inline_query.from.first_name} (${inline_query.from.id}): ${inline_query.query}`);
}

/**
 * Обрабатывает выбранные результаты инлайн-запросов.
 * @param {object} chosen_inline_result Объект выбранного результата инлайн-запроса от Telegram.
 */
function handleChosenInlineResult(chosen_inline_result) {
  Logger.log(`Получен выбранный инлайн-результат от ${chosen_inline_result.from.first_name} (${chosen_inline_result.from.id}): ${chosen_inline_result.query}`);
}

/**
 * Обрабатывает входящие колбэк-запросы.
 * @param {object} callback_query Объект колбэк-запроса от Telegram.
 */
function handleCallbackQuery(callback_query) {
  Logger.log(`Получен колбэк от ${callback_query.from.first_name} (${callback_query.from.id}): ${callback_query.data}`);
}

/**
 * Обрабатывает запросы на доставку (shipping queries).
 * @param {object} shipping_query Объект запроса на доставку от Telegram.
 */
function handleShippingQuery(shipping_query) {
  Logger.log(`Получен запрос на доставку от ${shipping_query.from.first_name} (${shipping_query.from.id}): ${shipping_query.invoice_payload}`);
}

/**
 * Обрабатывает запросы перед оплатой (pre-checkout queries).
 * @param {object} pre_checkout_query Объект запроса перед оплатой от Telegram.
 */
function handlePreCheckoutQuery(pre_checkout_query) {
  Logger.log(`Получен запрос перед оплатой от ${pre_checkout_query.from.first_name} (${pre_checkout_query.from.id}): ${pre_checkout_query.invoice_payload}`);
}

/**
 * Обрабатывает обновления опросов.
 * @param {object} poll Объект опроса от Telegram.
 */
function handlePoll(poll) {
  Logger.log(`Получен опрос: ${poll.question}`);
}

/**
 * Обрабатывает ответы на опросы.
 * @param {object} poll_answer Объект ответа на опрос от Telegram.
 */
function handlePollAnswer(poll_answer) {
  Logger.log(`Получен ответ на опрос от ${poll_answer.user.first_name} (${poll_answer.user.id})`);
}

/**
 * Обрабатывает обновления о членстве бота в чате.
 * @param {object} my_chat_member Объект обновления о членстве бота в чате от Telegram.
 */
function handleMyChatMember(my_chat_member) {
  Logger.log(`Обновление членства бота в чате ${my_chat_member.chat.title} (${my_chat_member.chat.id}). Статус: ${my_chat_member.new_chat_member.status}`);
}

/**
 * Обрабатывает обновления о членстве пользователя в чате.
 * @param {object} chat_member Объект обновления о членстве пользователя в чате от Telegram.
 */
function handleChatMember(chat_member) {
  Logger.log(`Обновление членства пользователя ${chat_member.from.first_name} (${chat_member.from.id}) в чате ${chat_member.chat.title} (${chat_member.chat.id}). Статус: ${chat_member.new_chat_member.status}`);
}

/**
 * Обрабатывает запросы на присоединение к чату.
 * @param {object} chat_join_request Объект запроса на присоединение к чату от Telegram.
 */
function handleChatJoinRequest(chat_join_request) {
  Logger.log(`Получен запрос на присоединение к чату от ${chat_join_request.from.first_name} (${chat_join_request.from.id}) в чат ${chat_join_request.chat.title} (${chat_join_request.chat.id})`);
}

/**
 * Обрабатывает обновления бизнес-соединений.
 * @param {object} business_connection Объект бизнес-соединения от Telegram.
 */
function handleBusinessConnection(business_connection) {
  Logger.log(`Получено бизнес-соединение: ${business_connection.id}`);
}