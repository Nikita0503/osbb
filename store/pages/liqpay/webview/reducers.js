import {
    WEBVIEW_LOADING,
    WEBVIEW_DATA,
    WEBVIEW_SIGNATURE
  } from './actions';
  
  const defaultState = {
    loading: null,
    data: null,
    signature: null
  };

  export const webViewReducer = (state = defaultState, action) => {
    switch (action.type) {
      case WEBVIEW_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case WEBVIEW_DATA:
        return {
          ...state,
          data: action.payload
        }
      case WEBVIEW_SIGNATURE:
        return {
          ...state,
          signature: action.payload
        }
    }
    return state;
  };