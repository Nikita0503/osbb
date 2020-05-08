export const SELECTED_CHAT_ALL_MESSAGES = 'SELECTED_CHAT_ALL_MESSAGES';
export const SELECTED_CHAT_ADD_MESSAGE = 'SELECTED_CHAT_ADD_MESSAGE';
export const SELECTED_CHAT_CURRENT_MESSAGE = 'SELECTED_CHAT_CURRENT_MESSAGE';
export const SELECTED_CHAT_CURRENT_IMAGES_ADD = 'SELECTED_CHAT_CURRENT_IMAGES_ADD';
export const SELECTED_CHAT_CURRENT_IMAGES_CLEAR = 'SELECTED_CHAT_CURRENT_IMAGES_CLEAR';
export const SELECTED_CHAT_SELECTED_FILE = 'SELECTED_CHAT_SELECTED_FILE';
export const SELECTED_CHAT_LOADING = 'SELECTED_CHAT_LOADING';

export const setChatAllMessages = allMessages => ({
  type: SELECTED_CHAT_ALL_MESSAGES,
  payload: allMessages
});

export const setChatNewMessage = newMessage => ({
  type: SELECTED_CHAT_ADD_MESSAGE,
  payload: newMessage
});

export const setChatCurrentMessage = currentMessage => ({
  type: SELECTED_CHAT_CURRENT_MESSAGE,
  payload: currentMessage
});

export const setChatCurrentImagesAdd = image => ({
  type: SELECTED_CHAT_CURRENT_IMAGES_ADD,
  payload: image
});

export const setChatCurrentImagesClear = image => ({
  type: SELECTED_CHAT_CURRENT_IMAGES_CLEAR,
  payload: []
})

export const setSelectedFile = file => ({
  type: SELECTED_CHAT_SELECTED_FILE,
  payload: file
})

export const setLoading = loading => ({
  type: SELECTED_CHAT_LOADING,
  payload: loading
});