import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScreenQRScanner extends React.Component {
  constructor(props){
    super(props);
    this.onTokenDeviceIdChange = this.onTokenDeviceIdChange.bind(this);
    this.onIsScannedChange = this.onIsScannedChange.bind(this);
    this.onHasCameraPermissionChange = this.onHasCameraPermissionChange.bind(this);
  }

  onTokenDeviceIdChange(tokenDeviceId){
    this.props.setTokenDeviceId(tokenDeviceId);
  }

  onIsScannedChange(isScanned){
    this.props.setIsScanned(isScanned);
  }

  onHasCameraPermissionChange(hasCameraPermission){
    this.props.setHasCameraPermission(hasCameraPermission);
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    //const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await Camera.requestPermissionsAsync();
    this.onHasCameraPermissionChange(status === 'granted');
    //this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    
    if (this.props.hasCameraPermission === null) {
      return <View style={{alignItems: 'center'}}><Text>Запит на доступ до камери</Text></View>;
    }
    if (this.props.hasCameraPermission === false) {
      return <View style={{alignItems: 'center'}}><Text style={{fontSize: 18}}>Немає доступу до камери</Text></View>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={this.props.isScanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {this.props.isScanned && (
          <Button title={'Натисність щоб сканувати ще раз'}  onPress={() => {this.onIsScannedChange(false);}} />
        )}
      </View>
    );
  }

  signInApplicaion(token){
    fetch('https://app.osbb365.com/login/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        id: Expo.Constants.installationId
        //token: 'f5573fd6e07c01f027dfe1c3d39b74ee', norm
        //token: 'e0dc8ed1e04dddeadf20f4e64134a81a', //empty
        //token: '77bad9fb781d61c745f968cd7950a0c4', //yul
        //token: '0e4b8b07dd0053b00d1939caf33c1a52',
        //id: 'bde288e9-ab6d-44b1-9fa8-43c256ee4806'
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if(json.token == null){
        //Alert.alert(json.message)
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
        //alert(json.token)
        //this.onTokenChange(json.token);
        //this.props.navigation.navigate('App');
        this.props.navigation.goBack()
      }
      
      //this.props.navigation.navigate('App');
    })
    .catch((error) => {
      Alert.alert("Неправильний токен. Спробуйте ще раз")
      console.error(error);
    });
  }

  singUpApplication(token){
    //Expo.Constants.installationId
    //var s = '26079c64-5dbe-42c4-84a9-8e3302c5a123'
    //console.log("123", s)
    fetch('https://app.osbb365.com/register/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        id: Expo.Constants.installationId,
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      //console.log(response)
      //alert(json.message)
      //setTimeout(()=>{}, 2000);
      console.log("signUp", json.message + ". Прістрій вже зареєстрований.");
      this.signInApplicaion(token)
      /*Alert.alert(
        json.message,
        "Телефон вже зареєстрований",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )*/
      //this.props.navigation.goBack();
      //this.signInApplicaion();
    })
    .catch((error) => {
      
      console.log(error.message);
      if(error.message == 'JSON Parse error: Unrecognized token \'<\''){
        this.onTokenDeviceIdChange('');
        Alert.alert(
          'Неправильний токен',
          "Спробуйте ще раз",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      }else if(error.message == 'JSON Parse error: Unexpected identifier "OK"'){
        Alert.alert(
          'Успішно зареєстровано',
          "Активуйте ваш пристрій у особистому кабінеті (розділ 'Мобільні додатки')",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
        this.props.navigation.goBack();
      }

    });;
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.onTokenDeviceIdChange(data);
    this.onIsScannedChange(true);
    this.singUpApplication(data);
    console.log(data);
    //Alert.alert(data)
    //alert(data);
  };
}