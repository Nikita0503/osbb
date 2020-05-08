import React from 'react';
import { connect } from 'react-redux';
import {setAllHouseData, setAllHouseCostsData } from '../../../../store/pages/home/myHouse/house/actions';
import {setExpensesGeneralData, setExpensesFilesData } from '../../../../store/pages/home/myHouse/houseExpenses/actions';
import ScreenMyHouse from './ScreenMyHouse';

class MyHouseContainer extends React.Component {
  render() {
    return (
      <ScreenMyHouse
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        allHouseData={this.props.allHouseData}
        allHouseCostsData={this.props.allHouseCostsData}
        setAllHouseData={this.props.setAllHouseData}
        setAllHouseCostsData={this.props.setAllHouseCostsData}
        setExpensesGeneralData={this.props.setExpensesGeneralData}
        setExpensesFilesData={this.props.setExpensesFilesData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    workPeriods: state.apartment.workPeriods,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    allHouseData: state.house.allHouseData,
    allHouseCostsData: state.house.allHouseCostsData
  };
};

const mapDispatchToProps = {
  setAllHouseData: setAllHouseData,
  setAllHouseCostsData: setAllHouseCostsData,
  setExpensesGeneralData: setExpensesGeneralData,
  setExpensesFilesData: setExpensesFilesData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyHouseContainer);