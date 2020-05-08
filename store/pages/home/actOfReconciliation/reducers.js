import {
  ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH,
  ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR,
  ACT_OF_RECONCILIATION_CHANGE_TO_MONTH,
  ACT_OF_RECONCILIATION_CHANGE_TO_YEAR,
  ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA,
  ACT_OF_RECONCILIATION_SHOW_LOADING
} from './actions';

const defaultState = {
  fromMonth: '',
  fromYear: '',
  toMonth: '',
  toYear: '',
  fromMonths: [],
  toMonths: [],
  selectedData: [],
  showLoading: false,
};

export const actOfReconciliationReducer = (state = defaultState, action) => {

  switch (action.type) {
    case ACT_OF_RECONCILIATION_CHANGE_FROM_MONTH:
      return {
        ...state,
        fromMonth: action.payload,
      };
    case ACT_OF_RECONCILIATION_CHANGE_FROM_YEAR:
      return {
        ...state,
        fromYear: action.payload,
      };
    case ACT_OF_RECONCILIATION_CHANGE_TO_MONTH:
      return {
        ...state,
        toMonth: action.payload,
      };
    case ACT_OF_RECONCILIATION_CHANGE_TO_YEAR:
      return {
        ...state,
        toYear: action.payload,
      };
    case ACT_OF_RECONCILIATION_CHANGE_SELECTED_DATA:
      return {
        ...state,
        selectedData: action.payload,
      };
    case ACT_OF_RECONCILIATION_SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload,
      };
  }

  return state;
};
