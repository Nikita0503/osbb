import {AUTH_CHANGE_TOKEN, AUTH_CHANGE_TOKEN_DEVICE_ID, AUTH_CHANGE_IS_SCANNED, AUTH_CHANGE_HAS_CAMERA_PERMISSION, AUTH_CHANGE_EMAIL, AUTH_CHANGE_PASSWORD, AUTH_CHANGE_SHOW_PASSWORD} from "./actions";

const defaultState = {
  token: '',
  tokenDeviceId: '',
  isScanned: false,
  hasCameraPermission: null,
  email: null,
  password: null,
  shownPassword: false
}

export const authReducer = (state = defaultState, action) => {
 
  switch (action.type){
    case AUTH_CHANGE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case AUTH_CHANGE_TOKEN_DEVICE_ID:
      return {
        ...state,
        tokenDeviceId: action.payload
      }
    case AUTH_CHANGE_IS_SCANNED:
      return {
        ...state,
        isScanned: action.payload
      }
    case AUTH_CHANGE_HAS_CAMERA_PERMISSION:
      return {
        ...state,
        hasCameraPermission: action.payload
      }
    case AUTH_CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case AUTH_CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case AUTH_CHANGE_SHOW_PASSWORD:
      return {
        ...state,
        shownPassword: !state.shownPassword
      }
  } 
  
  return state;
}