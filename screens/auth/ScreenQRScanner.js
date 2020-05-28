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

  singUpApplication(token){
    //Expo.Constants.installationId
    fetch('https://app.osbb365.com/register/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        id: Expo.Constants.installationId
        //id: "19b612ac-3dcf-4436-96dc-c52",
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      //console.log(response)
      //alert(json.message)
      //setTimeout(()=>{}, 2000);
      console.log("signUp", json.message + ". Телефон вже зареєстрований.");
      
      Alert.alert(
        json.message,
        "Телефон вже зареєстрований",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      )
    
      //this.signInApplicaion();
    })
    .catch((error) => {
      
      console.log(error.message);
      if(error.message == 'JSON Parse error: Unrecognized token \'<\''){
        
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
          "Активуйте ваш телефон у особистому кабінеті (розділ 'Мобільні додатки')",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      }

    });;
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.onTokenDeviceIdChange(data);
    this.onIsScannedChange(true);
    this.singUpApplication(data)
    console.log(data);
    //Alert.alert(data)
    //alert(data);
  };
}