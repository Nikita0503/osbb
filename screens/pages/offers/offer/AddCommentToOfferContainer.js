import React from 'react';
import { connect } from 'react-redux';
import { setAddCommentToOffer, setIsDisabledButtonSendChange } from '../../../../store/pages/offers/addCommentToOffer/actions';
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
        isDisabledButtonSend={this.props.isDisabledButtonSend}
        setAddCommentToOffer={this.props.setAddCommentToOffer}
        selectedOfferData={this.props.selectedOfferData}
        setIsDisabledButtonSendChange={this.props.setIsDisabledButtonSendChange}
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
    isDisabledButtonSend: state.addCommentToOffer.isDisabledButtonSend
  };
};

const mapDispatchToProps = {
  setAddCommentToOffer: setAddCommentToOffer,
  setIsDisabledButtonSendChange: setIsDisabledButtonSendChange
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentToOfferContainer);
