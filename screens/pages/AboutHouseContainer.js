import React from 'react';
import { connect } from 'react-redux';
import {setAboutHouseData, 
  setAboutHouseDocuments, 
  setAboutHouseSelectedFile, 
  setSelectedFile,
  fetchHouseData} from '../../store/pages/aboutHouse/actions';
import ScreenAboutHouse from './ScreenAboutHouse';

class AboutHouseContainer extends React.Component {
  render() {
    return (
      <ScreenAboutHouse
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        aboutHouseData={this.props.aboutHouseData}
        aboutHouseDocuments={this.props.aboutHouseDocuments}
        aboutHouseSelectedFile={this.props.aboutHouseSelectedFile}
        selectedFile={this.props.selectedFile}
        workPeriods={this.props.workPeriods}
        setAboutHouseData={this.props.setAboutHouseData}
        setAboutHouseDocuments={this.props.setAboutHouseDocuments}
        setAboutHouseSelectedFile={this.props.setAboutHouseSelectedFile}
        setSelectedFile={this.props.setSelectedFile}
        fetchHouseData={this.props.fetchHouseData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    osbbId: state.apartment.osbbId,
    accountId: state.apartment.accountId,
    aboutHouseData: state.aboutHouse.aboutHouseData,
    aboutHouseDocuments: state.aboutHouse.aboutHouseDocuments,
    aboutHouseSelectedFile : state.aboutHouse.aboutHouseSelectedFile,
    selectedFile: state.aboutHouse.selectedFile,
    workPeriods: state.apartment.workPeriods,
  };
};

const mapDispatchToProps = {
  setAboutHouseData,
  setAboutHouseDocuments,
  setAboutHouseSelectedFile,
  setSelectedFile,
  fetchHouseData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutHouseContainer);
