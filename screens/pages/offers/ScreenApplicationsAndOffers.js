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
  ActivityIndicator,
  Alert
} from 'react-native';
import PageHeader from '../../../components/PageHeader';
import ActionButton from 'react-native-action-button';
import { NavigationEvents } from 'react-navigation';

export default class ScreenApplicationsAndOffers extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllRequests(this.props.workPeriods, this.props.token)
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
        return 0;
      });
      if(this.props.firstlyOpened){
        data.sort(function(x, y) {
          return (x.isOpened === y.isOpened)? 0 : x.isOpened? -1 : 1;
        });
      }
      return(<FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            token={this.props.token}
            workPeriods={this.props.workPeriods}
            archived={false}
            fullData={item}
            name={item.subject}
            system={item.system}
            status={item.status}
            condition={item.isOpened}
            navigation={this.props.navigation}
            userData={this.props.userData}
            setSelectedOfferData={this.props.setSelectedOfferData}
            componentDidMount={this.updateScreen}
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
        return 0;
      });
      return(<FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            token={this.props.token}
            workPeriods={this.props.workPeriods}
            archived={true}
            fullData={item}
            name={item.subject}
            system={item.system}
            status={item.status}
            condition={item.isOpened}
            navigation={this.props.navigation}
            userData={this.props.userData}
            setSelectedOfferData={this.props.setSelectedOfferData}
            componentDidMount={this.updateScreen}
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
    this.props.setApplicationsAndOffersOnlyMy(value);
  };

  toggleSwitchFirstly = () => {
    this.props.setApplicationsAndOffersFirstlyOpened();
  }

  toggleSwitchArchived = () => {
    this.props.setApplicationsAndOffersDisplayAcrhived();
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <NavigationEvents
          onDidFocus={() => {
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
                borderRadius: 15
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
                <Text style={{ marginTop: 16, marginRight: 10, color: '#364A5F' }}>
                  Тільки мої
                </Text>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitch}
                  value={this.props.onlyMy}
                />
              </View>
              <View style={styles.containerSwitch}>
                <Text style={{ marginTop: 16, marginRight: 10, color: '#364A5F' }}>
                  Спочатку відкриті
                </Text>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitchFirstly}
                  value={this.props.firstlyOpened}
                />
              </View>
              <View style={styles.containerSwitch}>
                <Text style={{ marginTop: 16, marginRight: 10, color: '#364A5F' }}>
                  Відображати архів
                </Text>
                <Switch
                  style={{ marginTop: 10 }}
                  onValueChange={this.toggleSwitchArchived}
                  value={this.props.displayArchived}
                />
              </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 15
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
            {this.getArchieved()}
          </View>
          <ActionButton
            verticalOrientation="down"
            size={40}
            offsetX={20}
            offsetY={57}
            buttonColor="#54687D"
            onPress={() => {
              this.props.navigation.navigate('AddOffer');
            }}
          />
        </ScrollView>
      </View>
    );
  }

  getArchieved(){
    if(this.props.displayArchived)
    return(
      <View style={{
        width: '100%',
        alignItems: 'center',
      }}>
        <View
              style={{
                width: '100%',
                backgroundColor: '#F9F9F9',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 15
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
    )
  }
}

class Item extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onLongPress={() => {
          if(!this.props.archived){
            if(this.props.fullData.isOpened){
              if(this.props.fullData.fromUser.login == this.props.userData.login){
                Alert.alert(
                  'Підтвердження',
                  'Ви впевненні що хочете відкликати заявку?',
                  [
                    {text: 'Так', onPress: () => {
                      this.props.withdrawRequest(this.props.fullData, this.props.workPeriods, this.props.token);
                    }},
                    {text: 'Ні', onPress: () => {
                      console.log("hide")
                    }}
                  ],
                  { cancelable: true }
                )
              }else{
                Alert.alert(
                  '',
                  'Ви обрали заявку іншого користувача. Будь ласка, оберіть одну із поданих вами',
                  [
                    {text: 'OK'}
                  ]
                )
              }
            }else{
              Alert.alert(
                '',
                'Ви обрали закриту заявку. Будь ласка, оберіть заявку зі станом "Відкрита"',
                [
                  {text: 'OK'}
                ]
              )
            }
          }
        }}
        onPress={() => {
          this.props.setSelectedOfferData(this.props.fullData);
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
    borderRadius: 15,
    padding: 5,
    marginLeft: 15,
    marginEnd: 15,
    marginTop: 7,
    marginBottom: 8,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  containerSwitch: {
    width: '100%',
    marginLeft: 10,
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
