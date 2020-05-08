import { ADD_COMMENT_TO_OFFER } from "./actions";

const defaultState = {
  addCommentToOfferComment: null
}

export const addCommentToOfferReducer = (state = defaultState, action) => {

  switch (action.type){
    case ADD_COMMENT_TO_OFFER:
      return {
        ...state,
        addCommentToOfferComment: action.payload,
      }   
  } 
  
  return state;
}