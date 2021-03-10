import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import PageHeader from "../../components/PageHeader";
import DataContainer from "../../components/DataContainer";
import Dialog from "react-native-dialog";
import PDFReader from "rn-pdf-reader-js";

export default class ScreenAboutHouse extends React.Component {
  componentDidMount() {
    this.props.fetchHouseData(
      this.props.accountId,
      this.props.osbbId,
      this.props.workPeriods,
      this.props.token
    );
  }

  getImage() {
    if (this.props.aboutHouseData == null) return;
    if (this.props.aboutHouseData.image == null)
      return (
        <View style={{ alignItems: "center", margin: 5 }}>
          <Text style={{ color: "#364A5F" }}>Фото будинку відсутнє</Text>
        </View>
      );
    return (
      <Image
        source={{
          uri: "https://app.osbb365.com" + this.props.aboutHouseData.image,
        }}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
    );
  }

  getAddress() {
    var address = "";
    address += this.props.aboutHouseData.Region.name_ua + " ";
    address += this.props.aboutHouseData.City.name_ua + " ";
    address += this.props.aboutHouseData.Street.StreetType.name + " ";
    address += this.props.aboutHouseData.house;
    return address;
  }

  getGeneralData() {
    if (this.props.aboutHouseData == null) return;
    return (
      <View style={{ alignItems: "center" }}>
        <DataContainer
          name="Назва ОСББ"
          data={this.props.aboutHouseData.name}
        />
        <DataContainer name="Адреса" data={this.getAddress()} />
        <DataContainer
          name="Телефон"
          data={this.props.aboutHouseData.telephone}
        />
        <DataContainer
          name="Поштовий індекс"
          data={this.props.aboutHouseData.postCode}
        />
        <DataContainer
          name="Інформація про ОСББ"
          data={this.props.aboutHouseData.about}
        />
      </View>
    );
  }

  getFileShowDialog() {
    if (this.props.aboutHouseSelectedFile != null) {
      var type = this.props.aboutHouseSelectedFile.path.substring(
        this.props.aboutHouseSelectedFile.path.length - 3
      );
      var path = this.props.aboutHouseSelectedFile.path;
      switch (type) {
        case "jpg":
          return (
            <ImageZoom
              cropWidth={320}
              cropHeight={300}
              imageWidth={320}
              imageHeight={300}
            >
              <Image
                style={{ width: 320, height: 300, resizeMode: "contain" }}
                source={{ uri: "https://app.osbb365.com" + path }}
              />
            </ImageZoom>
          );
        case "png":
          return (
            <ImageZoom
              cropWidth={320}
              cropHeight={300}
              imageWidth={320}
              imageHeight={300}
            >
              <Image
                style={{ width: 320, height: 300, resizeMode: "contain" }}
                source={{ uri: "https://app.osbb365.com" + path }}
              />
            </ImageZoom>
          );
        case "svg":
          return (
            <ImageZoom
              cropWidth={320}
              cropHeight={300}
              imageWidth={320}
              imageHeight={300}
            >
              <Image
                style={{ width: 320, height: 300, resizeMode: "contain" }}
                source={{ uri: "https://app.osbb365.com" + path }}
              />
            </ImageZoom>
          );
        case "pdf":
          return (
            <PDFReader
              style={{ width: 250, maxHeight: 400 }}
              source={{
                uri: "https://app.osbb365.com" + path,
              }}
            />
          );
        /*default: 
          //download('https://app.osbb365.com' + path)
          return(<Text>У розробці...</Text>)*/
      }
    }
  }

  render() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
      >
        <PageHeader navigation={this.props.navigation} title="Про ОСББ" />
        <ScrollView>
          <View style={styles.container}>
            {this.getImage()}
            <View
              style={{
                width: "100%",
                backgroundColor: "#F9F9F9",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                Загальна інформація
              </Text>
            </View>
            <View style={styles.container}>{this.getGeneralData()}</View>
          </View>

          <View style={styles.container}>
            <View
              style={{
                width: "100%",
                backgroundColor: "#F9F9F9",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                Статутні документи
              </Text>
            </View>
            <FlatList
              data={this.props.aboutHouseDocuments}
              renderItem={({ item }) => (
                <ItemFile
                  name={item.name}
                  path={item.filename}
                  setAboutHouseSelectedFile={this.setAboutHouseSelectedFile}
                />
              )}
              keyExtractor={(item) => item.name}
            />
            <Dialog.Container
              visible={this.props.aboutHouseSelectedFile == null ? false : true}
            >
              <Dialog.Title>
                {this.props.aboutHouseSelectedFile == null
                  ? ""
                  : this.props.aboutHouseSelectedFile.name}
              </Dialog.Title>
              <View style={{ alignSelf: "center" }}>
                {this.getFileShowDialog()}
              </View>

              <Dialog.Button
                label="OK"
                onPress={() => {
                  this.props.setAboutHouseSelectedFile(null);
                }}
              />
            </Dialog.Container>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          var file = {
            name: this.props.name,
            path: this.props.path,
          };
          this.props.setAboutHouseSelectedFile(file);
        }}
      >
        <View>{getImage(this.props.path, this.props.name)}</View>
      </TouchableOpacity>
    );
  }
}

function getImage(type, name) {
  switch (type.substring(type.length - 3)) {
    case "pdf":
      return (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Image
            style={{ width: 40, height: 50 }}
            source={require("../../images/ic_pdf.png")}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case "png":
      return (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Image
            style={{ width: 40, height: 50 }}
            source={require("../../images/ic_jpg.png")}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case "jpg":
      return (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Image
            style={{ width: 40, height: 50 }}
            source={require("../../images/ic_jpg.png")}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case "svg":
      return (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Image
            style={{ width: 40, height: 50 }}
            source={require("../../images/ic_jpg.png")}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: "white",
  },
  itemFileStyle: {
    width: "80%",
    fontSize: 16,
    color: "#364A5F",
    alignContent: "flex-end",
  },
});
