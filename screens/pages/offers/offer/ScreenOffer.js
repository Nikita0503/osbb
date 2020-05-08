import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';
import { NavigationEvents } from 'react-navigation';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';

const DATA_FILES = [
  {
    name: 'Excel file',
    type: 'xls',
  },
  {
    name: 'PDF file',
    type: 'pdf',
  },
  {
    name: 'DOC file',
    type: 'doc',
  },
  {
    name: 'TXT file',
    type: 'txt',
  },
  {
    name: 'Image file',
    type: 'jpg',
  },
];

function getDateForComments(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return (
    date.getDate() +
    month +
    date.getFullYear() +
    ':' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}

function getDate(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return date.getDate() + month + date.getFullYear();
}

export default class ScreenOffer extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectedOfferCommentsChange = this.onSelectedOfferCommentsChange.bind(
      this
    );
    this.onOfferSelectedFileChange = this.onOfferSelectedFileChange.bind(this);
  }

  onSelectedOfferCommentsChange(comments) {
    //console.log('comments2', comments);
    this.props.setSelectedOfferComments(comments);
  }

  onOfferSelectedFileChange(file){
    this.props.setSelectedFile(file)
  }

  state = {
    myComment: '',
    isShown: false,
    comments: [
      {
        author: {
          name: 'Vasya',
          photo: '../../../../images/ic_txt.png',
        },
        text:
          'Коммента́рий (лат. commentārius — заметки, записки; толкование) — пояснения к тексту, рассуждения, замечания о чём-нибудь или в Интернете — к посту (сообщению).',
        time: 'Feb 12, 2019 20:00',
        files: [
          {
            name: 'Excel file',
            file: 'xls',
          },
          {
            name: 'PDF file',
            file: 'pdf',
          },
          {
            name: 'Excel file',
            file: 'xls',
          },
          {
            name: 'PDF file',
            file: 'pdf',
          },
          {
            name: 'Excel file',
            file: 'jpg',
          },
          {
            name: 'PDF file',
            file: 'pdf',
          },
          {
            name: 'Excel file',
            file: 'xls',
          },
          {
            name: 'PDF file',
            file: 'txt',
          },
          {
            name: 'Excel file',
            file: 'xls',
          },
          {
            name: 'PDF file',
            file: 'pdf',
          },
        ],
      },

      {
        author: {
          name: 'Petya',
          photo: '../../../../images/ic_txt.png',
        },
        text:
          'comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2comment2',
        time: 'Jun 1, 2020 10:00',
      },
    ],
  };

  getSelectedOffer() {
    
    console.log('selectedOffer1', this.props.selectedOfferComments);
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
        '4216["/claim/comment/list",{"id":' +
          this.props.selectedOfferData.id +
          ',"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      ); // send a message
    };

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4316') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        //console.log('comments1', data);
        this.onSelectedOfferCommentsChange(data[0]);
      }
    };
  }

  getComments() {
    if (this.props.selectedOfferComments == null) {
      //console.log('comments3', 'null');
      return;
    } else {
      //console.log('comments3', this.props.selectedOfferComments);
      return this.props.selectedOfferComments;
    }
  }

  showComments() {
    if (this.state.isShown) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.setState({ isShown: false })}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                ↑ Сховати коментарі
              </Text>
            </View>
          </TouchableOpacity>
          {this.getCommentsList()}
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.setState({ isShown: true })}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: '#364A5F',
                fontSize: 18,
              }}>
              ↓ Показати коментарі
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  getCommentsList() {
    console.log("helloMM", this.props.selectedOfferComments)
    if(this.props.selectedOfferComments == null || this.props.selectedOfferComments.length == 0){
      return(<Text style={{color: '#364A5F', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>)
    }
    return (
      <FlatList
        style={{ marginVertical: 10 }}
        data={this.props.selectedOfferComments}
        renderItem={({ item }) => (
          <ItemComment
            user={item.user}
            text={item.text}
            time={item.updatedAt}
            files={item.attachment}
            onOfferSelectedFileChange={this.onOfferSelectedFileChange}
          />
        )}
        keyExtractor={item => item.name}
      />
    );
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Заявка" />
        <NavigationEvents
          onDidFocus={() => {
            console.log('I am triggered');
            this.componentDidMount();
          }}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={{ width: '100%', backgroundColor: '#F9F9F9' }}>
              <View style={{ flexDirection: 'row' }}>
                
                {this.getSelectedOffer()}
                <View>
                  <Text style={{ color: '#364A5F', marginStart: 10 }}>
                    Заявка №{this.props.selectedOfferData.id} від{' '}
                    {this.props.selectedOfferData.fromUser.lastName +
                      ' ' +
                      this.props.selectedOfferData.fromUser.firstName}
                  </Text>
                  <Text style={{ color: '#CDCDCD', marginStart: 10 }}>
                    {getDate(this.props.selectedOfferData.createdAt)}
                  </Text>
                </View>
              </View>
              <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <Text style={{ color: '#364A5F' }}>
                  Тип системи: {this.props.selectedOfferData.system}
                </Text>
                <Text style={{ color: '#364A5F' }}>
                  Статус заявки: {this.props.selectedOfferData.status}
                </Text>
              </View>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <Text style={{ fontSize: 18 }}>
                {this.props.selectedOfferData.subject}
              </Text>
              <Text style={{ fontSize: 14 }}>
                {this.props.selectedOfferData.text}
              </Text>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <FlatList
                data={this.props.selectedOfferData.attachment}
                renderItem={({ item }) => (
                  <ItemFile name={item.name} path={item.filename} onOfferSelectedFileChange={this.onOfferSelectedFileChange} />
                )}
                keyExtractor={item => item.name}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddCommentToOffer');
              }}>
              <View
                style={{
                  backgroundColor: '#F9F9F9',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    color: '#364A5F',
                    fontSize: 18,
                  }}>
                  Додати коментар +
                </Text>
              </View>
            </TouchableOpacity>
            {this.showComments()}
          </View>
        </ScrollView>
        <Dialog.Container
            visible={this.props.offerSelectedFile == null ? false : true}>
            <Dialog.Title>
              {this.props.offerSelectedFile == null
                ? ''
                : this.props.offerSelectedFile.name}
            </Dialog.Title>
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.onOfferSelectedFileChange(null);
              }}
            />
          </Dialog.Container>
      </View>
    );
  }

  getFileShowDialog(){
    if(this.props.offerSelectedFile != null){
      var type = this.props.offerSelectedFile.path.substring(this.props.offerSelectedFile.path.length - 3)
      var path = this.props.offerSelectedFile.path;
      //type = 'jpg'
      //console.log("TYPE", type)
      switch(type){
        case 'jpg':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'png':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'svg':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'pdf':
          return(
          <PDFReader
            style={{width: 250, maxHeight: 400}}
            source={{
              uri: 'https://app.osbb365.com' + path,
            }}
          />
          )
        default: 
          return(<Text>In developing...</Text>)

      }
    }
  }
}

