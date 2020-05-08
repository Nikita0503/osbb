import React from 'react';
import { connect } from 'react-redux';
import { setCurrentWorkPeriod } from '../store/pages/home/monthPicker/actions';
import {
  setCurrentApartmentData,
  setCurrentCostsData,
  setAccountId
} from '../store/pages/home/myApartment/apartment/actions';
import MonthPicker from './MonthPicker';

class MonthPickerContainer extends React.Component {
  render() {
    return (
      <MonthPicker
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        workPeriods={this.props.workPeriods}
        currentWorkPeriod={this.props.currentWorkPeriod}
        allApartmentData={this.props.allApartmentData}
        currentApartmentData={this.props.currentApartmentData}
        allCostsData={this.props.allCostsData}
        setCurrentWorkPeriod={this.props.setCurrentWorkPeriod}
        setCurrentCostsData={this.props.setCurrentCostsData}
        setAccountId={this.props.setAccountId}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    accountId: state.apartment.accountId,
    accountIds: state.apartment.accountIds,
    workPeriods: state.apartment.workPeriods,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    allApartmentData: state.apartment.allApartmentData,
    currentApartmentData: state.apartment.currentApartmentData,
    allCostsData: state.apartment.allCostsData,
  };
};

const mapDispatchToProps = {
  setCurrentWorkPeriod: setCurrentWorkPeriod,
  setCurrentCostsData: setCurrentCostsData,
  setAccountId: setAccountId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MonthPickerContainer);
