import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import PageHeader from "../../components/PageHeader";
import MonthPickerContainer from "../../components/MonthPickerContainer";
import DataContainer from "../../components/DataContainer";
import DataComponent from "../../components/DataComponent";
import { RadioButton } from "react-native-paper";
import { NavigationEvents } from "react-navigation";
import { bool } from "prop-types";

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
  return date.getDate() + month + date.getFullYear();
}

export default class ScreenFlatInfo extends React.Component {
  componentDidMount() {
    this.props.setFlatInfoCountersClear([]);
    this.props.fetchFlatInfoGeneralData(
      this.props.accountIds,
      this.props.token
    );
    this.props.fetchFlatInfoLodgerData(
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      0,
      this.props.token
    );
    this.props.fetchFlatInfoParameters(
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      0,
      this.props.token
    );
    this.props.fetchFlatInfoContributions(
      this.props.workPeriods,
      this.props.token
    );
    this.props.fetchFlatInfoIndividualContributions(
      this.props.workPeriods,
      this.props.token
    );
    this.props.fetchFlatInfoPrivileges(
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      this.props.token
    );
    this.props.fetchFlatInfoCounters(
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      0,
      this.props.token
    );
    this.props.fetchFlatInfoContracts(
      this.props.accountIds,
      this.props.osbbId,
      this.props.workPeriods,
      this.props.token
    );
  }

  getRadioButtons() {
    return (
      <View>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <RadioButton
            disabled
            value="first"
            color="pink"
            status={this.state.checked === "first" ? "checked" : "unchecked"}
            onPress={() => {
              this.setState({ checked: "first" });
            }}
          />
          <Text style={{ marginTop: 7, color: "#949494", fontSize: 15 }}>
            Фізична особа
          </Text>
        </View>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <RadioButton
            disabled
            value="second"
            color="pink"
            status={this.state.checked === "second" ? "checked" : "unchecked"}
            onPress={() => {
              this.setState({ checked: "second" });
            }}
          />
          <Text style={{ marginTop: 7, color: "#949494", fontSize: 15 }}>
            Юридична особа
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            margin: 5,
            marginLeft: 16,
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          Відповідальний наймач
        </Text>
      </View>
    );
  }

