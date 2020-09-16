import React from 'react';
import { connect } from 'react-redux';
import { setHelpChatMessage, 
  setHelpChatMessages, 
  setHelpChatMessagesClear,
  setHelpChatConsultant,
  openChat,
  closeChat,
  sendMessage} from '../../../store/pages/header/help/actions';
import ScreenSupport from './ScreenSupport';

class SupportContainer extends React.Component {
  render() {
    return (
      <ScreenSupport
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        helpChatMessage={this.props.helpChatMessage}
        helpChatMessages={this.props.helpChatMessages}
        consultant={this.props.consultant}
        setHelpChatMessage={this.props.setHelpChatMessage}
        setHelpChatMessages={this.props.setHelpChatMessages}
        setHelpChatMessagesClear={this.props.setHelpChatMessagesClear}
        setHelpChatConsultant={this.props.setHelpChatConsultant}
        openChat={this.props.openChat}
        closeChat={this.props.closeChat}
        sendMessage={this.props.sendMessage}
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
    helpChatMessage: state.helpChat.helpChatMessage,
    helpChatMessages: state.helpChat.helpChatMessages,
    consultant: state.helpChat.consultant
  };
};

const mapDispatchToProps = {
  setHelpChatMessage,
  setHelpChatMessages,
  setHelpChatMessagesClear,
  setHelpChatConsultant,
  openChat,
  closeChat,
  sendMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupportContainer);