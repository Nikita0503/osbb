import React from 'react';
import { connect } from 'react-redux';
import {
  setAddCommentToAdvertisementText
} from '../../../../store/pages/header/addCommentToAdvertisement/actions';
import ScreenAddCommentToAdvertisement from './ScreenAddCommentToAdvertisement';

class AddCommentToAdvertisementContainer extends React.Component {
  render() {
    return (
      <ScreenAddCommentToAdvertisement
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        selectedPost={this.props.selectedPost}
        addCommentToAdvertisementText={this.props.addCommentToAdvertisementText}
        setAddCommentToAdvertisementText={this.props.setAddCommentToAdvertisementText}
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
    selectedPost: state.advertisement.selectedPost,
    addCommentToAdvertisementText: state.addCommentToAdvertisement.addCommentToAdvertisementText 
  };
};

const mapDispatchToProps = {
  setAddCommentToAdvertisementText: setAddCommentToAdvertisementText
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCommentToAdvertisementContainer);