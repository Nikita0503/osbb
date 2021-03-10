import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PageHeader from "../../../../components/PageHeader";
import ActionButton from "react-native-action-button";
import { RadioButton } from "react-native-paper";
import { NavigationEvents } from "react-navigation";
import Dialog from "react-native-dialog";
import PDFReader from "rn-pdf-reader-js";
import ImageZoom from "react-native-image-pan-zoom";

export default class ScreenAdvertisement extends React.Component {
  componentDidMount() {
    this.props.fetchOsbbName(
      this.props.accountId,
      this.props.osbbId,
      this.props.workPeriods,
      this.props.token
    );
    this.props.fetchAllAds(this.props.token);
  }

  getLoadingView() {
    if (this.props.advertisementData == null) {
      return (
        <View style={(styles.container, { marginTop: "50%" })}>
          <ActivityIndicator
            size="large"
            style={styles.loader}
            color="#002B2B"
          />
          <Text
            style={{
              color: "#002B2B",
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

  getFileShowDialog() {
    if (this.props.advertisementSelectedFile != null) {
      var type = this.props.advertisementSelectedFile.substring(
        this.props.advertisementSelectedFile.length - 3
      );
      var path = this.props.advertisementSelectedFile;
      console.log("TYPE", type);
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
        default:
          return <Text>У розробці...</Text>;
      }
    }
  }

  render() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            this.componentDidMount();
          }}
        />
        <PageHeader navigation={this.props.navigation} title="Оголошення" />
        <View style={styles.container}>
          {this.getLoadingView()}
          <FlatList
            style={{ marginBottom: 80, width: "100%" }}
            showsVerticalScrollIndicator={false}
            data={this.props.advertisementData}
            renderItem={({ item }) => (
              <Post
                token={this.props.token}
                author={
                  this.props.advertisementOsbbName == null
                    ? ""
                    : this.props.advertisementOsbbName.name
                }
                data={item}
                allComments={this.props.allComments}
                selectedPost={this.props.selectedPost}
                selectedPostComments={this.props.selectedPostComments}
                navigation={this.props.navigation}
                advertisementData={this.props.advertisementData}
                setSelectedPost={this.props.setSelectedPost}
                setSelectedPostComments={this.props.setSelectedPostComments}
                selectedPostAllComents={this.props.selectedPostAllComents}
                setAdvertisementSelectedFile={
                  this.props.setAdvertisementSelectedFile
                }
                toVote={this.props.toVote}
                fetchSelectedPostComments={this.props.fetchSelectedPostComments}
              />
            )}
            keyExtractor={(item) => item.header}
          />
        </View>
        <Dialog.Container
          visible={this.props.advertisementSelectedFile == null ? false : true}
        >
          <Dialog.Title>
            {this.props.advertisementSelectedFile == null
              ? ""
              : this.props.advertisementSelectedFile.name}
          </Dialog.Title>
          <View style={{ alignSelf: "center" }}>
            {this.getFileShowDialog()}
          </View>
          <Dialog.Button
            label="OK"
            onPress={() => {
              this.props.setAdvertisementSelectedFile(null);
            }}
          />
        </Dialog.Container>
      </View>
    );
  }
}

