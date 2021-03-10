import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import PageHeaderClickable from "../../../../components/PageHeaderClickable";
import MonthPickerContainer from "../../../../components/MonthPickerContainer";
import Chart from "../../../../components/Chart";
import DataComponent from "../../../../components/DataComponent";
import DataClickableComponent from "../../../../components/DataClickableComponent";
import { NavigationEvents } from "react-navigation";
import { Logs } from "expo";

function getSumDebt(data) {
  let sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += data[i].finishBalance;
  }
  return;
  sum.toFixed(2);
}

function getMonthByPeriod(data) {
  var month;
  switch (data.substring(0, data.length - 4)) {
    case "01":
      month = "Січень ";
      break;
    case "02":
      month = "Лютий ";
      break;
    case "03":
      month = "Березень ";
      break;
    case "04":
      month = "Квітень ";
      break;
    case "05":
      month = "Травень ";
      break;
    case "06":
      month = "Червень ";
      break;
    case "07":
      month = "Липень ";
      break;
    case "08":
      month = "Серпень ";
      break;
    case "09":
      month = "Вересень ";
      break;
    case "10":
      month = "Жовтень ";
      break;
    case "11":
      month = "Листопад ";
      break;
    case "12":
      month = "Грудень ";
      break;
  }
  return month + data.substring(data.length - 4, data.length);
}

export default class ScreenMyApartment extends React.Component {
  componentDidMount() {
    this.getIsLoaded();
    this.props.clearState();
    this.props.fetchUserData(this.props.token);
    this.props.fetchApartmentData(this.props.token, this.props.navigation);
  }

  render() {
    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#EEEEEE" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            //console.log('I am triggered');
            //this.componentDidMount();
          }}
        />
        {this.getIsLoaded()}
        <PageHeaderClickable
          navigation={this.props.navigation}
          title="Поточний місяць"
          workPeriods={this.props.workPeriods}
          setCurrentWorkPeriod={this.props.setCurrentWorkPeriod}
        />
        <MonthPickerContainer />
        <ScrollView>
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
                  marginBottom: 2,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                До сплати за
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  marginBottom: 2,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                {this.getLastPeriod()}
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "#364A5F",
                  fontSize: 18,
                }}
              >
                {this.getDebtByCurrentAccountId()} грн.
              </Text>

              {this.getPaymentButton()}
            </View>
          </View>
          {this.getGeneralData()}
          {this.getPieChart()}
        </ScrollView>
      </View>
    );
  }

  getPaymentButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.props.liqpayData == null) {
            Alert.alert(
              "Повідомлення",
              "Немає підключених способів оплати. Зверніться до правління ОСББ",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: true }
            );
          } else {
            if (this.props.liqpayData[0].liqPayPrivateKey != null) {
              this.props.navigation.navigate("PaymentSelection");
            } else {
              Alert.alert(
                "Повідомлення",
                "Немає підключених способів оплати. Зверніться до правління ОСББ",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: true }
              );
            }
          }
        }}
      >
        <View
          style={{
            backgroundColor: "#5682A3",
            padding: 10,
            margin: 5,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white" }}>ОПЛАТИТИ</Text>
        </View>
      </TouchableOpacity>
    );
  }

  getGeneralData() {
    if (this.props.allApartmentData.length == 0) return;
    var currentApartmentData;
    for (var i = 0; i < this.props.allApartmentData.length; i++) {
      if (
        this.props.allApartmentData[i].workPeriod ==
          this.props.currentWorkPeriod &&
        this.props.allApartmentData[i].accountId.id == this.props.accountId.id
      ) {
        currentApartmentData = this.props.allApartmentData[i];
        break;
      }
    }

    return (
      <View style={styles.container}>
        <DataComponent
          name="Сальдо на початок"
          number={getStartBalance(currentApartmentData)}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AccrualHistory")}
        >
          <DataClickableComponent
            name="Нараховано"
            number={getAccruals(currentApartmentData)}
          />
        </TouchableOpacity>

        <DataComponent
          name="Пільги"
          number={getPrivileges(currentApartmentData)}
        />
        <DataComponent
          name="Субсидії"
          number={getSubsidies(currentApartmentData)}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Payment")}
        >
          <DataClickableComponent
            name="Оплати"
            number={getPayments(currentApartmentData)}
          />
        </TouchableOpacity>
        <DataComponent
          name="Сальдо на кінець"
          number={getFinishBalance(currentApartmentData)}
        />
      </View>
    );
  }

  getLastPeriod() {
    if (this.props.workPeriods[this.props.workPeriods.length - 1] == null)
      return;
    return getMonthByPeriod(
      this.props.workPeriods[this.props.workPeriods.length - 1]
    );
  }

  getDebtByCurrentAccountId() {
    if (this.props.accountId == null) return null;
    for (var i = 0; i < this.props.debtData.length; i++) {
      if (
        this.props.accountId.number == this.props.debtData[i].accountId.number
      ) {
        return this.props.debtData[i].debt;
      } else {
      }
    }
  }

  getIsLoaded() {
    if (
      this.props.workPeriods.length == 0 ||
      this.props.allApartmentData.length == 0
    ) {
      this.props.navigation.navigate("Loading");
    }
  }

  getPieChart() {
    if (this.props.currentCostsData == null) return;
    let arr = new Array();
    let arrForiOS = new Array();
    let series = new Array();
    let sliceColor = new Array();
    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    var sum = countSum(this.props.currentCostsData);

    for (var i = 0; i < this.props.currentCostsData.data.length; i++) {
      var val = parseFloat(this.props.currentCostsData.data[i].cost).toFixed(2);
      var per = (
        (parseFloat(this.props.currentCostsData.data[i].cost) / sum) *
        100
      ).toFixed(2);
      var color = randomColor();
      let data = {
        name: this.props.currentCostsData.data[i].name,
        value: parseFloat(val),
        svg: { fill: color },
        key: i,
        percent: per,
      };
      let dataForiOS = {
        name: this.props.currentCostsData.data[i].name,
        population: parseFloat(val),
        color: color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      };
      arrForiOS.push(dataForiOS);
      series.push(parseFloat(val));
      sliceColor.push(color);
      arr.push(data);
    }

    return (
      <View
        style={{
          padding: 5,
          marginLeft: 15,
          marginEnd: 15,
          marginTop: 7,
          marginBottom: 8,
          backgroundColor: "white",
          borderRadius: 15,
        }}
      >
        <Chart
          data={arr}
          dataForiOS={arrForiOS}
          series={series}
          sliceColor={sliceColor}
          sum={sum}
        />
      </View>
    );
  }
}

