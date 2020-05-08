import React from 'react';
import { connect } from 'react-redux';
import { setSelectedOfferComments, setSelectedFile } from '../../../../store/pages/offers/selectedOffer/actions';
import ScreenOffer from './ScreenOffer';

class OfferContainer extends React.Component {
  render() {
    return (
      <ScreenOffer
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        currentWorkPeriod={this.props.currentWorkPeriod}
        selectedOfferData={this.props.selectedOfferData}
        selectedOfferComments={this.props.selectedOfferComments}
        offerSelectedFile={this.props.offerSelectedFile}
        setSelectedOfferComments={this.props.setSelectedOfferComments}
        setSelectedFile={this.props.setSelectedFile}
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
    selectedOfferData: state.applicationsAndOffers.selectedOfferData,
    selectedOfferComments: state.selectedOffer.selectedOfferComments,
    offerSelectedFile: state.selectedOffer.offerSelectedFile
  };
};

const mapDispatchToProps = {
  setSelectedOfferComments: setSelectedOfferComments,
  setSelectedFile: setSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferContainer);
