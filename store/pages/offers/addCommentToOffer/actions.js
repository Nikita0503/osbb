import { Alert } from "react-native";
export const ADD_COMMENT_TO_OFFER = "ADD_COMMENT_TO_OFFER";
export const ADD_COMMENT_TO_OFFER_BUTTON_SEND =
  "ADD_COMMENT_TO_OFFER_BUTTON_SEND";

export const setAddCommentToOffer = (comment) => ({
  type: ADD_COMMENT_TO_OFFER,
  payload: comment,
});

export const setIsDisabledButtonSendChange = (isDisabled) => ({
  type: ADD_COMMENT_TO_OFFER_BUTTON_SEND,
  payload: isDisabled,
});

export const addComment = (
  addCommentToOfferComment,
  selectedOfferData,
  workPeriods,
  navigation,
  token
) => {
  return async (dispatch) => {
    try {
      if (
        addCommentToOfferComment == null ||
        addCommentToOfferComment.trim() == ""
      ) {
        Alert.alert(
          "Повідомлення",
          "Неможливо додати коментар. Введіть текст",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
        return;
      }
      dispatch(setIsDisabledButtonSendChange(true));
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );

      ws.onopen = () => {
        var text = addCommentToOfferComment;
        text = text.replace(new RegExp("\n", "g"), "\\n");
        var message =
          '4213["/claim/comment/create",{"id":' +
          selectedOfferData.id +
          ',"text":"' +
          text +
          '","documents":[],"workPeriod":"' +
          workPeriods[workPeriods.length - 1] +
          '"}]';
        ws.send(message);
      };

      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4313") {
          Alert.alert(
            "Повідомлення",
            "Надіслано успішно!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: true }
          );
          dispatch(setAddCommentToOffer(null));
          navigation.goBack();
        }
      };
    } catch (error) {
      console.log("addComment", "error");
    }
  };
};
