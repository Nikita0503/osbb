import React, { Component } from 'react';

import { View, Image, TouchableOpacity,
        StyleSheet, Text } from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';


import DrawerContentComponents from './components/DrawerContentComponents';
import DrawerContentContainer from './components/DrawerContentContainer';

import ScreenProfile from './screens/pages/ScreenProfile';
import ScreenFlatInfo from './screens/pages/ScreenFlatInfo';
import ScreenSendIndications from './screens/pages/ScreenSendIndications';

import ScreenApplicationsAndOffers from './screens/pages/offers/ScreenApplicationsAndOffers';
import ScreenOffer from './screens/pages/offers/offer/ScreenOffer';
import ScreenAddOffer from './screens/pages/offers/ScreenAddOffer';
import ScreenAddCommentToOffer from './screens/pages/offers/offer/ScreenAddCommentToOffer';

import ScreenAboutHouse from './screens/pages/ScreenAboutHouse';

import ScreenMyApartment from './screens/pages/home/myApartment/ScreenMyApartment';
import ScreenAccrualHistory from './screens/pages/home/myApartment/ScreenAccrualHistory';
import ScreenPayment from './screens/pages/home/myApartment/ScreenPayment';

import ScreenMyHouse from './screens/pages/home/myHouse/ScreenMyHouse';
import ScreenHouseExpenses from './screens/pages/home/myHouse/ScreenHouseExpenses';
import ScreenPlansForHouse from './screens/pages/home/myHouse/ScreenPlansForHouse';

import ScreenActOfReconciliation from './screens/pages/home/ScreenActOfReconciliation';


import ScreenSupport from './screens/pages/header/ScreenSupport';

import ScreenAdvertisement from './screens/pages/header/advertisements/ScreenAdvertisement';
import ScreenAddAdvertisement from './screens/pages/header/advertisements/ScreenAddAdvertisement';
import ScreenAddCommentToAdvertisement from './screens/pages/header/advertisements/ScreenAddCommentToAdvertisement'

import ScreenChats from './screens/pages/header/chats/ScreenChats';
import ScreenChat from './screens/pages/header/chats/ScreenChat';


import ScreenLogin from './screens/auth/ScreenLogin';
import ScreenQRScanner from './screens/auth/ScreenQRScanner';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './store/reducers';
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';



const store = createStore(rootReducer);
const persistor = persistStore(store);


class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>           
        </TouchableOpacity>
      </View>
    );
  }
}

const TabBarComponent = props => <BottomTabBar {...props} />;

import MyApartmentContainer from './screens/pages/home/myApartment/MyApartmentContainer';
import WebViewLiqpayContainer from './screens/pages/liqpay/WebViewLiqpayContainer';
import PaymentSelectionContainer from './screens/pages/liqpay/PaymentSelectionContainer'
import PaymentContainer from './screens/pages/home/myApartment/PaymentContainer'
import AccrualHistoryContainer from './screens/pages/home/myApartment/AccrualHistoryContainer'

const MyApartmentNavigator = createStackNavigator({
  MyApartment: {screen: MyApartmentContainer, navigationOptions: {header: null}},
  
  AccrualHistory: {screen: AccrualHistoryContainer, navigationOptions: {header: null}},
  Payment: {screen: PaymentContainer, navigationOptions: {header: null}},
});

import MyHouseContainer from './screens/pages/home/myHouse/MyHouseContainer'
import HouseExpensesContainer from './screens/pages/home/myHouse/HouseExpensesContainer'
const MyHouseNavigator = createStackNavigator({
  MyHouse: {screen: MyHouseContainer, navigationOptions: {header: null}},
  HouseExpenses: {screen: HouseExpensesContainer, navigationOptions: {header: null}},
});

import ActOfReconciliationContainer from './screens/pages/home/ActOfReconciliationContainer'
const TabNavigatorMainScreen = createBottomTabNavigator(
  {
    "Нарахування": MyApartmentNavigator,
    "Мій будинок": MyHouseNavigator,
    "Акт звіряння": ActOfReconciliationContainer
  },
  {
    navigationOptions:{
      swipeEnabled: true,
      animationEnabled: true,
    },
    tabBarOptions: {
    activeTintColor: '#364A5F',
    inactiveTintColor: '#CDCDCD',
    style:{
      height: 35,
      marginBottom: 15,
      justifyContent: 'center',
      alignContent: 'center'
    },
  }});

