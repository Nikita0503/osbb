import React from 'react';
import { connect } from 'react-redux';
import ScreenLoading from './ScreenLoading';
import {
  setIsActivated
} from '../../store/pages/home/myApartment/apartment/actions';

class LoadingContainer extends React.Component {
  render() {
    return (
      <ScreenLoading
        navigation={this.props.navigation}
        token={this.props.token}
        workPeriods={this.props.workPeriods}
        allApartmentData={this.props.allApartmentData}
        currentWorkPeriod={this.props.currentWorkPeriod}
        isActivated={this.props.isActivated}
        setIsActivated={this.props.setIsActivated}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    workPeriods: state.apartment.workPeriods,
    allApartmentData: state.apartment.allApartmentData,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    isActivated: state.apartment.isActivated
  };
};

const mapDispatchToProps = {
  setIsActivated: setIsActivated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingContainer);
