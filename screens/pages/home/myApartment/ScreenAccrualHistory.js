import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';
import DataComponent from '../../../../components/DataComponent';

export default class ScreenAccrualHistory extends React.Component {
  constructor(props) {
    super(props);
    this.onCurrentAccrualsDataChange = this.onCurrentAccrualsDataChange.bind(
      this
    );
    this.onSelectedAccrualsDataChange = this.onSelectedAccrualsDataChange.bind(
      this
    );
    this.onCurrentAccrualsDataChange(new Array());
    this.onSelectedAccrualsDataChange(null);
  }

  onCurrentAccrualsDataChange(currentAccrualsData) {
    this.props.setCurrentAccrualsData(currentAccrualsData);
  }

  onSelectedAccrualsDataChange(selectedAccrualsData) {
    this.props.setSelectedAccrualsData(selectedAccrualsData);
  }

  componentDidMount() {
    fetch(
      'https://app.osbb365.com/api/tenant/charges/total?accountId=' +
        this.props.accountId.id +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.currentWorkPeriod,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        const data = sortCurrentAccrualsData(responseJson.chargesList);
        this.onCurrentAccrualsDataChange(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <PageHeader
          navigation={this.props.navigation}
          title="Історія нарахувань"
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.dataColumnNameStyle}>Внесок</Text>
              <Text style={styles.dataColumnNameStyle}>Нарахування</Text>
            </View>
            <FlatList
              data={this.props.accrualHistoryCurrentData}
              renderItem={({ item }) => (
                <Item
                  onSelectedAccrualsDataChange={
                    this.onSelectedAccrualsDataChange
                  }
                  accrualData={item}
                  contribution={item.caption}
                  balance={item.startBalance}
                  charges={item.totalAccruals}
                  pendingPerMonth={item.totalSum}
                  debt={item.finishBalance}
                />
              )}
              keyExtractor={item => item.contribution}
            />
          </View>
          {showAccrual(
            this.props.accrualHistoryCurrentSelectedData,
            this.onSelectedAccrualsDataChange
          )}
        </ScrollView>
      </View>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.onSelectedAccrualsDataChange(this.props.accrualData)
        }>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={styles.itemStyle}>{this.props.contribution}</Text>
          <Text style={styles.itemStyle}>{this.props.charges}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function sortCurrentAccrualsData(data){
  data.sort(function (a, b) {
    if (a.caption > b.caption) {
      return 1;
    }
    if (a.caption < b.caption) {
      return -1;
    }
    return 0;
  });
  return data
}

function showAccrual(selectedAccrualsData, onSelectedAccrualsDataChange) {
  if (selectedAccrualsData != null) {
    return (
      <View style={styles.containerForSelected}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#F9F9F9',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              maxWidth: '80%',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 18,
            }}>
            Нарахування {selectedAccrualsData.caption}
          </Text>
          <Button
            title="X"
            color="#364A5F"
            onPress={() => onSelectedAccrualsDataChange(null)}
          />
        </View>

        <View style={(styles.container, { marginTop: 10, marginRight: 10 })}>
          <DataComponent
            name="Початкова дата"
            number={getStartOfMonth(selectedAccrualsData.workPeriod)}
          />
          <DataComponent
            name="Кінцева дата"
            number={getEndOfMonth(selectedAccrualsData.workPeriod)}
          />
          <DataComponent name="Сума" number={selectedAccrualsData.totalSum} />
          <DataComponent
            name="Розмір внеска"
            number={selectedAccrualsData.tariff}
          />
          <DataComponent name="Об’єм" number={selectedAccrualsData.capacity} />
        </View>
      </View>
    );
  } else {
    return <View />;
  }
}

function getStartOfMonth(dateStr) {
  var date = new Date(dateStr);
  return '1' + getMonthByNumber(date.getMonth()) + date.getFullYear();
}

function getEndOfMonth(dateStr) {
  var date = new Date(dateStr);
  return (
    getAmountDays(date.getMonth()) +
    getMonthByNumber(date.getMonth()) +
    +date.getFullYear()
  );
}

function getAmountDays(month, year) {
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    return 30;
  } else {
    if (month == 2) {
      var leap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      if (leap) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 31;
    }
  }
}

function getMonthByNumber(number) {
  var month;
  switch (number) {
    case 0:
      month = ' січ. ';
      break;
    case 1:
      month = ' лют. ';
      break;
    case 2:
      month = ' бер. ';
      break;
    case 3:
      month = ' квіт. ';
      break;
    case 4:
      month = ' трав. ';
      break;
    case 5:
      month = ' черв. ';
      break;
    case 6:
      month = ' лип. ';
      break;
    case 7:
      month = ' серп. ';
      break;
    case 8:
      month = ' вер. ';
      break;
    case 9:
      month = ' жовт. ';
      break;
    case 10:
      month = ' лист. ';
      break;
    case 11:
      month = ' груд. ';
      break;
  }
  return month;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  containerForSelected: {
    marginLeft: 10,
    marginEnd: 10,
    marginTop: 7,
    marginBottom: 8,
  },
  dataColumnNameStyle: {
    marginVertical: 10,
    width: '50%',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemStyle: {
    width: '50%',
    fontSize: 14,
    paddingVertical: 4,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
});
