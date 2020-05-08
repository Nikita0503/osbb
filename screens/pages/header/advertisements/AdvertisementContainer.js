import React from 'react';
import { connect } from 'react-redux';
import {
  setAdvertisementOsbbName,
  setAdvertisementData,
  setSelectedPost,
  setAllComments,
  setAllCommentsClear,
  setSelectedPostComments,
  setAdvertisementSelectedFile
} from '../../../../store/pages/header/advertisement/actions';
import ScreenAdvertisement from './ScreenAdvertisement';

class AdvertisementContainer extends React.Component {
  render() {
    return (
      <ScreenAdvertisement
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        advertisementOsbbName={this.props.advertisementOsbbName}
        advertisementData={this.props.advertisementData}
        selectedPost={this.props.selectedPost}
        selectedPostComments={this.props.selectedPostComments}
        allComments={this.props.allComments}
        advertisementSelectedFile={this.props.advertisementSelectedFile}
        setAdvertisementOsbbName={this.props.setAdvertisementOsbbName}
        setAdvertisementData={this.props.setAdvertisementData}
        setSelectedPost={this.props.setSelectedPost}
        setSelectedPostComments={this.props.setSelectedPostComments}
        setAllComments={this.props.setAllComments}
        setAllCommentsClear={this.props.setAllCommentsClear}
        setAdvertisementSelectedFile={this.props.setAdvertisementSelectedFile}
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
    advertisementOsbbName: state.advertisement.advertisementOsbbName,
    advertisementData: state.advertisement.advertisementData,
    selectedPostComments: state.advertisement.selectedPostComments,
    selectedPost: state.advertisement.selectedPost,
    allComments: state.advertisement.allComments,
    advertisementSelectedFile: state.advertisement.advertisementSelectedFile
  };
};

const mapDispatchToProps = {
  setAdvertisementOsbbName: setAdvertisementOsbbName,
  setAdvertisementData: setAdvertisementData,
  setSelectedPost: setSelectedPost,
  setSelectedPostComments: setSelectedPostComments,
  setAllComments: setAllComments,
  setAllCommentsClear: setAllCommentsClear,
  setAdvertisementSelectedFile: setAdvertisementSelectedFile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementContainer);
