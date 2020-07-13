import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
//import { PieChart  } from 'react-native-svg-charts'
import PieChart from 'react-native-pie-chart';

export default class Chart extends Component
{
  render() {
	  const chart_wh = 250
    
        return (
          <View style={{alignItems: 'center',}}>
            <View style={{marginBottom: 20, width: '100%', backgroundColor: '#F9F9F9', alignItems: 'center', borderRadius: 15}}>
              <Text style={{ marginTop: 10, marginBottom: 10, color: '#364A5F', fontSize: 20, fontWeight: 'bold' }}>
                Витрати за місяць
              </Text>
            </View>
            <PieChart
				      chart_wh={chart_wh}
				      series={this.props.series}
				      sliceColor={this.props.sliceColor}
			      />
            {getLegend(this.props.data, this.props.sum)}
          </View>
        );
    }
}

function getPie(data){
	/*return(
		<PieChart
                style={ { height: 200 } }
                data={ data }
            />
	);*/
}

function getLegend(data, sum){
	//for(var i = 0; i < data.length; i++){
    //  data[i].key = data[i].percent
    //}
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