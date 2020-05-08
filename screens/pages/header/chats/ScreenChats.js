import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';

const DATA_CHATS = [
  {
    name: 'chat 1',
  },
  {
    name: 'chat 2',
  },
  {
    name: 'chat 3',
  },
  {
    name: 'chat 4',
  },
  {
    name: 'chat 5',
  },
  {
    name: 'chat 6',
  },
  {
    name: 'chat 7',
  },
  {
    name: 'chat 8',
  },
  {
    name: 'chat 10',
  },
  {
    name: 'chat 11',
  },
  {
    name: 'chat 12',
  },
  {
    name: 'chat 13',
  },
];

export default class ScreenChats extends React.Component {
  constructor(props) {
    super(props);
    this.onChatsAllChatsChange = this.onChatsAllChatsChange.bind(this);
    this.onChatsAllUsersChange = this.onChatsAllUsersChange.bind(this);
    this.onChatsAllSelectedChatChange = this.onChatsAllSelectedChatChange.bind(
      this
    );
  }

  onChatsAllChatsChange(allChats) {
    this.props.setChatsAllChats(allChats);
  }

  onChatsAllUsersChange(allUsers) {
    this.props.setChatsAllUsers(allUsers);
  }

  onChatsAllSelectedChatChange(selectedChat) {
    this.props.setAllChatsSelectedChat(selectedChat);
  }

  componentDidMount() {
    var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      // connection opened
      ws.send(
        '425["/chat/user/list",{"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
      ws.send(
        '427["/chat/conversation/list",{"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      ); // send a message
    };

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 2) == '42') {
        const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        //console.log('aboutHouseDocuments', data[0]);
        if (data[0] == 'conversationList') {
          console.log('convList', data[1]);
          this.onChatsAllChatsChange(data[1]);
        }
        if (data[0] == 'userList') {
          console.log('userList', data[1]);
          this.onChatsAllUsersChange(data[1]);
        }
      }
    };
  }

  getChatsData() {
    if (this.props.allChats == null) {
      return;
    }
    return this.props.allChats;
  }

  getLoadingView(){
    if(this.props.allChats == null){
      return(<View style={styles.container, {marginTop: '50%'}}>
        <ActivityIndicator size="large" style={styles.loader} color="#36678D" />
        <Text style={{color: '#36678D', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>
          Зачекайте, дані завантажуються
        </Text>
        </View>);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Чати" />
        <View style={styles.container}>
          {this.getLoadingView()}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.getChatsData()}
            renderItem={({ item }) => (
              <Item
                data={item}
                navigation={this.props.navigation}
                allUsers={this.props.allUsers}
                onChatsAllSelectedChatChange={this.onChatsAllSelectedChatChange}
              />
            )}
            keyExtractor={item => item.text}
          />
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
  getAvatar() {
    if (this.props.allUsers == null) {
      return;
    }
    for (var i = 0; i < this.props.allUsers.length; i++) {
      if (this.props.allUsers[i].id == this.props.data.usersId[0]) {
        if (this.props.allUsers[i].photo == null) {
          return (
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                marginLeft: 5,
                marginRight: 5,
              }}
              source={require('../../../../images/ic_avatar.png')}
            />
          );
        }
        return (
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              marginLeft: 5,
              marginRight: 1,
            }}
            source={{
              uri: 'https://app.osbb365.com' + this.props.allUsers[i].photo,
            }}
          />
        );
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>{
          this.props.onChatsAllSelectedChatChange(this.props.data);
          this.props.navigation.navigate('Chat', {
            title: this.props.data.title,
          });
        }}>
        <View style={styles.itemStyle}>
          {this.getAvatar()}
          <Text style={styles.itemTextStyle}>{this.props.data.alias == null ? this.props.data.title : this.props.data.alias}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginEnd: 10,

    marginBottom: 8,
  },
  itemStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 5,
    margin: 3,
  },
  itemTextStyle: {
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-start',
    margin: 10,
    marginTop: 12,
    width: '70%',
  },
});
