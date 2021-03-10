import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import PageHeader from "../../components/PageHeader";
import MonthPickerContainer from "../../components/MonthPickerContainer";
import { NavigationEvents } from "react-navigation";
import Dialog from "react-native-dialog";

export default class ScreenSendIndications extends React.Component {
  componentDidMount() {
    this.props.updateIndicationsCounters([]);
    this.props.fetchSendIndicationsCounters(
      this.props.token,
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      0
    );
  }

  refresh = () => {
    this.props.updateIndicationsCounters([]);
    this.props.fetchSendIndicationsCounters(
      this.props.token,
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      0
    );
  }

  getCounters() {
    if (this.props.indicationsCounters.length == 0) {
      return;
    }
    for (var i = 0; i < this.props.indicationsCounters.length; i++) {
      if (
        this.props.accountId.number ==
        this.props.indicationsCounters[i].accountId.number
      ) {
        return this.props.indicationsCounters[i].data;
      }
    }
  }

  getData() {
    var counters = this.getCounters();
    //console.log("counters", counters);
    if (counters == undefined) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#364A5F" }}>Прилади обліку відсутні</Text>
        </View>
      );
    } else {
      if (counters.length == 0) {
        return (
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#364A5F" }}>Прилади обліку відсутні</Text>
          </View>
        );
      } else {
        return (
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.dataColumnNameCountersStyle}>Назва</Text>
              <Text style={styles.dataColumnNameCountersStyle}>
                Місце встановлення
              </Text>
              <Text style={styles.dataColumnNameCountersStyle}>
                Попередні показники
              </Text>
              <Text style={styles.dataColumnNameCountersStyle}>
                Поточні покази
              </Text>
            </View>
            <FlatList
              data={counters}
              renderItem={({ item }) => (
                <ItemCounters
                  accountId={this.props.accountId}
                  counter={item}
                  indicationsCounters={counters}
                  setSelectedCounter={this.props.setSelectedCounter}
                  updateIndicationsCounters={
                    this.props.updateIndicationsCounters
                  }
                />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        );
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
            //console.log('I am triggered');
            this.componentDidMount();
          }}
        />
        <PageHeader
          navigation={this.props.navigation}
          title="Передати покази"
        />
        <MonthPickerContainer />
        <View style={(styles.container, { marginTop: 10 })}>
          {this.getData()}
          <Dialog.Container
            visible={this.props.selectedCounter == null ? false : true}
          >
            <Dialog.Title>
              {this.props.selectedCounter == null
                ? ""
                : this.props.selectedCounter.caption}
            </Dialog.Title>
            <Dialog.Input
              keyboardType={"decimal-pad"}
              onChangeText={(text) => this.props.setIndicationText(text)}
              value={this.props.indicationText}
              label="Введіть поточний показник"
              wrapperStyle={{
                borderBottomColor: "#000000",
                borderBottomWidth: 1,
              }}
            />
            <Dialog.Button
              label="Скасувати"
              onPress={() => {
                this.props.setSelectedCounter(null);
              }}
            />
            <Dialog.Button
              label="Редагувати"
              onPress={() => {
                this.props.editIndications(
                  this.props.token,
                  this.props.selectedCounter,
                  this.props.accountId,
                  this.props.osbbId,
                  this.props.workPeriods,
                  this.props.indicationText,
                  this.refresh
                );
              }}
            />
          </Dialog.Container>
        </View>
      </View>
    );
  }
}

class ItemCounters extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          //if (this.props.counter.editAllow == true) {
            this.props.setSelectedCounter(this.props.counter);
          /*} else {
            Alert.alert(
              "Повідомлення",
              "Голова ОСББ виконав нарахування. Зміна показань лічильника неможлива.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: true }
            );
          }*/
        }}
      >
        <View style={{ flexDirection: "row", paddingTop: 5 }}>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.caption}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.installIn}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.prevTestimony == null
              ? "0.00"
              : parseFloat(this.props.counter.prevTestimony).toFixed(2)}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.testimony == null
              ? "0.00"
              : parseFloat(this.props.counter.testimony).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
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
  },
  dataColumnNameCountersStyle: {
    width: "25%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemCountersStyle: {
    width: "25%",
    fontSize: 12,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
});
