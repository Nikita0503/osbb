import * as React from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class ScreenQRScanner extends React.Component {
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.props.setHasCameraPermission(status === "granted");
  };

  render() {
    if (this.props.hasCameraPermission === null) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text>Запит на доступ до камери</Text>
        </View>
      );
    }
    if (this.props.hasCameraPermission === false) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Немає доступу до камери</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={
            this.props.isScanned ? undefined : this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
        {this.props.isScanned && (
          <Button
            title={"Натисність щоб сканувати ще раз"}
            onPress={() => {
              this.props.setIsScanned(false);
            }}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.props.setTokenDeviceId(data);
    this.props.setIsScanned(true);
    this.props.signUpDevice(data);
  };
}
