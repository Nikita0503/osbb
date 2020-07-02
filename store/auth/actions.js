export const AUTH_CHANGE_TOKEN = 'AUTH_CHANGE_TOKEN';
export const AUTH_CHANGE_TOKEN_DEVICE_ID = 'AUTH_CHANGE_TOKEN_DEVICE_ID';
export const AUTH_CHANGE_IS_SCANNED = 'AUTH_CHANGE_IS_SCANNED';
export const AUTH_CHANGE_HAS_CAMERA_PERMISSION = 'AUTH_CHANGE_HAS_CAMERA_PERMISSION';
export const AUTH_CHANGE_EMAIL = 'AUTH_CHANGE_EMAIL';
export const AUTH_CHANGE_PASSWORD = 'AUTH_CHANGE_PASSWORD';
export const AUTH_CHANGE_SHOW_PASSWORD = 'AUTH_CHANGE_SHOW_PASSWORD';

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