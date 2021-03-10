import React from "react";
import { connect } from "react-redux";
import {
  setAdvertisementOsbbName,
  setAdvertisementData,
  setSelectedPost,
  setAllComments,
  setSelectedPostComments,
  setAdvertisementSelectedFile,
  fetchAllAds,
  fetchOsbbName,
  fetchSelectedPostComments,
  toVote,
} from "../../../../store/pages/header/advertisement/actions";
import ScreenAdvertisement from "./ScreenAdvertisement";

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
        setAdvertisementSelectedFile={this.props.setAdvertisementSelectedFile}
        fetchAllAds={this.props.fetchAllAds}
        fetchOsbbName={this.props.fetchOsbbName}
        fetchSelectedPostComments={this.props.fetchSelectedPostComments}
        toVote={this.props.toVote}
      />
    );
  }
}

const mapStateToProps = (state) => {
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
    advertisementSelectedFile: state.advertisement.advertisementSelectedFile,
  };
};

const mapDispatchToProps = {
  setAdvertisementOsbbName,
  setAdvertisementData,
  setSelectedPost,
  setSelectedPostComments,
  setAllComments,
  setAdvertisementSelectedFile,
  fetchAllAds,
  fetchOsbbName,
  fetchSelectedPostComments,
  toVote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertisementContainer);
