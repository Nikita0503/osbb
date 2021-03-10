import {
  CHATS_ALL_CHATS,
  CHATS_ALL_USERS,
  CHATS_ALL_SELECTED_CHAT,
  CHATS_ALL_CHATS_CLEAR,
} from "./actions";

const defaultState = {
  allChats: null,
  allUsers: null,
  selectedChat: null,
};

export const allChatsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHATS_ALL_CHATS:
      return {
        ...state,
        allChats: action.payload,
      };
    case CHATS_ALL_CHATS_CLEAR:
      return {
        ...state,
        allChats: null,
      };
    case CHATS_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case CHATS_ALL_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
  }

  return state;
};
