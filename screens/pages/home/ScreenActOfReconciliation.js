import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  ScrollView,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import PageHeader from "../../../components/PageHeader";
import MonthPickerContainer from "../../../components/MonthPickerContainer";
import Dialog from "react-native-dialog";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ScreenActOfReconciliation extends React.Component {
  setStartFromAndTo() {
    if (this.props.workPeriods == null) {
      return;
    }
    if (this.props.fromMonth == "") {
      this.props.setFromYear(this.props.workPeriods[0].substring(2, 6));
      this.props.setFromMonth(this.props.workPeriods[0]);
      this.props.setToYear(
        this.props.workPeriods[this.props.workPeriods.length - 1].substring(
          2,
          6
        )
      );
      this.props.setToMonth(
        this.props.workPeriods[this.props.workPeriods.length - 1]
      );
    }
  }

  render() {
    function isDisabled(props) {
      if (
        props.fromMonth == "" ||
        props.toMonth == "" ||
        props.fromYear == "" ||
        props.fromYear == "Рік" ||
        props.toYear == "" ||
        props.toYear == "Рік"
      ) {
        return true;
      }

      var d1 = new Date();
      if (props.fromMonth != null && props.fromMonth.length == 6) {
        d1.setFullYear(parseInt(props.fromMonth.substring(2, 6)));
        d1.setMonth(parseInt(props.fromMonth.substring(0, 2)) - 1);
      }
      d1.setDate(1);
      var d2 = new Date();
      if (props.toMonth != null && props.toMonth.length == 6) {
        d2.setFullYear(parseInt(props.toMonth.substring(2, 6)));
        d2.setMonth(parseInt(props.toMonth.substring(0, 2)) - 1);
      }
      d2.setDate(1);
      if (d1 >= d2) {
        return true;
      }
      return false;
    }

    return (
      <View>
        <ScrollView>
          <PageHeader navigation={this.props.navigation} title="Акт звіряння" />
          <MonthPickerContainer />
          <View style={styles.container}>
            {this.getPickers()}
            <View style={{ margin: 10 }}>
              <Button
                disabled={isDisabled(this.props)}
                title="Відобразити"
                color="#5682A3"
                onPress={() => {
                  this.props.setShowLoading(true);
                  this.props.fetchData(
                    this.props.accountId,
                    this.props.osbbId,
                    this.props.fromMonth,
                    this.props.toMonth,
                    this.props.token
                  );
                }}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.dataColumnNameStyle}>Дата</Text>
              <Text style={styles.dataColumnNameStyle}>Сальдо</Text>
              <Text style={styles.dataColumnNameChargesStyle}>Нарахування</Text>
              <Text style={styles.dataColumnNameStyle}>Оплати</Text>
              <Text style={styles.dataColumnNameStyle}>Борг</Text>
            </View>
            {this.getDataList()}
          </View>
        </ScrollView>
      </View>
    );
  }

  getPickers() {
    if (Platform.OS == "android") {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginTop: 15, marginLeft: 10, width: "10%" }}>
              з
            </Text>
            <Picker
              prompt="Рік"
              selectedValue={this.props.fromYear}
              style={{ width: "40%", marginLeft: 15 }}
              onValueChange={(itemValue, itemIndex) => {
                this.props.setFromYear(itemValue);
                for (var i = 0; i < this.props.workPeriods.length; i++) {
                  if (itemValue == this.props.workPeriods[i].substring(2, 6)) {
                    this.props.setFromMonth(this.props.workPeriods[i]);
                    break;
                  }
                }
              }}
            >
              {getYearsItems(this.props.workPeriods)}
              {this.setStartFromAndTo()}
            </Picker>
            <Picker
              prompt="Місяць"
              selectedValue={this.props.fromMonth}
              style={{ width: "40%", marginLeft: 20 }}
              onValueChange={(itemValue, itemIndex) =>
                this.props.setFromMonth(itemValue)
              }
            >
              {getMonthsItems(this.props.fromYear, this.props.workPeriods)}
            </Picker>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginTop: 15, marginLeft: 10, width: "10%" }}>
              по
            </Text>
            <Picker
              prompt="Рік"
              selectedValue={this.props.toYear}
              style={{ width: "40%", marginLeft: 15 }}
              onValueChange={(itemValue, itemIndex) => {
                this.props.setToYear(itemValue);
                for (var i = 0; i < this.props.workPeriods.length; i++) {
                  if (itemValue == this.props.workPeriods[i].substring(2, 6)) {
                    this.props.setToMonth(this.props.workPeriods[i]);
                    break;
                  }
                }
              }}
            >
              {getYearsItems(this.props.workPeriods)}
            </Picker>
            <Picker
              prompt="Місяць"
              selectedValue={this.props.toMonth}
              style={{ width: "40%", marginLeft: 20 }}
              onValueChange={(itemValue, itemIndex) =>
                this.props.setToMonth(itemValue)
              }
            >
              {getMonthsItems(this.props.toYear, this.props.workPeriods)}
            </Picker>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginTop: 20, marginLeft: 10, width: "10%" }}>
              з
            </Text>
            <View
              style={{
                width: "40%",
                marginTop: 15,
                marginLeft: 15,
                borderWidth: 1,
                padding: 5,
                borderColor: "#5682A3",
                backgroundColor: "#F9F9F9",
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.setFromYearShow();
                }}
              >
                <Text style={{ color: "#5682A3" }}>{this.props.fromYear}</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "40%",
                marginTop: 15,
                marginLeft: 15,
                borderWidth: 1,
                padding: 5,
                borderColor: "#5682A3",
                backgroundColor: "#F9F9F9",
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.setFromMonthShow();
                }}
              >
                <Text style={{ color: "#5682A3" }}>
                  {getMonthByPeriod(this.props.fromMonth)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginTop: 20, marginLeft: 10, width: "10%" }}>
              по
            </Text>
            <View
              style={{
                width: "40%",
                marginTop: 15,
                marginLeft: 15,
                borderWidth: 1,
                padding: 5,
                borderColor: "#5682A3",
                backgroundColor: "#F9F9F9",
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.setToYearShow();
                }}
              >
                <Text style={{ color: "#5682A3" }}>{this.props.toYear}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "40%",
                marginTop: 15,
                marginLeft: 15,
                borderWidth: 1,
                padding: 5,
                borderColor: "#5682A3",
                backgroundColor: "#F9F9F9",
                borderRadius: 3,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.setToMonthShow();
                }}
              >
                <Text style={{ color: "#5682A3" }}>
                  {getMonthByPeriod(this.props.toMonth)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Dialog.Container visible={this.props.fromYearShow}>
            <Dialog.Title>Рік</Dialog.Title>
            <View style={{ alignItems: "center" }}>
              <Picker
                prompt="Рік"
                selectedValue={this.props.fromYear}
                style={{ width: "40%", marginLeft: 15 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.setFromYear(itemValue);
                  for (var i = 0; i < this.props.workPeriods.length; i++) {
                    if (
                      itemValue == this.props.workPeriods[i].substring(2, 6)
                    ) {
                      this.props.setFromMonth(this.props.workPeriods[i]);
                      break;
                    }
                  }
                }}
              >
                {getYearsItems(this.props.workPeriods)}
                {this.setStartFromAndTo()}
              </Picker>
            </View>

            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.setFromYearShow();
              }}
            />
          </Dialog.Container>
          <Dialog.Container visible={this.props.fromMonthShow}>
            <Dialog.Title>"Місяць"</Dialog.Title>
            <View style={{ alignItems: "center" }}>
              <Picker
                prompt="Місяць"
                selectedValue={this.props.fromMonth}
                style={{ width: "40%", marginLeft: 20 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.setFromMonth(itemValue)
                }
              >
                {getMonthsItems(this.props.fromYear, this.props.workPeriods)}
              </Picker>
            </View>

            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.setFromMonthShow();
              }}
            />
          </Dialog.Container>

          <Dialog.Container visible={this.props.toYearShow}>
            <Dialog.Title>Рік</Dialog.Title>
            <View style={{ alignItems: "center" }}>
              <Picker
                prompt="Рік"
                selectedValue={this.props.toYear}
                style={{ width: "40%", marginLeft: 15 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.setToYear(itemValue);
                  for (var i = 0; i < this.props.workPeriods.length; i++) {
                    if (
                      itemValue == this.props.workPeriods[i].substring(2, 6)
                    ) {
                      this.props.setToMonth(this.props.workPeriods[i]);
                      break;
                    }
                  }
                }}
              >
                {getYearsItems(this.props.workPeriods)}
              </Picker>
            </View>

            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.setToYearShow();
              }}
            />
          </Dialog.Container>

          <Dialog.Container visible={this.props.toMonthShow}>
            <Dialog.Title>Місяць</Dialog.Title>
            <View style={{ alignItems: "center" }}>
              <Picker
                prompt="Місяць"
                selectedValue={this.props.toMonth}
                style={{ width: "40%", marginLeft: 20 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.props.setToMonth(itemValue)
                }
              >
                {getMonthsItems(this.props.toYear, this.props.workPeriods)}
              </Picker>
            </View>

            <Dialog.Button
              label="OK"
              onPress={() => {
                this.props.setToMonthShow();
              }}
            />
          </Dialog.Container>

          {this.setStartFromAndTo()}
        </View>
      );
    }
  }

  getDataList() {
    if (this.props.showLoading) {
      return (
        <View style={styles.container}>
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
    } else {
      return (
        <FlatList
          data={this.props.selectedData}
          renderItem={({ item }) => (
            <Item
              month={item.month}
              balance={getStartBalance(item)}
              charges={getAccruals(item)}
              pendingPerMonth={getSum(item)}
              debt={getDebt(item)}
            />
          )}
          keyExtractor={(item) => item.month}
        />
      );
    }
  }
}

