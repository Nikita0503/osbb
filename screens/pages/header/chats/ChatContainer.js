import React from 'react';
import { connect } from 'react-redux';
import {setChatAllMessages, setChatNewMessage, setChatCurrentMessage, setChatCurrentImagesAdd, setChatCurrentImagesClear, setSelectedFile, setLoading} from '../../../../store/pages/header/chat/actions';
import ScreenChat from './ScreenChat';

class ChatContainer extends React.Component {
  render() {
    return (
      <ScreenChat
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        selectedChat={this.props.selectedChat}
        allMessages={this.props.allMessages}
        currentMessage={this.props.currentMessage}
        currentImages={this.props.currentImages}
        chatSelectedFile={this.props.chatSelectedFile}
        loading={this.props.loading}
        setChatAllMessages={this.props.setChatAllMessages}
        setChatNewMessage={this.props.setChatNewMessage}
        setChatCurrentMessage={this.props.setChatCurrentMessage}
        setChatCurrentImagesAdd={this.props.setChatCurrentImagesAdd}
        setChatCurrentImagesClear={this.props.setChatCurrentImagesClear}
        setSelectedFile={this.props.setSelectedFile}
        setLoading={this.props.setLoading}
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
    selectedChat: state.allChats.selectedChat,
    allMessages: state.selectedChat.allMessages,
    currentMessage: state.selectedChat.currentMessage,
    currentImages: state.selectedChat.currentImages,
    chatSelectedFile: state.selectedChat.chatSelectedFile,
    loading: state.selectedChat.loading
  };
};

const mapDispatchToProps = {
  setChatAllMessages: setChatAllMessages,
  setChatNewMessage: setChatNewMessage,
  setChatCurrentMessage: setChatCurrentMessage,
  setChatCurrentImagesAdd: setChatCurrentImagesAdd,
  setChatCurrentImagesClear: setChatCurrentImagesClear,
  setSelectedFile: setSelectedFile,
  setLoading: setLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer);
