import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import PageHeader from '../../../components/PageHeader';
import * as ImagePicker from 'expo-image-picker';
import Dialog from 'react-native-dialog';
import { NavigationEvents } from 'react-navigation';

export default class ScreenPaymentSelection extends React.Component {
  constructor(props) {
    super(props);
    this.onLiqpayDataChange = this.onLiqpayDataChange.bind(this);
    this.onChargesDataChange = this.onChargesDataChange.bind(this);
    this.onSelectedChargeChange = this.onSelectedChargeChange.bind(this);
    this.onSelectedChargeValueChange = this.onSelectedChargeValueChange.bind(
      this
    );
    this.onSelectedChargeContributionChange = this.onSelectedChargeContributionChange.bind(
      this
    );
  }

  onLiqpayDataChange(liqpayData) {
    this.props.setLiqpayData(liqpayData);
  }

  onChargesDataChange(chargesData) {
    this.props.setChargesData(chargesData);
  }

  onSelectedChargeChange(selectedCharge) {
    this.props.setSelectedCharge(selectedCharge);
  }

  onSelectedChargeValueChange(selectedChargeValue) {
    this.props.setSelectedChargeValue(selectedChargeValue);
  }

  onSelectedChargeContributionChange(selectedChargeContribution) {
    this.props.setSelectedChargeContribution(selectedChargeContribution);
  }

  componentDidMount() {
    this.onLiqpayDataChange(null);
    this.onChargesDataChange(null);
    this.onSelectedChargeChange(null);
    this.onSelectedChargeValueChange(null);
    this.fetchLiqpayData();
    this.fetchChargesData();
  }

  fetchLiqpayData() {
    fetch(
      'https://app.osbb365.com/api/tenant/checkLiqPay?accountId=' +
        this.props.accountId.id +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[this.props.workPeriods.length - 1],
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('onLiqpayDataChange', responseJson);
        this.onLiqpayDataChange(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchChargesData() {
    //console.log('fetchChargesData', this.props);
    fetch(
      'https://app.osbb365.com/api/tenant/charges/total?accountId=' +
        this.props.accountId.id +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[this.props.workPeriods.length - 1],
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        var sum = getSum(responseJson.chargesList);
        responseJson.chargesList.push({
          caption: "Всього",
          finishBalance: sum
        })
        console.log('onChargesDataChange', responseJson);
        this.onChargesDataChange(responseJson.chargesList);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getChargesData() {
    if (this.props.chargesData == null) {
      //console.log('getChargesData', 'null');
      return;
    }
    //console.log('getChargesData', this.props.chargesData);
    return this.props.chargesData;
  }

  getDialog() {
    if (this.props.selectedCharge == null) return;
    return (
      <Dialog.Container
        visible={this.props.selectedCharge != null ? true : false}>
        <Dialog.Title>{this.props.selectedCharge.contribution}</Dialog.Title>
        <Dialog.Input
          onChangeText={text => this.onSelectedChargeValueChange(text)}
          value={this.props.selectedChargeValue}
          label="Введіть суму"
          keyboardType={'decimal-pad'}
          wrapperStyle={{
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
          }}
        />
        <Dialog.Button
          label="Відмінити"
          onPress={() => {
            this.onSelectedChargeContributionChange(null);
            this.onSelectedChargeChange(null);
            this.onSelectedChargeValueChange(null);
          }}
        />
        <Dialog.Button
          label="Оплатити"
          onPress={() => {
            //WebViewLiqpay
            this.onSelectedChargeContributionChange(
              this.props.selectedCharge.contribution
            );
            this.onSelectedChargeChange(null);
            this.props.navigation.navigate('WebViewLiqpay');
          }}
        />
      </Dialog.Container>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <NavigationEvents
          onDidFocus={() => {
            console.log('I am triggered');
            this.componentDidMount();
          }}
        />
        <View
          style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
          <View style={{width: '100%', height: 85, backgroundColor: '#54687D', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={{marginTop: 45}} onPress={()=>{
            this.props.navigation.goBack(null)
          }}>
            <Image
                  style={{ width: 20, height: 20, marginLeft: 20 }}
                  source={require('../../../images/ic_left_row.png')}
                />
                
          </TouchableOpacity>
          <Text style={{marginTop: 45, marginEnd: 20, color: 'white'}}>Вибір оплати</Text>
        </View>
          <ScrollView>
            <View style={styles.container}>
            <View style={{width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center'}}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 14,
                  textAlign: 'center'
                }}>
                Для оплати клікніть по назві внеску, або по підсумку
              </Text>
            </View>
              <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                <Text style={styles.dataColumnNameTitleStyle}>Назва</Text>
                <Text style={styles.dataColumnNameDebtStyle}>Борг</Text>
              </View>
              <FlatList
                style={{ marginTop: 10, marginBottom: 15 }}
                data={this.getChargesData()}
                renderItem={({ item }) => (
                  <Item
                    onSelectedChargeChange={this.onSelectedChargeChange}
                    onSelectedChargeValueChange={
                      this.onSelectedChargeValueChange
                    }
                    selectedChargeValue={this.props.selectedChargeValue}
                    contribution={item.caption}
                    balance={item.startBalance}
                    charges={item.totalAccruals}
                    pendingPerMonth={item.totalSum}
                    debt={item.finishBalance}
                  />
                )}
                keyExtractor={item => item.caption}
              />
              {this.getDialog()}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function getSum(data) {
  let sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i].finishBalance;
  }
  return sum.toFixed(2);
}

class Item extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onSelectedChargeChange(this.props);
          this.props.onSelectedChargeValueChange(this.props.debt.toString());
          console.log(this.props)
        }}>
        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
          <Text style={this.props.contribution == "Сума" ? styles.itemSumStyleBold : styles.itemStyle}>{this.props.contribution}</Text>
          <Text style={styles.itemStyleBold}>{this.props.debt}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginStart: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dataColumnNameTitleStyle: {
    width: '60%',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
  dataColumnNameDebtStyle: {
    width: '40%',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemStyle: {
    width: '60%',
    paddingStart: 20,
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
  },
  itemSumStyleBold: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#364A5F',
  },
  itemStyleBold: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
});