function getStartBalance(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return;
  var sumStartBalance = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumStartBalance += dataForCurrentPeriod.data[i].startBalance;
  }
  return sumStartBalance.toFixed(2);
}

function getAccruals(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return;
  var sumAccruals = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumAccruals += dataForCurrentPeriod.data[i].totalAccruals;
  }
  return sumAccruals.toFixed(2);
}

function getSum(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return;
  var sum = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalPayments != null) {
      sum += parseFloat(dataForCurrentPeriod.data[i].totalPayments);
    }
  }
  return sum.toFixed(2);
}

function getDebt(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return;
  var sumAccruals = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumAccruals += dataForCurrentPeriod.data[i].finishBalance;
  }
  return sumAccruals.toFixed(2);
}

function getMonthsItems(year, workPeriods) {
  var months = new Array();
  for (var i = 0; i < workPeriods.length; i++) {
    if (workPeriods[i].substring(2, 6) == year) {
      months.push(workPeriods[i]);
    }
  }
  return months.map((item, i) => {
    return <Picker.Item key={i} label={getMonthByPeriod(item)} value={item} />;
  });
}

function getMonthByPeriod(data) {
  var month;
  switch (data.substring(0, 2)) {
    case "01":
      month = "Січень";
      break;
    case "02":
      month = "Лютий";
      break;
    case "03":
      month = "Березень";
      break;
    case "04":
      month = "Квітень";
      break;
    case "05":
      month = "Травень";
      break;
    case "06":
      month = "Червень";
      break;
    case "07":
      month = "Липень";
      break;
    case "08":
      month = "Серпень";
      break;
    case "09":
      month = "Вересень";
      break;
    case "10":
      month = "Жовтень";
      break;
    case "11":
      month = "Листопад";
      break;
    case "12":
      month = "Грудень";
      break;
  }
  return month;
}

function getYearsItems(workPeriods) {
  if (workPeriods == null) {
    return;
  }
  var years = [];
  for (var i = 0; i < workPeriods.length; i++) {
    years.push(workPeriods[i].substring(2, 6));
  }
  return unique(years).map((item, i) => {
    return <Picker.Item key={i} label={item} value={item} />;
  });
}

function unique(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}

class Item extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemStyle}>{this.props.month}</Text>
        <Text style={styles.itemStyle}>{this.props.balance}</Text>
        <Text style={styles.itemStyle}>{this.props.charges}</Text>
        <Text style={styles.itemStyle}>{this.props.pendingPerMonth}</Text>
        <Text style={styles.itemStyle}>{this.props.debt}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: "white",
  },
  dataColumnNameStyle: {
    width: "20%",
    fontSize: 11,
    padding: 3,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
  },
  dataColumnNameChargesStyle: {
    width: "20%",
    fontSize: 10,
    paddingTop: 4,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
  },
  itemStyle: {
    width: "20%",
    fontSize: 11,
    padding: 3,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
    borderTopColor: "#E0E0E0",
    borderTopWidth: 1,
  },
});
