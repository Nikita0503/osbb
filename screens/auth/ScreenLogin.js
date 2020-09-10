import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { Constants } from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';
import { Checkbox } from 'react-native-paper';
const AUTH_METHOD_LOGIN = 0;
const AUTH_METHOD_QRCODE = 1;

export default class ScreenLogin extends React.Component {

  componentDidMount(){
    NetInfo.fetch().then(state => {
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
      }else{
        this.checkToken();
      }
    });
  }
  
  checkToken(){
    if(this.props.authMethod != null) {
      if(this.props.authMethod == AUTH_METHOD_LOGIN){
        this.props.fetchTokenByEmailPassword(this.props.email, this.props.password, this.props.navigation)
      }
      if(this.props.authMethod == AUTH_METHOD_QRCODE){
        this.props.signInDevice(this.props.tokenDeviceId, this.props.navigation)
      }
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{backgroundColor: '#36678D',}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../images/logo_white.png')}/>  
        </View>
        {this.getLoginPasswordForm()}
        {this.getQRCodeForm()}
      </ScrollView>
      );
    }

    getLoginPasswordForm(){
      return(<View style={styles.container}>
        <View style={{backgroundColor: '#F7F7F7', borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            keyboardType={Platform.OS === 'android' ? 'email-address' : 'ascii-capable'} 
            onChangeText={(text) => {this.props.setEmail(text)}}
            value={this.props.email} 
            style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}}  placeholder="Email" />
        </View>
        <View style={{backgroundColor: '#F7F7F7', marginTop: 10, marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
          <TextInput
            onChangeText={(text) => {this.props.setPassword(text)}}
            value={this.props.password}
            secureTextEntry={!this.props.shownPassword}
            autoCapitalize = 'none' 
            style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, fontSize: 16, marginBottom: 7, paddingBottom: 2}} placeholder="Пароль" /> 
        </View>
       <View style={{flexDirection: 'row'}}>
          <Checkbox
            status={this.props.shownPassword ? 'checked' : 'unchecked'}    
            onPress={() => {
              this.props.setShowPassword()
            }}/>
          <Text style={{marginTop: 8, marginLeft: 5}}>Показати пароль</Text>
        </View>
        <View style={{margin: 5}}>
          <TouchableOpacity
            onPress={() => {
              this.props.fetchTokenByEmailPassword(this.props.email, this.props.password, this.props.navigation)
            }}
            style={{backgroundColor: "#5682A3", alignItems: 'center', justifyContent: 'center', height: 35, borderRadius: 12}}>
            <Text style={{color: 'white', fontSize: 15}}>Увійти</Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', margin: 5}}>
            <Text>Авторизуйтеся через E-mail</Text>
        </View>
      </View>)
    }
  
    getQRCodeForm(){
      return (
        <View style={styles.container, {marginTop: 5}}>
            <View style={styles.container}>
              <View style={{backgroundColor: '#F7F7F7', marginBottom: 5, borderRadius: 12, paddingTop: 6, paddingBottom: 0, paddingHorizontal: 15, marginHorizontal: 5, }}>
                <TextInput 
                  onChangeText={(text) => {this.props.setTokenDeviceId(text)}}
                  value={this.props.tokenDeviceId} 
                  style={{borderColor: '#36678D', textAlign: 'center', borderBottomWidth: 1, paddingBottom: 2, fontSize: 16, marginBottom: 7}} placeholder="Токен" editable={false} />
              </View>
              <View style={{margin: 5}}>
              <TouchableOpacity
                  onPress={() => {this.props.signInDevice(this.props.tokenDeviceId, this.props.navigation)}}
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
      )
    }
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