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
import {Linking} from 'react-native'

export default class ScreenProfile extends React.Component {
  state = { showPassword: false };
  
  toggleSwitch = value => {
    this.props.setShowPasswords(value);
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(result.cancelled == true) return
    let photo = { uri: result.uri };
    let formdata = new FormData();
    formdata.append('photo', {
      uri: photo.uri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    this.props.sendNewPhoto(formdata, 
      this.props.accountId, 
      this.props.osbbId, 
      this.props.workPeriods, 
      this.props.token)
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
          {
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
              <Text style={{ marginTop: 15, marginBottom: 10, color: '#002B2B', fontSize: 18 }}>
                Загальне
              </Text>
              <TouchableOpacity onPress={this._pickImage}>
                {this.getAvatar()}
              </TouchableOpacity>
              <View style={styles.container}>
              <View style={{width: '80%', marginVertical: 15}}>       
                <TouchableOpacity
                  onPress={() => {
                    this.props.deletePhoto(this.props.accountIds, 
                      this.props.osbbId, 
                      this.props.workPeriods, 
                      this.props.token)
                  }}
                  style={{backgroundColor: "#364A5F", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12, paddingHorizontal: 10}}
                >
                  <Text style={{color: 'white', fontSize: 15}}>ВИДАЛИТИ ФОТО</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={{ width: 40, height: 35, marginLeft: 20 }} onPress={() => {
                  Linking.openURL(`tel:${this.props.phoneNumber == null ? this.props.userData.phone : this.props.phoneNumber}`)
                }}>
                  <Image
                    style={{ width: 40, height: 35}}
                    source={require('../../images/ic_phone.png')}
                  />
                </TouchableOpacity>
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
              <Text style={{ marginTop: 15, color: '#002B2B', fontSize: 18 }}>
                Змінити пароль
              </Text>
              <View style={styles.containerSwitch}>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitch}
                  value={this.props.showPasswords}
                />
                <Text style={{ marginTop: 15, color: '#002B2B' }}>
                  Показувати пароль: {this.props.showPasswords ? 'Так' : 'Ні'}
                </Text>
              </View>
              <View style={styles.conteinerInput}>
                <TextInput
                  value={this.props.oldPassword}
                  onChangeText={text => {
                    this.props.setOldPassword(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Старий пароль"
                  style={styles.inputStyle}
                />
                <TextInput
                  value={this.props.newPassword}
                  onChangeText={text => {
                    this.props.setNewPassword(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Новий пароль"
                  style={styles.inputStyle}
                />
                <TextInput
                  value={this.props.newRepeatPassword}
                  onChangeText={text => {
                    this.props.setNewRepeatPassword(text);
                  }}
                  secureTextEntry={!this.props.showPasswords}
                  placeholder="Повторіть новий пароль"
                  style={styles.inputStyle}
                />
              </View>
              <View style={styles.buttonStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.props.sendNewPassword(this.props.oldPassword, this.props.newPassword, this.props.newRepeatPassword, this.props.token);
                }
              }
                style={{backgroundColor: "#364A5F", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}
              >
                <Text style={{color: 'white', fontSize: 15}}>ЗБЕРЕГТИ</Text>
              </TouchableOpacity>
                
              </View>
            </View>
            <View style={styles.container}>
              <View style={{width: '80%', marginVertical: 15}}>
                
              <TouchableOpacity
                  onPress={() => {
                    this.props.setAuthMethod(null)
                    this.props.navigation.navigate('Auth')
                  }}
                  style={{backgroundColor: "#364A5F", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}
                >
                <Text style={{color: 'white', fontSize: 15}}>ВИЙТИ З АККАУНТУ</Text>
              </TouchableOpacity>
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
    borderRadius: 15,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center'
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
