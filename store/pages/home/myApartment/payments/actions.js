export const PAYMENTS_CHANGE_PAYMENTS_DATA = 'PAYMENTS_CHANGE_PAYMENTS_DATA';

export const setCurrentPaymentsData = currentPaymentsData => ({
  type: PAYMENTS_CHANGE_PAYMENTS_DATA,
  payload: currentPaymentsData
});
