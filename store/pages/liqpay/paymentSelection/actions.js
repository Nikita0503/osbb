export const PAYMENT_SELECTION_LIQPAY_DATA = 'PAYMENT_SELECTION_LIQPAY_DATA';
export const PAYMENT_SELECTION_CHARGES_DATA = 'PAYMENT_SELECTION_CHARGES_DATA';
export const PAYMENT_SELECTION_SELECTED_CHARGE = 'PAYMENT_SELECTION_SELECTED_CHARGE';
export const PAYMENT_SELECTION_SELECTED_CHARGE_VALUE = 'PAYMENT_SELECTION_SELECTED_CHARGE_VALUE';
export const PAYMENT_SELECTION_SELECTED_CHARGE_CONTRIBUTION = 'PAYMENT_SELECTION_SELECTED_CHARGE_CONTRIBUTION';


export const setLiqpayData = liqpayData => ({
  type: PAYMENT_SELECTION_LIQPAY_DATA,
  payload: liqpayData
});

export const setChargesData = chargesData => ({
  type: PAYMENT_SELECTION_CHARGES_DATA,
  payload: chargesData
})

export const setSelectedCharge = selectedCharge => ({
  type: PAYMENT_SELECTION_SELECTED_CHARGE,
  payload: selectedCharge
})

export const setSelectedChargeValue = selectedChargeValue => ({
  type: PAYMENT_SELECTION_SELECTED_CHARGE_VALUE,
  payload: selectedChargeValue
})

export const setSelectedChargeContribution = selectedChargeContribution => ({
  type: PAYMENT_SELECTION_SELECTED_CHARGE_CONTRIBUTION,
  payload: selectedChargeContribution
})

export const fetchLiqpayData = (token, accountId, osbbId, workPeriods) => {
  return async dispatch => {
      try{
          const liqpayDataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/checkLiqPay?accountId=' +
              accountId.id +
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

          const liqpayData = await liqpayDataPromise.json();
          dispatch(setLiqpayData(liqpayData))
      } catch (error) {
          console.log("fetchLiqpayData", error)
      }
  }
}

export const fetchChargesData = (token, accountId, osbbId, workPeriods) => { 
  return async dispatch => {
      try{
          const chargesDataPromise = await fetch(
            'https://app.osbb365.com/api/tenant/charges/total?accountId=' +
              accountId.id +
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
          );
          const responseJson = await chargesDataPromise.json();
          var sum = getSum(responseJson.chargesList);
          responseJson.chargesList.push({
            caption: "Всього",
            finishBalance: sum
          })
          dispatch(setChargesData(responseJson.chargesList));
      } catch (error) {
          console.log("fetchChargesData", error)
      }
  }
}

function getSum(data) {
  let sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i].finishBalance;
  }
  return sum.toFixed(2);
}