import React from 'react';
import { connect } from 'react-redux';
import { setAddOfferTopic, setAddOfferText, setAddOfferSystem, setAddOfferPublicity } from '../../../store/pages/offers/addOffer/actions';
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
        setAddOfferTopic={this.props.setAddOfferTopic}
        setAddOfferText={this.props.setAddOfferText}
        setAddOfferSystem={this.props.setAddOfferSystem}
        setAddOfferPublicity={this.props.setAddOfferPublicity}
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
    addOfferPublicity: state.addOffer.addOfferPublicity
  };
};

const mapDispatchToProps = {
  setAddOfferTopic: setAddOfferTopic,
  setAddOfferText: setAddOfferText,
  setAddOfferSystem: setAddOfferSystem,
  setAddOfferPublicity: setAddOfferPublicity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOfferContainer);
