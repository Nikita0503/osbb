import {
  ADD_COMMENT_TO_ADVERTISEMENT_TEXT,
  ADD_COMMENT_TO_ADVERTISEMENT_BUTTON_SEND,
} from "./actions";

const defaultState = {
  addCommentToAdvertisementText: null,
  isDisabledButtonSend: false,
};

export const addCommentToAdvertisementReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case ADD_COMMENT_TO_ADVERTISEMENT_TEXT:
      return {
        ...state,
        addCommentToAdvertisementText: action.payload,
      };
    case ADD_COMMENT_TO_ADVERTISEMENT_BUTTON_SEND:
      return {
        ...state,
        isDisabledButtonSend: action.payload,
      };
  }

  return state;
};
