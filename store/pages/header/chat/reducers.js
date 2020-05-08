import {
  SELECTED_CHAT_ALL_MESSAGES,
  SELECTED_CHAT_CURRENT_MESSAGE,
  SELECTED_CHAT_ADD_MESSAGE,
  SELECTED_CHAT_CURRENT_IMAGES_ADD,
  SELECTED_CHAT_CURRENT_IMAGES_CLEAR,
  SELECTED_CHAT_SELECTED_FILE,
  SELECTED_CHAT_LOADING
} from './actions';

const defaultState = {
  allMessages: [],
  currentMessage: null,
  currentImages: [],
  chatSelectedFile: null,
  loading: false
};

export const selectedChatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECTED_CHAT_ALL_MESSAGES:
      return {
        ...state,
        allMessages: action.payload
      }
    case SELECTED_CHAT_ADD_MESSAGE:
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],
      }
    case SELECTED_CHAT_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: action.payload
      }
    case SELECTED_CHAT_CURRENT_IMAGES_ADD:
      return {
        ...state,
        currentImages: [...state.currentImages, action.payload]
      } 
    case SELECTED_CHAT_CURRENT_IMAGES_CLEAR:
      return {
        ...state,
        currentImages: []
      }
    case SELECTED_CHAT_SELECTED_FILE:
      return {
        ...state,
        chatSelectedFile: action.payload
      }
    case SELECTED_CHAT_LOADING:
      return {
        ...state,
        loading: action.payload
      }
  }

  return state;
};
