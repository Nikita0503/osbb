import {
  FLAT_INFO_GENERAL_DATA,
  FLAT_INFO_GENERAL_DATA_CLEAR,
  FLAT_INFO_LODGER_DATA,
  FLAT_INFO_LODGER_DATA_CLEAR,
  FLAT_INFO_PARAMETERS,
  FLAT_INFO_PARAMETERS_CLEAR,
  FLAT_INFO_PRIVILEGES,
  FLAT_INFO_PRIVILEGES_CLEAR,
  FLAT_INFO_CONTRIBUTIONS,
  FLAT_INFO_CONTRIBUTIONS_CLEAR,
  FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS,
  FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR,
  FLAT_INFO_COUNTERS,
  FLAT_INFO_COUNTERS_CLEAR,
  FLAT_INFO_CONTRACTS,
  FLAT_INFO_CONTRACTS_CLEAR
} from './actions';

const defaultState = {
  flatInfoGeneralData: [],
  flatInfoLodgerData: [],
  flatInfoParameters: [],
  flatInfoPrivileges: [],
  flatInfoContributions: [],
  flatInfoIndividualContributions: [],
  flatInfoCounters: [],
  flatInfoContracts: []
};

export const flatInfoReducer = (state = defaultState, action) => {
 
  switch (action.type) {
    case FLAT_INFO_GENERAL_DATA:
      return {
        ...state,
        flatInfoGeneralData: [...state.flatInfoGeneralData, action.payload],
      };
    case FLAT_INFO_GENERAL_DATA_CLEAR:
      return {
        ...state,
        flatInfoGeneralData: []
      }
    case FLAT_INFO_LODGER_DATA:
      return {
        ...state,
        flatInfoLodgerData: [...state.flatInfoLodgerData, action.payload],
      };
    case FLAT_INFO_LODGER_DATA_CLEAR:
      return {
        ...state,
        flatInfoLodgerData: []
      }
    case FLAT_INFO_PARAMETERS:
      return {
        ...state,
        flatInfoParameters: [...state.flatInfoParameters, action.payload],
      };
    case FLAT_INFO_PARAMETERS_CLEAR:
      return {
        ...state,
        flatInfoParameters: []
      }
    case FLAT_INFO_PRIVILEGES:
      return {
        ...state,
        flatInfoPrivileges: [...state.flatInfoPrivileges, action.payload],
      };
    case FLAT_INFO_PRIVILEGES_CLEAR:
      return {
        ...state,
        flatInfoPrivileges: []
      }
    case FLAT_INFO_CONTRIBUTIONS:
      return {
        ...state,
        flatInfoContributions: action.payload,
      };
    case FLAT_INFO_CONTRIBUTIONS_CLEAR:
      return {
        ...state,
        flatInfoContributions: []
      }
    case FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS:
      return {
        ...state,
        flatInfoIndividualContributions: action.payload,
      };
    case FLAT_INFO_INDIVIDUAL_CONTRIBUTIONS_CLEAR:
      return {
        ...state,
        flatInfoIndividualContributions: []
      }
    case FLAT_INFO_COUNTERS:
      return {
        ...state,
        flatInfoCounters: [...state.flatInfoCounters, action.payload],
      };
    case FLAT_INFO_COUNTERS_CLEAR:
      return {
        ...state,
        flatInfoCounters: []
      }
    case FLAT_INFO_CONTRACTS:
      return {
        ...state,
        flatInfoContracts: [...state.flatInfoContracts, action.payload],
      };
    case FLAT_INFO_CONTRACTS_CLEAR:
      return {
        ...state,
        flatInfoContracts: []
      }
  }
  return state;
};