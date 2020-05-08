export const HELP_CHAT_MESSAGE = 'HELP_CHAT_MESSAGE';
export const HELP_CHAT_MESSAGES = 'HELP_CHAT_MESSAGES';
export const HELP_CHAT_MESSAGES_CLEAR = 'HELP_CHAT_MESSAGES_CLEAR';
export const HELP_CHAT_CONSULTANT = 'HELP_CHAT_CONSULTANT';

export const setHelpChatMessage = helpChatMessage => ({
  type: HELP_CHAT_MESSAGE,
  payload: helpChatMessage
});

export const setHelpChatMessages = helpChatMessage => ({
  type: HELP_CHAT_MESSAGES,
  payload: helpChatMessage
})

export const setHelpChatMessagesClear = helpChatMessages => ({
  type: HELP_CHAT_MESSAGES_CLEAR,
  payload: []
})

export const setHelpChatConsultant = consultant => ({
  type: HELP_CHAT_CONSULTANT,
  payload: consultant
})