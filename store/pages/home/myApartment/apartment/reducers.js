  import {
  APARTMENT_CHANGE_USERDATA,
  APARTMENT_CHANGE_OSBB_ID,
  APARTMENT_CHANGE_ACCOUNT_ID,
  APARTMENT_CHANGE_ACCOUNT_IDS,
  APARTMENT_CHANGE_WORK_PERIODS,
  APARTMENT_CHANGE_ALL_APARTMENT_DATA,
  APARTMENT_CHANGE_CURRENT_APARTMENT_DATA,
  APARTMENT_CHANGE_ALL_COSTS_DATA,
  APARTMENT_CHANGE_CURRENT_COSTS_DATA,
  APARTMENT_CHANGE_DEBT_DATA
} from './actions';

const defaultState = {
  userData: null,
  osbbId: null,
  accountId: null,
  accountIds: [],
  number: null,
  workPeriods: [],
  allApartmentData: [],
  currentApartmentData: null,
  allCostsData: [],
  debtData: [],
};

export const apartmentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APARTMENT_CHANGE_USERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case APARTMENT_CHANGE_OSBB_ID:
      return {
        ...state,
        osbbId: action.payload,
      };
    case APARTMENT_CHANGE_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.payload,
      };
    case APARTMENT_CHANGE_ACCOUNT_IDS:
      return {
        ...state,
        accountIds: [...state.accountIds, action.payload],
      };
    case APARTMENT_CHANGE_WORK_PERIODS:
      return {
        ...state,
        workPeriods: [...state.workPeriods, action.payload],
      };
    case APARTMENT_CHANGE_ALL_APARTMENT_DATA:
      return {
        ...state,
        allApartmentData: [...state.allApartmentData, action.payload],
      };
    case APARTMENT_CHANGE_CURRENT_APARTMENT_DATA:
      return {
        ...state,
        currentApartmentData: action.payload,
      };
    case APARTMENT_CHANGE_ALL_COSTS_DATA:
      return{
        ...state,
        allCostsData: [...state.allCostsData, action.payload],
      }
    case APARTMENT_CHANGE_CURRENT_COSTS_DATA:
      return{
        ...state,
        currentCostsData: action.payload
      }
    case APARTMENT_CHANGE_DEBT_DATA:
      return{
        ...state,
        debtData: [...state.debtData, action.payload]
      }
  }

  return state;
};
