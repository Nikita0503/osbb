export const SEND_INDICATIONS_TEXT = 'SEND_INDICATIONS_TEXT';
export const SEND_INDICATIONS_COUNTERS = 'SEND_INDICATIONS_COUNTERS';
export const SEND_INDICATIONS_COUNTERS_CHANGE = 'SEND_INDICATIONS_COUNTERS_CHANGE';
export const SEND_INDICATIONS_SELECTED_COUNTER = 'SEND_INDICATIONS_SELECTED_COUNTER';

export const setIndicationText = indicationText => ({
  type: SEND_INDICATIONS_TEXT,
  payload: indicationText
});

export const setIndicationsCounters = indicationsCounters => ({
  type: SEND_INDICATIONS_COUNTERS,
  payload: indicationsCounters
});

export const updateIndicationsCounters = indicationsCounters => ({
  type: SEND_INDICATIONS_COUNTERS_CHANGE,
  payload: []
});

export const setSelectedCounter = selectedCounter => ({
  type: SEND_INDICATIONS_SELECTED_COUNTER,
  payload: selectedCounter
})

export const fetchSendIndicationsCounters = (token, accountIds, osbbId, workPeriods, index) => {
  return async dispatch => {
    try {
      const indicationsCountersPromise = await fetch(
        'https://app.osbb365.com/api/tenant/counters?accountId=' +
          accountIds[index].id +
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
      const responseJson = await indicationsCountersPromise.json();
      var obj = {
        accountId: accountIds[index],
        data: responseJson.counters,
      };
      dispatch(setIndicationsCounters(obj));
      if (index != accountIds.length - 1) {
        index++;
        fetchSendIndicationsCounters(token, accountIds, osbbId, workPeriods, index);
      }
    } catch (error) {
      console.log("fetchSendIndicationsCounters", error);
    }
  }
}

export const editIndications = (token, 
  selectedCounter, 
  accountId, 
  osbbId, 
  workPeriods, 
  indicationText, 
  componentDidMount) => {
  return async dispatch => {
    try {
      const editIndicationPromise = await fetch(
        'https://app.osbb365.com/api/account/undefined/counters/' +
          selectedCounter.id +
          '?accountId=' +
          accountId.id +
          '&osbbId=' +
          osbbId +
          '&workPeriod=' +
          workPeriods[workPeriods.length - 1],
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token + '',
          },
          body: JSON.stringify({
            testimony: indicationText,
          }),
        }
      );
      const responseJson = await editIndicationPromise.json();
      Alert.alert(
        'Повідомлення',
        'Успішно оновлено!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
      componentDidMount();
      dispatch(setSelectedCounter(null));
      dispatch(setIndicationText(null));
    } catch (error) {
      console.log("editIndications", error);
    }
  }
}