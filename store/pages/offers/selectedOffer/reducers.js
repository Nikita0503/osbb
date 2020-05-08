import {SELECTED_OFFER_COMMNETS, SELECTED_OFFER_SELECTED_FILE} from "./actions";

const defaultState = {
  selectedOfferComments: null,
  offerSelectedFile: null
}

export const selectedOfferReducer = (state = defaultState, action) => {

  switch (action.type){
    case SELECTED_OFFER_COMMNETS:
      return {
        ...state,
        selectedOfferComments: action.payload
      }
    case SELECTED_OFFER_SELECTED_FILE:
      return {
        ...state,
        offerSelectedFile: action.payload
      }
  } 
  
  return state;
}