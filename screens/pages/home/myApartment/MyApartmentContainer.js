import React from 'react';
import { connect } from 'react-redux';
import {
  setUserData,
  setOsbbId,
  setAccountId,
  setAccountIds,
  setWorkPeriods,
  setAllApartmentData,
  setNumber,
  setCurrentApartmentData,
  setAllCostsData,
  setCurrentCostsData,
  setDebtData,
  setLiqpayData,
  setIsActivated
} from '../../../../store/pages/home/myApartment/apartment/actions';
import { setCurrentWorkPeriod } from '../../../../store/pages/home/monthPicker/actions';
import ScreenMyApartment from './ScreenMyApartment';

class MyApartmentContainer extends React.Component {
  render() {
    return (
      <ScreenMyApartment
        navigation={this.props.navigation}
        token={this.props.token}
        userData={this.props.userData}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        allApartmentData={this.props.allApartmentData}
        currentApartmentData={this.props.currentApartmentData}
        allCostsData={this.props.allCostsData}
        currentCostsData={this.props.currentCostsData}
        debtData={this.props.debtData}
        liqpayData={this.props.liqpayData}
        isActivated={this.props.isActivated}
        setUserData={this.props.setUserData}
        setOsbbId={this.props.setOsbbId}
        setAccountId={this.props.setAccountId}
        setAccountIds={this.props.setAccountIds}
        setNumber={this.props.setNumber}
        setWorkPeriods={this.props.setWorkPeriods}
        setCurrentWorkPeriod={this.props.setCurrentWorkPeriod}
        setAllApartmentData={this.props.setAllApartmentData}
        setCurrentApartmentData={this.props.setCurrentApartmentData}
        setAllCostsData={this.props.setAllCostsData}
        setCurrentCostsData={this.props.setCurrentCostsData}
        setDebtData={this.props.setDebtData}
        setLiqpayData={this.props.setLiqpayData}
        setIsActivated={this.props.setIsActivated}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userData: state.apartment.userData,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    accountIds: state.apartment.accountIds,
    workPeriods: state.apartment.workPeriods,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    allApartmentData: state.apartment.allApartmentData,
    currentApartmentData: state.apartment.currentApartmentData,
    allCostsData: state.apartment.allCostsData,
    currentCostsData: state.apartment.currentCostsData,
    debtData: state.apartment.debtData,
    liqpayData: state.apartment.liqpayData,
    isActivated: state.apartment.isActivated
  };
};

const mapDispatchToProps = {
  setUserData: setUserData,
  setOsbbId: setOsbbId,
  setAccountId: setAccountId,
  setAccountIds: setAccountIds,
  setNumber: setNumber,
  setWorkPeriods: setWorkPeriods,
  setCurrentWorkPeriod: setCurrentWorkPeriod,
  setAllApartmentData: setAllApartmentData,
  setCurrentApartmentData: setCurrentApartmentData,
  setAllCostsData: setAllCostsData,
  setCurrentCostsData: setCurrentCostsData,
  setDebtData: setDebtData,
  setLiqpayData: setLiqpayData,
  setIsActivated: setIsActivated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApartmentContainer);
