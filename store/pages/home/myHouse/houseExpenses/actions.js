export const HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA = 'HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA';
export const HOUSE_EXPENSES_CHANGE_EXPENSES_DATA = 'HOUSE_EXPENSES_CHANGE_EXPENSES_DATA';
export const HOUSE_EXPENSES_CHANGE_FILES_DATA = 'HOUSE_EXPENSES_CHANGE_FILES_DATA';
export const HOUSE_EXPENSES_CHANGE_SELECTED_FILE = 'HOUSE_EXPENSES_CHANGE_SELECTED_FILE';

export const setExpensesGeneralData = expensesGeneralData => ({
  type: HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA,
  payload: expensesGeneralData
});

export const setExpensesData = expensesData => ({
  type: HOUSE_EXPENSES_CHANGE_EXPENSES_DATA,
  payload: expensesData
});

export const setExpensesFilesData = expensesFilesData => ({
  type: HOUSE_EXPENSES_CHANGE_FILES_DATA,
  payload: expensesFilesData
});

export const setExpensesSelectedFile = selectedFile => ({
  type: HOUSE_EXPENSES_CHANGE_SELECTED_FILE,
  payload: selectedFile
});