import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';
import Toast from 'react-native-tiny-toast'

export default class ScreenAddCommentToAdvertisement extends React.Component {
  constructor(props) {
    super(props);
    this.onAddCommentToAdvertisementTextChange = this.onAddCommentToAdvertisementTextChange.bind(
      this
    );
    this.onAddCommentToAdvertisementButtonSendChange = this.onAddCommentToAdvertisementButtonSendChange.bind(this);
    this.onAddCommentToAdvertisementTextChange(null);
    this.onAddCommentToAdvertisementButtonSendChange(false);
  }

  onAddCommentToAdvertisementTextChange(text) {
    this.props.setAddCommentToAdvertisementText(text);
  }

  onAddCommentToAdvertisementButtonSendChange(isDisable){
    this.props.setAddCommentToAdvertisementButtonSend(isDisable);
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader
          navigation={this.props.navigation}
          title="Додати коментар"
        />
        <View style={styles.container}>
          <ScrollView style={{width: '90%'}}>
            <TextInput
              multiline
              style={{
                
                width: '90%',
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Ваш коментар"
              onChangeText={text => {
                this.onAddCommentToAdvertisementTextChange(text);
              }}
              value={this.props.addCommentToAdvertisementText}
            />
          </ScrollView>
          <TouchableOpacity
            disabled={this.props.isDisabledButtonSend}
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
            }}
            onPress={() => {
              if(this.props.addCommentToAdvertisementText == null || this.props.addCommentToAdvertisementText.trim() == ''){
                Alert.alert(
                  'Повідомлення',
                  'Неможливо додати коментар. Введіть текст',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: true }
                )
                return
              }
              this.onAddCommentToAdvertisementButtonSendChange(true)
              var ws = new WebSocket(
                'wss://app.osbb365.com/socket.io/?auth_token=' +
                  this.props.token +
                  '&EIO=3&transport=websocket'
              );

              ws.onopen = () => {
                var text = this.props.addCommentToAdvertisementText;
                text = text.replace(new RegExp('\n','g'), '\\n')
                // connection opened123
                ws.send('428["/comment/create",{"text":"' + text + '","noticeId":' + this.props.selectedPost.id + '}]');
                 // send a message
              }; //428["/comment/create",{"text":"qwe","noticeId":53}]

              ws.onmessage = e => {
                
                if (e.data.substring(0, 2) == '42' && e.data.substring(4, 11) == 'message'){
                // a message was received
                const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
                var myObj = JSON.parse(myObjStr);
                var data = JSON.parse(myObj);
                /*Alert.alert(
                  'Повідомлення',
                  'Коментар успішно створено',
                  //myObj,                  
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: true }
                )*/
                //Toast.show('This is a default toast')
                Toast.show('Коментар успішно створено',{
                  position: Toast.position.TOP,
                  containerStyle:{backgroundColor: 'green'},
                  textStyle: {},
                  imgStyle: {},
                  mask: false,
                  maskStyle:{},
                  
                })
                this.onAddCommentToAdvertisementTextChange(null);
                this.props.navigation.goBack()
                }
              };
            
            }}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Додати коментар
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
});
