import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PageHeader from "../../../../components/PageHeader";
import { NavigationEvents } from "react-navigation";

export default class ScreenChats extends React.Component {
  componentDidMount() {
    this.props.fetchAllChats(this.props.workPeriods, this.props.token);
  }

  getChatsData() {
    if (this.props.allChats == null) {
      return;
    }
    return this.props.allChats;
  }

  getLoadingView() {
    if (this.props.allChats == null) {
      return (
        <View style={(styles.container, { marginTop: "50%" })}>
          <ActivityIndicator
            size="large"
            style={styles.loader}
            color="#36678D"
          />
          <Text
            style={{
              color: "#36678D",
              fontSize: 16,
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            Зачекайте, дані завантажуються
          </Text>
        </View>
      );
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            console.log("I am triggered");
            this.componentDidMount();
          }}
        />
        <PageHeader navigation={this.props.navigation} title="Чати" />
        <View style={styles.container}>
          {this.getLoadingView()}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.getChatsData()}
            renderItem={({ item }) => (
              <Item
                data={item}
                navigation={this.props.navigation}
                allUsers={this.props.allUsers}
                setAllChatsSelectedChat={this.props.setAllChatsSelectedChat}
              />
            )}
            keyExtractor={(item) => item.text}
          />
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
  getAvatar() {
    if (this.props.allUsers == null) {
      return;
    }
    for (var i = 0; i < this.props.allUsers.length; i++) {
      if (this.props.allUsers[i].id == this.props.data.usersId[0]) {
        if (this.props.allUsers[i].photo == null) {
          return (
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginLeft: 5,
                marginRight: 5,
              }}
              source={require("../../../../images/ic_avatar.png")}
            />
          );
        }
        return (
          <Image
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginLeft: 5,
              marginRight: 1,
            }}
            source={{
              uri: "https://app.osbb365.com" + this.props.allUsers[i].photo,
            }}
          />
        );
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setAllChatsSelectedChat(this.props.data);
          this.props.navigation.navigate("Chat", {
            title: this.props.data.title,
          });
        }}
      >
        <View style={styles.itemStyle}>
          {this.getAvatar()}
          <Text style={{ color: "red" }}>
            {this.props.data.unread != 0 ? this.props.data.unread : ""}
          </Text>
          <Text style={styles.itemTextStyle}>
            {this.props.data.alias == null
              ? this.props.data.title
              : this.props.data.alias}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginEnd: 10,

    marginBottom: 8,
  },
  itemStyle: {
    borderRadius: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 5,
    margin: 3,
  },
  itemTextStyle: {
    fontSize: 16,
    color: "#364A5F",
    alignContent: "flex-start",
    margin: 10,
    marginTop: 12,
    width: "70%",
  },
});
