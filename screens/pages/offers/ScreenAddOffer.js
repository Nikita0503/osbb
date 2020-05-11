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
  Picker,
  Alert
} from 'react-native';
import PageHeader from '../../../components/PageHeader';

const DATA_FILES = [
  {
    name: 'Image file',
    type: 'jpg',
  },
  {
    name: 'Image file',
    type: 'jpg',
  },
  {
    name: 'Image file',
    type: 'jpg',
  },
];

export default class ScreenAddOffer extends React.Component {
  constructor(props) {
    super(props);
    console.log('act', props);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSystemChange = this.onSystemChange.bind(this);
    this.onPublicityChange = this.onPublicityChange.bind(this);
    this.onTopicChange(null);
    this.onTextChange(null);
    this.onSystemChange(null);
    this.onPublicityChange(null);
  }

  onTopicChange(topic) {
    this.props.setAddOfferTopic(topic);
  }

  onTextChange(text) {
    this.props.setAddOfferText(text);
  }

  onSystemChange(system) {
    this.props.setAddOfferSystem(system);
  }

  onPublicityChange(publicity) {
    this.props.setAddOfferPublicity(publicity);
  }
  
  setStartSelected(){
    if(this.props.addOfferSystem == null){
      this.onSystemChange(1);
      this.onPublicityChange(1);
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Подати заявку" />
        <View style={styles.container}>
          <ScrollView style={{width: '90%'}}>
            <TextInput
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Тема"
              onChangeText={text => {
                this.onTopicChange(text);
              }}
              value={this.props.addOfferTopic}
            />
            {this.setStartSelected()}
            <View style={{ flexDirection: 'row' }}>
              <Picker
                prompt="Система"
                selectedValue={this.props.addOfferSystem}
                style={{ width: '45%', marginLeft: 15 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.onSystemChange(itemValue);
                  console.log("1", itemValue)
                }}>
               
                <Picker.Item key={0} label={'вода'} value={1} />
                <Picker.Item key={0} label={'тепло'} value={2} />
                <Picker.Item key={0} label={'газ'} value={3} />
                <Picker.Item key={0} label={'електрика'} value={4} />
                <Picker.Item
                  key={0}
                  label={'прибудинкова територія'}
                  value={5}
                />
                <Picker.Item key={0} label={'ліфт'} value={6} />
                <Picker.Item
                  key={0}
                  label={'сходова клітка (марші)'}
                  value={7}
                />
                <Picker.Item key={0} label={'під`їзд'} value={8} />
              </Picker>
              <Picker
                prompt="Публічність"
                selectedValue={this.props.addOfferPublicity}
                style={{ width: '45%', marginLeft: 10 }}
                onValueChange={(itemValue, itemIndex) => {
                
                  this.onPublicityChange(itemValue);
                }}>
                
                <Picker.Item key={0} label={'публічна'} value={1} />
                <Picker.Item key={0} label={'приватна'} value={2} />
              </Picker>
            </View>
            <TextInput
              multiline
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Введіть текст заявки або пропозиції"
              onChangeText={text => {
                this.onTextChange(text);
              }}
              value={this.props.addOfferText}
            />
        
          </ScrollView>
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
            }}
            onPress={() => {
              /*alert(
                this.props.addOfferTopic +
                  ' ' +
                  this.props.addOfferText +
                  ' ' +
                  this.props.addOfferSystem +
                  ' ' +
                  this.props.addOfferPublicity
              );*/
              if(this.props.addOfferTopic == null 
                || this.props.addOfferText == null
                || this.props.addOfferSystem == null
                || this.props.addOfferPublicity == null){
                  Alert.alert(
                    'Повідомлення',
                    'Заповнено некоректно',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                  )
                  return
                }
              var ws = new WebSocket(
                'wss://app.osbb365.com/socket.io/?auth_token=' +
                  this.props.token +
                  '&EIO=3&transport=websocket'
              );

              ws.onopen = () => {
                // connection opened
                var bool = this.props.addOfferPublicity ==
                    1
                    ? 'true'
                    : 'false';
                var text = '4211["/claim/create",{"subject":"' +
                    this.props.addOfferTopic +
                    '","text":"' +
                    this.props.addOfferText +
                    '","systemId":"' +
                    this.props.addOfferSystem +
                    '","isPublic":' + bool
                     +
                        ',"documents":[],"workPeriod":"' +
                        this.props.workPeriods[
                          this.props.workPeriods.length - 1
                        ] +
                        '"}]';
                  console.log('message',text)
                ws.send(
                  text
                );
              };

              ws.onmessage = e => {
                // a message was received
                console.log('123', e.data)
                if (e.data.substring(0, 4) == '4311') {
                  Alert.alert(
                    'Повідомлення',
                    'Надіслано успішно!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: true }
                  )
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
                Додати пропозицію
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
          source={require('../../../images/ic_xls.png')}
        />
      );

    case 'pdf':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_pdf.png')}
        />
      );

    case 'doc':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_doc.png')}
        />
      );

    case 'txt':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_txt.png')}
        />
      );

    default:
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_jpg.png')}
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
  },
});
