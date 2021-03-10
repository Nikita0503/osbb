import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import PageHeader from "../../../../components/PageHeader";

const DATA_FILES = [
  {
    name: "Excel file",
    type: "xls",
  },
  {
    name: "PDF file",
    type: "pdf",
  },
  {
    name: "DOC file",
    type: "doc",
  },
  {
    name: "TXT file",
    type: "txt",
  },
  {
    name: "Image file",
    type: "jpg",
  },
  {
    name: "Excel file",
    type: "xls",
  },
  {
    name: "PDF file",
    type: "pdf",
  },
  {
    name: "DOC file",
    type: "doc",
  },
  {
    name: "TXT file",
    type: "txt",
  },
  {
    name: "Image file",
    type: "jpg",
  },
];

export default class ScreenAddAdvertisement extends React.Component {
  state = { advertisement: "" };

  render() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
      >
        <PageHeader
          navigation={this.props.navigation}
          title="Додати оголошення"
        />
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              multiline
              style={{
                width: "90%",
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                alignSelf: "center",
              }}
              placeholder="Ваше оголошення"
              onChangeText={(text) => {
                this.setState({ advertisement: text });
              }}
              value={this.state.advertisement}
            />

            <TouchableOpacity
              style={{
                marginTop: 10,
                marginHorizontal: 15,
                backgroundColor: "#F9F9F9",
                alignItems: "center",
              }}
              onPress={() => {
                alert("Ok");
              }}
            >
              <View>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    color: "#364A5F",
                    fontSize: 18,
                  }}
                >
                  Додати файл
                </Text>
              </View>
            </TouchableOpacity>

            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
              <FlatList
                horizontal
                data={DATA_FILES}
                renderItem={({ item }) => (
                  <ItemFile name={item.name} type={item.type} />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#F9F9F9",
              alignItems: "center",
            }}
            onPress={() => {
              alert("Ok");
            }}
          >
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                Додати оголошення
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    var icon = this.props.image;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            margin: 5,
          }}
        >
          {getImage(this.props.type)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type) {
    case "xls":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_xls.png")}
        />
      );

    case "pdf":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_pdf.png")}
        />
      );

    case "doc":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_doc.png")}
        />
      );

    case "txt":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_txt.png")}
        />
      );

    default:
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_jpg.png")}
        />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});
