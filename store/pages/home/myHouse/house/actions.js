export const HOUSE_CHANGE_ALL_HOUSE_DATA = 'HOUSE_CHANGE_ALL_HOUSE_DATA';
export const HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA = 'HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA';

export const setAllHouseData = allHouseData => ({
  type: HOUSE_CHANGE_ALL_HOUSE_DATA,
  payload: allHouseData
});

export const setAllHouseCostsData = allHouseCostsData => ({
  type: HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA,
  payload: allHouseCostsData
});

export const fetchHouseData = (accountId, osbbId, workPeriods, token) => {
  return async dispatch => {
    try {
      var ws = new WebSocket(
        'wss://app.osbb365.com/socket.io/?auth_token=' +
          token +
          '&EIO=3&transport=websocket'
      );
      ws.onmessage = e => {
        // a message was received
        if (e.data.substring(0, 2) == '42') {
          const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
          var myObj = JSON.parse(myObjStr);
          var data = JSON.parse(myObj);
          var dataByPeriods = new Array();
          for (var i = 0; i < data[1].OsbbData.Periods.length; i++) {
            var dataObj = {
              period: data[1].OsbbData.Periods[i].period,
              data: data[1].OsbbData.Periods[i],
            };
            dataByPeriods.push(dataObj);
          }
  
          dispatch(setAllHouseData(dataByPeriods));
          ws.close();
        }
      };
      fetchHouseCosts(0, accountId, osbbId, workPeriods, token, dispatch);
    } catch (error) {
      console.log("fetchHouseDataChange", "error")
    }
  }
}

const fetchHouseCosts = async (workPeriodIndex, accountId, osbbId, workPeriods, token, dispatch) => {
    fetch(
      'https://app.osbb365.com/api/tenant/costs?accountId=' +
        accountId.id +
        '&osbbId=' +
        osbbId +
        '&workPeriod=' +
        workPeriods[workPeriodIndex],
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token + '',
        },
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      var data = {
        period: workPeriods[workPeriodIndex],
        data: responseJson,
      };
      dispatch(setAllHouseCostsData(data));
      if (workPeriodIndex != workPeriods.length - 1) {
        fetchHouseCosts(workPeriodIndex + 1, accountId, osbbId, workPeriods, token, dispatch);
      }
    })
    .catch(error => {
      console.error(error);
    });
  
}
