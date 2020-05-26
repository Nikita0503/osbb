import * as React from 'react';
import { WebView } from 'react-native-webview';
import { FlatList, ActivityIndicator, Text, View, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ScreenWebViewLiqpay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    console.log('liqpayData', this.props);
    var d = new Date();
    //var n = d.getTime();
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
        '"}',
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://www.liqpay.ua/apiweb/sandbox/get_data_signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          data: responseJson.data,
          signature: responseJson.signature,
        });
        console.log('1235', this.state);
      });
  }

  getWebView(){
    return(<WebView
      originWhitelist={['*']}
      source={{
        html:
          '<form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8"> <input type="hidden" name="data" value="' +
          this.state.data +
          '"/><input type="hidden" name="signature" value="' +
          this.state.signature +
          '"/><input style="width: 500; margin-left: 24%; margin-top: 60%" type="image" src="https://static.liqpay.ua/buttons/p1ru.radius.png"/></form>',
      }}
      style={{ width: '100%'}}
    />);
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%', backgroundColor: '#54687D'}}>
        <NavigationEvents
          onDidFocus={() => {
            console.log('I am triggered');
            this.componentDidMount();
          }}
        />
        <TouchableOpacity onPress={()=>{
          this.props.navigation.goBack(null)
        }}>
        <View style={{width: '100%', height: 60, backgroundColor: '#54687D', marginTop: 25}}>
          <Text style={{fontSize: 45, color: 'white', marginTop: 5, marginStart: 10}}>←</Text>
        </View>
        </TouchableOpacity>
        {this.getWebView()}
      </View>
    );
  }
}
