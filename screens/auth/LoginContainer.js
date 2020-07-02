import React from 'react';
import {connect} from 'react-redux';
import {setToken, setTokenDeviceId, setEmail, setPassword, setShowPassword} from '../../store/auth/actions'
import ScreenLogin from './ScreenLogin';

class LoginContainer extends React.Component {
  render(){
    return (
    <ScreenLogin 
      navigation={this.props.navigation}
      token={this.props.token} 
      tokenDeviceId={this.props.tokenDeviceId}
      email={this.props.email}
      password={this.props.password}
      shownPassword={this.props.shownPassword}
      setToken={this.props.setToken} 
      setTokenDeviceId={this.props.setTokenDeviceId}
      setEmail={this.props.setEmail}
      setPassword={this.props.setPassword}
      setShowPassword={this.props.setShowPassword} />)
  }
}

const mapStateToProps = state => {
  return{
    token: state.auth.token,
    tokenDeviceId: state.auth.tokenDeviceId,
    email: state.auth.email,
    password: state.auth.password,
    shownPassword: state.auth.shownPassword
  };
}

const mapDispatchToProps = {
  setToken: setToken,
  setTokenDeviceId: setTokenDeviceId,
  setEmail: setEmail,
  setPassword: setPassword,
  setShowPassword: setShowPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);