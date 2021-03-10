export const PROFILE_CHANGE_SHOW_PASSWORDS = "PROFILE_CHANGE_SHOW_PASSWORDS";
export const PROFILE_CHANGE_OLD_PASSWORD = "PROFILE_CHANGE_OLD_PASSWORD";
export const PROFILE_CHANGE_NEW_PASSWORD = "PROFILE_CHANGE_NEW_PASSWORD";
export const PROFILE_CHANGE_NEW_REPEAT_PASSWORD =
  "PROFILE_CHANGE_NEW_REPEAT_PASSWORD";
export const PROFILE_CHANGE_IMAGE_AVATAR = "PROFILE_CHANGE_IMAGE_AVATAR";
export const PROFILE_CHANGE_PHONE_NUMBER = "PROFILE_CHANGE_PHONE_NUMBER";

export const setShowPasswords = (showPasswords) => ({
  type: PROFILE_CHANGE_SHOW_PASSWORDS,
  payload: showPasswords,
});

export const setOldPassword = (oldPassword) => ({
  type: PROFILE_CHANGE_OLD_PASSWORD,
  payload: oldPassword,
});

export const setNewPassword = (newPassword) => ({
  type: PROFILE_CHANGE_NEW_PASSWORD,
  payload: newPassword,
});

export const setNewRepeatPassword = (newRepeatPassword) => ({
  type: PROFILE_CHANGE_NEW_REPEAT_PASSWORD,
  payload: newRepeatPassword,
});

export const setAvatarImage = (imageAvatar) => ({
  type: PROFILE_CHANGE_IMAGE_AVATAR,
  payload: imageAvatar,
});

export const setPhoneNumber = (phoneNumber) => ({
  type: PROFILE_CHANGE_PHONE_NUMBER,
  payload: phoneNumber,
});

export const sendNewPhoto = (
  formdata,
  accountId,
  osbbId,
  workPeriods,
  token
) => {
  return async (dispatch) => {
    try {
      const newPhotoPromise = await fetch(
        "https://app.osbb365.com/api/upload/photo?accountId=" +
          accountId +
          "&osbbId=" +
          osbbId +
          "&type=photo&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          method: "post",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
          body: formdata,
        }
      );
      const newPhotoAnswer = await newPhotoPromise.json();
      if (newPhotoAnswer.filename == null) {
        Alert.alert(
          "Помилка",
          newPhotoAnswer.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        return;
      }
      var details = {
        photo: newPhotoAnswer.filename,
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      const changePhotoPromise = await fetch(
        "https://app.osbb365.com/api/user/me",
        {
          method: "put",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
        }
      );
      dispatch(setAvatarImage(newPhotoAnswer.filename));
    } catch (error) {
      console.log("sendNewPhoto", "error");
    }
  };
};

export const deletePhoto = (accountIds, osbbId, workPeriods, token) => {
  return async (dispatch) => {
    try {
      const photoPromise = await fetch(
        "https://app.osbb365.com/api/user/me/photo?accountId=" +
          accountIds[0].id +
          "&osbbId=" +
          osbbId +
          "&workPeriod=" +
          workPeriods[workPeriods.length - 1],
        {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
        }
      );
      await photoPromise;
      dispatch(setAvatarImage("deleted"));
    } catch (error) {
      console.log("deletePhoto", "error");
    }
  };
};

export const sendNewPassword = (
  oldPassword,
  newPassword,
  newRepeatPassword,
  token
) => {
  return async (dispatch) => {
    try {
      const newPasswordPromise = await fetch(
        "https://app.osbb365.com/api/user/me/password",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token + "",
          },
          body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: newRepeatPassword,
          }),
        }
      );
      const newPasswordAnswer = await newPasswordPromise.json();
      Alert.alert(
        "Пароль",
        newPasswordAnswer.message + "",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        "Пароль",
        "Пароль успішно змінено",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      dispatch(setOldPassword(""));
      dispatch(setNewPassword(""));
      dispatch(setNewRepeatPassword(""));
      console.error(error);
    }
  };
};
