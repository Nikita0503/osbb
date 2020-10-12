export const ABOUT_HOUSE_DATA = 'ABOUT_HOUSE_DATA';
export const ABOUT_HOUSE_DOCUMENTS = 'ABOUT_HOUSE_DOCUMENTS';
export const ABOUT_HOUSE_DATA_SELECTED_FILE = 'ABOUT_HOUSE_DATA_SELECTED_FILE';
export const ABOUT_HOUSE_CHANGE_SELECTED_FILE = 'ABOUT_HOUSE_CHANGE_SELECTED_FILE';

export const setAboutHouseData = aboutHouseData => ({
  type: ABOUT_HOUSE_DATA,
  payload: aboutHouseData
});

export const setAboutHouseDocuments = aboutHouseDocuments => ({
  type: ABOUT_HOUSE_DOCUMENTS,
  payload: aboutHouseDocuments
});

export const setAboutHouseSelectedFile = selectedFile => ({
  type: ABOUT_HOUSE_DATA_SELECTED_FILE,
  payload: selectedFile
});

export const setSelectedFile = selectedFile => ({
  type: ABOUT_HOUSE_CHANGE_SELECTED_FILE,
  payload: selectedFile
});

export const fetchHouseData = (accountId, osbbId, workPeriods, token) => {
  return async dispatch => {
      try{
          const houseDataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/osbb?accountId=' +
              accountId +
              '&osbbId=' +
              osbbId +
              '&workPeriod=' +
              workPeriods[workPeriods.length - 1],
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token + '',
              },
            }
          )
          const houseData = await houseDataPromise.json();
          dispatch(setAboutHouseData(houseData))
          var ws = new WebSocket(
            'wss://app.osbb365.com/socket.io/?auth_token=' +
              token +
              '&EIO=3&transport=websocket'
          );
          ws.onopen = () => {
            ws.send('424["/statutoryDocuments/list",{}]');
          };
          ws.onmessage = e => {
            if (e.data.substring(0, 3) == '434') {
              const myObjStr = JSON.stringify(e.data.substring(3, e.data.length));
              var myObj = JSON.parse(myObjStr);
              var data = JSON.parse(myObj);
              dispatch(setAboutHouseDocuments(data[0]));
            }
          };
      } catch (error) {
          console.log("fetchHouseData", error)
      }
  }
}