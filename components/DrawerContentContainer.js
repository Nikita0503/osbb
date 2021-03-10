import React from "react";
import { connect } from "react-redux";

import DrawerContentComponents from "./DrawerContentComponents";

class DrawerContentContainer extends React.Component {
  render() {
    return (
      <DrawerContentComponents
        navigation={this.props.navigation}
        userData={this.props.userData}
        activeItemKey={this.props.activeItemKey}
        imageAvatar={this.props.imageAvatar}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.apartment.userData,
    imageAvatar: state.profile.imageAvatar,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContentContainer);
