import { Alert } from 'react-native';
export const AUTH_CHANGE_TOKEN = 'AUTH_CHANGE_TOKEN';
export const AUTH_CHANGE_TOKEN_DEVICE_ID = 'AUTH_CHANGE_TOKEN_DEVICE_ID';
export const AUTH_CHANGE_IS_SCANNED = 'AUTH_CHANGE_IS_SCANNED';
export const AUTH_CHANGE_HAS_CAMERA_PERMISSION = 'AUTH_CHANGE_HAS_CAMERA_PERMISSION';
export const AUTH_CHANGE_EMAIL = 'AUTH_CHANGE_EMAIL';
export const AUTH_CHANGE_PASSWORD = 'AUTH_CHANGE_PASSWORD';
export const AUTH_CHANGE_SHOW_PASSWORD = 'AUTH_CHANGE_SHOW_PASSWORD';
export const AUTH_CHANGE_AUTH_METHOD = 'AUTH_CHANGE_AUTH_METHOD';
const AUTH_METHOD_LOGIN = 0;
const AUTH_METHOD_QRCODE = 1;

export const setToken = token => ({
  type: AUTH_CHANGE_TOKEN,
  payload: token
});

export const setTokenDeviceId = tokenDeviceId => ({
  type: AUTH_CHANGE_TOKEN_DEVICE_ID,
  payload: tokenDeviceId
});

export const setIsScanned = isScanned => ({
  type: AUTH_CHANGE_IS_SCANNED,
  payload: isScanned
});

export const setHasCameraPermission = hasCameraPermission => ({
  type: AUTH_CHANGE_HAS_CAMERA_PERMISSION,
  payload: hasCameraPermission
});

export const setEmail = email => ({
  type: AUTH_CHANGE_EMAIL,
  payload: email
});

export const setPassword = password => ({
  type: AUTH_CHANGE_PASSWORD,
  payload: password
});

export const setShowPassword = () => ({
  type: AUTH_CHANGE_SHOW_PASSWORD,
  password: true
});

export const setAuthMethod = authMethod => ({
  type: AUTH_CHANGE_AUTH_METHOD,
  payload: authMethod 
});

export const fetchTokenByEmailPassword = (email, password, navigation) => {
  return async dispatch => {
      try{
          const tokenPromise = await fetch('https://app.osbb365.com/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: email.toLowerCase().trim(),
              password: password
            }),
          })
          const responseJson = await tokenPromise.json();
          if(responseJson.token == null){
            Alert.alert("Невірний пароль")
            return
          }
          dispatch(setAuthMethod(AUTH_METHOD_LOGIN))
          dispatch(setToken(responseJson.token));
          navigation.navigate('App');
      } catch (error) {
          console.log("fetchTokenByEmailPassword", "error")
      }
  }
}

export const signUpDevice = (token, navigation) => {
  return async dispatch => {
    try{
        const tokenPromise = await fetch('https://app.osbb365.com/register/tenant/mobile', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token: token,
              id: Expo.Constants.installationId,
            }),
        });
        const json = await tokenPromise.json();
        console.log("signUp", json.message + ". Прістрій вже зареєстрований.");
    } catch (error) {
        if(error.message == 'JSON Parse error: Unrecognized token \'<\''){
            dispatch(setTokenDeviceId(''));
            Alert.alert(
              'Невірний токен',
              "Спробуйте ще раз",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
        } else if(error.message == 'JSON Parse error: Unexpected identifier "OK"'){
            Alert.alert(
              'Успішно зареєстровано',
              "Активуйте ваш пристрій у особистому кабінеті (розділ 'Мобільні додатки')",
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
            navigation.goBack();
        }
    }
  }
}

export const signInDevice = (token, navigation) => {
  return async dispatch => {
    try{
      const tokenPromise = await fetch('https://app.osbb365.com/login/tenant/mobile', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          id: Expo.Constants.installationId
        }),
      });
      const json = await tokenPromise.json();
      if(json.token == null){
        if(json.message == 'Пристрій заблокований'){
          Alert.alert(
            'Пристрій заблокований',
            "Активуйте ваш пристрій у особистому кабінеті (розділ 'Мобільні додатки')",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
          )
        }
      }else{
        dispatch(setAuthMethod(AUTH_METHOD_QRCODE))
        dispatch(setToken(json.token));
        navigation.navigate('App');
      }
    } catch (error) {
      console.log("signInDevice", error)
    }
  }
}