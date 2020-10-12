import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import PageHeader from '../../../components/PageHeader';

export default class ScreenAddOffer extends React.Component {
  constructor(props) {
    super(props);
    this.props.setAddOfferTopic(null);
    this.props.setAddOfferText(null);
    this.props.setAddOfferSystem(null);
    this.props.setAddOfferPublicity(null);
    this.props.setAddOfferButtonSendIsDisabled(false);
  }

  setStartSelected(){
    if(this.props.addOfferSystem == null){
      this.props.setAddOfferSystem(1);
      this.props.setAddOfferPublicity(1);
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Подати заявку" />
        <View style={styles.container}>
          <ScrollView style={{width: '90%'}}>
            <TextInput
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
                marginTop: 10
              }}
              placeholder="Тема"
              onChangeText={text => {
                this.props.setAddOfferTopic(text);
              }}
              value={this.props.addOfferTopic}
            />
            {this.setStartSelected()}
            <View style={{ flexDirection: 'row' }}>
              <Picker
                prompt="Система"
                selectedValue={this.props.addOfferSystem}
                style={{ width: '45%', marginLeft: 15 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.setAddOfferSystem(itemValue);
                }}>
               
                <Picker.Item key={0} label={'вода'} value={1} />
                <Picker.Item key={0} label={'тепло'} value={2} />
                <Picker.Item key={0} label={'газ'} value={3} />
                <Picker.Item key={0} label={'електрика'} value={4} />
                <Picker.Item
                  key={0}
                  label={'прибудинкова територія'}
                  value={5}
                />
                <Picker.Item key={0} label={'ліфт'} value={6} />
                <Picker.Item
                  key={0}
                  label={'сходова клітка (марші)'}
                  value={7}
                />
                <Picker.Item key={0} label={'під`їзд'} value={8} />
              </Picker>
              <Picker
                prompt="Публічність"
                selectedValue={this.props.addOfferPublicity}
                style={{ width: '45%', marginLeft: 10 }}
                onValueChange={(itemValue, itemIndex) => {
                  this.props.setAddOfferPublicity(itemValue);
                }}>
                
                <Picker.Item key={0} label={'публічна'} value={1} />
                <Picker.Item key={0} label={'приватна'} value={2} />
              </Picker>
            </View>
            <TextInput
              multiline
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Введіть текст заявки або пропозиції"
              onChangeText={text => {
                this.props.setAddOfferText(text);
              }}
              value={this.props.addOfferText}
            />
        
          </ScrollView>
          <TouchableOpacity
            disabled={this.props.addOfferIsDisabled}
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              borderRadius: 15
            }}
            onPress={() => {
              this.props.addOffer(
                this.props.addOfferText,
                this.props.addOfferSystem,
                this.props.addOfferPublicity,
                this.props.addOfferTopic,
                this.props.workPeriods,
                this.props.navigation,
                this.props.token
              )
            }}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Додати пропозицію
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    var icon = this.props.image;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
          }}>
          {getImage(this.props.type)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type) {
  switch (type) {
    case 'xls':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_xls.png')}
        />
      );

    case 'pdf':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_pdf.png')}
        />
      );

    case 'doc':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_doc.png')}
        />
      );

    case 'txt':
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_txt.png')}
        />
      );

    default:
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../images/ic_jpg.png')}
        />
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
    flex: 1,
    justifyContent: 'space-between',
  },
});
