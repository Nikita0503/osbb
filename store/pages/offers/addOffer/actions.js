export const ADD_OFFER_TOPIC = 'ADD_OFFER_TOPIC';
export const ADD_OFFER_TEXT = 'ADD_OFFER_TEXT';
export const ADD_OFFER_SYSTEM = 'ADD_OFFER_SYSTEM';
export const ADD_OFFER_PUBLICITY = 'ADD_OFFER_PUBLICITY';
export const ADD_OFFER_BUTTON_SEND = 'ADD_OFFER_BUTTON_SEND';

export const setAddOfferTopic = addOfferTopic => ({
  type: ADD_OFFER_TOPIC,
  payload: addOfferTopic
});

export const setAddOfferText = addOfferText => ({
  type: ADD_OFFER_TEXT,
  payload: addOfferText
});

export const setAddOfferSystem = addOfferSystem => ({
  type: ADD_OFFER_SYSTEM,
  payload: addOfferSystem
});

export const setAddOfferPublicity = addOfferPublicity => ({
  type: ADD_OFFER_PUBLICITY,
  payload: addOfferPublicity
});

export const setAddOfferButtonSendIsDisabled = isDisabled => ({
  type: ADD_OFFER_BUTTON_SEND,
  payload: isDisabled
});
