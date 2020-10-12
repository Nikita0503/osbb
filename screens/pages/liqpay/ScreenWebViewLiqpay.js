import * as React from 'react';
import { WebView } from 'react-native-webview';
import { FlatList, ActivityIndicator, Text, View, Image, BackHandler, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

export default class ScreenWebViewLiqpay extends React.Component {
  constructor(props) {
    super(props);
    this.props.setLoading(true)
  }

  backAction = () => {
    this.props.navigation.navigate('PaymentSelection');
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    
    var details = {
      private_key: this.props.liqpayData[0].liqPayPrivateKey,
      public_key: this.props.liqpayData[0].liqPayPublicKey,
      json:
        '{"public_key":"' +
        this.props.liqpayData[0].liqPayPublicKey +
        '","version":"3","action":"pay","amount":"' +
        this.props.selectedChargeValue +
        '","currency":"UAH","description":"' +
        this.getDescription() +
        '","order_id":"' +
        this.getOrderId() +
        '","language":"uk"' +
        '}',
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    this.props.sendPaymentRequest(formBody)
  }

  getOrderId(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    var orderId = year + ".";
    if(month < 10){
      orderId += "0"
    }
    orderId += month + "."

    if(day < 10){
      orderId += "0"
    }
    orderId += day + "_"

    if(hours < 10){
      orderId += "0"
    }
    orderId += hours + ":"

    if(minutes < 10){
      orderId += "0"
    }
    orderId += minutes + ":"

    if(seconds < 10){
      orderId += "0"
    }
    orderId += seconds

    orderId += "_о.р." + this.props.accountId.number;
    orderId += "_" + this.props.userData.firstName;
    orderId += "_" + this.props.userData.lastName;
    orderId += "_" + this.props.userData.patronymic;
    var service = this.props.selectedChargeContribution.replace(" ", "_")
    orderId += "_" + service
    return orderId;
  }

  getDescription(){
    //{"action":"pay","amount":202.35,
    //"currency":"UAH","description":"О.р. 8 имя Прізвище Отчество Услуга",
    //"order_id":"2020.09.16_15:06:45_о.р.8_имя_Прізвище_Отчество_Услуга",
    //"version":"3","public_key":"i45497868202"}
    var description = "О.р. " + this.props.accountId.number;
    description += " " + this.props.userData.firstName;
    description += " " + this.props.userData.lastName;
    description += " " + this.props.userData.patronymic;
    description += " " + this.props.selectedChargeContribution;
    //console.log("LIQPAY", orderId)
    return description
  }

  _onNavigationStateChange(webViewState){
    if(webViewState.url == 'https://sapo365.com/tenant#/home'){
      this.backAction()
    }
  }

  getWebView(){
    var width = Dimensions.get('window').width;
    //console.log("LIQPAY", width)
    return(
    <WebView
      originWhitelist={['*']}
      onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      source={{
        html:
          '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8"> <input type="hidden" name="data" value="' +
          this.props.data +
          '"/><input type="hidden" name="signature" value="' +
          this.props.signature +
          '"/><input style="width: ' + width + '; margin-left: 30%; margin-top: 60%" type="image" src="https://static.liqpay.ua/buttons/p1ru.radius.png"/></form>',
      }}
      style={{width: '100%', alignSelf: 'center'}}
    />);
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#54687D'}}>        
        <NavigationEvents
          onDidFocus={() => {
            this.componentDidMount();
          }}
        />
        <View
          style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'space-between'}}>
          <View style={{width: '100%', height: 85, backgroundColor: '#54687D', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{marginTop: 45}} onPress={()=>{
              this.props.navigation.goBack(null)
              this.props.navigation.navigate('PaymentSelection');
            }}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 20 }}
                source={require('../../../images/ic_left_row.png')}
              />
            </TouchableOpacity>
          <Text style={{marginTop: 45, marginEnd: 20, color: 'white'}}>Оплата</Text>
          </View>
          <View style={{width: '100%', height: '80%', justifyContent: 'center', alignSelf: 'center', borderBottomWidth: 1, borderStartWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: 'green'}}>
            {this.getWebView()}
          </View>
          <Text style={{backgroundColor: "white", padding: 10, textAlign: 'center', color: "#002B2B"}}>Оплата відобразиться у додатку після її обробки бухгалтером САПО</Text>
        </View>
      </View>
    );
  }
}