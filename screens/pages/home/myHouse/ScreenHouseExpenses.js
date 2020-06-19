import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  WebView,
  ActivityIndicator
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';
import DataComponent from '../../../../components/DataComponent';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';

function getDate(data) {
  var date = new Date(data);
  var day = date.getDate();
  if(day < 10) day = "0" + day;
  var month = date.getMonth() + 1;
  if(month < 10) month = "0" + month
  /*switch (date.getMonth()) {
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
  }*/
  return day + " " + month + " " + date.getFullYear();
}

export default class ScreenHouseExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.onExpensesDataChange = this.onExpensesDataChange.bind(this);
    this.onExpensesDataChange(null);
    this.onExpensesSelectedFileChange = this.onExpensesSelectedFileChange.bind(this);
  }

  onExpensesDataChange(expenseData) {
    this.props.setExpensesData(expenseData);
  }

  onExpensesSelectedFileChange(selectedFile){
    this.props.setExpensesSelectedFile(selectedFile)
  }

  componentDidMount() {
    fetch(
      'https://app.osbb365.com/api/tenant/costs/' +
        this.props.expensesGeneralData.id +
        '/transcript?accountId=' +
        this.props.accountId.id +
        '&osbbId=' +
        this.props.osbbId,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token,
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.onExpensesDataChange(responseJson);
        //console.log("onExpensesDataChange", responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getExpensesGeneralData() {
    var data = this.props.expensesGeneralData;
    return (
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
                  textAlign: 'center',
                }}>
                {data.name}
              </Text>
            </View>
        <DataComponent
          name="Вартість"
          number={parseFloat(data.cost).toFixed(2)}
        />
        <DataComponent name="Одиниця виміру" number={data.units} />
        <DataComponent name="Обсяг" number={data.amount} />
        <DataComponent name="Початкова дата" number={data.startDate != null ? getDate(data.startDate) : ""} />
        <DataComponent name="Кінцева дата" number={data.endDate != null ? getDate(data.endDate) : ""} />
      </View>
    );
  }

  getExpensesFilesData(){
    if(this.props.expensesFilesData == null){ return(
      <View style={styles.container}>
        <Text style={{color: '#364A5F', fontSize: 16, marginTop: 10, alignSelf: 'center'}}>
          Дані відсутні
        </Text>
      </View>
    ) }
    if(this.props.expensesFilesData[0] == null){ return }
    return(
      <FlatList
        horizontal
        data={this.props.expensesFilesData}
        renderItem={({ item }) => {
          var type = item.substring(item.length - 3, item.length)
          return (<ItemFile file={type} path={item} onExpensesSelectedFileChange={this.onExpensesSelectedFileChange}/>)
          }
        }
        listKey={(item, index) => 'C' + index.toString()}
      />
    );
  }


  getLoadingView(){
    //console.log("exp2", this.props.expensesData)
    if(this.props.expensesData == null)
    return(
    <View style={styles.container}>
      <Text style={{color: '#364A5F', fontSize: 16, marginTop: 10, alignSelf: 'center'}}>
        Дані відсутні
      </Text>
    </View>)
  }

  getFileShowDialog(){
    if(this.props.expensesSelectedFile != null){
      var type = this.props.expensesSelectedFile.path.substring(this.props.expensesSelectedFile.path.length - 3)
      var path = this.props.expensesSelectedFile.path;
      //type = 'jpg'
      console.log("TYPE", type)
      switch(type){
        case 'jpg':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'png':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'svg':
          return(
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />)
        case 'pdf':
          return(
          <PDFReader
            style={{width: 250, maxHeight: 400}}
            source={{
              uri: 'https://app.osbb365.com' + path,
            }}
          />
          )
        default: 
          return(<Text>In developing...</Text>)

      }
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader
          navigation={this.props.navigation}
          title="Витрати по будинку"
        />
        <ScrollView>
          {this.getExpensesGeneralData()}
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
                  textAlign: 'center',
                }}>
                Склад витрат/робіт
              </Text>
            </View>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.dataColumnNameHouseCostsStyle}>Назва</Text>
                <Text style={styles.dataColumnNameHouseCostsStyle}>
                  Вартість
                </Text>
                <Text style={styles.dataColumnNameHouseCostsStyle}>
                  Нотатки
                </Text>
                <Text style={styles.dataColumnNameHouseCostsStyle}>
                  Початкова дата
                </Text>
                <Text style={styles.dataColumnNameHouseCostsStyle}>
                  Кінцева дата
                </Text>
              </View>
              {this.getLoadingView()}
              <FlatList
                data={this.props.expensesData}
                renderItem={({ item }) => (
                  <ItemHouseCosts
                    name={item.name}
                    cost={parseFloat(item.cost).toFixed(2)}
                    notes={item.note}
                    startDate={item.startDate != null ? getDate(item.startDate) : ""}
                    endDate={item.endDate != null ? getDate(item.endDate) : ""}
                  />
                )}
                keyExtractor={item => item.name}
              />
            </View>
          </View>

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
                  textAlign: 'center',
                }}>
                Список прикріплених файлів
              </Text>
            </View>
          {this.getExpensesFilesData()}
          <Dialog.Container
            visible={this.props.expensesSelectedFile == null ? false : true}>
            
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.onExpensesSelectedFileChange(null);
              }}
            />
          </Dialog.Container>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress = {() => {
        var obj = {
          name: this.props.file,
          path: this.props.path
        }
        this.props.onExpensesSelectedFileChange(obj)
      }}>
        <View
          style={{
            flexDirection: 'row',
            margin: 5,
          }}>
          {getImage(this.props.file)}
        </View>
      </TouchableOpacity>
    );
  }

  showFile(file){
    return(<Text>file</Text>)
  }
}

function getImage(type) {
  switch (type) {
    case 'lsx':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_xls.png')}
        />
      );
    case 'xls':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_xls.png')}
        />
      );

    case 'pdf':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_pdf.png')}
        />
      );
    case 'ocx':
      return (
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../../../images/ic_doc.png')}
          />
        );
    case 'doc':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_doc.png')}
        />
      );
    case 'txt':
      return (
        <Image
          style={{ width: 40, height: 50 }}
          source={require('../../../../images/ic_txt.png')}
        />
      );

    default:
      return (
        <Image
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
          source={require('../../../../images/ic_jpg.png')}
        />
      );
  }
}

class ItemHouseCosts extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row', paddingTop: 5 }}>
        <Text style={styles.itemHouseCostsStyle}>{this.props.name}</Text>
        <Text style={styles.itemHouseCostsStyle}>{this.props.cost}</Text>
        <Text style={styles.itemHouseCostsStyle}>{this.props.notes}</Text>
        <Text style={styles.itemHouseCostsStyle}>{this.props.startDate}</Text>
        <Text style={styles.itemHouseCostsStyle}>{this.props.endDate}</Text>
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
    backgroundColor: 'white',
  },
  dataColumnNameHouseCostsStyle: {
    width: '20%',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#364A5F',
    alignContent: 'flex-end',
  },
  itemHouseCostsStyle: {
    width: '20%',
    fontSize: 10,
    color: '#364A5F',
    alignContent: 'flex-end',
  },
});
