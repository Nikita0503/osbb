import { Alert } from "react-native";
export const APPLICATIONS_AND_OFFERS_DATA = "APPLICATIONS_AND_OFFERS_DATA";
export const APPLICATIONS_AND_OFFERS_DATA_CLEAR =
  "APPLICATIONS_AND_OFFERS_DATA_CLEAR";
export const APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA =
  "APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA";
export const APPLICATIONS_AND_OFFERS_ONLY_MY =
  "APPLICATIONS_AND_OFFERS_ONLY_MY";
export const APPLICATIONS_AND_OFFERS_LOADING =
  "APPLICATIONS_AND_OFFERS_LOADING";
export const APPLICATIONS_AND_OFFERS_FIRSTLY_OPENED =
  "APPLICATIONS_AND_OFFERS_FIRSTLY_OPENED";
export const APPLICATIONS_AND_OFFERS_DISPLAY_ARCHIVED =
  "APPLICATIONS_AND_OFFERS_DISPLAY_ARCHIVED";

export const setApplicationsAndOffersFirstlyOpened = () => ({
  type: APPLICATIONS_AND_OFFERS_FIRSTLY_OPENED,
});

export const setApplicationsAndOffersDisplayAcrhived = () => ({
  type: APPLICATIONS_AND_OFFERS_DISPLAY_ARCHIVED,
});

export const setApplicationsAndOffersData = (applicationsAndOffersData) => ({
  type: APPLICATIONS_AND_OFFERS_DATA,
  payload: applicationsAndOffersData,
});

export const setApplicationsAndOffersDataClear = (
  applicationsAndOffersData
) => ({
  type: APPLICATIONS_AND_OFFERS_DATA_CLEAR,
  payload: [],
});

export const setSelectedOfferData = (selectedOfferData) => ({
  type: APPLICATIONS_AND_OFFERS_SELECTED_OFFER_DATA,
  payload: selectedOfferData,
});

export const setApplicationsAndOffersOnlyMy = (onlyMy) => ({
  type: APPLICATIONS_AND_OFFERS_ONLY_MY,
  payload: onlyMy,
});

export const setApplicationsAndOffersLoading = (loading) => ({
  type: APPLICATIONS_AND_OFFERS_LOADING,
  payload: loading,
});

export const fetchAllRequests = (workPeriods, token) => {
  return async (dispatch) => {
    try {
      dispatch(setApplicationsAndOffersLoading(true));
      dispatch(setApplicationsAndOffersDataClear());
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );
      ws.onopen = () => {
        dispatch(setApplicationsAndOffersLoading(true));
        ws.send(
          '4210["/claim/list",{"my":false,"archive":true,"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
        ws.send(
          '4211["/claim/list",{"my":false,"archive":false,"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
        ws.send(
          '4212["/claim/list",{"my":true,"archive":true,"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
        ws.send(
          '4213["/claim/list",{"my":true,"archive":false,"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
      };
      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4310") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          var obj = {
            archive: true,
            data: data[0].data,
            my: false,
          };
          dispatch(setApplicationsAndOffersData(obj));
          dispatch(setApplicationsAndOffersLoading(false));
        }
        if (e.data.substring(0, 4) == "4311") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          myObj = JSON.parse(myObjStr);
          data = JSON.parse(myObj);
          obj = {
            archive: false,
            data: data[0].data,
            my: false,
          };
          dispatch(setApplicationsAndOffersData(obj));
        }
        if (e.data.substring(0, 4) == "4312") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          myObj = JSON.parse(myObjStr);
          data = JSON.parse(myObj);
          obj = {
            archive: true,
            data: data[0].data,
            my: true,
          };
          dispatch(setApplicationsAndOffersData(obj));
        }
        if (e.data.substring(0, 4) == "4313") {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          myObj = JSON.parse(myObjStr);
          data = JSON.parse(myObj);
          obj = {
            archive: false,
            data: data[0].data,
            my: true,
          };
          dispatch(setApplicationsAndOffersData(obj));
        }
      };
    } catch (error) {
      console.log("fetchAllRequests", "error");
    }
  };
};

export const withdrawRequest = (fullData, workPeriods, token) => {
  return async (dispatch) => {
    try {
      var ws = new WebSocket(
        "wss://app.osbb365.com/socket.io/?auth_token=" +
          token +
          "&EIO=3&transport=websocket"
      );
      ws.onopen = () => {
        ws.send(
          '4217["/claim/update",{"id":' +
            fullData.id +
            ',"statusId":8,"isOpened":false,"workPeriod":"' +
            workPeriods[workPeriods.size - 1] +
            '"}]'
        );
      };
      ws.onmessage = (e) => {
        if (e.data.substring(0, 4) == "4317") {
          Alert.alert("Повідомлення", "Відхилено успішно", [{ text: "OK" }]);
          ws.close();
        }
      };
    } catch (error) {
      console.log("withdrawRequest", "error");
    }
  };
};
