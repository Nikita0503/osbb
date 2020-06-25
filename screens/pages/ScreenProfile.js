import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import PageHeader from '../../components/PageHeader';
import * as ImagePicker from 'expo-image-picker';
import ImageAvatar from 'react-native-image-progress';
import { TextInputMask } from 'react-native-masked-text'

export default class ScreenProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeShowPasswords = this.onChangeShowPasswords.bind(this);
    this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onNewRepeatPasswordChange = this.onNewRepeatPasswordChange.bind(this);
    this.onAvatarImageChange = this.onAvatarImageChange.bind(this);
  }

  onChangeShowPasswords(showPasswords) {
    this.props.setShowPasswords(showPasswords);
  }

  onOldPasswordChange(oldPassword) {
    this.props.setOldPassword(oldPassword);
  }

  onNewPasswordChange(newPassword) {
    this.props.setNewPassword(newPassword);
  }

  onNewRepeatPasswordChange(newRepeatPassword) {
    this.props.setNewRepeatPassword(newRepeatPassword);
  }

  onAvatarImageChange(photo){
    this.props.setAvatarImage(photo);
  }

  state = { showPassword: false };
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called

    //this.setState({ showPassword: value,
    //                image: null });

    this.onChangeShowPasswords(value);

    //state changes according to switch
    //which will result in re-render the text
  };
  callFun = () => {
    alert('Image Clicked122');
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("123", result)
    if(result.cancelled == true) return
    let photo = { uri: result.uri };
    let formdata = new FormData();

    formdata.append('photo', {
      uri: photo.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    fetch('https://app.osbb365.com/api/upload/photo?accountId=' + this.props.accountId + '&osbbId=' + this.props.osbbId +'&type=photo&workPeriod=' + this.props.workPeriods[this.props.workPeriods.length - 1], {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
    .then(response => response.json())
    .then(responseJson => {
      if(responseJson.filename == null){
        Alert.alert(
          'Помилка',
          responseJson.message,
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
        return;
      }
      var details = {
        photo: responseJson.filename,
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('https://app.osbb365.com/api/user/me', {
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: formBody,
      })
      .then(response => response.json())
      .then(responseJson1 => {
        
        this.onAvatarImageChange(responseJson.filename)
        this.render();
      }).catch(err => {
        console.log(err)
      });
      console.log("filename", responseJson.filename);
    })
    .catch(err => {
      console.log(err);
    });

    console.log("result", result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  getAvatar(){
    if(this.props.imageAvatar == 'deleted'){
      return(<ImageAvatar
        indicator='bar' 
        source={   
          require('../../images/add.png')
        }
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
      />);
    }
    if(this.props.imageAvatar != null){
      console.log("imageAvatar", this.props.imageAvatar)
      return(<ImageAvatar
        indicator='bar' 
        source={
          this.props.userData.photo == null
            ? require('../../images/add.png')
            : {
                uri:
                  'https://app.osbb365.com' +
                  this.props.imageAvatar,
              }
        }
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
      />);
    }
    
    if(this.props.userData == null){
      return;
    }
    console.log("userPhoto", this.props.userData)
    return(<ImageAvatar
      indicator='bar' 
      source={
        this.props.userData.photo == null
          ? require('../../images/add.png')
          : {
              uri:
                'https://app.osbb365.com' +
                this.props.userData.photo,
            }
      }
      style={{ width: 300, height: 300, resizeMode: 'contain' }}
    />);
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
          
          <PageHeader
            style={{ flex: 1 }}
            navigation={this.props.navigation}
            title="Профіль"
          />
          <ScrollView>
            <View style={styles.container}>
              <Text style={{ marginTop: 15, color: '#364A5F', fontSize: 18 }}>
                Загальне
              </Text>
              <TouchableOpacity onPress={this._pickImage}>
                {this.getAvatar()}
              </TouchableOpacity>
              <View style={styles.container}>
              <View style={{width: '80%', marginVertical: 15}}>
                <Button
                  title="Видалити фото"
                  color="#5682A3"
                  onPress={() => {
                    fetch(
                      'https://app.osbb365.com/api/user/me/photo?accountId=' +
                        this.props.accountIds[0].id +
                        '&osbbId=' +
                        this.props.osbbId +
                        '&workPeriod=' +
                        this.props.workPeriods[this.props.workPeriods.length - 1],
                      {
                        method: 'DELETE',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                          Authorization: 'Bearer ' + this.props.token + '',
                        },
                      }
                    )
                      .then(responseJson => {
                        this.onAvatarImageChange('deleted')
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  }}
                />
              </View>
            </View>
              <View style={styles.containerEmail}>
                <Image
                  style={{ width: 40, height: 35, marginLeft: 20 }}
                  source={require('../../images/ic_email.png')}
                />
                <TextInput
                  editable={false}
                  value={this.props.userData.login}
                  keyboardType="email-address"
                  placeholder="Електронна адреса"
                  style={{
                    width: 230,
                    height: 40,
                    marginLeft: 10,
                    marginEnd: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C5C5C5',
                  }}
                />
              </View>
              <View style={styles.containerEmail}>
                <Image
                  style={{ width: 40, height: 35, marginLeft: 20 }}
                  source={require('../../images/ic_phone.png')}
                />
                
                <TextInputMask
                  maxLength={14}
                  type={'cel-phone'}
                  placeholder="Номер телефону"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(999) 999-9999'
                  }}
                  value={this.props.phoneNumber == null ? this.props.userData.phone : this.props.phoneNumber}
                  onChangeText={text => {
                    this.props.setPhoneNumber(text);
                  }}
                  onEndEditing={() => {
                    if(this.props.phoneNumber == '') {
                      this.props.setPhoneNumber(null)
                    }else{
                      var userData = this.props.userData;
                      userData.phone = this.props.phoneNumber;
                      this.props.setUserData(userData)
                    }
                  }}
                  style={{
                    width: 230,
                    height: 40,
                    marginLeft: 10,
                    marginEnd: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C5C5C5',
                  }}
                />
              </View>
              <View style={styles.conteinerInput}>
                <TextInput
                  editable={false}
                  placeholder="Повне ім`я"
                  value={this.props.userData.firstName}
                  style={styles.inputStyle}
                />
                <TextInput
                  editable={false}
                  placeholder="Прізвище"
                  value={this.props.userData.lastName}
                  style={styles.inputStyle}
                />
                <TextInput
                  editable={false}
                  placeholder="По батькові"
                  value={this.props.userData.patronymic}
                  style={styles.inputStyle}
                />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={{ marginTop: 15, color: '#364A5F', fontSize: 18 }}>
                Змінити пароль
              </Text>
              <View style={styles.containerSwitch}>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitch}
                  value={this.props.showPasswords}
                />
                <Text style={{ marginTop: 15, color: '#364A5F' }}>
                  Показувати пароль: {this.props.showPasswords ? 'Так' : 'Ні'}
                </Text>
              </View>
              <View style={styles.conteinerInput}>
                <TextInput
                  value={this.props.oldPassword}
                  onChangeText={text => {
                    this.onOldPasswordChange(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Старий пароль"
                  style={styles.inputStyle}
                />
                <TextInput
                  value={this.props.newPassword}
                  onChangeText={text => {
                    this.onNewPasswordChange(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Новий пароль"
                  style={styles.inputStyle}
                />
                <TextInput
                  value={this.props.newRepeatPassword}
                  onChangeText={text => {
                    this.onNewRepeatPasswordChange(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Повторіть новий пароль"
                  style={styles.inputStyle}
                />
              </View>
              <View style={styles.buttonStyle}>
                <Button
                  title="Зберегти"
                  color="#5682A3"
                  onPress={() => {
                    sendNewPassword(this.props, this.onOldPasswordChange, this.onNewPasswordChange, this.onNewRepeatPasswordChange);
                  }}
                />
              </View>
            </View>
            <View style={styles.container}>
              <View style={{width: '80%', marginVertical: 15}}>
                <Button
                  title="Вийти з аккаунту"
                  color="#5682A3"
                  onPress={() => {
                    this.props.setTokenDeviceId('')
                    this.props.navigation.navigate('Auth')
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function sendNewPassword(props, onOldPasswordChange, onNewPasswordChange, onNewRepeatPasswordChange) {
  fetch('https://app.osbb365.com/api/user/me/password', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + props.token + '',
    },
    body: JSON.stringify({
      oldPassword: props.oldPassword,
      newPassword: props.newPassword,
      confirmNewPassword: props.newRepeatPassword,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      Alert.alert(
        'Пароль',
        responseJson.message + '',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    })
    .catch(error => {
      Alert.alert(
        'Пароль',
        'Пароль успішно змінено',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
      onOldPasswordChange('');
      onNewPasswordChange('');
      onNewRepeatPasswordChange('');
      console.error(error);
    });
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerEmail: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  containerSwitch: {
    marginLeft: 30,
    marginEnd: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  conteinerInput: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10,
  },
  inputStyle: {
    height: 40,
    marginLeft: 30,
    marginEnd: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C5C5C5',
  },
  buttonStyle: {
    width: '80%',
    marginBottom: 20,
  },
});
