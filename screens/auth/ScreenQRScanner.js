import * as React from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
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
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.onHasCameraPermissionChange(status === 'granted');
    //this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    

    if (this.props.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.props.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.onTokenDeviceIdChange(data);
    this.onIsScannedChange(true);
    console.log(data);
    //Alert.alert(data)
    //alert(data);
  };
}