class ItemComment extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: '#F9F9F9', margin: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
              marginLeft: 5,
              marginRight: 1,
            }}
            source={{
              uri: 'https://app.osbb365.com' + this.props.user.photo,
            }}
          />
          <View>
            <Text style={{ color: '#364A5F' }}>{this.props.user.lastName + " " + this.props.user.firstName}</Text>
            <Text style={{ color: '#CDCDCD' }}>{getDateForComments(this.props.time)}</Text>
          </View>
        </View>
        <Text style={{ color: '#364A5F', marginLeft: 20 }}>
          {this.props.text}
        </Text>
        <FlatList
            horizontal
            data={this.props.files}
            renderItem={({ item }) => (
            <ItemFileComment name={item.name} path={item.filename} onOfferSelectedFileChange={this.props.onOfferSelectedFileChange} />
          )}
          keyExtractor={item => item.claimId}
          listKey={item => item.name}
        />
        
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress = {() => {
        var obj = {
          name: this.props.name,
          path: this.props.path
        }
        this.props.onOfferSelectedFileChange(obj)
      }}>
        <View>
          
          {getImageWithText(this.props.path, this.props.name)}
        </View>
      </TouchableOpacity>
    );
  }
}

class ItemFileComment extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress = {() => {
        var obj = {
          name: this.props.name,
          path: this.props.path
        }
        this.props.onOfferSelectedFileChange(obj)
      }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
          }}>
          {getImage(this.props.path)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type.substring(type.length - 3)) {
    case 'pdf':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_pdf.png')}
        />
      );
    case 'png':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_jpg.png')}
        />
      );
    case 'jpg':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_jpg.png')}
        />
      );
    case 'svg':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_jpg.png')}
        />
      );
  }
}

function getImageWithText(type, name) {
  switch (type.substring(type.length - 3)) {
    case 'pdf':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}> 
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_pdf.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'png':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'jpg':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'svg':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
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
  },
  itemFileStyle: {
    width: '80%',
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
  },
});
