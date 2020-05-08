export const SELECTED_OFFER_COMMNETS = 'SELECTED_OFFER_COMMNETS';
export const SELECTED_OFFER_SELECTED_FILE = 'SELECTED_OFFER_SELECTED_FILE';

export const setSelectedOfferComments = comments => ({
  type: SELECTED_OFFER_COMMNETS,
  payload: comments
});

export const setSelectedFile = file => ({
  type: SELECTED_OFFER_SELECTED_FILE,
  payload: file
})