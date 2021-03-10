import React from "react";
import { connect } from "react-redux";
import {
  setChatAllMessages,
  setChatNewMessage,
  setChatCurrentMessage,
  setChatCurrentImagesAdd,
  setChatCurrentImagesClear,
  setSelectedFile,
  setLoading,
  sendPhoto,
  downloadMessages,
  sendMessage,
  closeChat,
} from "../../../../store/pages/header/chat/actions";
import ScreenChat from "./ScreenChat";

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
        allUsers={this.props.allUsers}
        currentMessage={this.props.currentMessage}
        currentImages={this.props.currentImages}
        chatSelectedFile={this.props.chatSelectedFile}
        loading={this.props.loading}
        userData={this.props.userData}
        setChatAllMessages={this.props.setChatAllMessages}
        setChatNewMessage={this.props.setChatNewMessage}
        setChatCurrentMessage={this.props.setChatCurrentMessage}
        setChatCurrentImagesAdd={this.props.setChatCurrentImagesAdd}
        setChatCurrentImagesClear={this.props.setChatCurrentImagesClear}
        setSelectedFile={this.props.setSelectedFile}
        setLoading={this.props.setLoading}
        sendPhoto={this.props.sendPhoto}
        downloadMessages={this.props.downloadMessages}
        sendMessage={this.props.sendMessage}
        closeChat={this.props.closeChat}
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
    selectedChat: state.allChats.selectedChat,
    allUsers: state.allChats.allUsers,
    allMessages: state.selectedChat.allMessages,
    currentMessage: state.selectedChat.currentMessage,
    currentImages: state.selectedChat.currentImages,
    chatSelectedFile: state.selectedChat.chatSelectedFile,
    loading: state.selectedChat.loading,
    userData: state.apartment.userData,
  };
};

const mapDispatchToProps = {
  setChatAllMessages,
  setChatNewMessage,
  setChatCurrentMessage,
  setChatCurrentImagesAdd,
  setChatCurrentImagesClear,
  setSelectedFile,
  setLoading,
  sendPhoto,
  downloadMessages,
  sendMessage,
  closeChat,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
