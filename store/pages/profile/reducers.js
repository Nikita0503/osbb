import {PROFILE_CHANGE_SHOW_PASSWORDS, PROFILE_CHANGE_OLD_PASSWORD, PROFILE_CHANGE_NEW_PASSWORD, PROFILE_CHANGE_NEW_REPEAT_PASSWORD, PROFILE_CHANGE_IMAGE_AVATAR} from "./actions";

const defaultState = {
  showPasswords: false,
  oldPassword: '',
  newPassword: '',
  newRepeatPassword: '',
  imageAvatar: null
}

export const profileReducer = (state = defaultState, action) => {

  switch (action.type){
    case PROFILE_CHANGE_SHOW_PASSWORDS:
      return {
        ...state,
        showPasswords: action.payload
      }
    case PROFILE_CHANGE_OLD_PASSWORD:
      return {
        ...state,
        oldPassword: action.payload
      }
    case PROFILE_CHANGE_NEW_PASSWORD:
      return {
        ...state,
        newPassword: action.payload
      } 
    case PROFILE_CHANGE_NEW_REPEAT_PASSWORD:
      return {
        ...state,
        newRepeatPassword: action.payload
      }
    case PROFILE_CHANGE_IMAGE_AVATAR:
      return {
        ...state,
        imageAvatar: action.payload
      }
  } 
  
  return state;
}