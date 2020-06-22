import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator
} from 'react-native';
import PageHeader from '../../../components/PageHeader';
import ActionButton from 'react-native-action-button';
import { NavigationEvents } from 'react-navigation';

const DATA_OFFERS = [
  {
    name: 'Утримання будинку',
    system: 'вода',
    status: 'прийнята',
    condition: 'Публічна',
  },
  {
    name: 'Утримання будинку',
    system: 'вода',
    status: 'прийнята',
    condition: 'Публічна',
  },
  {
    name: 'Утримання будинку',
    system: 'вода',
    status: 'прийнята',
    condition: 'Публічна',
  },
];

export default class ScreenApplicationsAndOffers extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeApplicationAndOffersData = this.onChangeApplicationAndOffersData.bind(
      this
    );
    this.onApplicationsAndOffersDataClear = this.onApplicationsAndOffersDataClear.bind(
      this
    );
    this.onChangeSelectedOfferData = this.onChangeSelectedOfferData.bind(this);
    this.onApplicationsAndOffersOnlyMy = this.onApplicationsAndOffersOnlyMy.bind(this);
    this.onApplicationsAndOffersLoading = this.onApplicationsAndOffersLoading.bind(this);
  }

  onChangeApplicationAndOffersData(applicationAndOffersData) {
    this.props.setApplicationsAndOffersData(applicationAndOffersData);
  }

  onApplicationsAndOffersDataClear() {
    this.props.setApplicationsAndOffersDataClear([]);
  }

  onChangeSelectedOfferData(selectedOfferData) {
    this.props.setSelectedOfferData(selectedOfferData);
  }

  onApplicationsAndOffersOnlyMy(onlyMy){
    this.props.setApplicationsAndOffersOnlyMy(onlyMy);
  }

  onApplicationsAndOffersLoading(loading){
    this.props.setApplicationsAndOffersLoading(loading)
  }

  componentDidMount() {
    this.onApplicationsAndOffersLoading(true);
    this.onApplicationsAndOffersDataClear();
    var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
      this.onApplicationsAndOffersLoading(true);
      // connection opened
      ws.send(
        '4210["/claim/list",{"my":false,"archive":true,"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
      ws.send(
        '4211["/claim/list",{"my":false,"archive":false,"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
      ws.send(
        '4212["/claim/list",{"my":true,"archive":true,"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
      ws.send(
        '4213["/claim/list",{"my":true,"archive":false,"workPeriod":"' +
          this.props.workPeriods[this.props.workPeriods.length - 1] +
          '"}]'
      );
      // send a message
    };

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 4) == '4310') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        //console.log('OffersData', data[0]);
        var obj = {
          archive: true,
          data: data[0].data,
          my: false
        };
        //console.log("archive", obj);
        this.onChangeApplicationAndOffersData(obj);
        this.onApplicationsAndOffersLoading(false);
      }
      if (e.data.substring(0, 4) == '4311') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        myObj = JSON.parse(myObjStr);
        data = JSON.parse(myObj);

        obj = {
          archive: false,
          data: data[0].data,
          my: false
        };
        //console.log("archive", obj);
        this.onChangeApplicationAndOffersData(obj);
      }
      if (e.data.substring(0, 4) == '4312') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        myObj = JSON.parse(myObjStr);
        data = JSON.parse(myObj);
        //console.log('OffersData', data[0]);
        obj = {
          archive: true,
          data: data[0].data,
          my: true
        };
        //console.log("archive", obj);
        this.onChangeApplicationAndOffersData(obj);
      }
      if (e.data.substring(0, 4) == '4313') {
        const myObjStr = JSON.stringify(e.data.substring(4, e.data.length));
        myObj = JSON.parse(myObjStr);
        data = JSON.parse(myObj);

        obj = {
          archive: false,
          data: data[0].data,
          my: true
        };
        //console.log("archive", obj);
        this.onChangeApplicationAndOffersData(obj);
      }
    };
  }

  getLoading() {
    if(this.props.loading){
      return(<ActivityIndicator size="large" style={styles.loader, {marginTop: 10, marginBottom: 5}} color="#36678D" />);
    }
  }

  getActiveApplicationsAndOffers() {
    var data;
    for (var i = 0; i < this.props.applicationsAndOffersData.length; i++) {
      if (!this.props.applicationsAndOffersData[i].archive ) {
        if(this.props.onlyMy == this.props.applicationsAndOffersData[i].my){
          data=this.props.applicationsAndOffersData[i].data
        }
      }
    }
    if(data != null && data.length != 0){
      data.sort(function (a, b) {
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
          return 1;
        }
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      return(<FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            fullData={item}
            name={item.subject}
            system={item.system}
            status={item.status}
            condition={item.isOpened}
            navigation={this.props.navigation}
            onChangeSelectedOfferData={this.onChangeSelectedOfferData}
          />
        )}
        keyExtractor={item => item.id}
      />);
    }else{
      if(!this.props.loading){
        return(<Text style={{color: '#364A5F', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>)
      }
    }
  }

  getArchivedApplicationsAndOffers() {
    var data;
    for (var i = 0; i < this.props.applicationsAndOffersData.length; i++) {
      if (this.props.applicationsAndOffersData[i].archive) {
        if(this.props.onlyMy == this.props.applicationsAndOffersData[i].my){
          data=this.props.applicationsAndOffersData[i].data
        }
      }
    }
    if(data != null && data.length != 0){
      data.sort(function (a, b) {
        if (new Date(a.createdAt) < new Date(b.createdAt)) {
          return 1;
        }
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      return(<FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            fullData={item}
            name={item.subject}
            system={item.system}
            status={item.status}
            condition={item.isOpened}
            navigation={this.props.navigation}
            onChangeSelectedOfferData={this.onChangeSelectedOfferData}
          />
        )}
        keyExtractor={item => item.id}
      />);
    }else{
      if(!this.props.loading){
        return(<Text style={{color: '#364A5F', fontSize: 16, marginVertical: 10, alignSelf: 'center'}}>Даних немає</Text>)
      }
    }
  }
  
  toggleSwitch = value => {
    //onValueChange of the switch this function will be called

    //this.setState({ showPassword: value,
    //                image: null });

    this.onApplicationsAndOffersOnlyMy(value);

    //state changes according to switch
    //which will result in re-render the text
  };

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <NavigationEvents
          onDidFocus={() => {
            //console.log('I am triggered');
            this.componentDidMount();
          }}
        />
        <PageHeader
          navigation={this.props.navigation}
          title="Заявки та пропозиції"
        />
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Заявки та пропозиції
              </Text>
            </View>
            <View style={styles.containerSwitch}>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitch}
                  value={this.props.onlyMy}
                />
                <Text style={{ marginTop: 15, color: '#364A5F' }}>
                  Тільки мої: {this.props.onlyMy ? 'Так' : 'Ні'}
                </Text>
              </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Активні
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={styles.dataColumnNameStyle}>Тема</Text>
              <Text style={styles.dataColumnNameStyle}>Система</Text>
              <Text style={styles.dataColumnNameStyle}>Статус</Text>
              <Text style={styles.dataColumnNameStyle}>Стан</Text>
            </View>
            {this.getLoading()}
            {this.getActiveApplicationsAndOffers()}

            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Архіви
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <Text style={styles.dataColumnNameStyle}>Тема</Text>
              <Text style={styles.dataColumnNameStyle}>Система</Text>
              <Text style={styles.dataColumnNameStyle}>Статус</Text>
              <Text style={styles.dataColumnNameStyle}>Стан</Text>
            </View>
            {this.getLoading()}
            {this.getArchivedApplicationsAndOffers()}
          </View>
          <ActionButton
            verticalOrientation="down"
            size={42}
            offsetX={20}
            offsetY={93}
            buttonColor="#54687D"
            onPress={() => {
              this.props.navigation.navigate('AddOffer');
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onChangeSelectedOfferData(this.props.fullData);
          this.props.navigation.navigate('Offer', { title: this.props.name });
        }}>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={styles.itemStyle}>{this.props.name}</Text>
          <Text style={styles.itemStyle}>{this.props.system}</Text>
          <Text style={styles.itemStyle}>{this.props.status}</Text>
          <Text style={styles.itemStyle}>
            {this.props.condition ? 'Відкрита' : 'Закрита'}
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
  containerSwitch: {
    marginLeft: 10,
    marginEnd: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dataColumnNameStyle: {
    width: '25%',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
  },
  itemStyle: {
    width: '25%',
    fontSize: 13,
    padding: 5,
    color: '#364A5F',
    alignContent: 'center',
    textAlign: 'center',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
});