import ApplicationsAndOffersContainer from './screens/pages/offers/ApplicationsAndOffersContainer'
import AddOfferContainer from './screens/pages/offers/AddOfferContainer';

const AllOffersNavigator = createStackNavigator({
  AllOffers: {screen: ApplicationsAndOffersContainer, navigationOptions: {header: null}},
  AddOffer: {screen: AddOfferContainer, navigationOptions: {header: null}}
});

import OfferContainer from './screens/pages/offers/offer/OfferContainer';
import AddCommentToOfferContainer from './screens/pages/offers/offer/AddCommentToOfferContainer'

const CommentNavigator = createStackNavigator({
  ScreenOffer: {screen: OfferContainer, navigationOptions: {header: null}},
  AddCommentToOffer: {screen: AddCommentToOfferContainer, navigationOptions: {header: null}}
});

const OffersNavigator = createStackNavigator({
  ApplicationsAndOffers: {screen: AllOffersNavigator, navigationOptions: {header: null}},
  Offer: {screen: CommentNavigator, navigationOptions: {header: null}}
});

import AdvertisementContainer from './screens/pages/header/advertisements/AdvertisementContainer'
import AddCommentToAdvertisementContainer from './screens/pages/header/advertisements/AddCommentToAdvertisementContainer'

const AdvertisementNavigator = createStackNavigator({
  AllAdvertisements: {screen: AdvertisementContainer, navigationOptions: {header: null}},
  AddAdvertisement: {screen: ScreenAddAdvertisement, navigationOptions: {header: null}},
  AddCommentToAdvertisement: {screen: AddCommentToAdvertisementContainer, navigationOptions: {header: null}}
});

import ChatContainer from './screens/pages/header/chats/ChatContainer'
import ChatsContainer from './screens/pages/header/chats/ChatsContainer'

const ChatNavigator = createStackNavigator({
  AllChats: {screen: ChatsContainer, navigationOptions: {header: null}},
  Chat: {screen: ChatContainer, navigationOptions: {header: null}}
});


import ProfileContainer from './screens/pages/ProfileContainer';
import FlatInfoContainer from './screens/pages/FlatInfoContainer';
import AboutHouseContainer from './screens/pages/AboutHouseContainer';

import SupportContainer from './screens/pages/header/SupportContainer';
import LoadingContainer from './screens/loading/LoadingContainer'
import SendIndicationsContainer from './screens/pages/SendIndicationsContainer'

const DrawerNavigator = createDrawerNavigator({
  WebViewLiqpay: {screen: WebViewLiqpayContainer, navigationOptions:{title: 'Оплата'}}, 
  PaymentSelection: {screen: PaymentSelectionContainer, navigationOptions: {header: null}},
  Loading: {screen: LoadingContainer},
  Profile: {screen: ProfileContainer},
  Home: { screen: TabNavigatorMainScreen},
  FlatInfo: { screen: FlatInfoContainer},
  SendIndications: {screen: SendIndicationsContainer},
  ApplicationsAndOffers: {screen: OffersNavigator},
  AboutHouse: {screen: AboutHouseContainer},
  
  Advertisement: {screen: AdvertisementNavigator},
  Chats: {screen: ChatNavigator},
  Support: {screen: SupportContainer},

  PlansForHouse: {screen: ScreenPlansForHouse},
},
{
  drawerBackgroundColor: '#364A5F',
  contentOptions:{
      labelStyle: {
        color: 'white',
      },
      activeTintColor: 'white',
      activeBackgroundColor: '#2B3B4C',
      
  },
  contentComponent: DrawerContentContainer,
  initialRouteName: 'Home'
});

import LoginContainer from './screens/auth/LoginContainer';
import QRScannerContainer from './screens/auth/QRScannerContainer';
const AuthStack = createStackNavigator({SignIn: {screen: LoginContainer,  navigationOptions: {header: null}}, 
                                      QRScanner: {screen: QRScannerContainer, navigationOptions:{title: 'Відскануйте QR код'}}}); 

const AppNavigator = createSwitchNavigator({
  Auth: {screen: AuthStack},
  App: {screen: DrawerNavigator}
});

let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}