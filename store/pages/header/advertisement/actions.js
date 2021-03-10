import { Alert } from "react-native";
export const CHANGE_ADVERTISEMENT_OSBB_NAME = "CHANGE_ADVERTISEMENT_OSBB_NAME";
export const CHANGE_ADVERTISEMENT_DATA = "CHANGE_ADVERTISEMENT_DATA";
export const CHANGE_ADVERTISEMENT_SELECTED_POST =
  "CHANGE_ADVERTISEMENT_SELECTED_POST";
export const CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS =
  "CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS";
export const CHANGE_ADVERTISEMENT_ALL_COMMENTS =
  "CHANGE_ADVERTISEMENT_ALL_COMMENTS";
export const CHANGE_ADVERTISEMENT_SELECTED_FILE =
  "CHANGE_ADVERTISEMENT_SELECTED_FILE";

export const setAdvertisementOsbbName = (advertisementOsbbName) => ({
  type: CHANGE_ADVERTISEMENT_OSBB_NAME,
  payload: advertisementOsbbName,
});

export const setAdvertisementData = (advertisementData) => ({
  type: CHANGE_ADVERTISEMENT_DATA,
  payload: advertisementData,
});

export const setSelectedPost = (selectedPost) => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_POST,
  payload: selectedPost,
});

export const setSelectedPostComments = (selectedPost) => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_POST_COMMENTS,
  payload: selectedPost,
});

export const setAllComments = (allComments) => ({
  type: CHANGE_ADVERTISEMENT_ALL_COMMENTS,
  payload: allComments,
});

export const setAdvertisementSelectedFile = (selectedFile) => ({
  type: CHANGE_ADVERTISEMENT_SELECTED_FILE,
  payload: selectedFile,
});

export const fetchAllAds = (token) => {
  return async (dispatch) => {
    try {
      dispatch(setSelectedPost(null));
      dispatch(setAllComments(null));
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );
      ws.onopen = () => {
        ws.send('4221["/notice/list",{"page":1,"limit":50}]');
      };
      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4321") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          for (var i = 0; i < data[0].length; i++) {
            for (var j = 0; j < data[0][i].variants.length; j++) {
              data[0][i].variants[j].id = data[0][i].id;
            }
          }
          dispatch(setAdvertisementData(data[0]));
          if (data[0].length > 0) {
            fetchAdsById(data[0], 0, token);
          }
          ws.close();
        }
      };
    } catch (error) {
      console.log("fetchAllAds", "error");
    }
  };
};

const fetchAdsById = (advertisementData, index, token) => {
  return async (dispatch) => {
    var ws = new WebSocket(
      "wss://app.osbb365.com/socket.io/?auth_token=" +
        token +
        "&EIO=3&transport=websocket"
    );
    ws.onopen = () => {
      ws.send(
        '4210["/notice/one/comments",{"id":' +
          advertisementData[index].id +
          ',"page":1,"limit":10}]'
      );
    };
    ws.onmessage = (e) => {
      if (e.data.substring(0, 4) == "4310") {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        var obj = {
          id: advertisementData[index].id,
          data: data[0],
        };
        dispatch(setAllComments(obj));
        ws.close();
        index++;
        if (index != advertisementData.length) {
          fetchAdsById(advertisementData, index, token);
        }
      }
    };
  };
};

export const fetchOsbbName = (accountId, osbbId, workPeriods, token) => {
  return async (dispatch) => {
    try {
      const promiseOsbbName = await fetch(
        "https://app.osbb365.com/api/tenant/osbb?accountId=" +
          accountId +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );
      const answerOsbbName = await promiseOsbbName.json();
      dispatch(setAdvertisementOsbbName(answerOsbbName));
    } catch (error) {
      console.log("fetchOsbbName", "error");
    }
  };
};

export const toVote = (advertisementData, variant, token) => {
  return async (dispatch) => {
    var ws = new WebSocket(
      "wss://app.osbb365.com/socket.io/?auth_token=" +
        token +
        "&EIO=3&transport=websocket"
    );
    ws.onopen = () => {
      Alert.alert(
        "Підтвердження",
        "Ви впевненні у вашому варіанті?",
        [
          {
            text: "Так",
            onPress: () => {
              ws.send(
                '4210["/notice/vote/optionSelected",{"noticeId":' +
                  variant.id +
                  ',"voteVariantId":' +
                  variant.variantId +
                  "}]"
              );
            },
          },
          { text: "Ні", onPress: () => console.log("No pressed") },
        ],
        { cancelable: true }
      );
    };
    ws.onmessage = (e) => {
      if (e.data.substring(0, 4) == "4310") {
        var data = advertisementData;
        Alert.alert(
          "Повідомлення",
          "Ваш голос було зараховано",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
        for (var i = 0; i < data.length; i++) {
          if (variant.id == data[i].id) {
            for (var j = 0; j < data[i].variants.length; j++) {
              if (data[i].variants[j].variantId == variant.variantId) {
                data[i].variants[j].selected = true;
                data[i].voted = true;
              }
            }
          }
        }
        dispatch(setAdvertisementData(null)); //not understandable bug with screen updating. this string is needed for fix that
        dispatch(setAdvertisementData(data));
        ws.close();
      }
    };
  };
};

export const fetchSelectedPostComments = (selectedPostComments, token) => {
  return async (dispatch) => {
    dispatch(setAllComments(null));
    var ws = new WebSocket(
      "wss://app.osbb365.com/socket.io/?auth_token=" +
        token +
        "&EIO=3&transport=websocket"
    );
    ws.onopen = () => {
      ws.send(
        '4210["/notice/one/comments",{"id":' +
          selectedPostComments.id +
          ',"page":1,"limit":10}]'
      );
    };
    ws.onmessage = (e) => {
      if (e.data.substring(0, 4) == "4310") {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        dispatch(setAllComments(data[0]));
        ws.close();
      }
    };
  };
};
