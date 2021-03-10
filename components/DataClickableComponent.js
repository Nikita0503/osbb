import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class DataClickableComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          marginVertical: 8,
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 8,
        }}
      >
        <Text style={styles.dataNameComponentStyle}>{this.props.name}</Text>
        <Text style={styles.dataNumberComponentStyle}>{this.props.number}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dataNameComponentStyle: {
    width: "60%",
    fontSize: 17,
    color: "#364A5F",
    fontWeight: "bold",
  },
  dataNumberComponentStyle: {
    width: "40%",
    fontSize: 17,
    color: "#364A5F",
    fontWeight: "bold",
    textAlign: "right",
  },
});
