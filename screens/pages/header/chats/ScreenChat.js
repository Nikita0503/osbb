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
  ActivityIndicator
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';
import { NavigationEvents } from 'react-navigation';
import { BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';

export default class ScreenChat extends React.Component {
  ws = new WebSocket(
    'wss://app.osbb365.com/socket.io/?auth_token=' +
      this.props.token +
      '&EIO=3&transport=websocket'
  );

  constructor(props) {
    super(props);
    this.onChatAllMessagesChange = this.onChatAllMessagesChange.bind(this);
    this.onChatNewMessageChange = this.onChatNewMessageChange.bind(this);
    this.onChatCurrentMessageChange = this.onChatCurrentMessageChange.bind(
      this
    );
    this.onChatCurrentImagesChange = this.onChatCurrentImagesChange.bind(this);
    this.onChatCurrentImagesClear = this.onChatCurrentImagesClear.bind(this);
    this.onChatSelectedFileChange = this.onChatSelectedFileChange.bind(this);
    this.onChatLoadingChange = this.onChatLoadingChange.bind(this);
    this.onChatAllMessagesChange([]);
    this.onChatCurrentMessageChange(null);
    this.onChatCurrentImagesClear();
  }

  onChatSelectedFileChange(file){
    this.props.setSelectedFile(file)
  }

  onChatAllMessagesChange(allMessages) {
    this.props.setChatAllMessages(allMessages);
  }

  onChatNewMessageChange(newMessage) {
    //console.log('newMessage1', newMessage);
    this.props.setChatNewMessage(newMessage);
  }

  onChatCurrentMessageChange(currentMessage) {
    this.props.setChatCurrentMessage(currentMessage);
  }

  onChatCurrentImagesChange(image) {
    this.props.setChatCurrentImagesAdd(image);
  }

  onChatCurrentImagesClear() {
    this.props.setChatCurrentImagesClear([]);
  }

  onChatLoadingChange(loading){
    this.props.setLoading(loading);
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    //console.log("1", result);
    let formdata = new FormData();

    formdata.append('photo', {
      uri: result.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    fetch('https://app.osbb365.com/api/upload/photo?accountId=' + this.props.accountId + '&osbbId=' + this.props.osbbId +'&type=photo&workPeriod=' + this.props.workPeriods[this.props.workPeriods.length - 1], {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + this.props.token
      },
      body: formdata,
    })
      .then(response => response.json())
      .then(response => {
        //console.log('image uploaded', response);
        this.onChatCurrentImagesChange(response.filename);
      })
      .catch(err => {
        console.log(err);
      });

    //console.log("2", result);
    

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  componentWillUnmount() {
    this.ws.close();
    console.log('BackHandler');
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('componentDid');
    this.ws.onopen = () => {
      this.onChatLoadingChange(true);
      // connection opened
      this.ws.send(
        '429["/chat/message/list",{"conversationId":' +
          this.props.selectedChat.id +
          ',"limit":50,"page":1,"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
    };

    this.ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 2) == '42') {
        const myObjStr = JSON.stringify(e.data.substring(2, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        //console.log('aboutHouseDocuments', data[0]);
        if (data[0] == 'messageList') {
          this.onChatLoadingChange(false);
          for (var i = data[1].length - 1; i >= 0; i--) {
            this.onChatNewMessageChange(data[1][i]);
          }
          //this.onChatAllMessagesChange(data[1]);
          //ws.close();
        }
        if (data[0] == 'newMessage') {
          //console.log('success', 'success');
          var message = {
            text: data[1].text,
            files: data[1].files,
            userId: data[1].userId,
          };
          //console.log('message', messages);
          this.onChatNewMessageChange(message);
          this.onChatCurrentMessageChange(null);
          //this.onChatAllMessagesChange(data[1]);
          //ws.close();
        }
      }
    };
  }

  getMessages() {
    if (this.props.allMessages == null) {
      //console.log('messageList1', 'null');
      return;
    } else {
      console.log('messageList1', this.props.allMessages);
      return this.props.allMessages;
    }
  }

  getIsMe(userId) {
    if (this.props.selectedChat.userId == userId) {
      return true;
    } else {
      return false;
    }
  }

  sendMessage() {
    // connection opened
    if (this.props.currentMessage != null) {
      this.ws.send(
        '429["/chat/message/create",{"text":"' +
          this.props.currentMessage +
          '","documents":[' +
          this.getCurrentImages() +
          '],"conversationId":' +
          this.props.selectedChat.id +
          ',"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
    }
  }

  getCurrentImages() {
    if(this.props.currentImages.length == 0) return "";
    var images = "";
    for(var i = 0; i < this.props.currentImages.length; i++){
      images +=  "\"" + this.props.currentImages[i] + "\"";
      if(i + 1 != this.props.currentImages.length){
        images += ",";
      }
    }
    //console.log("img", images);
    return images;
  }

  getLoadingView(){
    if(this.props.loading){
      return(<View style={styles.container, {marginTop: '50%'}}>
        <ActivityIndicator size="large" style={styles.loader} color="#36678D" />
        <Text style={{color: '#36678D', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>
          Зачекайте, дані завантажуються
        </Text>
        </View>);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
          <PageHeader
            navigation={this.props.navigation}
            title={JSON.stringify(
              this.props.navigation.getParam('title', 'Розмова')
            )}
          />
          <View style={styles.container}>
            <ScrollView
              ref="scrollView"
              onContentSizeChange={(width, height) =>
                this.refs.scrollView.scrollToEnd()
              }>
              <View style={styles.chatContainer}>
                {this.getLoadingView()}
                <FlatList
                  data={this.getMessages()}
                  renderItem={({ item }) => (
                    <Item
                      text={item.text}
                      userId={item.userId}
                      me={this.getIsMe(item.userId)}
                      files={item.files}
                      allUsers={this.props.allUsers}
                      onChatSelectedFileChange={this.onChatSelectedFileChange}
                    />
                  )}
                  keyExtractor={item => item.text}
                  listKey={item => item.text}
                />
              </View>
            </ScrollView>

            <View style={styles.messageContainer}>
              <TextInput
                style={{
                  marginLeft: 10,
                  width: '85%',
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                  alignSelf: 'center',
                }}
                placeholder="Ваше повідомлення"
                onChangeText={text => {
                  this.onChatCurrentMessageChange(text);
                  this.refs.scrollView.scrollToEnd();
                }}
                value={this.props.currentMessage}
              />


              <TouchableOpacity
                onPress={() => {
                  this.sendMessage();
                }}>
                <Image
                  style={{ width: 35, height: 35, marginHorizontal: 5 }}
                  source={require('../../../../images/ic_send.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Dialog.Container
            visible={this.props.chatSelectedFile == null ? false : true}>
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.onChatSelectedFileChange(null);
              }}
            />
          </Dialog.Container>
      </KeyboardAvoidingView>
    );
  }

  getFilesClip(){
    return(<TouchableOpacity
      onPress={this._pickImage}>
      <Image
        style={{ width: 35, height: 35, marginHorizontal: 5 }}
        source={require('../../../../images/ic_clip.png')}
      />
    </TouchableOpacity>)
  }

  getFileShowDialog(){
    if(this.props.chatSelectedFile != null){
      var type = this.props.chatSelectedFile.substring(this.props.chatSelectedFile.length - 3)
      var path = this.props.chatSelectedFile;
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

class Item extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.me ? styles.myMessageStyle : styles.supportMessageStyle
        }>
        {this.getMessageText()}
        <FlatList
          data={this.props.files}
          renderItem={({ item }) => <ItemImage onChatSelectedFileChange={this.props.onChatSelectedFileChange} image={item} />}
          keyExtractor={item => item}
          listKey={item => item}
        />
      </View>
    );
  }

  getMessageText(){
    if(this.props.text != ""){
      return(
        <View>
          <Text style={styles.itemStyle, {marginLeft: 10, fontSize: 12}}>{this.getUserName()}</Text>
          <Text style={styles.itemStyle, {marginLeft: 10}}>{this.props.text}</Text>
        </View>)
    }
  }

  getUserName(){
    console.log("userName1", this.props.userId)
    for(var i = 0; i < this.props.allUsers.length; i++){
      if(this.props.me){
        if(this.props.allUsers[i].userId == this.props.userId){
          return this.props.allUsers[i].fullName
        }
      }else{
        if(this.props.allUsers[i].id == this.props.userId){
          return this.props.allUsers[i].fullName
        }
      }
    }
  }
}



class ItemImage extends React.Component {
  render() {
    return (
        getImage(this.props.image, this.props.onChatSelectedFileChange)
    );
  }
}

function getImage(image, onChatSelectedFileChange) {
  switch (image.substring(image.length - 3)) {
    /*case 'lsx':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_xls.png')}
        />
      );
    case 'xls':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_xls.png')}
        />
      );*/

    case 'pdf':
      return (
        <TouchableOpacity
          onPress = {() => {
            onChatSelectedFileChange(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#81A4BD",
          padding: 5,
          marginHorizontal: 5
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_pdf.png')}
          />
        </TouchableOpacity>
      );
    case 'png':
      return (
        <TouchableOpacity
          onPress = {() => {
            onChatSelectedFileChange(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#81A4BD",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.osbb365.com' + image }}
        />
        </TouchableOpacity>
      );
    case 'jpg':
      return (
        <TouchableOpacity
          onPress = {() => {
            onChatSelectedFileChange(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#81A4BD",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.osbb365.com' + image }}
        />
        </TouchableOpacity>
      );
    case 'svg':
      return (
        <TouchableOpacity
          onPress = {() => {
            onChatSelectedFileChange(image);
          }
        }
        style={{
          marginVertical: 5,
          alignItems: "center",
          backgroundColor: "#81A4BD",
          padding: 5,
          marginHorizontal: 5
        }}>
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
          source={{ uri: 'https://app.osbb365.com' + image }}
        />
        </TouchableOpacity>
      );
    default: return null;
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
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  myMessageStyle: {
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ADD9FA',
  },
  messageContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 3,
  },
  itemStyle: {
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
    margin: 7,
  },
});
