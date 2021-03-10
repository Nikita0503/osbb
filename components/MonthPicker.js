import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

export default class MonthPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onCurrentWorkPeriodChange = this.onCurrentWorkPeriodChange.bind(this);
    this.onCurrentCostsDataChange = this.onCurrentCostsDataChange.bind(this);
    this.onAccountIdChange = this.onAccountIdChange.bind(this);
  }

  onCurrentWorkPeriodChange(currentWorkPeriod) {
    this.props.setCurrentWorkPeriod(currentWorkPeriod);
  }

  onCurrentCostsDataChange(currentCostsData) {
    this.props.setCurrentCostsData(currentCostsData);
  }

  onAccountIdChange(accountId) {
    this.props.setAccountId(accountId);
  }

  getAccountIdNumber() {
    if (this.props.accountId != null) {
      return this.props.accountId.number;
    }
  }

  getButtonPreviousAccount() {
    if (getUniqueAccountIds(this.props.accountIds).length != 1)
      return (
        <Button
          style={{ width: "15%" }}
          title="<"
          color="#364A5F"
          onPress={() => {
            var index;
            for (var i = 0; i < this.props.accountIds.length; i++) {
              if (this.props.accountId.id == this.props.accountIds[i].id) {
                index = i;
                break;
              }
            }
            index--;
            if (index < 0) {
              index = 0;
            }
            var accountId = this.props.accountIds[index];
            this.onAccountIdChange(accountId);
          }}
        />
      );
  }

  getButtonNextAccount() {
    if (getUniqueAccountIds(this.props.accountIds).length != 1)
      return (
        <Button
          style={{ width: "15%" }}
          title=">"
          color="#364A5F"
          onPress={() => {
            var index;
            for (var i = 0; i < this.props.accountIds.length; i++) {
              if (this.props.accountId.id == this.props.accountIds[i].id) {
                index = i;
                break;
              }
            }
            index++;
            if (index > this.props.accountIds.length - 1) {
              index = this.props.accountIds.length - 1;
            }
            var accountId = this.props.accountIds[index];
            this.onAccountIdChange(accountId);
          }}
        />
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            alignItems: "center",
            width: "50%",
          }}
        >
          {this.getButtonPreviousAccount()}
          <Text
            style={{
              width: "70%",
              color: "white",
              textAlign: "center",
              fontSize: 16,
              marginHorizontal: 5,
            }}
          >
            О.р. {this.getAccountIdNumber()}
          </Text>

          {this.getButtonNextAccount()}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flex: 1,
            alignItems: "center",
            width: "50%",
          }}
        >
          <Button
            style={{ width: "15%" }}
            title="<"
            color="#364A5F"
            onPress={() => {
              var index;
              for (var i = 0; i < this.props.workPeriods.length; i++) {
                if (this.props.currentWorkPeriod == this.props.workPeriods[i]) {
                  index = i;
                  break;
                }
              }
              index--;
              if (index < 0) {
                index = 0;
              }
              var currentWorkPeriod = this.props.workPeriods[index];
              this.onCurrentWorkPeriodChange(currentWorkPeriod);
              var costsData = null;
              for (i = 0; i < this.props.allCostsData.length; i++) {
                if (
                  this.props.allCostsData[i].workPeriod == currentWorkPeriod
                ) {
                  costsData = this.props.allCostsData[i];
                  break;
                }
              }
              this.onCurrentCostsDataChange(costsData);
            }}
          />
          <Text
            style={{
              width: "70%",
              color: "white",
              textAlign: "center",
              fontSize: 16,
              marginHorizontal: 5,
            }}
          >
            {getCorrectName(this.props.currentWorkPeriod)}
          </Text>
          {this.getButtonNextPeriod()}
        </View>
      </View>
    );
  }

  getButtonNextPeriod() {
    if (
      this.props.currentWorkPeriod !=
      this.props.workPeriods[this.props.workPeriods.length - 1]
    ) {
      return (
        <Button
          style={{ width: "15%" }}
          title=">"
          color="#364A5F"
          onPress={() => {
            var index;
            for (var i = 0; i < this.props.workPeriods.length; i++) {
              if (this.props.currentWorkPeriod == this.props.workPeriods[i]) {
                index = i;
                break;
              }
            }
            index++;
            if (index > this.props.workPeriods.length - 1) {
              index = this.props.workPeriods.length - 1;
            }
            var currentWorkPeriod = this.props.workPeriods[index];
            this.onCurrentWorkPeriodChange(currentWorkPeriod);
            var costsData = null;
            for (i = 0; i < this.props.allCostsData.length; i++) {
              if (this.props.allCostsData[i].workPeriod == currentWorkPeriod) {
                costsData = this.props.allCostsData[i];
                break;
              }
            }
            this.onCurrentCostsDataChange(costsData);
          }}
        />
      );
    }
  }
}

function getUniqueAccountIds(data) {
  var accountIds = new Array();
  for (var i = data.length - 1; i >= 0; i--) {
    var isUniq = true;
    for (var j = 0; j < accountIds.length; j++) {
      if (accountIds[j].number == data[i].number) {
        isUniq = false;
        break;
      }
    }
    if (isUniq) {
      accountIds.push(data[i]);
    }
  }
  return accountIds;
}

function getCorrectName(workPeriod) {
  var correctName;
  switch (workPeriod.substr(0, 2)) {
    case "01":
      correctName = "Січень ";
      break;
    case "02":
      correctName = "Лютий ";
      break;
    case "03":
      correctName = "Березень ";
      break;
    case "04":
      correctName = "Квітень ";
      break;
    case "05":
      correctName = "Травень ";
      break;
    case "06":
      correctName = "Червень ";
      break;
    case "07":
      correctName = "Липень ";
      break;
    case "08":
      correctName = "Серпень ";
      break;
    case "09":
      correctName = "Вересень ";
      break;
    case "10":
      correctName = "Жовтень ";
      break;
    case "11":
      correctName = "Листопад ";
      break;
    case "12":
      correctName = "Грудень ";
      break;
    default:
      return null;
  }
  correctName += workPeriod.substr(2, 6);
  return correctName;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#5A6E83",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
