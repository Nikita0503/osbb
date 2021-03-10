import React, { Component } from "react";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";

import DrawerContentContainer from "./components/DrawerContentContainer";
import MyApartmentContainer from "./screens/pages/home/myApartment/MyApartmentContainer";
import WebViewLiqpayContainer from "./screens/pages/liqpay/WebViewLiqpayContainer";
import PaymentSelectionContainer from "./screens/pages/liqpay/PaymentSelectionContainer";
import PaymentContainer from "./screens/pages/home/myApartment/PaymentContainer";
import AccrualHistoryContainer from "./screens/pages/home/myApartment/AccrualHistoryContainer";
import MyHouseContainer from "./screens/pages/home/myHouse/MyHouseContainer";
import HouseExpensesContainer from "./screens/pages/home/myHouse/HouseExpensesContainer";
import ActOfReconciliationContainer from "./screens/pages/home/ActOfReconciliationContainer";
import ApplicationsAndOffersContainer from "./screens/pages/offers/ApplicationsAndOffersContainer";
import AddOfferContainer from "./screens/pages/offers/AddOfferContainer";
import OfferContainer from "./screens/pages/offers/offer/OfferContainer";
import AddCommentToOfferContainer from "./screens/pages/offers/offer/AddCommentToOfferContainer";
import AdvertisementContainer from "./screens/pages/header/advertisements/AdvertisementContainer";
import AddCommentToAdvertisementContainer from "./screens/pages/header/advertisements/AddCommentToAdvertisementContainer";
import ChatContainer from "./screens/pages/header/chats/ChatContainer";
import ChatsContainer from "./screens/pages/header/chats/ChatsContainer";
import ProfileContainer from "./screens/pages/ProfileContainer";
import FlatInfoContainer from "./screens/pages/FlatInfoContainer";
import AboutHouseContainer from "./screens/pages/AboutHouseContainer";
import SupportContainer from "./screens/pages/header/SupportContainer";
import LoadingContainer from "./screens/loading/LoadingContainer";
import SendIndicationsContainer from "./screens/pages/SendIndicationsContainer";
import LoginContainer from "./screens/auth/LoginContainer";
import QRScannerContainer from "./screens/auth/QRScannerContainer";

const MyApartmentNavigator = createStackNavigator({
  MyApartment: {
    screen: MyApartmentContainer,
    navigationOptions: { header: null },
  },
  AccrualHistory: {
    screen: AccrualHistoryContainer,
    navigationOptions: { header: null },
  },
  Payment: { screen: PaymentContainer, navigationOptions: { header: null } },
});

const MyHouseNavigator = createStackNavigator({
  MyHouse: { screen: MyHouseContainer, navigationOptions: { header: null } },
  HouseExpenses: {
    screen: HouseExpensesContainer,
    navigationOptions: { header: null },
  },
});

const TabNavigatorMainScreen = createBottomTabNavigator(
  {
    Нарахування: MyApartmentNavigator,
    "Мій будинок": MyHouseNavigator,
    "Акт звіряння": ActOfReconciliationContainer,
  },
  {
    navigationOptions: {
      swipeEnabled: true,
      animationEnabled: true,
    },
    tabBarOptions: {
      activeTintColor: "#364A5F",
      inactiveTintColor: "#CDCDCD",
      style: {
        height: 35,
        marginBottom: 15,
        justifyContent: "center",
        alignContent: "center",
      },
    },
  }
);

const AllOffersNavigator = createStackNavigator({
  AllOffers: {
    screen: ApplicationsAndOffersContainer,
    navigationOptions: { header: null },
  },
  AddOffer: { screen: AddOfferContainer, navigationOptions: { header: null } },
});

const CommentNavigator = createStackNavigator({
  ScreenOffer: { screen: OfferContainer, navigationOptions: { header: null } },
  AddCommentToOffer: {
    screen: AddCommentToOfferContainer,
    navigationOptions: { header: null },
  },
});

const OffersNavigator = createStackNavigator({
  ApplicationsAndOffers: {
    screen: AllOffersNavigator,
    navigationOptions: { header: null },
  },
  Offer: { screen: CommentNavigator, navigationOptions: { header: null } },
});

const AdvertisementNavigator = createStackNavigator({
  AllAdvertisements: {
    screen: AdvertisementContainer,
    navigationOptions: { header: null },
  },
  AddCommentToAdvertisement: {
    screen: AddCommentToAdvertisementContainer,
    navigationOptions: { header: null },
  },
});

const ChatNavigator = createStackNavigator({
  AllChats: { screen: ChatsContainer, navigationOptions: { header: null } },
  Chat: { screen: ChatContainer, navigationOptions: { header: null } },
});

const DrawerNavigator = createDrawerNavigator(
  {
    WebViewLiqpay: {
      screen: WebViewLiqpayContainer,
      navigationOptions: { title: "Оплата" },
    },
    PaymentSelection: {
      screen: PaymentSelectionContainer,
      navigationOptions: { header: null },
    },
    Loading: { screen: LoadingContainer },
    Profile: { screen: ProfileContainer },
    Home: { screen: TabNavigatorMainScreen },
    FlatInfo: { screen: FlatInfoContainer },
    SendIndications: { screen: SendIndicationsContainer },
    ApplicationsAndOffers: { screen: OffersNavigator },
    AboutHouse: { screen: AboutHouseContainer },
    Advertisement: { screen: AdvertisementNavigator },
    Chats: { screen: ChatNavigator },
    Support: { screen: SupportContainer },
  },
  {
    drawerBackgroundColor: "#364A5F",
    contentOptions: {
      labelStyle: {
        color: "white",
      },
      activeTintColor: "white",
      activeBackgroundColor: "#2B3B4C",
    },
    contentComponent: DrawerContentContainer,
    initialRouteName: "Home",
  }
);

const AuthStack = createStackNavigator({
  SignIn: { screen: LoginContainer, navigationOptions: { header: null } },
  QRScanner: {
    screen: QRScannerContainer,
    navigationOptions: { title: "Відскануйте QR код" },
  },
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: AuthStack },
  App: { screen: DrawerNavigator },
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
