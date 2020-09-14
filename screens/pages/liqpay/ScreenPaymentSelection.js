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

  componentDidMount() {
    this.props.setLiqpayData(null);
    this.props.setChargesData(null);
    this.props.setSelectedCharge(null);
    this.props.setSelectedChargeValue(null);
    this.props.fetchLiqpayData(
      this.props.token, 
      this.props.accountId, 
      this.props.osbbId, 
      this.props.workPeriods);
    this.props.fetchChargesData(
      this.props.token, 
      this.props.accountId, 
      this.props.osbbId, 
      this.props.workPeriods);
  }

  getChargesData() {
    if (this.props.chargesData == null) {
      return;
    }
    return this.props.chargesData;
  }

  getDialog() {
    if (this.props.selectedCharge == null) return;
    return (
      <Dialog.Container
        visible={this.props.selectedCharge != null ? true : false}>
        <Dialog.Title>{this.props.selectedCharge.contribution}</Dialog.Title>
        <Dialog.Input
          onChangeText={text => this.props.setSelectedChargeValue(text)}
          value={this.props.selectedChargeValue > 0 ? this.props.selectedChargeValue : ""}
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
            this.props.setSelectedChargeContribution(null);
            this.props.setSelectedCharge(null);
            this.props.setSelectedChargeValue(null);
          }}
        />
        <Dialog.Button
          label="Оплатити"
          onPress={() => {
            this.props.setSelectedChargeContribution(
              this.props.selectedCharge.contribution
            );
            this.props.setSelectedCharge(null);
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
            <View style={{width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center', borderRadius: 15}}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#002B2B',
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
                    setSelectedCharge={this.props.setSelectedCharge}
                    setSelectedChargeValue={this.props.setSelectedChargeValue}
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
          this.props.setSelectedCharge(this.props);
          this.props.setSelectedChargeValue(this.props.debt.toString());
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
    borderRadius: 15,
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
