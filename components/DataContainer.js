import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export default class DataContainer extends React.Component {
  render() {
    return (
      <View style={{ width: "90%", marginBottom: 10 }}>
        <Text style={{ fontSize: 16, color: "#949494" }}>
          {this.props.name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#5C5C5C",
            borderBottomWidth: 1,
            borderBottomColor: "#C5C5C5",
            marginTop: 5,
          }}
        >
          {this.props.data}
        </Text>
      </View>
    );
  }
}
