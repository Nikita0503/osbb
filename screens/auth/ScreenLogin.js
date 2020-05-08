import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { Constants } from 'expo-constants';

export default class ScreenLogin extends React.Component {
  constructor(props){
    super(props);
    this.onTokenChange = this.onTokenChange.bind(this);
    this.onTokenDeviceIdChange = this.onTokenDeviceIdChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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

  showUniqId(){
    console.log(Expo.Constants.installationId)
  }

  singUpApplication(){
    fetch('https://app.osbb365.com/register/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.props.tokenDeviceId,
        id: Expo.Constants.installationId,
      }),
    })
    .then((response) => {
      //console.log(response)
      //alert(json.message)
      //setTimeout(()=>{}, 2000);
      this.signInApplicaion();
    })
    .catch((error) => {
      Alert.alert("Неправильний QR-код. Спробуйте ще раз")
      console.error(error);
    });;
  }

  signInApplicaion(){
    fetch('https://app.osbb365.com/login/tenant/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /*token: this.props.tokenDeviceId,
        id: Expo.Constants.installationId*/
        //token: 'f5573fd6e07c01f027dfe1c3d39b74ee', norm
        //token: 'e0dc8ed1e04dddeadf20f4e64134a81a', empty
        //token: '77bad9fb781d61c745f968cd7950a0c4', yul
        token: '0e4b8b07dd0053b00d1939caf33c1a52',
        id: 'bde288e9-ab6d-44b1-9fa8-43c256ee4806'
      }),
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      if(json.token == null){
        Alert.alert(json.message)
      }else{
        //alert(json.token)
        this.onTokenChange(json.token);
        this.props.navigation.navigate('App');
      }
      
      //this.props.navigation.navigate('App');
    })
    .catch((error) => {
      Alert.alert("Неправильний QR-код. Спробуйте ще раз")
      console.error(error);
    });;
  }

  checkToken(){
    if(this.props.tokenDeviceId == '') {
      return
    }else{
      //alert("jopka")
      this.singUpApplication();
    }
    //this.singUpApplication();
  }

  getLoginPassword(){
    return(<View style={styles.container}>
      <TextInput 
        onChangeText={(text) => {this.onEmailChange(text)}}
        value={this.props.email} 
        style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 10}}  placeholder="Email" />
      <TextInput 
        onChangeText={(text) => {this.onPasswordChange(text)}}
        value={this.props.password}
        secureTextEntry={true}
        autoCapitalize = 'none' 
        style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 10}} placeholder="Пароль" /> 
      <View style={{margin: 5}}>
      <Button
        title="Увійти"
        color="#5682A3"
        onPress={() => {fetchTokenWithEmail(this.props.navigation, this.onTokenChange, this.props.email, this.props.password)}}
        
      />  
      </View>
    </View>)
  }

  render() {
    return (
      <ScrollView>
        <View style={{backgroundColor: '#36678D',}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../images/logo_white.png')}/>  
        </View>
        {this.checkToken()}
        

        <View style={styles.container, {marginTop: 5}}>
          {this.showUniqId()}
          <View style={styles.container}>
            <TextInput 
            onChangeText={(text) => {this.onTokenDeviceIdChange(text)}}
            value={this.props.tokenDeviceId} style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 10}} placeholder="Токен" editable={false} />
            <View style={{margin: 5}}>
            <Button
                title="Підключити"
                color="#5682A3"
                onPress={() => {
                    this.singUpApplication();
                    //this.props.navigation.navigate('App');
                    //fetchToken(this.props.navigation, this.onTokenChange);
                  }
                }
              />
            </View>
            <View style={{margin: 5}}>
              <Button
                title="QR код сканер"
                color="#5682A3"
                onPress={() => this.props.navigation.navigate('QRScanner')}
              /> 
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
    login: email,
    password: password
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.token == null){
        Alert.alert("Користувач не знайдений")
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
    padding: 5,
    marginLeft: 50,
    marginEnd: 50,
    marginTop: 15,
    marginBottom: 8,
    backgroundColor: 'white', 
  },
    
});