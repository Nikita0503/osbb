import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { white } from 'ansi-colors';

export default class DrawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={() => {
            this.props.navigation.navigate('Profile')
          }}> 
            <View style={[styles.headerContainer, (this.props.activeItemKey=='Profile') ? styles.activeBackgroundColor : null]}>
              <Image style={styles.iconHeader} source={require('../images/ic_profile.png')} />
              <Text style={styles.screenHeaderTextStyle}>Профіль</Text>
            </View>
          </TouchableOpacity>
            <View style={styles.screenContainer}>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.navigation.navigate('Home')
              }}> 
                <View style={[styles.screenStyle, (this.props.activeItemKey=='Home') ? styles.activeBackgroundColor : null]}>
                    <Image style={styles.icon} source={require('../images/ic_home.png')} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='Home') ? styles.selectedTextStyle : null]}>Головна</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.navigation.navigate('FlatInfo')
              }}> 
                <View style={[styles.screenStyle, (this.props.activeItemKey=='FlatInfo') ? styles.activeBackgroundColor : null]}>
                    <Image style={styles.icon} source={require('../images/ic_flat_info.png')} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='FlatInfo') ? styles.selectedTextStyle : null]}>Про квартиру</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.navigation.navigate('SendIndications')
              }}> 
                <View style={[styles.screenStyle, (this.props.activeItemKey=='SendIndications') ? styles.activeBackgroundColor : null]}>
                    <Image style={styles.icon} source={require('../images/ic_payments.png')} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='SendIndications') ? styles.selectedTextStyle : null]}>Передати покази</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.navigation.navigate('ApplicationsAndOffers')
              }}> 
                <View style={[styles.screenStyle, (this.props.activeItemKey=='ApplicationsAndOffers') ? styles.activeBackgroundColor : null]}>
                    <Image style={styles.icon} source={require('../images/ic_application_and_offers.png')} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='ApplicationsAndOffers') ? styles.selectedTextStyle : null]}>Заявки та пропозиції</Text>
                </View>  
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.navigation.navigate('AboutHouse')
              }}>             
                <View style={[styles.screenStyle, (this.props.activeItemKey=='AboutHouse') ? styles.activeBackgroundColor : null]}>
                    <Image style={styles.icon} source={require('../images/ic_about_house.png')} />
                    <Text style={[styles.screenTextStyle, (this.props.activeItemKey=='AboutHouse') ? styles.selectedTextStyle : null]}>Про ОСББ</Text>
                </View>
              </TouchableOpacity>
            </View>
            
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    screenContainer: { 
        paddingTop: 20,
        width: '100%',
    },
    screenStyle: {
        height: 50,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    screenTextStyle:{
        fontSize: 16,
        marginLeft: 10, 
        color: 'white',
        textAlign: 'center'
    },
    selectedTextStyle: {
        color: 'white'
    },
    activeBackgroundColor: {
        backgroundColor: '#2B3B4C'
    },
    icon: {
      width: 50,
      height: 50,
      marginLeft: 5
    },
    headerContainer: {
        width: 300,
        height: 170,
        alignItems: 'center'
    },
    iconHeader:{
      width: 100,
      height: 100,
      marginTop: 30,
    },
    screenHeaderTextStyle:{
      fontSize: 16,
      color: 'white',
      textAlign: 'center'
    }
});