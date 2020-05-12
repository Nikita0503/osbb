
export const ADD_COMMENT_TO_ADVERTISEMENT_TEXT = 'ADD_COMMENT_TO_ADVERTISEMENT_TEXT';
export const ADD_COMMENT_TO_ADVERTISEMENT_BUTTON_SEND = 'ADD_COMMENT_TO_ADVERTISEMENT_BUTTON_SEND';

export const setAddCommentToAdvertisementText = text => ({
  type: ADD_COMMENT_TO_ADVERTISEMENT_TEXT,
  payload: text
});

export const setAddCommentToAdvertisementButtonSend = isDisabled => ({
  type: ADD_COMMENT_TO_ADVERTISEMENT_BUTTON_SEND,
  payload: isDisabled
})
