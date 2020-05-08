import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';

export default class DataClickableComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          marginVertical: 10,
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.dataNameComponentStyle}>{this.props.name}</Text>
        <Text style={styles.dataNumberComponentStyle}>{this.props.number}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
dataNameComponentStyle: {
    width: '50%', 
    fontSize: 18,
    color: '#364A5F',
    fontWeight: 'bold',
  },
  dataNumberComponentStyle: {
    width: '50%', 
    fontSize: 18,
    color: '#364A5F',
    fontWeight: 'bold',
    textAlign: 'right',
  }});