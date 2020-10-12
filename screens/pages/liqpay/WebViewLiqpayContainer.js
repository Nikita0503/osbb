import React from 'react';
import { connect } from 'react-redux';
import {setLoading, 
    setData, 
    setSignature, 
    sendPaymentRequest} from '../../../store/pages/liqpay/webview/actions';
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
        loading={this.props.loading}
        data={this.props.data}
        signature={this.props.signature}
        userData={this.props.userData}
        selectedChargeContribution={this.props.selectedChargeContribution}
        selectedChargeValue={this.props.selectedChargeValue}
        setLoading={this.props.setLoading}
        setData={this.props.setData}
        setSignature={this.props.setSignature}
        sendPaymentRequest={this.props.sendPaymentRequest}
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
    selectedChargeValue: state.paymentSelection.selectedChargeValue,
    loading: state.webView.loading,
    data: state.webView.data,
    signature: state.webView.signature,
    userData: state.apartment.userData
  };
};

const mapDispatchToProps = {
  setLoading,
  setData,
  setSignature,
  sendPaymentRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WebViewLiqpayContainer);
