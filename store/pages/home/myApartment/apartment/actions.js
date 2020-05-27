export const APARTMENT_CHANGE_USERDATA = 'APARTMENT_CHANGE_USERDATA';
export const APARTMENT_CHANGE_OSBB_ID = 'APARTMENT_CHANGE_OSBB_ID';
export const APARTMENT_CHANGE_ACCOUNT_ID = 'APARTMENT_CHANGE_ACCOUNT_ID';
export const APARTMENT_CHANGE_ACCOUNT_IDS = 'APARTMENT_CHANGE_ACCOUNT_IDS';
export const APARTMENT_CHANGE_WORK_PERIODS = 'APARTMENT_CHANGE_WORK_PERIODS';
export const APARTMENT_CHANGE_ALL_APARTMENT_DATA = 'APARTMENT_CHANGE_ALL_APARTMENT_DATA';
export const APARTMENT_CHANGE_CURRENT_APARTMENT_DATA = 'APARTMENT_CHANGE_CURRENT_APARTMENT_DATA';
export const APARTMENT_CHANGE_ALL_COSTS_DATA = 'APARTMENT_CHANGE_ALL_COSTS_DATA';
export const APARTMENT_CHANGE_CURRENT_COSTS_DATA = 'APARTMENT_CHANGE_CURRENT_COSTS_DATA';
export const APARTMENT_CHANGE_DEBT_DATA = 'APARTMENT_CHANGE_DEBT_DATA';
export const APARTMENT_CHANGE_LIQPAY_DATA = 'APARTMENT_CHANGE_LIQPAY_DATA';

export const setUserData = userData => ({
  type: APARTMENT_CHANGE_USERDATA,
  payload: userData
});

export const setOsbbId = osbbId => ({
  type: APARTMENT_CHANGE_OSBB_ID,
  payload: osbbId
});

export const setAccountId = accountId => ({
  type: APARTMENT_CHANGE_ACCOUNT_ID,
  payload: accountId
});

export const setAccountIds = accountIds => ({
  type: APARTMENT_CHANGE_ACCOUNT_IDS,
  payload: accountIds
});

export const setWorkPeriods = workPeriods => ({
  type: APARTMENT_CHANGE_WORK_PERIODS,
  payload: workPeriods
});

export const setAllApartmentData = allApartmentData => ({
  type: APARTMENT_CHANGE_ALL_APARTMENT_DATA,
  payload: allApartmentData
});

export const setCurrentApartmentData = currentApartmentData => ({
  type: APARTMENT_CHANGE_CURRENT_APARTMENT_DATA,
  payload: currentApartmentData
});

export const setAllCostsData = allCostsData => ({
  type: APARTMENT_CHANGE_ALL_COSTS_DATA,
  payload: allCostsData
});

export const setCurrentCostsData = currentCostsData => ({
  type: APARTMENT_CHANGE_CURRENT_COSTS_DATA,
  payload: currentCostsData
});

export const setDebtData = debtData => ({
  type: APARTMENT_CHANGE_DEBT_DATA,
  payload: debtData
});

export const setLiqpayData = liqpayData =>({
  type: APARTMENT_CHANGE_LIQPAY_DATA,
  payload: liqpayData
})