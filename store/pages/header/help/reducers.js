import {
  HELP_CHAT_MESSAGE,
  HELP_CHAT_MESSAGES,
  HELP_CHAT_MESSAGES_CLEAR,
  HELP_CHAT_CONSULTANT,
} from "./actions";

const defaultState = {
  helpChatMessage: null,
  helpChatMessages: [],
  consultant: null,
};

export const helpChatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HELP_CHAT_MESSAGE:
      return {
        ...state,
        helpChatMessage: action.payload,
      };
    case HELP_CHAT_MESSAGES:
      return {
        ...state,
        helpChatMessages: [...state.helpChatMessages, action.payload],
      };
    case HELP_CHAT_MESSAGES_CLEAR:
      return {
        ...state,
        helpChatMessages: [],
      };
    case HELP_CHAT_CONSULTANT:
      return {
        ...state,
        consultant: action.payload,
      };
  }
  return state;
};
