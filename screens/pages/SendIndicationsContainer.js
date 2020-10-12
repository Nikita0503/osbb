import React from 'react';
import { connect } from 'react-redux';
import {
  setIndicationText,
  setIndicationsCounters,
  updateIndicationsCounters,
  setSelectedCounter,
  fetchSendIndicationsCounters,
  editIndications
} from '../../store/pages/sendIndications/actions';
import ScreenSendIndications from './ScreenSendIndications';

class SendIndicationsContainer extends React.Component {
  render() {
    return (
      <ScreenSendIndications
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        indicationText={this.props.indicationText}
        indicationsCounters={this.props.indicationsCounters}
        selectedCounter={this.props.selectedCounter}
        setIndicationText={this.props.setIndicationText}
        setIndicationsCounters={this.props.setIndicationsCounters}
        updateIndicationsCounters={this.props.updateIndicationsCounters}
        setSelectedCounter={this.props.setSelectedCounter}
        fetchSendIndicationsCounters={this.props.fetchSendIndicationsCounters}
        editIndications={this.props.editIndications}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    accountIds: state.apartment.accountIds,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    workPeriods: state.apartment.workPeriods,
    indicationText: state.sendIndications.indicationText,
    indicationsCounters: state.sendIndications.sendIndicationsCounters,
    selectedCounter: state.sendIndications.selectedCounter
  };
};

const mapDispatchToProps = {
  setIndicationText,
  setIndicationsCounters,
  updateIndicationsCounters,
  setSelectedCounter,
  fetchSendIndicationsCounters,
  editIndications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendIndicationsContainer);
