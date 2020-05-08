import {
  PAYMENT_SELECTION_LIQPAY_DATA,
  PAYMENT_SELECTION_CHARGES_DATA,
  PAYMENT_SELECTION_SELECTED_CHARGE,
  PAYMENT_SELECTION_SELECTED_CHARGE_VALUE,
  PAYMENT_SELECTION_SELECTED_CHARGE_CONTRIBUTION
} from './actions';

const defaultState = {
  liqpayData: null,
  chargesData: null,
  selectedCharge: null,
  selectedChargeValue: null,
  selectedChargeContribution: null
};

export const paymentSelectionReducer = (state = defaultState, action) => {
 
  switch (action.type) {
    case PAYMENT_SELECTION_LIQPAY_DATA:
      return {
        ...state,
        liqpayData: action.payload,
      };
    case PAYMENT_SELECTION_CHARGES_DATA:
      return {
        ...state,
        chargesData: action.payload
      }
    case PAYMENT_SELECTION_SELECTED_CHARGE:
      return {
        ...state,
        selectedCharge: action.payload
      }
    case PAYMENT_SELECTION_SELECTED_CHARGE_VALUE:
      return {
        ...state,
        selectedChargeValue: action.payload
      }
    case PAYMENT_SELECTION_SELECTED_CHARGE_CONTRIBUTION:
      return {
        ...state,
        selectedChargeContribution: action.payload
      }
  }
  return state;
};