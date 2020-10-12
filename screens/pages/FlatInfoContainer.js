import React from 'react';
import { connect } from 'react-redux';
import {
  setFlatInfoGeneralData,
  setFlatInfoGeneralDataClear,
  setflatInfoLodgerData,
  setflatInfoLodgerDataClear,
  setFlatInfoParameters,
  setFlatInfoParametersClear,
  setFlatInfoPrivileges,
  setFlatInfoPrivilegesClear,
  setFlatInfoContributions,
  setFlatInfoContributionsClear,
  setFlatInfoIndividualContributions,
  setFlatInfoIndividualContributionsClear,
  setFlatInfoCounters,
  setFlatInfoCountersClear,
  setFlatInfoContracts,
  setFlatInfoContractsClear,
} from '../../store/pages/flatInfo/actions';
import ScreenFlatInfo from './ScreenFlatInfo';

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
        flatInfoIndividualContributions={this.props.flatInfoIndividualContributions}
        flatInfoCounters={this.props.flatInfoCounters}
        flatInfoContracts={this.props.flatInfoContracts}
        setFlatInfoGeneralData={this.props.setFlatInfoGeneralData}
        setflatInfoLodgerData={this.props.setflatInfoLodgerData}
        setFlatInfoParameters={this.props.setFlatInfoParameters}
        setFlatInfoPrivileges={this.props.setFlatInfoPrivileges}
        setFlatInfoContributions={this.props.setFlatInfoContributions}
        setFlatInfoIndividualContributions={this.props.setFlatInfoIndividualContributions}
        setFlatInfoCounters={this.props.setFlatInfoCounters}
        setFlatInfoContracts={this.props.setFlatInfoContracts}
        setFlatInfoGeneralDataClear={this.props.setFlatInfoGeneralDataClear}
        setflatInfoLodgerDataClear={this.props.setflatInfoLodgerDataClear}
        setFlatInfoParametersClear={this.props.setFlatInfoParametersClear}
        setFlatInfoPrivilegesClear={this.props.setFlatInfoPrivilegesClear}
        setFlatInfoContributionsClear={this.props.setFlatInfoContributionsClear}
        setFlatInfoIndividualContributionsClear={this.props.setFlatInfoIndividualContributionsClear}
        setFlatInfoCountersClear={this.props.setFlatInfoCountersClear}
        setFlatInfoContractsClear={this.props.setFlatInfoContractsClear}
      />
    );
  }
}

const mapStateToProps = state => {
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
  setFlatInfoGeneralData: setFlatInfoGeneralData,
  setFlatInfoGeneralDataClear: setFlatInfoGeneralDataClear,
  setflatInfoLodgerData: setflatInfoLodgerData,
  setflatInfoLodgerDataClear: setflatInfoLodgerDataClear,
  setFlatInfoParameters: setFlatInfoParameters,
  setFlatInfoParametersClear: setFlatInfoParametersClear,
  setFlatInfoPrivileges: setFlatInfoPrivileges,
  setFlatInfoPrivilegesClear: setFlatInfoPrivilegesClear,
  setFlatInfoContributions: setFlatInfoContributions,
  setFlatInfoContributionsClear: setFlatInfoContributionsClear,
  setFlatInfoIndividualContributions: setFlatInfoIndividualContributions,
  setFlatInfoIndividualContributionsClear: setFlatInfoIndividualContributionsClear,
  setFlatInfoCounters: setFlatInfoCounters,
  setFlatInfoCountersClear: setFlatInfoCountersClear,
  setFlatInfoContracts: setFlatInfoContracts,
  setFlatInfoContractsClear: setFlatInfoContractsClear
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatInfoContainer);
