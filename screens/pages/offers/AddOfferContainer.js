import React from 'react';
import { connect } from 'react-redux';
import { setAddOfferTopic,
         setAddOfferText, 
         setAddOfferSystem, 
         setAddOfferPublicity, 
         setAddOfferButtonSendIsDisabled,
         addOffer } from '../../../store/pages/offers/addOffer/actions';
import ScreenAddOffer from './ScreenAddOffer';

class AddOfferContainer extends React.Component {
  render() {
    return (
      <ScreenAddOffer
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        addOfferTopic={this.props.addOfferTopic}
        addOfferText={this.props.addOfferText}
        addOfferSystem={this.props.addOfferSystem}
        addOfferPublicity={this.props.addOfferPublicity}
        addOfferIsDisabled={this.props.addOfferIsDisabled}
        setAddOfferTopic={this.props.setAddOfferTopic}
        setAddOfferText={this.props.setAddOfferText}
        setAddOfferSystem={this.props.setAddOfferSystem}
        setAddOfferPublicity={this.props.setAddOfferPublicity}
        setAddOfferButtonSendIsDisabled={this.props.setAddOfferButtonSendIsDisabled}
        addOffer={this.props.addOffer}
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
    addOfferTopic: state.addOffer.addOfferTopic,
    addOfferText: state.addOffer.addOfferText,
    addOfferSystem: state.addOffer.addOfferSystem,
    addOfferPublicity: state.addOffer.addOfferPublicity,
    addOfferIsDisabled: state.addOffer.addOfferIsDisabled
  };
};

const mapDispatchToProps = {
  setAddOfferTopic,
  setAddOfferText,
  setAddOfferSystem,
  setAddOfferPublicity,
  setAddOfferButtonSendIsDisabled,
  addOffer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOfferContainer);
