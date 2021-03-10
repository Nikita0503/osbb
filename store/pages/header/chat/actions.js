export const SELECTED_CHAT_ALL_MESSAGES = "SELECTED_CHAT_ALL_MESSAGES";
export const SELECTED_CHAT_ADD_MESSAGE = "SELECTED_CHAT_ADD_MESSAGE";
export const SELECTED_CHAT_CURRENT_MESSAGE = "SELECTED_CHAT_CURRENT_MESSAGE";
export const SELECTED_CHAT_CURRENT_IMAGES_ADD =
  "SELECTED_CHAT_CURRENT_IMAGES_ADD";
export const SELECTED_CHAT_CURRENT_IMAGES_CLEAR =
  "SELECTED_CHAT_CURRENT_IMAGES_CLEAR";
export const SELECTED_CHAT_SELECTED_FILE = "SELECTED_CHAT_SELECTED_FILE";
export const SELECTED_CHAT_LOADING = "SELECTED_CHAT_LOADING";

export const setChatAllMessages = (allMessages) => ({
  type: SELECTED_CHAT_ALL_MESSAGES,
  payload: allMessages,
});

export const setChatNewMessage = (newMessage) => ({
  type: SELECTED_CHAT_ADD_MESSAGE,
  payload: newMessage,
});

export const setChatCurrentMessage = (currentMessage) => ({
  type: SELECTED_CHAT_CURRENT_MESSAGE,
  payload: currentMessage,
});

export const setChatCurrentImagesAdd = (image) => ({
  type: SELECTED_CHAT_CURRENT_IMAGES_ADD,
  payload: image,
});

export const setChatCurrentImagesClear = (image) => ({
  type: SELECTED_CHAT_CURRENT_IMAGES_CLEAR,
  payload: [],
});

export const setSelectedFile = (file) => ({
  type: SELECTED_CHAT_SELECTED_FILE,
  payload: file,
});

export const setLoading = (loading) => ({
  type: SELECTED_CHAT_LOADING,
  payload: loading,
});

export const sendPhoto = (accountId, osbbId, workPeriods, formdata, token) => {
  return async (dispatch) => {
    try {
      const photoPromise = await fetch(
        "https://app.osbb365.com/api/upload/photo?accountId=" +
          accountId +
          "&osbbId=" +
          osbbId +
          "&type=photo&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          body: formdata,
        }
      );
      const photoAnswer = await photoPromise.json();
      dispatch(setChatCurrentImagesAdd(photoAnswer.filename));
    } catch (error) {
      console.log("sendPhoto", "error");
    }
  };
};

var ws;

export const downloadMessages = (selectedChat, workPeriods, token) => {
  return async (dispatch) => {
    try {
      ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );
      ws.onopen = () => {
        dispatch(setLoading(true));
        ws.send(
          '429["/chat/message/list",{"conversationId":' +
            selectedChat.id +
            ',"limit":50,"page":1,"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
      };
      ws.onmessage = (e) => {
        if (e.data.substring(0, 2) == "42") {
          const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          if (data[0] == "messageList") {
            dispatch(setLoading(false));
            var messages = data[1];
            messages.reverse();
            dispatch(setChatAllMessages(messages));
          }
          if (data[0] == "newMessage") {
            dispatch(setChatNewMessage(data[1]));
          }
        }
      };
    } catch (error) {
      console.log("downloadMessages", "error");
    }
  };
};

export const sendMessage = (
  currentMessage,
  selectedChat,
  photos,
  workPeriods
) => {
  return async (dispatch) => {
    try {
      dispatch(setChatCurrentMessage(null));
      var text = currentMessage;
      text = text.replace(new RegExp("\n", "g"), "\\n");
      ws.send(
        '429["/chat/message/create",{"text":"' +
          text +
          '","documents":[' +
          photos +
          '],"conversationId":' +
          selectedChat.id +
          ',"workPeriod":"' +
          workPeriods[workPeriods.length - 1] +
          '"}]'
      );
    } catch (error) {
      console.log("sendMessage", "error");
    }
  };
};

export const closeChat = () => {
  return async (dispatch) => {
    try {
      ws.close();
    } catch (error) {
      console.log("closeChat", "error");
    }
  };
};
