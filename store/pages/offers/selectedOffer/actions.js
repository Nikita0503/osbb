export const SELECTED_OFFER_COMMNETS = 'SELECTED_OFFER_COMMNETS';
export const SELECTED_OFFER_SELECTED_FILE = 'SELECTED_OFFER_SELECTED_FILE';

export const setSelectedOfferComments = comments => ({
  type: SELECTED_OFFER_COMMNETS,
  payload: comments
});

export const setSelectedFile = file => ({
  type: SELECTED_OFFER_SELECTED_FILE,
  payload: file
})

export const fetchRequest = (selectedOfferData, workPeriods, token) => {
  return async dispatch => {
    try {
      var ws = new WebSocket(
        'wss://app.sapo365.com/socket.io/?auth_token=' +
          token +
          '&EIO=3&transport=websocket'
      );
      ws.onopen = () => {
        ws.send(
          '4216["/claim/comment/list",{"id":' +
            selectedOfferData.id +
            ',"workPeriod":"' +
            workPeriods[workPeriods.length - 1] +
            '"}]'
        );
      };
      ws.onmessage = e => {
        if (e.data.substring(0, 4) == '4316') {
          const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          dispatch(setSelectedOfferComments(data[0]));
        }
      };
    } catch (error) {
        console.log("fetchRequest", "error");
    }
  }
}