function getDate(data) {
  if (data == null) return;
  var date = new Date(data);
  var month;
  switch (date.getMonth()) {
    case 0:
      month = " січ. ";
      break;
    case 1:
      month = " лют. ";
      break;
    case 2:
      month = " бер. ";
      break;
    case 3:
      month = " квіт. ";
      break;
    case 4:
      month = " трав. ";
      break;
    case 5:
      month = " черв. ";
      break;
    case 6:
      month = " лип. ";
      break;
    case 7:
      month = " серп. ";
      break;
    case 8:
      month = " вер. ";
      break;
    case 9:
      month = " жовт. ";
      break;
    case 10:
      month = " лист. ";
      break;
    case 11:
      month = " груд. ";
      break;
  }
  return (
    date.getDate() +
    month +
    date.getFullYear() +
    ":" +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
}

class Post extends React.Component {
  render() {
    return (
      <View
        style={{
          margin: 5,
          backgroundColor: "white",
          width: "95%",
          borderRadius: 15,
        }}
      >
        <Text
          style={{
            color: "#002B2B",
            marginHorizontal: 10,
            marginVertical: 5,
            fontSize: 20,
          }}
        >
          {this.props.data.header}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={{ color: "#002B2B", marginHorizontal: 10 }}>
              {this.props.author}
            </Text>
            <Text style={{ color: "#CDCDCD", marginHorizontal: 10 }}>
              {getDate(this.props.data.updatedAt)}
            </Text>
          </View>
        </View>
        <Text style={{ marginHorizontal: 10, marginVertical: 5, fontSize: 14 }}>
          {this.props.data.text}
        </Text>
        <FlatList
          horizontal
          style={{ marginStart: 5 }}
          data={this.props.data.documents}
          renderItem={({ item }) => (
            <ItemFile
              file={item}
              setAdvertisementSelectedFile={
                this.props.setAdvertisementSelectedFile
              }
            />
          )}
          listKey={(item, index) => "C" + index.toString()}
        />
        {this.getVoting()}
        <TouchableOpacity
          onPress={() => {
            this.props.setSelectedPost(this.props.data);
            this.props.navigation.navigate("AddCommentToAdvertisement");
          }}
        >
          <View
            style={{
              backgroundColor: "#F9F9F9",
              alignItems: "center",
              margin: 10,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: "#002B2B",
                fontSize: 18,
              }}
            >
              Додати коментар +
            </Text>
          </View>
        </TouchableOpacity>
        {this.showComments()}
      </View>
    );
  }

  getVoting() {
    if (this.props.data.voteClosed == null) {
      return;
    }
    if (this.props.data.voteClosed) {
      return <View>{this.getVotingResult()}</View>;
    } else {
      if (this.props.data.voted) {
        return <View>{this.getVotedVoting()}</View>;
      } else {
        return <View>{this.getActiveVoting()}</View>;
      }
    }
  }

  getVotingResult() {
    return this.props.data.variants.map((variant) => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 3,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#002B2B",
              width: 50,
              marginHorizontal: 2,
            }}
          >
            {parseInt(variant.percent) + "%"}
          </Text>
          <Text style={{ fontSize: 15, color: "#B2B2B2", width: 50 }}>
            {variant.amount}
          </Text>
          <Text style={{ fontSize: 16, color: "#B2B2B2" }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getVotedVoting() {
    return this.props.data.variants.map((variant) => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 3,
          }}
        >
          <RadioButton
            disabled
            value="first"
            color="pink"
            status={variant.selected ? "checked" : "unchecked"}
          />
          <Text style={{ fontSize: 16, color: "#B2B2B2", marginTop: 6 }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getActiveVoting() {
    return this.props.data.variants.map((variant) => {
      return (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 3,
          }}
        >
          <RadioButton
            value={variant.header}
            color="pink"
            onPress={() => {
              this.props.toVote(
                this.props.advertisementData,
                variant,
                this.props.token
              );
            }}
          />
          <Text style={{ fontSize: 16, color: "#B2B2B2", marginTop: 6 }}>
            {variant.header}
          </Text>
        </View>
      );
    });
  }

  getCommentsListData() {
    console.log("this.props.allComments", this.props.allComments);
    if (this.props.allComments == null) {
      return null;
    }
    return this.props.allComments;
  }

  getNoCommentsView() {
    if (this.getCommentsListData() != null) {
      if (this.getCommentsListData().length == 0) {
        return (
          <Text
            style={{
              color: "#002B2B",
              fontSize: 16,
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            Даних немає
          </Text>
        );
      }
    } else {
      return (
        <ActivityIndicator size="large" style={styles.loader} color="#002B2B" />
      );
    }
  }

  showComments() {
    if (this.props.selectedPostComments == null) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.setSelectedPostComments(this.props.data);
            this.props.fetchSelectedPostComments(
              this.props.data,
              this.props.token
            );
          }}
        >
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
                color: "#002B2B",
                fontSize: 18,
              }}
            >
              ↓ Показати коментарі
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    if (this.props.selectedPostComments.id != this.props.data.id) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.setSelectedPostComments(this.props.data);
            this.props.fetchSelectedPostComments(
              this.props.data,
              this.props.token
            );
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#F9F9F9",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: "#002B2B",
                fontSize: 18,
              }}
            >
              ↓ Показати коментарі
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <Dialog.Container
          visible={this.props.selectedPostComments.id == this.props.data.id}
        >
          {this.getNoCommentsView()}
          <FlatList
            style={{ height: "70%" }}
            data={this.getCommentsListData()}
            renderItem={({ item }) => (
              <ItemComment
                author={item.User.lastName + " " + item.User.firstName}
                text={item.text}
                time={getDate(item.updatedAt)}
                photo={item.User.photo}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <Dialog.Button
            label="OK"
            onPress={() => {
              this.props.setSelectedPostComments(null);
            }}
          />
        </Dialog.Container>
      );
    }
  }
}

class ItemComment extends React.Component {
  getAvatar() {
    if (this.props.photo == null) return;
    return (
      <Image
        source={{
          uri: "https://app.osbb365.com" + this.props.photo,
        }}
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
          alignSelf: "center",
          borderRadius: 25,
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={{ backgroundColor: "#F9F9F9", margin: 10, borderRadius: 15 }}
      >
        <View style={{ flexDirection: "row" }}>
          {this.getAvatar()}
          <View>
            <Text style={{ color: "#002B2B", marginLeft: 5, marginTop: 5 }}>
              {this.props.author}
            </Text>
            <Text style={{ color: "#CDCDCD", marginLeft: 5, marginBottom: 5 }}>
              {this.props.time}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: "#002B2B",
            marginHorizontal: 15,
            marginTop: 5,
            marginBottom: 15,
          }}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.setAdvertisementSelectedFile(this.props.file);
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {getImage(this.props.file)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type.substring(type.length - 3)) {
    case "pdf":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_pdf.png")}
        />
      );

    case "png":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_jpg.png")}
        />
      );

    case "jpg":
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require("../../../../images/ic_jpg.png")}
        />
      );
    case "svg":
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
    marginLeft: 5,
    marginEnd: 5,
    alignItems: "center",
  },
});
