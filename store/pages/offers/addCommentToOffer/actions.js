export const ADD_COMMENT_TO_OFFER = 'ADD_COMMENT_TO_OFFER';
export const ADD_COMMENT_TO_OFFER_BUTTON_SEND = 'ADD_COMMENT_TO_OFFER_BUTTON_SEND';

export const setAddCommentToOffer = comment => ({
  type: ADD_COMMENT_TO_OFFER,
  payload: comment
});

export const setIsDisabledButtonSendChange = isDisabled => ({
  type: ADD_COMMENT_TO_OFFER_BUTTON_SEND,
  payload: isDisabled
});


