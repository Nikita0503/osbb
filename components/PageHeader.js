import React from "react";
import { Header } from "react-native-elements";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import HamburgerMenu from "./HamburgerMenu";

const PageHeader = (props) => {
  return (
    <Header
      leftComponent={
        <HamburgerMenu
          style={{ width: 50, height: 50 }}
          navigation={props.navigation}
        />
      }
      centerComponent={{
        text: props.title,
        style: { color: "#fff", marginRight: 65 },
      }}
      rightComponent={
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Advertisement")}
          >
            <Image
              style={{ width: 32, height: 32, marginTop: 5 }}
              source={require("../images/ic_advertisement.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Chats")}>
            <Image
              style={styles.icon}
              source={require("../images/ic_chat.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Support")}
          >
            <Image
              style={styles.icon}
              source={require("../images/ic_headphones.png")}
            />
          </TouchableOpacity>
        </View>
      }
      statusBarProps={{ barStyle: "light-content" }}
      containerStyle={{
        backgroundColor: "#54687D",
        justifyContent: "space-around",
      }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
});

export default PageHeader;
