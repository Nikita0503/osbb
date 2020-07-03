import React from 'react';
import { connect } from 'react-redux';
import {
  setApplicationsAndOffersData,
  setApplicationsAndOffersDataClear,
  setSelectedOfferData,
  setApplicationsAndOffersOnlyMy,
  setApplicationsAndOffersLoading,
  setApplicationsAndOffersFirstlyOpened,
  setApplicationsAndOffersDisplayAcrhived
} from '../../../store/pages/offers/applicationsAndOffers/actions';
import ScreenApplicationsAndOffers from './ScreenApplicationsAndOffers';

class ApplicationsAndOffersContainer extends React.Component {
  render() {
    return (
      <ScreenApplicationsAndOffers
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        currentWorkPeriod={this.props.currentWorkPeriod}
        applicationsAndOffersData={this.props.applicationsAndOffersData}
        applicationsAndOffersDataMy={this.props.applicationsAndOffersDataMy}
        selectedOfferData={this.props.selectedOfferData}
        onlyMy={this.props.onlyMy}
        userData={this.props.userData}
        loading={this.props.loading}
        firstlyOpened={this.props.firstlyOpened}
        displayArchived={this.props.displayArchived}
        setApplicationsAndOffersData={this.props.setApplicationsAndOffersData}
        setApplicationsAndOffersDataClear={
          this.props.setApplicationsAndOffersDataClear
        }
        setSelectedOfferData={this.props.setSelectedOfferData}
        setApplicationsAndOffersOnlyMy={this.props.setApplicationsAndOffersOnlyMy}
        setApplicationsAndOffersLoading={this.props.setApplicationsAndOffersLoading}
        setApplicationsAndOffersFirstlyOpened={this.props.setApplicationsAndOffersFirstlyOpened}
        setApplicationsAndOffersDisplayAcrhived={this.props.setApplicationsAndOffersDisplayAcrhived}
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
    applicationsAndOffersData: state.applicationsAndOffers.applicationsAndOffersData,
    onlyMy: state.applicationsAndOffers.onlyMy,
    userData: state.apartment.userData,
    loading: state.applicationsAndOffers.loading,
    firstlyOpened: state.applicationsAndOffers.firstlyOpened,
    displayArchived: state.applicationsAndOffers.displayArchived
  };
};

const mapDispatchToProps = {
  setApplicationsAndOffersData: setApplicationsAndOffersData,
  setApplicationsAndOffersDataClear: setApplicationsAndOffersDataClear,
  setSelectedOfferData: setSelectedOfferData,
  setApplicationsAndOffersOnlyMy: setApplicationsAndOffersOnlyMy,
  setApplicationsAndOffersLoading: setApplicationsAndOffersLoading,
  setApplicationsAndOffersFirstlyOpened: setApplicationsAndOffersFirstlyOpened,
  setApplicationsAndOffersDisplayAcrhived: setApplicationsAndOffersDisplayAcrhived
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationsAndOffersContainer);
