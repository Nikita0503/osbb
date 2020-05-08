import React from 'react';
import { connect } from 'react-redux';
import {setFromMonth, setFromYear, setToMonth, setToYear, setSelectedData, setFromMonths, setToMonths, setShowLoading } from '../../../store/pages/home/actOfReconciliation/actions';
import ScreenActOfReconciliation from './ScreenActOfReconciliation';

class ActOfReconciliationContainer extends React.Component {
  render() {
    return (
      <ScreenActOfReconciliation
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        fromMonth={this.props.fromMonth}
        fromYear={this.props.fromYear}
        toMonth={this.props.toMonth}
        toYear={this.props.toYear}
        fromMonths={this.props.toMonths}
        toMonths={this.props.toMonths}
        selectedData={this.props.selectedData}
        showLoading={this.props.showLoading}
        setFromMonth={this.props.setFromMonth}
        setFromYear={this.props.setFromYear}
        setToMonth={this.props.setToMonth}
        setToYear={this.props.setToYear}
        setSelectedData={this.props.setSelectedData}
        setFromMonths={this.props.setFromMonths}
        setToMonths={this.props.setToMonths}
        setShowLoading={this.props.setShowLoading}
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
    fromMonth: state.actOfReconciliation.fromMonth,
    fromYear: state.actOfReconciliation.fromYear,
    toMonth: state.actOfReconciliation.toMonth,
    toYear: state.actOfReconciliation.toYear,
    selectedData: state.actOfReconciliation.selectedData,
    fromMonths: state.actOfReconciliation.fromMonths,
    toMonths: state.actOfReconciliation.toMonths,
    showLoading: state.actOfReconciliation.showLoading,
  };
};

const mapDispatchToProps = {
  setFromMonth: setFromMonth,
  setFromYear: setFromYear,
  setToMonth: setToMonth,
  setToYear: setToYear,
  setSelectedData: setSelectedData,
  setFromMonths: setFromMonths,
  setToMonths: setToMonths,
  setShowLoading: setShowLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActOfReconciliationContainer);
