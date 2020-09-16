export const CHATS_ALL_CHATS = 'CHATS_ALL_CHATS';
export const CHATS_ALL_CHATS_CLEAR = 'CHATS_ALL_CHATS_CLEAR';
export const CHATS_ALL_USERS = 'CHATS_ALL_USERS';
export const CHATS_ALL_SELECTED_CHAT = 'CHATS_ALL_SELECTED_CHAT';

export const setChatsAllChats = allChats => ({
  type: CHATS_ALL_CHATS,
  payload: allChats
});

export const setChatsAllChatsClear = allChats => ({
  type: CHATS_ALL_CHATS_CLEAR,
  payload: allChats
})

export const setChatsAllUsers = allUsers => ({
  type: CHATS_ALL_USERS,
  payload: allUsers
});

export const setAllChatsSelectedChat = selectedChat => ({
  type: CHATS_ALL_SELECTED_CHAT,
  payload: selectedChat
});

var ws;

export const fetchAllChats = (workPeriods, token) => {
  return async dispatch => {
      try {
        ws = new WebSocket(
          'wss://app.osbb365.com/socket.io/?auth_token=' +
            token +
            '&EIO=3&transport=websocket'
        );
        ws.onopen = () => {
          ws.send(
            '425["/chat/user/list",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
              '"}]'
          );
          ws.send(
            '427["/chat/conversation/list",{"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
              '"}]'
          );
        };
        ws.onmessage = e => {
          if (e.data.substring(0, 2) == '42') {
            const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
            var myObj = JSON.parse(myObjStr);
            var data = JSON.parse(myObj);
            if (data[0] == 'conversationList') {
              //console.log('convList', data[1]);
              dispatch(setChatsAllChats(data[1]));
            }
            if (data[0] == 'userList') {
              dispatch(setChatsAllUsers(data[1]));
            }
          }
        };
      } catch (error) {
          console.log("fetchAllChats", "error");
      }
  }
}