export const APARTMENT_HEADER_CHANGE_CURRENT_WORKPERIOD =
  "APARTMENT_HEADER_CHANGE_CURRENT_WORKPERIOD";

export const setCurrentWorkPeriod = (currentWorkPeriod) => ({
  type: APARTMENT_HEADER_CHANGE_CURRENT_WORKPERIOD,
  payload: currentWorkPeriod,
});
