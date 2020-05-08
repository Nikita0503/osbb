import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default class ScreenLoading extends React.Component {
  isLoaded() {
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
        <View style={{backgroundColor: '#36678D',}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', marginTop: 60,  marginBottom: 30, height: 250}} source={require('../../images/logo_white.png')}/>  
        </View>
        <ActivityIndicator size="large" style={styles.loader} color="#36678D" />
        <Text style={{color: '#36678D', fontSize: 16, marginTop: 100, alignSelf: 'center'}}>Зачекайте, дані завантажуються</Text>
        {this.isLoaded()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
