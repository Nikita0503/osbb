import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import PageHeader from "../../../../components/PageHeader";

export default class ScreenPayment extends React.Component {

  constructor(props) {
    super(props);
    this.props.setCurrentPaymentsData(new Array());
  }

  componentDidMount() {
    this.props.fetchPayment(this.props.token, this.props.accountId, this.props.osbbId, this.props.currentWorkPeriod);
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
