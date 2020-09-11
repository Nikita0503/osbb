export const ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH = 'ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH';
export const ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR = 'ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR';
export const ACT_OF_RECONCILIATION_CHANGE_TO_MONTH = 'ACT_OF_RECONCILIATION_CHANGE_TO_MONTH';
export const ACT_OF_RECONCILIATION_CHANGE_TO_YEAR = 'ACT_OF_RECONCILIATION_CHANGE_TO_YEAR';
export const ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH_SHOW = 'ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH_SHOW';
export const ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR_SHOW = 'ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR_SHOW';
export const ACT_OF_RECONCILIATION_CHANGE_TO_MONTH_SHOW = 'ACT_OF_RECONCILIATION_CHANGE_TO_MONTH_SHOW';
export const ACT_OF_RECONCILIATION_CHANGE_TO_YEAR_SHOW = 'ACT_OF_RECONCILIATION_CHANGE_TO_YEAR_SHOW';
export const ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA = 'ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA';
export const ACT_OF_RECONCILIATION_SHOW_LOADING = 'ACT_OF_RECONCILIATION_SHOW_LOADING'; 

export const setFromMonthShow = () => ({
  type: ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH_SHOW,

});

export const setFromYearShow = () => ({
  type: ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR_SHOW,
});

export const setToMonthShow = () => ({
  type: ACT_OF_RECONCILIATION_CHANGE_TO_MONTH_SHOW,
});

export const setToYearShow = () => ({
  type: ACT_OF_RECONCILIATION_CHANGE_TO_YEAR_SHOW,
});

export const setFromMonth = fromMonth => ({
  type: ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH,
  payload: fromMonth
});

export const setFromYear = fromYear => ({
  type: ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR,
  payload: fromYear,
});

export const setToMonth = toMonth => ({
  type: ACT_OF_RECONCILIATION_CHANGE_TO_MONTH,
  payload: toMonth
});

export const setToYear = toYear => ({
  type: ACT_OF_RECONCILIATION_CHANGE_TO_YEAR,
  payload: toYear
});

export const setSelectedData = selectedData => ({
  type: ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA,
  payload: selectedData
});

export const setShowLoading = showLoading => ({
  type: ACT_OF_RECONCILIATION_SHOW_LOADING,
  payload: showLoading
});

export const fetchData = (accountId, osbbId, fromMonth, toMonth, token) => {
  return async dispatch => {
      try {
          const dataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/charges/total?accountId=' +
              accountId.id +
              '&osbbId=' +
              osbbId +
              '&periodFrom=' +
              fromMonth +
              '&periodTo=' +
              toMonth,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token + '',
              },
            }
          )
          const responseJson = await dataPromise.json();
          var keys = new Array();
            var dataArray = new Array();
            for(var k in responseJson.chargesList) keys.push(k);
            for(var i = 0; i < keys.length; i++){
              var data = {
                month: keys[i],
                data: responseJson.chargesList[keys[i]]
              }
              dataArray.push(data);
              console.log(dataArray)
            }
            dispatch(setSelectedData(dataArray));
            dispatch(setShowLoading(false))
      } catch (error) {
          console.log("fetchData", "error");
      }
  }
}