import React from 'react';
import { connect } from 'react-redux';
import {setChatsAllChats, setChatsAllChatsClear, setChatsAllUsers, setAllChatsSelectedChat} from '../../../../store/pages/header/chats/actions';
import ScreenChats from './ScreenChats';

class ChatsContainer extends React.Component {
  render() {
    return (
      <ScreenChats
        navigation={this.props.navigation}
        token={this.props.token}
        osbbId={this.props.osbbId}
        accountId={this.props.accountId}
        workPeriods={this.props.workPeriods}
        allChats={this.props.allChats}
        allUsers={this.props.allUsers}
        selectedChat={this.props.selectedChat}
        setChatsAllChats={this.props.setChatsAllChats}
        setChatsAllChatsClear={this.props.setChatsAllChatsClear}
        setChatsAllUsers={this.props.setChatsAllUsers}
        setAllChatsSelectedChat={this.props.setAllChatsSelectedChat}
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
    allChats: state.allChats.allChats,
    allUsers: state.allChats.allUsers,
    selectedChat: state.allChats.selectedChat
  };
};

const mapDispatchToProps = {
  setChatsAllChats: setChatsAllChats,
  setChatsAllChatsClear: setChatsAllChatsClear,
  setChatsAllUsers: setChatsAllUsers,
  setAllChatsSelectedChat: setAllChatsSelectedChat
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsContainer);
