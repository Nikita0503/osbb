import React from 'react';
import { connect } from 'react-redux';
import {setExpensesData, setExpensesSelectedFile } from '../../../../store/pages/home/myHouse/houseExpenses/actions';
import ScreenHouseExpenses from './ScreenHouseExpenses';

class HouseExpensesContainer extends React.Component {
  render() {
    return (
      <ScreenHouseExpenses
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        expensesGeneralData={this.props.expensesGeneralData}
        expensesData={this.props.expensesData}
        expensesFilesData={this.props.expensesFilesData}
        expensesSelectedFile={this.props.expensesSelectedFile}
        setExpensesData={this.props.setExpensesData}
        setExpensesSelectedFile={this.props.setExpensesSelectedFile}
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
    expensesGeneralData: state.houseExpenses.expensesGeneralData,
    expensesData: state.houseExpenses.expensesData,
    expensesFilesData: state.houseExpenses.expensesFilesData,
    expensesSelectedFile: state.houseExpenses.expensesSelectedFile,
  };
};

const mapDispatchToProps = {
  setExpensesData: setExpensesData,
  setExpensesSelectedFile: setExpensesSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseExpensesContainer);