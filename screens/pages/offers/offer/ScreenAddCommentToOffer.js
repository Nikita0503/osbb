import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';

const DATA_FILES = [
  {
    name: 'Image file',
    type: 'jpg',
  },
  {
    name: 'Image file',
    type: 'jpg',
  },
];

export default class ScreenAddCommentToOffer extends React.Component {
  constructor(props) {
    super(props);
    this.onAddCommentToOfferChange = this.onAddCommentToOfferChange.bind(this);
    this.onIsDisabledButtonSendChange = this.onIsDisabledButtonSendChange.bind(this);
    this.onAddCommentToOfferChange(null)
    this.onIsDisabledButtonSendChange(false);
  }

  onAddCommentToOfferChange(comments) {
    console.log('comments2', comments);
    this.props.setAddCommentToOffer(comments);
  }

  onIsDisabledButtonSendChange(isDisabled){
    this.props.setIsDisabledButtonSendChange(isDisabled);
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
                this.onAddCommentToOfferChange(text);
              }}
              value={this.props.addCommentToOfferComment}
            />
          </ScrollView>
          <TouchableOpacity
            disabled={this.props.isDisabledButtonSend}
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              borderRadius: 15
            }}
            onPress={() => {
              if(this.props.addCommentToOfferComment == null || this.props.addCommentToOfferComment.trim() == ''){
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
              this.onIsDisabledButtonSendChange(true);
              var ws = new WebSocket(
                'wss://app.osbb365.com/socket.io/?auth_token=' +
                  this.props.token +
                  '&EIO=3&transport=websocket'
              );

              ws.onopen = () => {
                // connection opened
                var text = this.props.addCommentToOfferComment;
                text = text.replace(new RegExp('\n','g'), '\\n')
                var message = '4213["/claim/comment/create",{"id":' +
                    this.props.selectedOfferData.id +
                    ',"text":"' +
                    text +
                    '","documents":[],"workPeriod":"' +
                    this.props.workPeriods[this.props.workPeriods.length - 1] +
                    '"}]';
                    console.log("addCommentToOffer", message);
                ws.send(
                  message
                );
              };

              ws.onmessage = e => {
                
                // a message was received
                console.log('123', e.data);
                if (e.data.substring(0, 4) == '4313') {
                  Alert.alert(
                    'Повідомлення',
                    'Надіслано успішно!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                  )
                  this.onAddCommentToOfferChange(null);
                  this.props.navigation.goBack();
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

class ItemFile extends React.Component {
  render() {
    var icon = this.props.image;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
          }}>
          {getImage(this.props.type)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type) {
    case 'xls':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_xls.png')}
        />
      );

    case 'pdf':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_pdf.png')}
        />
      );

    case 'doc':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_doc.png')}
        />
      );

    case 'txt':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_txt.png')}
        />
      );

    default:
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_jpg.png')}
        />
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
    borderRadius: 15,
    paddingTop: 5
  },
});
