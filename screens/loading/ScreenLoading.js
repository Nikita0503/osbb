import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

export default class ScreenLoading extends React.Component {
  isLoaded() {
    /*if (this.props.isActivated != null){
      if (this.props.isActivated){
        this.props.navigation.goBack();
      }else{
        Alert.alert('Повідомлення', 'Аккаунт не було активовано головою ОСББ', [
          {text: 'OK', onPress: () => {
            this.props.navigation.navigate('Auth')
            this.props.setIsActivated(null)
          }},
        ])
        this.props.navigation.goBack();
        
      }
    }else{
      return;
    }*/
    if (
      this.props.workPeriods.length == 0 &&
      this.props.allApartmentData.length == 0
    ) {
      return;
    } else {
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <View style={{backgroundColor: '#36678D', flexDirection: 'column'}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../images/logo_white.png')}/>  
        </View>
        <View style={{flexDirection: 'column'}}>
          <ActivityIndicator style={{marginTop: 30}} size="large" color="#36678D" />
          <Text style={{color: '#36678D', fontSize: 16, marginTop: 20, alignSelf: 'center'}}>Зачекайте, дані завантажуються</Text>
        </View>
        {this.isLoaded()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
