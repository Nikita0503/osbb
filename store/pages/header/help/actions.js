import { Alert } from 'react-native';
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

var wsWithConsultant;

export const openChat = (token) => {
  return async dispatch => {
      try {
        dispatch(setHelpChatConsultant(null));
        dispatch(setHelpChatMessage(null));
        dispatch(setHelpChatMessagesClear([]));
        wsWithConsultant = new WebSocket(
          'wss://app.osbb365.com/socket.io/?auth_token=' +
          token +
          '&EIO=3&transport=websocket'
        );

        wsWithConsultant.onopen = () => {
          wsWithConsultant.send('4210["/help/connect"]');
        };

        wsWithConsultant.onmessage = e => {
          if (e.data.substring(0, 4) == '4310') {
            console.log('help', e.data);
            if (e.data == '4310[null]') {
              dispatch(setHelpChatConsultant(null));
              Alert.alert(
                'Повідомлення',
                'На жаль, усі консультанти зараз зайняті',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
              )
              wsWithConsultant.close();
            } else {
              dispatch(setHelpChatConsultant(e.data));
            }
            
          }
        };
      } catch (error) {
          console.log("openChat", "error");
      }
  }
}

export const sendMessage = (token, consultant, helpChatMessage) => {
  return async dispatch => {
    try {
      if (consultant == null) {
        var ws = new WebSocket(
          'wss://app.osbb365.com/socket.io/?auth_token=' +
            token +
            '&EIO=3&transport=websocket'
        );

        ws.onopen = () => {
          if (consultant == null) {
            var text = helpChatMessage;
            text = text.replace(new RegExp('\n','g'), '\\n')
            ws.send(
              '425["/help/request",{"text":"' +
              text +
                '"}]'
            );
          }
        };

        ws.onmessage = e => {
          if (e.data.substring(0, 2) == '42') {
            const myObjStr = JSON.stringify(
              e.data.substring(2, e.data.length)
            );
            var myObj = JSON.parse(myObjStr);
            var data = JSON.parse(myObj);
            console.log('help', data[0]);
            if (data[0] == 'message') {
              Alert.alert(
                'Повідомлення',
                data[1].message,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
              )
              console.log('help', data[1].message);
              dispatch(setHelpChatConsultant(null));
              ws.close();
            }
          }
        };
      } else {
        wsWithConsultant.send(
          '4218["/help/send",{"message":"' +
            helpChatMessage +
            '","isAdmin":false}]'
        );
        wsWithConsultant.onmessage = e => {
          if (e.data.substring(0, 2) == '42') {
            const myObjStr = JSON.stringify(
              e.data.substring(2, e.data.length)
            );
            var myObj = JSON.parse(myObjStr);
            var data = JSON.parse(myObj);
            console.log('help', data);
            if (data[0] == 'message') {
              var obj = {
                me: true,
                message: helpChatMessage,
              };
              dispatch(setHelpChatMessages(obj));
              dispatch(setHelpChatMessage(null));
            }
            if (data[0] == 'question') {
              obj = {
                me: false,
                message: data[1].message,
              };
              dispatch(setHelpChatMessages(obj));
            }
          }
        };
      }
    } catch (error) {
      console.log( "sendMessage", "error")
    }
  }
}

export const closeChat = (consultant) => {
  return async dispatch => {
      try {
        if (consultant != null) {
          dispatch(setHelpChatConsultant(null));
          wsWithConsultant.send('4215["/help/close"]');
          wsWithConsultant.close();
        }
        console.log('BackHandler');
      } catch (error) {
          console.log("closeChat", "error");
      }
  }
}