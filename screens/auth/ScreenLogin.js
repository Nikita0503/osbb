import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { Constants } from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import { Checkbox } from 'react-native-paper';

export default class ScreenLogin extends React.Component {
  constructor(props){
    super(props);
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onTokenDeviceIdChange = this.onTokenDeviceIdChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onShowPasswordChange = this.onShowPasswordChange.bind(this);
  }

  onTokenChange(token){
    this.props.setToken(token);
  }

  onTokenDeviceIdChange(tokenDeviceId){
    this.props.setTokenDeviceId(tokenDeviceId);
  }

  onEmailChange(email){
    this.props.setEmail(email)
  }

  onPasswordChange(password){
    this.props.setPassword(password)
  }

  onShowPasswordChange(){
    this.props.setShowPassword()
  }

  showUniqId(){
    console.log(Expo.Constants.installationId)
  }

  signInApplicaion(){
    fetch('https://app.osbb365.com/login/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.tokenDeviceId,
        id: Expo.Constants.installationId
        //token: 'f5573fd6e07c01f027dfe1c3d39b74ee', norm
        //token: 'e0dc8ed1e04dddeadf20f4e64134a81a', //empty
        //token: '77bad9fb781d61c745f968cd7950a0c4', //yul
        //token: '0e4b8b07dd0053b00d1939caf33c1a52',
        //id: 'bde288e9-ab6d-44b1-9fa8-43c256ee4806'
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if(json.token == null){
        if(json.message == 'Пристрій заблокований'){
          Alert.alert(
            'Пристрій заблокований',
            "Активуйте ваш пристрій у особистому кабінеті (розділ 'Мобільні додатки')",
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
          )
        }
      }else{
        //alert(json.token)
        this.onTokenChange(json.token);
        this.props.navigation.navigate('App');
      }
      
      //this.props.navigation.navigate('App');
    })
    .catch((error) => {
      Alert.alert("Невірний токен. Спробуйте ще раз")
      console.error(error);
    });;
  }

  checkToken(){
    if(this.props.tokenDeviceId == '') {
      return
    }else{
      this.signInApplicaion();
    }
    //this.singUpApplication();
  }

  getLoginPassword(){
    return(<View style={styles.container}>
      <View style={{backgroundColor: '#F7F7F7', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
        <TextInput
          keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
          onChangeText={(text) => {this.onEmailChange(text)}}
          value={this.props.email} 
          style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}}  placeholder="Email" />
      </View>
      <View style={{backgroundColor: '#F7F7F7', marginTop: 10, marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
      <TextInput
        onChangeText={(text) => {this.onPasswordChange(text)}}
        value={this.props.password}
        secureTextEntry={!this.props.shownPassword}
        autoCapitalize = 'none' 
        style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}} placeholder="Пароль" /> 
      </View>
     <View style={{flexDirection: 'row'}}>
        <Checkbox
          status={this.props.shownPassword ? 'checked' : 'unchecked'}
          
          onPress={() => {
            console.log(this.props)
            this.onShowPasswordChange()
          }}
        />
        <Text style={{marginTop: 8, marginLeft: 5}}>Показати пароль</Text>
      </View>
      <View style={{margin: 5}}>
      <TouchableOpacity
        onPress={() => {fetchTokenWithEmail(this.props.navigation, this.onTokenChange, this.props.email, this.props.password)}}
        style={{backgroundColor: "#5682A3", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}
      >
      <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
      </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center', margin: 5}}>
          <Text>Авторизуйтеся через E-mail</Text>
      </View>
    </View>)
  }

  componentDidMount(){
    NetInfo.fetch().then(state => {
      //console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if(!state.isConnected){
      Alert.alert(
          'Помилка',
          'Відсутнє інтернет з\'єднання!',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      }
    });
  }

  render() {
    return (
      <ScrollView>
        {this.checkToken()}
        <View style={{backgroundColor: '#36678D',}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../images/logo_white.png')}/>  
        </View>
        
        {this.getLoginPassword()}
        
        <View style={styles.container, {marginTop: 5}}>
          {this.showUniqId()}
          <View style={styles.container}>
            <View style={{backgroundColor: '#F7F7F7', marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
              <TextInput 
                onChangeText={(text) => {this.onTokenDeviceIdChange(text)}}
                value={this.props.tokenDeviceId} 
                style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, paddingBottom: 2, fontSize: 16, marginBottom: 7}} placeholder="Токен" editable={false} />
            </View>
            <View style={{margin: 5}}>
            <TouchableOpacity
                onPress={() => {this.signInApplicaion()}}
                style={{backgroundColor: "#5682A3", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}
              >
              <Text style={{color: 'white', fontSize: 15}}>Підключити</Text>
            </TouchableOpacity>
            </View>
            <View style={{margin: 5}}>
              <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('QRScanner')}}
                  style={{backgroundColor: "#5682A3", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}
                >
                <Text style={{color: 'white', fontSize: 15}}>Сканувати QR-код</Text>
              </TouchableOpacity>
              
            </View>
            <View style={{alignItems: 'center', margin: 5}}>
            <Text style={{textAlign: 'center'}}>Або через QR-код у Особистому кабінеті {"\n"}(розділ "Мобільні додатки")</Text>
          </View>
          </View>
        </View>
      </ScrollView>
      );
    }

   
}  

function fetchTokenWithEmail(navigation, onTokenChange, email, password){
  if(email == null || password == null) return
  fetch('https://app.osbb365.com/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    login: email.toLowerCase().trim(),
    password: password
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.token == null){
        Alert.alert("Невірний пароль")
        return
      }
      onTokenChange(responseJson.token);
      navigation.navigate('App');
      //alert(responseJson.token);
    });
}

function fetchToken(navigation, onTokenChange){
  fetch('https://app.osbb365.com/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    login: "evg_kr_ua.com@i.ua",
    password: "qweqwe"
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      onTokenChange(responseJson.token);
      navigation.navigate('App');
      //alert(responseJson.token);
    });
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    paddingBottom: 20,
    marginTop: 12,
    marginLeft: 50,
    marginEnd: 50,
    backgroundColor: 'white', 
  },
});