function getStartBalance(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumStartBalance = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumStartBalance += dataForCurrentPeriod.data[i].startBalance;
  }
  return sumStartBalance.toFixed(2);
}

function getAccruals(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumAccruals = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumAccruals += dataForCurrentPeriod.data[i].totalAccruals;
  }
  return sumAccruals.toFixed(2);
}

function getSubsidies(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumSubsidies = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalSubsidies != null)
      sumSubsidies += parseFloat(dataForCurrentPeriod.data[i].totalSubsidies);
  }
  return sumSubsidies.toFixed(2);
}

function getPrivileges(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumPrivileges = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalPrivileges != null) {
      sumPrivileges += parseFloat(dataForCurrentPeriod.data[i].totalPrivileges);
    }
  }
  return sumPrivileges.toFixed(2);
}

function getReculc(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumReculc = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalRecalc != null) {
      sumReculc += parseFloat(dataForCurrentPeriod.data[i].totalRecalc);
    }
  }
  return sumReculc.toFixed(2);
}

function getPayments(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumPayments = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    if (dataForCurrentPeriod.data[i].totalPayments != null) {
      sumPayments += parseFloat(dataForCurrentPeriod.data[i].totalPayments);
    }
  }
  return sumPayments.toFixed(2);
}

function getSum(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sum = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sum += dataForCurrentPeriod.data[i].totalSum;
  }
  return sum.toFixed(2);
}

function getFinishBalance(dataForCurrentPeriod) {
  if (dataForCurrentPeriod == null) return "0.00";
  var sumFinishBalance = 0;
  for (var i = 0; i < dataForCurrentPeriod.data.length; i++) {
    sumFinishBalance += dataForCurrentPeriod.data[i].finishBalance;
  }
  return sumFinishBalance.toFixed(2);
}

function countSum(currentCostsData) {
  var sum = 0;
  for (var i = 0; i < currentCostsData.data.length; i++) {
    sum += parseFloat(currentCostsData.data[i].cost);
  }
  return sum.toFixed(2);
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
});
