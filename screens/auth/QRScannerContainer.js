import React from "react";
import { connect } from "react-redux";
import {
  setTokenDeviceId,
  setIsScanned,
  setHasCameraPermission,
  signUpDevice,
} from "../../store/auth/actions";
import ScreenQRScanner from "./ScreenQRScanner";

class QRScannerContainer extends React.Component {
  render() {
    return (
      <ScreenQRScanner
        navigation={this.props.navigation}
        isScanned={this.props.isScanned}
        hasCameraPermission={this.props.hasCameraPermission}
        setTokenDeviceId={this.props.setTokenDeviceId}
        setIsScanned={this.props.setIsScanned}
        setHasCameraPermission={this.props.setHasCameraPermission}
        signUpDevice={this.props.signUpDevice}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isScanned: state.auth.isScanned,
    hasCameraPermission: state.auth.hasCameraPermission,
  };
};

const mapDispatchToProps = {
  setTokenDeviceId,
  setIsScanned,
  setHasCameraPermission,
  signUpDevice,
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScannerContainer);
