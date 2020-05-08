import React from 'react';
import { connect } from 'react-redux';
import {
  setShowPasswords,
  setOldPassword,
  setNewPassword,
  setNewRepeatPassword,
  setAvatarImage
} from '../../store/pages/profile/actions';
import ScreenProfile from './ScreenProfile';

class ProfileContainer extends React.Component {
  render() {
    return (
      <ScreenProfile
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        showPasswords={this.props.showPasswords}
        oldPassword={this.props.oldPassword}
        newRepeatPassword={this.props.newRepeatPassword}
        newPassword={this.props.newPassword}
        userData={this.props.userData}
        imageAvatar={this.props.imageAvatar}
        setShowPasswords={this.props.setShowPasswords}
        setOldPassword={this.props.setOldPassword}
        setNewPassword={this.props.setNewPassword}
        setNewRepeatPassword={this.props.setNewRepeatPassword}
        setAvatarImage={this.props.setAvatarImage}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    accountIds: state.apartment.accountIds,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    workPeriods: state.apartment.workPeriods,
    showPasswords: state.profile.showPasswords,
    oldPassword: state.profile.oldPassword,
    newPassword: state.profile.newPassword,
    newRepeatPassword: state.profile.newRepeatPassword,
    userData: state.apartment.userData,
    imageAvatar: state.profile.imageAvatar
  };
};

const mapDispatchToProps = {
  setShowPasswords: setShowPasswords,
  setOldPassword: setOldPassword,
  setNewPassword: setNewPassword,
  setNewRepeatPassword: setNewRepeatPassword,
  setAvatarImage: setAvatarImage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