  getGeneralData() {
    var currentFlatInfoGeneralData;
    for (var i = 0; i < this.props.flatInfoGeneralData.length; i++) {
      if (
        this.props.accountId.number == this.props.flatInfoGeneralData[i].number
      ) {
        currentFlatInfoGeneralData = this.props.flatInfoGeneralData[i];
        break;
      }
    }
    if (currentFlatInfoGeneralData == null) return;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <DataComponent
            name="Рахунок відкрито"
            number={getDate(currentFlatInfoGeneralData.openingDate)}
          />
          <DataComponent
            name="Номер рахунку"
            number={currentFlatInfoGeneralData.number}
          />
          <DataComponent
            name="Номер квартири"
            number={currentFlatInfoGeneralData.flat}
          />
          <DataComponent
            name="Поверх"
            number={currentFlatInfoGeneralData.floor}
          />
          <DataComponent
            name="Під'їзд"
            number={currentFlatInfoGeneralData.porch}
          />
          <DataComponent
            name="Корпус"
            number={currentFlatInfoGeneralData.corps}
          />
        </View>

        <View style={(styles.container, { marginLeft: 2 })}>
          <View style={{ alignItems: "center" }}>
            <DataComponent
              name="Власник/Співвласник"
              number={this.getName(currentFlatInfoGeneralData)}
            />
          </View>
        </View>
      </View>
    );
  }

  getName(currentFlatInfoGeneralData) {
    if (currentFlatInfoGeneralData.tenantLegalName != null) {
      return currentFlatInfoGeneralData.tenantLegalName;
    } else {
      return (
        currentFlatInfoGeneralData.tenantPersonalSurname +
        "\n" +
        currentFlatInfoGeneralData.tenantPersonalFirstName +
        "\n" +
        currentFlatInfoGeneralData.tenantPersonalPatronymic
      );
    }
  }

  getLodgers() {
    for (var i = 0; i < this.props.flatInfoLodgerData.length; i++) {
      if (
        this.props.accountId.number ==
        this.props.flatInfoLodgerData[i].accountId.number
      ) {
        return this.props.flatInfoLodgerData[i].data;
      }
    }
  }

  getParameters() {
    for (var i = 0; i < this.props.flatInfoParameters.length; i++) {
      if (
        this.props.accountId.number ==
        this.props.flatInfoParameters[i].accountId.number
      ) {
        return this.props.flatInfoParameters[i].data;
      }
    }
  }

  getContributions() {
    if (this.props.flatInfoContributions == null) {
      return;
    }
    return this.props.flatInfoContributions;
  }

  getPriviliges() {
    if (this.props.flatInfoPrivileges == null) {
      return;
    }
    return;
  }

  getIndividualContributions() {
    if (this.props.flatInfoIndividualContributions == null) {
      return;
    }
    return this.props.flatInfoIndividualContributions;
  }

  getCounters() {
    for (var i = 0; i < this.props.flatInfoCounters.length; i++) {
      if (
        this.props.accountId.number ==
        this.props.flatInfoCounters[i].accountId.number
      ) {
        return this.props.flatInfoCounters[i].data;
      }
    }
  }

  getContarcts() {
    if (this.props.flatInfoContracts.length == 0) {
      return;
    }
    var contracts = new Array();
    for (var i = 0; i < this.props.flatInfoContracts.length; i++) {
      if (
        this.props.flatInfoContracts[i].accountId.number ==
        this.props.accountId.number
      ) {
        contracts.push(this.props.flatInfoContracts[i].data);
      }
    }
    var uniqueArr = this.getUnique(contracts);
    return uniqueArr;
  }

  getUnique(arr) {
    var unique = new Array();
    for (var i = 0; i < arr.length; i++) {
      var bool = new Boolean(true);
      for (var j = 0; j < unique.length; j++) {
        if (arr[i].id == unique[j].id) {
          bool = false;
        }
      }
      if (bool) {
        unique.push(arr[i]);
      }
    }
    return unique;
  }

  render() {
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
        <PageHeader navigation={this.props.navigation} title="Про квартиру" />
        <MonthPickerContainer />
        <ScrollView>
          {this.getGeneralData()}
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
                Зареєстровані мешканці
              </Text>
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNameInhabitantStyle}>ПІБ</Text>
                <Text style={styles.dataColumnNameInhabitantStyle}>
                  Дата народження
                </Text>
              </View>

              <FlatList
                data={this.getLodgers()}
                renderItem={({ item }) => (
                  <ItemInhabitant
                    fullName={
                      item.surname +
                      "\n" +
                      item.firstName +
                      "\n" +
                      item.patronymic
                    }
                    dateOfBirth={getDate(item.dateOfRegistration)}
                  />
                )}
                keyExtractor={(item) => item.surname}
              />
            </View>
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
                Параметри
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNameOptionsStyle}>Назва</Text>
                <Text style={styles.dataColumnNameOptionsStyle}>
                  Початкова дата
                </Text>
                <Text style={styles.dataColumnNameOptionsStyle}>
                  Кінцева дата
                </Text>
                <Text style={styles.dataColumnNameOptionsStyle}>Значення</Text>
                <Text style={styles.dataColumnNameOptionsStyle}>
                  Одиниця виміру
                </Text>
              </View>
              <FlatList
                data={this.getParameters()}
                renderItem={({ item }) => (
                  <ItemOptions
                    name={item.name}
                    startDate={getDate(item.startDate)}
                    endDate={getDate(item.endDate)}
                    value={item.value}
                    unit={item.unit}
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
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
                Пільги
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNamePrivilegesStyle}>
                  Пільговик
                </Text>
                <Text style={styles.dataColumnNamePrivilegesStyle}>ІПН</Text>
                <Text style={styles.dataColumnNamePrivilegesStyle}>
                  Тип пільги
                </Text>
                <Text style={styles.dataColumnNamePrivilegesStyle}>
                  № посвідчення
                </Text>
              </View>
              <FlatList
                data={this.getPriviliges()}
                renderItem={({ item }) => (
                  <ItemPrivileges
                    name={item.name}
                    type={item.type}
                    itn={item.itn}
                    number={item.number}
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
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
                Внески та їх розміри
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNameContributionsStyle}>
                  Назва
                </Text>
                <Text style={styles.dataColumnNameContributionsStyle}>
                  Одиниця виміру
                </Text>
                <Text style={styles.dataColumnNameContributionsStyle}>
                  Тариф
                </Text>
              </View>
              <FlatList
                data={this.getContributions()}
                renderItem={({ item }) => (
                  <ItemContributions
                    name={item.caption}
                    unit={item.unit}
                    rate={
                      item.tariff == null
                        ? ""
                        : parseFloat(item.tariff).toFixed(2)
                    }
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
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
                Індивідуальні внески та їх розміри
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNameIndividualContributionsStyle}>
                  Назва
                </Text>
                <Text style={styles.dataColumnNameIndividualContributionsStyle}>
                  Одиниця виміру
                </Text>
                <Text style={styles.dataColumnNameIndividualContributionsStyle}>
                  Внесок активний
                </Text>
                <Text style={styles.dataColumnNameIndividualContributionsStyle}>
                  Тариф
                </Text>
              </View>
              <FlatList
                data={this.getIndividualContributions()}
                renderItem={({ item }) => (
                  <ItemIndividualContributions
                    name={item.caption}
                    unit={item.unit}
                    isActive={item.isActive ? "Ні" : "Так"}
                    rate={parseFloat(item.tariff).toFixed(2)}
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
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
                Лічільники
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
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
                data={this.getCounters()}
                renderItem={({ item }) => (
                  <ItemCounters
                    name={item.caption}
                    place={item.installIn}
                    previousIndicators={
                      item.prevTestimony == null
                        ? "0.00"
                        : parseFloat(item.prevTestimony).toFixed(2)
                    }
                    currentIndicators={
                      item.testimony == null
                        ? "0.00"
                        : parseFloat(item.testimony).toFixed(2)
                    }
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
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
                Договори
              </Text>
            </View>
            <View style={(styles.container, { marginTop: 10 })}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.dataColumnNameContractsStyle}>Назва</Text>
                <Text style={styles.dataColumnNameContractsStyle}>Сума</Text>
                <Text style={styles.dataColumnNameContractsStyle}>
                  Початкова дата
                </Text>
                <Text style={styles.dataColumnNameContractsStyle}>
                  Кінцева дата
                </Text>
                <Text style={styles.dataColumnNameContractsStyle}>Нотатки</Text>
              </View>
              <FlatList
                data={this.getContarcts()}
                renderItem={({ item }) => (
                  <ItemContracts
                    name={item.title}
                    sum={item.amount}
                    startDate={getDate(item.startDate)}
                    endDate={getDate(item.endDate)}
                    notes={item.notes}
                  />
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class ItemInhabitant extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemInhabitantStyle}>{this.props.fullName}</Text>
        <Text style={styles.itemInhabitantStyle}>{this.props.dateOfBirth}</Text>
      </View>
    );
  }
}

class ItemOptions extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemOptionsStyle}>{this.props.name}</Text>
        <Text style={styles.itemOptionsStyle}>{this.props.startDate}</Text>
        <Text style={styles.itemOptionsStyle}>{this.props.endDate}</Text>
        <Text style={styles.itemOptionsStyle}>{this.props.value}</Text>
        <Text style={styles.itemOptionsStyle}>{this.props.unit}</Text>
      </View>
    );
  }
}

