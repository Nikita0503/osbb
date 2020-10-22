import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, Dimensions} from 'react-native';
import { PieChart } from "react-native-chart-kit";

export default class Chart extends Component
{
  getChart(){
      return(<PieChart
        data={this.props.dataForiOS}
        width={Dimensions.get("window").width}
        height={250}
        hasLegend={false}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft={Dimensions.get("window").width/4}
      />)
  }

  render() {
        return (
          <View style={{alignItems: 'center',}}>
            <View style={{marginBottom: 20, width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center', borderRadius: 15}}>
              <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 20, fontWeight: 'bold' }}>
                Витрати за місяць
              </Text>
            </View>
            {this.getChart()}
            {getLegend(this.props.data, this.props.sum)}
          </View>
        );
    }
}

function getLegend(data, sum){
    return(<View style={{marginTop: 20}}>
              <View style={{marginTop: 20, marginStart: 5, width: '100%',  alignItems: 'center'}}>
                <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 20, fontWeight: 'bold' }}>
                  Вього: {sum}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <Text style={styles.dataColumnNameStyle}></Text>
                <Text style={styles.dataColumnNameStyle}>Назва</Text>
                <Text style={styles.dataColumnNameStyle}>Вартість</Text>
                <Text style={styles.dataColumnNameStyle}>Відсотки</Text>
              </View>
              <FlatList
                style={{alignSelf: "center"}}
                data={data}
                renderItem={({ item }) => <Item color={item.svg.fill} value={item.value} name={item.name} percent={item.percent}/>}
                keyExtractor={item => item.percent}
              />  
          </View>);  
}

class Item extends React.Component {
  render(){
    return (
      <View style={{flexDirection: 'row', paddingTop: 5, alignContent: 'center'}}>
        <View style={{width: 50, height: 25, backgroundColor: this.props.color, marginRight: 20}}/>
        <Text style={styles.itemStyle}>{this.props.name}</Text>
        <Text style={styles.itemStyle}>{this.props.value}</Text>
        <Text style={styles.itemStyle}>{this.props.percent}%</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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