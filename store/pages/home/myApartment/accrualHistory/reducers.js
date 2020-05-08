import {
  ACCRUAL_HISTORY_CHANGE_CURRENT_ACCRUALS_DATA,
  ACCRUAL_HISTORY_CHANGE_CURRENT_SELECTED_ACCRUALS_DATA
} from './actions';

const defaultState = {
  accrualHistoryCurrentData: null,
  accrualHistoryCurrentSelectedData: null
};

export const accrualHistoryReducer = (state = defaultState, action) => {
  
  switch (action.type) {
    case ACCRUAL_HISTORY_CHANGE_CURRENT_ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentData: action.payload
      }
    case ACCRUAL_HISTORY_CHANGE_CURRENT_SELECTED_ACCRUALS_DATA:
      return {
        ...state,
        accrualHistoryCurrentSelectedData: action.payload
      }
  }
  return state;
};