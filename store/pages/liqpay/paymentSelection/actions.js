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


