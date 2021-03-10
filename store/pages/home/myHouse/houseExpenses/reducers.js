import {
  HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA,
  HOUSE_EXPENSES_CHANGE_EXPENSES_DATA,
  HOUSE_EXPENSES_CHANGE_FILES_DATA,
  HOUSE_EXPENSES_CHANGE_SELECTED_FILE,
} from "./actions";

const defaultState = {
  expensesGeneralData: null,
  expensesData: null,
  expensesFilesData: null,
  expensesSelectedFile: null,
};

export const houseExpensesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA:
      return {
        ...state,
        expensesGeneralData: action.payload,
      };
    case HOUSE_EXPENSES_CHANGE_EXPENSES_DATA:
      return {
        ...state,
        expensesData: action.payload,
      };
    case HOUSE_EXPENSES_CHANGE_FILES_DATA:
      return {
        ...state,
        expensesFilesData: action.payload,
      };
    case HOUSE_EXPENSES_CHANGE_SELECTED_FILE:
      return {
        ...state,
        expensesSelectedFile: action.payload,
      };
  }
  return state;
};
