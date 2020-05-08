export const ADVERTISEMENT_OSBB_NAME = 'ADVERTISEMENT_OSBB_NAME';
export const ADVERTISEMENT_DATA = 'ADVERTISEMENT_DATA';
export const ADVERTISEMENT_SELECTED_POST = 'ADVERTISEMENT_SELECTED_POST';
export const ADVERTISEMENT_SELECTED_POST_COMMENTS = 'ADVERTISEMENT_SELECTED_POST_COMMENTS';
export const ADVERTISEMENT_ALL_COMMENTS = 'ADVERTISEMENT_ALL_COMMENTS';
export const ADVERTISEMENT_ALL_COMMENTS_CLEAR = 'ADVERTISEMENT_ALL_COMMENTS_CLEAR';
export const ADVERTISEMENT_SELECTED_FILE = 'ADVERTISEMENT_SELECTED_FILE';

export const setAdvertisementOsbbName = advertisementOsbbName => ({
  type: ADVERTISEMENT_OSBB_NAME,
  payload: advertisementOsbbName
});

export const setAdvertisementData = advertisementData => ({
  type: ADVERTISEMENT_DATA,
  payload: advertisementData
});

export const setSelectedPost = selectedPost => ({
  type: ADVERTISEMENT_SELECTED_POST,
  payload: selectedPost
});

export const setSelectedPostComments = selectedPost => ({
  type: ADVERTISEMENT_SELECTED_POST_COMMENTS,
  payload: selectedPost
});

export const setAllComments = allComments => ({
  type: ADVERTISEMENT_ALL_COMMENTS,
  payload: allComments
});

export const setAllCommentsClear = allComments => ({
  type: ADVERTISEMENT_ALL_COMMENTS_CLEAR,
  payload: allComments
});

export const setAdvertisementSelectedFile = selectedFile => ({
  type: ADVERTISEMENT_SELECTED_FILE,
  payload: selectedFile
});