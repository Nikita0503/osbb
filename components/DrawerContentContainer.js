import React from 'react';
import { connect } from 'react-redux';

import DrawerContentComponents from './DrawerContentComponents';

class DrawerContentContainer extends React.Component {
    render(){
        return(
            <DrawerContentComponents
                navigation={this.props.navigation}
                userData={this.props.userData}
                activeItemKey={this.props.activeItemKey}
            />);
    }
}

const mapStateToProps = state => {
    return {
        userData: state.apartment.userData,
    };
  };

  const mapDispatchToProps = {
    
  };

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DrawerContentContainer);
  
  