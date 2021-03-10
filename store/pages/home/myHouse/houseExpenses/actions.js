export const HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA =
  "HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA";
export const HOUSE_EXPENSES_CHANGE_EXPENSES_DATA =
  "HOUSE_EXPENSES_CHANGE_EXPENSES_DATA";
export const HOUSE_EXPENSES_CHANGE_FILES_DATA =
  "HOUSE_EXPENSES_CHANGE_FILES_DATA";
export const HOUSE_EXPENSES_CHANGE_SELECTED_FILE =
  "HOUSE_EXPENSES_CHANGE_SELECTED_FILE";

export const setExpensesGeneralData = (expensesGeneralData) => ({
  type: HOUSE_EXPENSES_CHANGE_GENERAL_EXPENSES_DATA,
  payload: expensesGeneralData,
});

export const setExpensesData = (expensesData) => ({
  type: HOUSE_EXPENSES_CHANGE_EXPENSES_DATA,
  payload: expensesData,
});

export const setExpensesFilesData = (expensesFilesData) => ({
  type: HOUSE_EXPENSES_CHANGE_FILES_DATA,
  payload: expensesFilesData,
});

export const setExpensesSelectedFile = (selectedFile) => ({
  type: HOUSE_EXPENSES_CHANGE_SELECTED_FILE,
  payload: selectedFile,
});

export const fetchExpenses = (
  expensesGeneralData,
  accountId,
  osbbId,
  token
) => {
  return async (dispatch) => {
    try {
      const expensesPromise = await fetch(
        "https://app.osbb365.com/api/tenant/costs/" +
          expensesGeneralData.id +
          "/transcript?accountId=" +
          accountId.id +
          "&osbbId=" +
          osbbId,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const expenses = await expensesPromise.json();
      dispatch(setExpensesData(expenses));
    } catch (error) {
      console.log("fetchExpenses", "error");
    }
  };
};
