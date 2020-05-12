import {ADD_OFFER_TOPIC, ADD_OFFER_TEXT, ADD_OFFER_SYSTEM, ADD_OFFER_PUBLICITY, ADD_OFFER_BUTTON_SEND } from "./actions";

const defaultState = {
  addOfferTopic: null,
  addOfferText: null,
  addOfferSystem: null,
  addOfferPublicity: null,
  addOfferIsDisabled: false
}

export const addOfferReducer = (state = defaultState, action) => {

  switch (action.type){
    case ADD_OFFER_TOPIC:
      return {
        ...state,
        addOfferTopic: action.payload,
      }   
    case ADD_OFFER_TEXT:
      return {
        ...state,
        addOfferText: action.payload,
      }   
    case ADD_OFFER_SYSTEM:
      return {
        ...state,
        addOfferSystem: action.payload,
      }  
    case ADD_OFFER_PUBLICITY:
      return {
        ...state,
        addOfferPublicity: action.payload,
      }      
    case ADD_OFFER_BUTTON_SEND:
      return {
        ...state,
        addOfferIsDisabled: action.payload
      }
  } 
  
  return state;
}