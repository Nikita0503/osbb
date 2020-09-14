import * as React from 'react';
import { WebView } from 'react-native-webview';
import { FlatList, ActivityIndicator, Text, View, Image, BackHandler, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    var d = new Date();
    var details = {
      private_key: this.props.liqpayData[0].liqPayPrivateKey,
      public_key: this.props.liqpayData[0].liqPayPublicKey,
      json:
        '{"public_key":"' +
        this.props.liqpayData[0].liqPayPublicKey +
        '","version":"3","action":"pay","amount":"' +
        this.props.selectedChargeValue +
        '","currency":"UAH","description":"' +
        this.props.selectedChargeContribution +
        '","order_id":"' +
        d.getTime() +
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

  _onNavigationStateChange(webViewState){
    if(webViewState.url == 'https://sapo365.com/tenant#/home'){
      this.backAction()
    }
  }

  getWebView(){
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
          '"/><input style="width: 500; margin-left: 24%; margin-top: 60%" type="image" src="https://static.liqpay.ua/buttons/p1ru.radius.png"/></form>',
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
          <View style={{width: '90%', height: '80%', justifyContent: 'center', alignSelf: 'center', borderBottomWidth: 1, borderStartWidth: 1, borderRightWidth: 1, borderTopWidth: 1, borderColor: 'green'}}>
            {this.getWebView()}
          </View>
          <Text style={{backgroundColor: "white", padding: 10, textAlign: 'center', color: "#002B2B"}}>Оплата відобразиться у додатку після її обробки бухгалтером САПО</Text>
        </View>
      </View>
    );
  }
}
