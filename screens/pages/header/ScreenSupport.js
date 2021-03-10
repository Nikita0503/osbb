import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import PageHeader from "../../../components/PageHeader";
import { NavigationEvents } from "react-navigation";
import ReversedFlatList from "react-native-reversed-flat-list";

export default class ScreenSupport extends React.Component {
  componentDidMount() {
    this.props.openChat(this.props.token);
  }

  componentWillUnmount() {
    this.props.closeChat(this.props.consultant);
  }

  getMessages() {
    if (this.props.helpChatMessages == null) {
      return;
    } else {
      return this.props.helpChatMessages;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <NavigationEvents
          onDidFocus={() => {
            console.log("I am triggered");
          }}
        />
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
        >
          <PageHeader
            navigation={this.props.navigation}
            title="Задати питання"
          />
          <View style={styles.container}>
            <ReversedFlatList
              data={this.getMessages()}
              renderItem={({ item }) => (
                <Item text={item.message} me={item.me} />
              )}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.messageContainer}>
              <TextInput
                multiline
                style={{
                  marginLeft: 10,
                  width: "85%",
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  alignSelf: "center",
                }}
                placeholder="Ваше питання"
                onChangeText={(text) => {
                  this.props.setHelpChatMessage(text);
                }}
                value={this.props.helpChatMessage}
              />

              <TouchableOpacity
                onPress={() => {
                  this.props.sendMessage(
                    this.props.token,
                    this.props.consultant,
                    this.props.helpChatMessage
                  );
                }}
              >
                <Image
                  style={{ width: 35, height: 40, marginHorizontal: 5 }}
                  source={require("../../../images/ic_send.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.me ? styles.myMessageStyle : styles.supportMessageStyle
        }
      >
        <Text style={styles.itemStyle}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E1E7EC",
    alignItems: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  chatContainer: {
    width: "100%",
    marginBottom: 15,
  },
  supportMessageStyle: {
    maxWidth: "70%",
    alignSelf: "flex-start",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "white",
  },
  myMessageStyle: {
    maxWidth: "70%",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#ADD9FA",
  },
  messageContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
  },
  itemStyle: {
    fontSize: 16,
    color: "#364A5F",
    alignContent: "flex-end",
    margin: 7,
  },
});
