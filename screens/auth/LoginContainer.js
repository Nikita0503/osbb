import React from "react";
import { connect } from "react-redux";
import {
  setToken,
  setTokenDeviceId,
  setEmail,
  setPassword,
  setShowPassword,
  fetchTokenByEmailPassword,
  signInDevice,
  setAuthMethod,
} from "../../store/auth/actions";
import ScreenLogin from "./ScreenLogin";

class LoginContainer extends React.Component {
  render() {
    return (
      <ScreenLogin
        navigation={this.props.navigation}
        token={this.props.token}
        tokenDeviceId={this.props.tokenDeviceId}
        email={this.props.email}
        password={this.props.password}
        shownPassword={this.props.shownPassword}
        authMethod={this.props.authMethod}
        setToken={this.props.setToken}
        setTokenDeviceId={this.props.setTokenDeviceId}
        setEmail={this.props.setEmail}
        setPassword={this.props.setPassword}
        setShowPassword={this.props.setShowPassword}
        fetchTokenByEmailPassword={this.props.fetchTokenByEmailPassword}
        signInDevice={this.props.signInDevice}
        setAuthMethod={this.props.setAuthMethod}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    tokenDeviceId: state.auth.tokenDeviceId,
    email: state.auth.email,
    password: state.auth.password,
    shownPassword: state.auth.shownPassword,
    authMethod: state.auth.authMethod,
  };
};

const mapDispatchToProps = {
  setToken,
  setTokenDeviceId,
  setEmail,
  setPassword,
  setShowPassword,
  fetchTokenByEmailPassword,
  signInDevice,
  setAuthMethod,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
