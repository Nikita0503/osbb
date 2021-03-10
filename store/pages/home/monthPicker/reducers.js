import { APARTMENT_HEADER_CHANGE_CURRENT_WORKPERIOD } from "./actions";

const defaultState = {
  currentWorkPeriod: "",
};

export const apartmentHeaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case APARTMENT_HEADER_CHANGE_CURRENT_WORKPERIOD:
      return {
        ...state,
        currentWorkPeriod: action.payload,
      };
  }

  return state;
};
