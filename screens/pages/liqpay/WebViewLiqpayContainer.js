import React from 'react';
import { connect } from 'react-redux';
import {setLiqpayData, setChargesData, setSelectedCharge, setSelectedChargeValue} from '../../../store/pages/liqpay/paymentSelection/actions';
import ScreenWebViewLiqpay from './ScreenWebViewLiqpay';

class WebViewLiqpayContainer extends React.Component {
  render() {
    return (
      <ScreenWebViewLiqpay
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods} 
        liqpayData={this.props.liqpayData}
        selectedChargeContribution={this.props.selectedChargeContribution}
        selectedChargeValue={this.props.selectedChargeValue}
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
    liqpayData: state.paymentSelection.liqpayData,
    selectedChargeContribution: state.paymentSelection.selectedChargeContribution,
    selectedChargeValue: state.paymentSelection.selectedChargeValue
  };
};

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewLiqpayContainer);
