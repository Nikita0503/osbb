import { ADD_COMMENT_TO_OFFER, ADD_COMMENT_TO_OFFER_BUTTON_SEND } from "./actions";

const defaultState = {
  addCommentToOfferComment: null,
  isDisabledButtonSend: false
}

export const addCommentToOfferReducer = (state = defaultState, action) => {

  switch (action.type){
    case ADD_COMMENT_TO_OFFER:
      return {
        ...state,
        addCommentToOfferComment: action.payload,
      }   
    case ADD_COMMENT_TO_OFFER_BUTTON_SEND:
      return {
        ...state,
        isDisabledButtonSend: action.payload
      }
  } 
  
  return state;
}