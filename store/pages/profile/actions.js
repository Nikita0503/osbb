export const PROFILE_CHANGE_SHOW_PASSWORDS = 'PROFILE_CHANGE_SHOW_PASSWORDS';
export const PROFILE_CHANGE_OLD_PASSWORD = 'PROFILE_CHANGE_OLD_PASSWORD';
export const PROFILE_CHANGE_NEW_PASSWORD = 'PROFILE_CHANGE_NEW_PASSWORD';
export const PROFILE_CHANGE_NEW_REPEAT_PASSWORD = 'PROFILE_CHANGE_NEW_REPEAT_PASSWORD';
export const PROFILE_CHANGE_IMAGE_AVATAR = 'PROFILE_CHANGE_IMAGE_AVATAR';
export const PROFILE_CHANGE_PHONE_NUMBER = 'PROFILE_CHANGE_PHONE_NUMBER';

export const setShowPasswords = showPasswords => ({
  type: PROFILE_CHANGE_SHOW_PASSWORDS,
  payload: showPasswords
});

export const setOldPassword = oldPassword => ({
  type: PROFILE_CHANGE_OLD_PASSWORD,
  payload: oldPassword
});

export const setNewPassword = newPassword => ({
  type: PROFILE_CHANGE_NEW_PASSWORD,
  payload: newPassword
});

export const setNewRepeatPassword = newRepeatPassword => ({
  type: PROFILE_CHANGE_NEW_REPEAT_PASSWORD,
  payload: newRepeatPassword
});

export const setAvatarImage = imageAvatar => ({
  type: PROFILE_CHANGE_IMAGE_AVATAR,
  payload: imageAvatar
});

export const setPhoneNumber = phoneNumber => ({
  type: PROFILE_CHANGE_PHONE_NUMBER,
  payload: phoneNumber
});