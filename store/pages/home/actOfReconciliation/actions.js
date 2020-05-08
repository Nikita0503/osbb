export const ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH = 'ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH';
export const ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR = 'ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR';
export const ACT_OF_RECONCILIATION_CHANGE_TO_MONTH = 'ACT_OF_RECONCILIATION_CHANGE_TO_MONTH';
export const ACT_OF_RECONCILIATION_CHANGE_TO_YEAR = 'ACT_OF_RECONCILIATION_CHANGE_TO_YEAR';
export const ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA = 'ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA';
export const ACT_OF_RECONCILIATION_SHOW_LOADING = 'ACT_OF_RECONCILIATION_SHOW_LOADING'; 

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