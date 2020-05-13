import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import PageHeader from '../../components/PageHeader';
import MonthPickerContainer from '../../components/MonthPickerContainer';
import Dialog from 'react-native-dialog';

export default class ScreenSendIndications extends React.Component {
  constructor(props) {
    super(props);
    this.onIndicationTextChange = this.onIndicationTextChange.bind(this);
    this.onSelectedCounterChange = this.onSelectedCounterChange.bind(this);
    this.onSendIndicationsCountersChange = this.onSendIndicationsCountersChange.bind(
      this
    );
    this.onUpdateIndicationsCountersChange = this.onUpdateIndicationsCountersChange.bind(
      this
    );
  }

  onIndicationTextChange(text) {
    this.props.setIndicationText(text);
  }

  onSelectedCounterChange(selectedCounter) {
    this.props.setSelectedCounter(selectedCounter);
  }

  onUpdateIndicationsCountersChange(indicationsCounters) {
    this.props.updateIndicationsCounters(indicationsCounters);
  }

  onSendIndicationsCountersChange(counters) {
    this.props.setIndicationsCounters(counters);
  }

  componentDidMount() {
    this.onUpdateIndicationsCountersChange([]);
    this.fetchSendIndicationsCounters(0);
  }

  fetchSendIndicationsCounters(index) {
    //this.onFlatInfoCountersChange(null);
    fetch(
      'https://app.osbb365.com/api/tenant/counters?accountId=' +
        this.props.accountIds[index].id +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[this.props.workPeriods.length - 1],
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
        console.log('counters1', responseJson.counters);
        var obj = {
          accountId: this.props.accountIds[index],
          data: responseJson.counters,
        };
        this.onSendIndicationsCountersChange(obj);
        if (index != this.props.accountIds.length - 1) {
          index++;
          this.fetchSendIndicationsCounters(index);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCounters() {
    if (this.props.indicationsCounters.length != this.props.accountIds.length) {
      console.log('counters2', 'null');
      return;
    }
    console.log('hello3', this.props.indicationsCounters);
    for (var i = 0; i < this.props.indicationsCounters.length; i++) {
      if (
        this.props.accountId.number ==
        this.props.indicationsCounters[i].accountId.number
      ) {
        return this.props.indicationsCounters[i].data;
      }
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader
          navigation={this.props.navigation}
          title="Передати покази"
        />
        <MonthPickerContainer />
        <View style={(styles.container, { marginTop: 10 })}>
          <View style={{ flexDirection: 'row' }}>
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
                accountId={this.props.accountId}
                counter={item}
                indicationsCounters={this.getCounters()}
                onSelectedCounterChange={this.onSelectedCounterChange}
                onUpdateIndicationsCountersChange={
                  this.onUpdateIndicationsCountersChange
                }
              />
            )}
            keyExtractor={item => item.name}
          />

          <Dialog.Container
            visible={this.props.selectedCounter == null ? false : true}>
            <Dialog.Title>
              {this.props.selectedCounter == null
                ? ''
                : this.props.selectedCounter.caption}
            </Dialog.Title>
            <Dialog.Input
              keyboardType={'numeric'}
              onChangeText={text => this.onIndicationTextChange(text)}
              value={this.props.indicationText}
              label="Введіть поточний показник"
              wrapperStyle={{
                borderBottomColor: '#000000',
                borderBottomWidth: 1,
              }}
            />
            <Dialog.Button
              label="Скасувати"
              onPress={() => {
                this.onSelectedCounterChange(null);
              }}
            />
            <Dialog.Button
              label="Редагувати"
              onPress={() => {
                fetch(
                  'https://app.osbb365.com/api/account/undefined/counters/' +
                    this.props.selectedCounter.id +
                    '?accountId=' +
                    this.props.accountId.id +
                    '&osbbId=' +
                    this.props.osbbId +
                    '&workPeriod=' +
                    this.props.workPeriods[this.props.workPeriods.length - 1],
                  {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: 'Bearer ' + this.props.token + '',
                    },
                    body: JSON.stringify({
                      testimony: this.props.indicationText,
                    }),
                  }
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log("ak-47", responseJson);
                    Alert.alert(
                      'Повідомлення',
                      'Успішно оновлено!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: true }
                    )
                    this.componentDidMount();
                  })
                  .catch(error => {
                    console.error(error);
                  });

                this.onSelectedCounterChange(null);
                this.onIndicationTextChange(null);
                //this.onSelectedCounterChange(null);
                /*var data = this.props.indicationsCounters;
                for (var i = 0; i < data.length; i++) {
                  if (data[i].accountId.number == this.props.accountId.number) {
                    for (var j = 0; j < data[i].data.length; j++) {
                      if (data[i].data[j].id == this.props.selectedCounter.id) {
                        data[i].data[j].testimony = this.props.indicationText;
                      }
                    }
                  }
                }
                this.onUpdateIndicationsCountersChange([]);
                for (i = 0; i < data.length; i++) {
                  var obj = {
                    accountId: data[i].accountId,
                    data: data[i].data,
                  };
                  //console.log('hello4', obj);
                  this.onSendIndicationsCountersChange(obj);
                }*/
                
                
                //console.log('hello', data);
                /*var obj = {
                  accountId: this.props.accountIds[index],
                  data: responseJson.counters,
                };
                this.onSendIndicationsCountersChange(obj);*/
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
          if (this.props.counter.editAllow == true) {
            this.props.onSelectedCounterChange(this.props.counter);
          } else {
            Alert.alert(
              'Повідомлення',
              'Голова ОСББ виконав нарахування. Зміна показань лічильника неможлива.',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
            )
          }
        }}>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.caption}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.installIn}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.prevTestimony == null ? "0.00" : parseFloat(this.props.counter.prevTestimony).toFixed(2)}
          </Text>
          <Text style={styles.itemCountersStyle}>
            {this.props.counter.testimony == null ? "0.00" : parseFloat(this.props.counter.testimony).toFixed(2)}
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dataColumnNameCountersStyle: {
    width: '25%',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemCountersStyle: {
    width: '25%',
    fontSize: 12,
    padding: 5,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
});
