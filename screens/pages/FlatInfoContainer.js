import React from "react";
import { connect } from "react-redux";
import {
  setFlatInfoCountersClear,
  fetchFlatInfoGeneralData,
  fetchFlatInfoLodgerData,
  fetchFlatInfoParameters,
  fetchFlatInfoContributions,
  fetchFlatInfoIndividualContributions,
  fetchFlatInfoPrivileges,
  fetchFlatInfoCounters,
  fetchFlatInfoContracts,
} from "../../store/pages/flatInfo/actions";
import ScreenFlatInfo from "./ScreenFlatInfo";

class FlatInfoContainer extends React.Component {
  render() {
    return (
      <ScreenFlatInfo
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        accountIds={this.props.accountIds}
        currentWorkPeriod={this.props.currentWorkPeriod}
        workPeriods={this.props.workPeriods}
        flatInfoGeneralData={this.props.flatInfoGeneralData}
        flatInfoLodgerData={this.props.flatInfoLodgerData}
        flatInfoParameters={this.props.flatInfoParameters}
        flatInfoPrivileges={this.props.flatInfoPrivileges}
        flatInfoContributions={this.props.flatInfoContributions}
        flatInfoIndividualContributions={
          this.props.flatInfoIndividualContributions
        }
        flatInfoCounters={this.props.flatInfoCounters}
        flatInfoContracts={this.props.flatInfoContracts}
        setFlatInfoCountersClear={this.props.setFlatInfoCountersClear}
        fetchFlatInfoGeneralData={this.props.fetchFlatInfoGeneralData}
        fetchFlatInfoLodgerData={this.props.fetchFlatInfoLodgerData}
        fetchFlatInfoParameters={this.props.fetchFlatInfoParameters}
        fetchFlatInfoContributions={this.props.fetchFlatInfoContributions}
        fetchFlatInfoIndividualContributions={
          this.props.fetchFlatInfoIndividualContributions
        }
        fetchFlatInfoPrivileges={this.props.fetchFlatInfoPrivileges}
        fetchFlatInfoCounters={this.props.fetchFlatInfoCounters}
        fetchFlatInfoContracts={this.props.fetchFlatInfoContracts}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    accountIds: state.apartment.accountIds,
    currentWorkPeriod: state.apartmentHeader.currentWorkPeriod,
    workPeriods: state.apartment.workPeriods,
    flatInfoGeneralData: state.flatInfo.flatInfoGeneralData,
    flatInfoLodgerData: state.flatInfo.flatInfoLodgerData,
    flatInfoParameters: state.flatInfo.flatInfoParameters,
    flatInfoPrivileges: state.flatInfo.flatInfoPrivileges,
    flatInfoContributions: state.flatInfo.flatInfoContributions,
    flatInfoIndividualContributions:
      state.flatInfo.flatInfoIndividualContributions,
    flatInfoCounters: state.flatInfo.flatInfoCounters,
    flatInfoContracts: state.flatInfo.flatInfoContracts,
  };
};

const mapDispatchToProps = {
  setFlatInfoCountersClear,
  fetchFlatInfoGeneralData,
  fetchFlatInfoLodgerData,
  fetchFlatInfoParameters,
  fetchFlatInfoContributions,
  fetchFlatInfoIndividualContributions,
  fetchFlatInfoPrivileges,
  fetchFlatInfoCounters,
  fetchFlatInfoContracts,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlatInfoContainer);
