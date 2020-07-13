import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import PageHeader from "../../../../components/PageHeader";



function getDateString(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return date.getDate() + month + date.getFullYear();
}

export default class ScreenPayment extends React.Component {

  constructor(props) {
    super(props);
    this.onCurrentPaymentChange = this.onCurrentPaymentChange.bind(this);
    this.onCurrentPaymentChange(new Array());
  }

  onCurrentPaymentChange(currentPaymentData){
    this.props.setCurrentPaymentsData(currentPaymentData);
  }

  componentDidMount() {
    fetch(
    'https://app.osbb365.com/api/tenant/payments?accountId=' +
      this.props.accountId.id +
      '&osbbId=' +
      this.props.osbbId +
      '&workPeriod=' +
      this.props.currentWorkPeriod,
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
      
      console.log("!", responseJson);
      let payments = new Array();
        for(var i = 0; i < responseJson.length; i++){
          //console.log("!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#", responseJson[i]);
          var payment = responseJson[i];
          var data = {
            contribution: payment.captionService,
            sum: payment.paymentAmount,
            paymentDate: getDateString(payment.dateOfPayment),
            bank: payment.captionBank
          }
          payments.push(data);
          
        }
        this.onCurrentPaymentChange(payments);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE'}}>
        <PageHeader navigation={this.props.navigation} title="Оплати" />
        <View style={styles.container}>
          <View style={styles.container, {marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dataColumnNameStyle}>Внесок</Text>
              <Text style={styles.dataColumnNameStyle}>Сплачено, грн</Text>
              <Text style={styles.dataColumnNameStyle}>Дата оплати</Text>
              <Text style={styles.dataColumnNameStyle}>Банк</Text>
            </View>
            <FlatList
              data={this.props.currentPaymentsData}
              renderItem={({ item }) => <Item contribution={item.contribution} sum={item.sum} paymentDate={item.paymentDate} bank={item.bank}/>}
              keyExtractor={item => item.contribution}
            />
          </View>
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <Text style={styles.itemStyle}>{this.props.contribution}</Text>
        <Text style={styles.itemStyle}>{this.props.sum}</Text>
        <Text style={styles.itemStyle}>{this.props.paymentDate}</Text>
        <Text style={styles.itemStyle}>{this.props.bank}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  dataColumnNameStyle: {
    width: '25%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  },
  itemStyle: {
    width: '25%',
    fontSize: 13,
    padding: 5,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  },
});
