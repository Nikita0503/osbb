import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import PageHeader from '../../../../components/PageHeader';

const DATA_HOUSE_CONTROL_COSTS = [
  {
    name: 'buy1',
    cost: '1000',
  },
  {
    name: 'buy2',
    cost: '2000',
  },
  {
    name: 'buy3',
    cost: '3500',
  },  
];

const DATA_HOUSE_MAINTENANCE_COSTS = [
  {
    name: 'buy1',
    cost: '1000',
    unit: 'грн',
    amount: '5'
  },
  {
    name: 'buy1',
    cost: '2000',
    unit: 'грн',
    amount: '3'
  },
  {
    name: 'buy1',
    cost: '1550',
    unit: 'грн',
    amount: '2'
  }, 
];

const DATA_HOUSE_REPAIRS_COSTS = [
  {
    name: 'buy1',
    cost: '1000',
    unit: 'грн',
    amount: '5'
  },
  {
    name: 'buy1',
    cost: '2000',
    unit: 'грн',
    amount: '3'
  },
  {
    name: 'buy1',
    cost: '1550',
    unit: 'грн',
    amount: '2'
  }, 
];


export default class ScreenPlansForHouse extends React.Component {
  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Плани по будинку" />
        <ScrollView>
          <View style={styles.container}>
        <View style={{width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center'}}>
          <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 18, textAlign: 'center' }}>
              Витрати на управління будинком(адміністративні витрати)
          </Text>
        </View>
        <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.dataColumnNameHouseControlCostsStyle}>Назва</Text>
            <Text style={styles.dataColumnNameHouseControlCostsStyle}>Вартість</Text>
        </View>
            <FlatList
              data={DATA_HOUSE_CONTROL_COSTS}
              renderItem={({ item }) => <ItemHouseControlCosts name={item.name} cost={item.cost}/>}
              keyExtractor={item => item.name}
            />
        </View>
        </View>

        <View style={styles.container}>
        <View style={{width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center'}}>
          <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 18, textAlign: 'center' }}>
              Витрати на утримання будинку(поточні витрати та дрібний ремонт)
          </Text>
        </View>
        <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.dataColumnNameHouseMaintenanceCostsStyle}>Назва</Text>
            <Text style={styles.dataColumnNameHouseMaintenanceCostsStyle}>Вартість</Text>
            <Text style={styles.dataColumnNameHouseMaintenanceCostsStyle}>Одиниця виміру</Text>
            <Text style={styles.dataColumnNameHouseMaintenanceCostsStyle}>Обсяг</Text>
        </View>
            <FlatList
              data={DATA_HOUSE_MAINTENANCE_COSTS}
              renderItem={({ item }) => <ItemHouseMaintenanceCosts name={item.name} cost={item.cost} unit={item.unit} amount={item.amount}/>}
              keyExtractor={item => item.name}
            />
        </View>
        </View>

        <View style={styles.container}>
        <View style={{width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center'}}>
          <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 18, textAlign: 'center' }}>
              Витрати на ремонт будинку(поточні витрати та дрібний ремонт)
          </Text>
        </View>
        <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.dataColumnNameHouseRepairsCostsStyle}>Назва</Text>
            <Text style={styles.dataColumnNameHouseRepairsCostsStyle}>Вартість</Text>
            <Text style={styles.dataColumnNameHouseRepairsCostsStyle}>Одиниця виміру</Text>
            <Text style={styles.dataColumnNameHouseRepairsCostsStyle}>Обсяг</Text>
        </View>
            <FlatList
              data={DATA_HOUSE_REPAIRS_COSTS}
              renderItem={({ item }) => <ItemHouseRepairsCosts name={item.name} cost={item.cost} unit={item.unit} amount={item.amount}/>}
              keyExtractor={item => item.name}
            />
        </View>
        </View>
        </ScrollView>
      </View>);
    }
}

class ItemHouseControlCosts extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <Text style={styles.itemHouseControlCostsStyle}>{this.props.name}</Text>
        <Text style={styles.itemHouseControlCostsStyle}>{this.props.cost}</Text>
      </View>
    );
  }
}

class ItemHouseMaintenanceCosts extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <Text style={styles.itemHouseMaintenanceCostsStyle}>{this.props.name}</Text>
        <Text style={styles.itemHouseMaintenanceCostsStyle}>{this.props.cost}</Text>
        <Text style={styles.itemHouseMaintenanceCostsStyle}>{this.props.unit}</Text>
        <Text style={styles.itemHouseMaintenanceCostsStyle}>{this.props.amount}</Text>
      </View>
    );
  }
}

class ItemHouseRepairsCosts extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5}}>
        <Text style={styles.itemHouseRepairsCostsStyle}>{this.props.name}</Text>
        <Text style={styles.itemHouseRepairsCostsStyle}>{this.props.cost}</Text>
        <Text style={styles.itemHouseRepairsCostsStyle}>{this.props.unit}</Text>
        <Text style={styles.itemHouseRepairsCostsStyle}>{this.props.amount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  dataColumnNameHouseControlCostsStyle: {
    width: '50%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'flex-end'
  },
  itemHouseControlCostsStyle: {
    width: '50%',
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end'
  },
  dataColumnNameHouseMaintenanceCostsStyle: {
    width: '25%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  },
  itemHouseMaintenanceCostsStyle: {
    width: '25%',
    fontSize: 13,
    padding: 5,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  },
  dataColumnNameHouseRepairsCostsStyle: {
    width: '25%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  },
  itemHouseRepairsCostsStyle: {
    width: '25%',
    fontSize: 13,
    padding: 5,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center'
  }
});