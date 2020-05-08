export const CHATS_ALL_CHATS = 'CHATS_ALL_CHATS';
export const CHATS_ALL_USERS = 'CHATS_ALL_USERS';
export const CHATS_ALL_SELECTED_CHAT = 'CHATS_ALL_SELECTED_CHAT';

export const setChatsAllChats = allChats => ({
  type: CHATS_ALL_CHATS,
  payload: allChats
});

export const setChatsAllUsers = allUsers => ({
  type: CHATS_ALL_USERS,
  payload: allUsers
});

export const setAllChatsSelectedChat = selectedChat => ({
  type: CHATS_ALL_SELECTED_CHAT,
  payload: selectedChat
});