class ItemPrivileges extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemPrivilegesStyle}>{this.props.name}</Text>
        <Text style={styles.itemPrivilegesStyle}>{this.props.type}</Text>
        <Text style={styles.itemPrivilegesStyle}>{this.props.itn}</Text>
        <Text style={styles.itemPrivilegesStyle}>{this.props.number}</Text>
      </View>
    );
  }
}

class ItemContributions extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemContributionsStyle}>{this.props.name}</Text>
        <Text style={styles.itemContributionsStyle}>{this.props.unit}</Text>
        <Text style={styles.itemContributionsStyle}>{this.props.rate}</Text>
      </View>
    );
  }
}

class ItemIndividualContributions extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemIndividualContributionsStyle}>
          {this.props.name}
        </Text>
        <Text style={styles.itemIndividualContributionsStyle}>
          {this.props.unit}
        </Text>
        <Text style={styles.itemIndividualContributionsStyle}>
          {this.props.isActive}
        </Text>
        <Text style={styles.itemIndividualContributionsStyle}>
          {this.props.rate}
        </Text>
      </View>
    );
  }
}

class ItemCounters extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemCountersStyle}>{this.props.name}</Text>
        <Text style={styles.itemCountersStyle}>{this.props.place}</Text>
        <Text style={styles.itemCountersStyle}>
          {this.props.previousIndicators}
        </Text>
        <Text style={styles.itemCountersStyle}>
          {this.props.currentIndicators}
        </Text>
      </View>
    );
  }
}

class ItemContracts extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <Text style={styles.itemContractsStyle}>{this.props.name}</Text>
        <Text style={styles.itemContractsStyle}>{this.props.sum}</Text>
        <Text style={styles.itemContractsStyle}>{this.props.startDate}</Text>
        <Text style={styles.itemContractsStyle}>{this.props.endDate}</Text>
        <Text style={styles.itemContractsStyle}>{this.props.notes}</Text>
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
  dataColumnNameInhabitantStyle: {
    width: "50%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "flex-end",
  },
  itemInhabitantStyle: {
    width: "50%",
    fontSize: 16,
    color: "#364A5F",
    alignContent: "flex-end",
  },
  dataColumnNameOptionsStyle: {
    width: "20%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemOptionsStyle: {
    width: "20%",
    fontSize: 12,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  dataColumnNamePrivilegesStyle: {
    width: "25%",
    fontSize: 13,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemPrivilegesStyle: {
    width: "25%",
    fontSize: 13,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  dataColumnNameContributionsStyle: {
    width: "33%",
    fontSize: 13,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemContributionsStyle: {
    width: "33%",
    fontSize: 13,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  dataColumnNameIndividualContributionsStyle: {
    width: "25%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemIndividualContributionsStyle: {
    width: "25%",
    fontSize: 12,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
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
  dataColumnNameContractsStyle: {
    width: "20%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
  itemContractsStyle: {
    width: "20%",
    fontSize: 12,
    padding: 5,
    color: "#364A5F",
    alignContent: "center",
    textAlign: "center",
  },
});
