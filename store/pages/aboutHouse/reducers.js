import {
  ABOUT_HOUSE_DATA,
  ABOUT_HOUSE_DOCUMENTS,
  ABOUT_HOUSE_DATA_SELECTED_FILE,
} from "./actions";

const defaultState = {
  aboutHouseData: null,
  aboutHouseDocuments: null,
  aboutHouseSelectedFile: null,
};

export const aboutHouseReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ABOUT_HOUSE_DATA:
      return {
        ...state,
        aboutHouseData: action.payload,
      };
    case ABOUT_HOUSE_DOCUMENTS:
      return {
        ...state,
        aboutHouseDocuments: action.payload,
      };
    case ABOUT_HOUSE_DATA_SELECTED_FILE:
      return {
        ...state,
        aboutHouseSelectedFile: action.payload,
      };
  }
  return state;
};
