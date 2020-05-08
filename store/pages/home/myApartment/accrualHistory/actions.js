
export const ACCRUAL_HISTORY_CHANGE_CURRENT_ACCRUALS_DATA = 'ACCRUAL_HISTORY_CHANGE_CURRENT_ACCRUALS_DATA';
export const ACCRUAL_HISTORY_CHANGE_CURRENT_SELECTED_ACCRUALS_DATA = 'ACCRUAL_HISTORY_CHANGE_CURRENT_SELECTED_ACCRUALS_DATA';

export const setCurrentAccrualsData = currentAccrualsData => ({
  type: ACCRUAL_HISTORY_CHANGE_CURRENT_ACCRUALS_DATA,
  payload: currentAccrualsData
});

export const setSelectedAccrualsData = selectedAccrualsData => ({
  type: ACCRUAL_HISTORY_CHANGE_CURRENT_SELECTED_ACCRUALS_DATA,
  payload: selectedAccrualsData
});