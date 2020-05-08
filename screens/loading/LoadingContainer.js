import React from 'react';
import { connect } from 'react-redux';
import ScreenLoading from './ScreenLoading';

class LoadingContainer extends React.Component {
  render() {
    return (
      <ScreenLoading
        navigation={this.props.navigation}
        token={this.props.token}
        workPeriods={this.props.workPeriods}
        allApartmentData={this.props.allApartmentData}
        currentWorkPeriod={this.props.currentWorkPeriod}
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
  };
};

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingContainer);
