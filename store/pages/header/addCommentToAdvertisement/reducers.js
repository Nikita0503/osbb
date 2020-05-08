import {
  ADD_COMMENT_TO_ADVERTISEMENT_TEXT,
} from './actions';

const defaultState = {
  addCommentToAdvertisementText: null
};

export const addCommentToAdvertisementReducer = (state = defaultState, action) => {

  switch (action.type) {
    case ADD_COMMENT_TO_ADVERTISEMENT_TEXT:
      return {
        ...state,
        addCommentToAdvertisementText: action.payload
      }
  }

  return state;
};
