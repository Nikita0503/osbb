import React from 'react';
import { connect } from 'react-redux';
import { setAddCommentToOffer } from '../../../../store/pages/offers/addCommentToOffer/actions';
import ScreenAddCommentToOffer from './ScreenAddCommentToOffer';

class AddCommentToOfferContainer extends React.Component {
  render() {
    return (
      <ScreenAddCommentToOffer
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        addCommentToOfferComment={this.props.addCommentToOfferComment}
        setAddCommentToOffer={this.props.setAddCommentToOffer}
        selectedOfferData={this.props.selectedOfferData}
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
    addCommentToOfferComment: state.addCommentToOffer.addCommentToOfferComment,
    selectedOfferData: state.applicationsAndOffers.selectedOfferData,
  };
};

const mapDispatchToProps = {
  setAddCommentToOffer: setAddCommentToOffer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentToOfferContainer);
