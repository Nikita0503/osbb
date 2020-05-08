import {
  HOUSE_CHANGE_ALL_HOUSE_DATA,
  HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA
} from './actions';

const defaultState = {
  allHouseData: null,
  allHouseCostsData: [],
};

export const houseReducer = (state = defaultState, action) => {
 
  switch (action.type) {
    case HOUSE_CHANGE_ALL_HOUSE_DATA:
      return {
        ...state,
        allHouseData: action.payload,
      };
    case HOUSE_CHANGE_ALL_COSTS_HOUSE_DATA:
      return {
        ...state,
        allHouseCostsData: [...state.allHouseCostsData, action.payload],
      };
  }
  return state;
};