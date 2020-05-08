import {
  ADVERTISEMENT_OSBB_NAME,
  ADVERTISEMENT_DATA,
  ADVERTISEMENT_SELECTED_POST,
  ADVERTISEMENT_SELECTED_POST_COMMENTS,
  ADVERTISEMENT_ALL_COMMENTS,
  ADVERTISEMENT_ALL_COMMENTS_CLEAR,
  ADVERTISEMENT_SELECTED_FILE
} from './actions';

const defaultState = {
  advertisementOsbbName: null,
  advertisementData: null,
  selectedPost: null,
  selectedPostComments: null,
  allComments: [],
  advertisementSelectedFile: null
};

export const advertisementReducer = (state = defaultState, action) => {

  switch (action.type) {
    case ADVERTISEMENT_OSBB_NAME:
      return {
        ...state,
        advertisementOsbbName: action.payload
      }
    case ADVERTISEMENT_DATA:
      return {
        ...state,
        advertisementData: action.payload,
      };
    case ADVERTISEMENT_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case ADVERTISEMENT_SELECTED_POST_COMMENTS:
      return {
        ...state,
        selectedPostComments: action.payload
      }
    case ADVERTISEMENT_ALL_COMMENTS:
      return {
        ...state,
        allComments: [...state.allComments, action.payload],
      };
    case ADVERTISEMENT_ALL_COMMENTS_CLEAR:
      return {
        ...state,
        allComments: []
      }
    case ADVERTISEMENT_SELECTED_FILE:
      return {
        ...state,
        advertisementSelectedFile: action.payload
      }
  }

  return state;
};
