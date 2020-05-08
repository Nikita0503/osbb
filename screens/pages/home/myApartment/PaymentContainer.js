import React from 'react';
import { connect } from 'react-redux';
import {
  setCurrentPaymentsData
} from '../../../../store/pages/home/myApartment/payments/actions';
import ScreenPayment from './ScreenPayment';

class PaymentContainer extends React.Component {
  render() {
    return (
      <ScreenPayment
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        currentWorkPeriod={this.props.currentWorkPeriod}
        currentPaymentsData={this.props.currentPaymentsData}
        setCurrentPaymentsData={this.props.setCurrentPaymentsData}
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
    currentPaymentsData: state.payments.currentPaymentsData,
  };
};

const mapDispatchToProps = {
  setCurrentPaymentsData: setCurrentPaymentsData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentContainer);
