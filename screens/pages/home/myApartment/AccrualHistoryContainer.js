import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentAccrualsData,
  setSelectedAccrualsData
} from '../../../../store/pages/home/myApartment/accrualHistory/actions';
import ScreenAccrualHistory from './ScreenAccrualHistory';

class AccrualHistoryContainer extends React.Component {
  render() {
    return (
      <ScreenAccrualHistory
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        accrualHistoryCurrentData={this.props.accrualHistoryCurrentData}
        accrualHistoryCurrentSelectedData={this.props.accrualHistoryCurrentSelectedData}
        setCurrentAccrualsData={this.props.setCurrentAccrualsData}
        setSelectedAccrualsData={this.props.setSelectedAccrualsData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    isSelected: state.accrualHistory.isSelected,
    accrualHistoryCurrentData: state.accrualHistory.accrualHistoryCurrentData,
    accrualHistoryCurrentSelectedData: state.accrualHistory.accrualHistoryCurrentSelectedData
  };
};

const mapDispatchToProps = {
  setCurrentAccrualsData: setCurrentAccrualsData,
  setSelectedAccrualsData: setSelectedAccrualsData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccrualHistoryContainer);
