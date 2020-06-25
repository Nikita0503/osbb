import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import PageHeader from '../../../components/PageHeader';
import { NavigationEvents } from 'react-navigation';

export default class ScreenSupport extends React.Component {
  wsWithConsultant;

  constructor(props) {
    super(props);
    this.onHelpChatMessageChange = this.onHelpChatMessageChange.bind(this);
    this.onHelpChatMessagesChange = this.onHelpChatMessagesChange.bind(this);
    this.onHelpChatMessagesClearChange = this.onHelpChatMessagesClearChange.bind(this);
    this.onHelpChatConsultant = this.onHelpChatConsultant.bind(this);
  }

  onHelpChatMessageChange(helpChatMessage) {
    this.props.setHelpChatMessage(helpChatMessage);
  }

  onHelpChatMessagesChange(helpChatMessage) {
    this.props.setHelpChatMessages(helpChatMessage);
  }

  onHelpChatMessagesClearChange(helpChatMessages){
    this.props.setHelpChatMessagesClear([]);
  }

  onHelpChatConsultant(consultant) {
    this.props.setHelpChatConsultant(consultant);
  }

  componentDidMount() {
    this.onHelpChatConsultant(null);
    this.onHelpChatMessageChange(null);
    this.onHelpChatMessagesClearChange([]);
    this.wsWithConsultant = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    this.wsWithConsultant.onopen = () => {
      // connection opened
      this.wsWithConsultant.send('4210["/help/connect"]');
    };

    this.wsWithConsultant.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4310') {
        //const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
        //var myObj = JSON.parse(myObjStr);
        //var data = JSON.parse(myObj);
        console.log('help', e.data);
        if (e.data == '4310[null]') {
          this.onHelpChatConsultant(null);
          Alert.alert(
                            'Повідомлення',
                            'Нажаль вільних консультантів немає',
                            [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: true }
                          )
          //alert("Нажаль вільних консультантів немає")
          this.wsWithConsultant.close();
        } else {
          this.onHelpChatConsultant(e.data);
        }
        
      }
    };
  }

  componentWillUnmount() {
    if (this.props.consultant != null) {
      this.onHelpChatConsultant(null);
      this.wsWithConsultant.send('4215["/help/close"]');
      this.wsWithConsultant.close();
    }
    console.log('BackHandler');
  }

  getMessages() {
    if (this.props.helpChatMessages == null) {
      //console.log('messageList1', 'null');
      return;
    } else {
      //console.log('messageList1', this.props.allMessages);
      return this.props.helpChatMessages;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
      <NavigationEvents
          onDidFocus={() => {
            console.log('I am triggered');
            //this.componentDidMount();
          }}
        />
        <View
          style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
          <PageHeader
            navigation={this.props.navigation}
            title="Задати питання"
          />
          <View style={styles.container}>
            <ScrollView
              ref="scrollView"
              onContentSizeChange={(width, height) =>
                this.refs.scrollView.scrollToEnd()
              }>
              <View style={styles.chatContainer}>
                <FlatList
                  data={this.getMessages()}
                  renderItem={({ item }) => (
                    <Item
                      text={item.message}
                      me={item.me}
                    />
                  )}
                  keyExtractor={item => item.text}
                  listKey={item => item.text}
                />
              </View>
            </ScrollView>

            <View style={styles.messageContainer}>
              <TextInput
                multiline
                style={{
                  marginLeft: 10,
                  width: '85%',
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  alignSelf: 'center',
                }}
                placeholder="Ваше питання"
                onChangeText={text => {
                  this.onHelpChatMessageChange(text);
                }}
                value={this.props.helpChatMessage}
              />

              

              <TouchableOpacity
                onPress={() => {
                  if (this.props.consultant == null) {
                    var ws = new WebSocket(
                      'wss://app.osbb365.com/socket.io/?auth_token=' +
                        this.props.token +
                        '&EIO=3&transport=websocket'
                    );

                    ws.onopen = () => {
                      // connection opened
                      if (this.props.consultant == null) {
                        var text = this.props.helpChatMessage;
                        text = text.replace(new RegExp('\n','g'), '\\n')
                        ws.send(
                          '425["/help/request",{"text":"' +
                          text +
                            '"}]'
                        );
                      }
                    };

                    ws.onmessage = e => {
                      // a message was received
                      if (e.data.substring(0, 2) == '42') {
                        const myObjStr = JSON.stringify(
                          e.data.substring(2, e.data.length)
                        );
                        var myObj = JSON.parse(myObjStr);
                        var data = JSON.parse(myObj);
                        console.log('help', data[0]);
                        if (data[0] == 'message') {
                          //alert(data[1].message);
                          Alert.alert(
                            'Повідомлення',
                            data[1].message,
                            [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: true }
                          )
                          console.log('help', data[1].message);
                          this.onHelpChatMessageChange(null);
                          ws.close();
                        }
                      }
                    };
                  } else {
                    this.wsWithConsultant.send(
                      '4218["/help/send",{"message":"' +
                        this.props.helpChatMessage +
                        '","isAdmin":false}]'
                    );
                    this.wsWithConsultant.onmessage = e => {
                      // a message was received
                      if (e.data.substring(0, 2) == '42') {
                        const myObjStr = JSON.stringify(
                          e.data.substring(2, e.data.length)
                        );
                        var myObj = JSON.parse(myObjStr);
                        var data = JSON.parse(myObj);
                        console.log('help', data);
                        if (data[0] == 'message') {
                          var obj = {
                            me: true,
                            message: this.props.helpChatMessage,
                          };
                          this.onHelpChatMessagesChange(obj);
                          this.onHelpChatMessageChange(null);
                        }
                        if (data[0] == 'question') {
                          obj = {
                            me: false,
                            message: data[1].message,
                          };
                          this.onHelpChatMessagesChange(obj);
                        }
                      }
                    };
                  }
                }}>
                <Image
                  style={{ width: 35, height: 40, marginHorizontal: 5 }}
                  source={require('../../../images/ic_send.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.me ? styles.myMessageStyle : styles.supportMessageStyle
        }>
        <Text style={styles.itemStyle}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E7EC',
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chatContainer: {
    width: '100%',
    marginBottom: 15,
  },
  supportMessageStyle: {
    maxWidth: '70%',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  myMessageStyle: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ADD9FA',
  },
  messageContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  itemStyle: {
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
    margin: 7,
  },
});
