import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PageHeader from '../../components/PageHeader';
import DataContainer from '../../components/DataContainer';
import Dialog from 'react-native-dialog';
import PDFReader from 'rn-pdf-reader-js';
//import * as FileSystem from 'expo-file-system';
//import FileViewer from 'react-native-file-viewer';
//const FileOpener = require('react-native-file-opener');

const DATA_FILES = [
  {
    name: 'Excel file',
    type: 'xls',
  },
  {
    name: 'PDF file',
    type: 'pdf',
  },
  {
    name: 'DOC file',
    type: 'doc',
  },
  {
    name: 'TXT file',
    type: 'txt',
  },
  {
    name: 'Image file',
    type: 'jpg',
  },
];

export default class ScreenAboutHouse extends React.Component {
  constructor(props) {
    super(props);
    this.onAboutHouseDataChange = this.onAboutHouseDataChange.bind(this);
    this.onAboutHouseDocumentsChange = this.onAboutHouseDocumentsChange.bind(this);
    this.onAboutHouseSelectedFileChange = this.onAboutHouseSelectedFileChange.bind(this);
  }

  onAboutHouseDataChange(aboutHouseData) {
    this.props.setAboutHouseData(aboutHouseData);
  }

  onAboutHouseDocumentsChange(aboutHouseDocuments) {
    this.props.setAboutHouseDocuments(aboutHouseDocuments);
  }

  onAboutHouseSelectedFileChange(selectedFile){
    this.props.setAboutHouseSelectedFile(selectedFile)
  }

  componentDidMount() {
    fetch(
      'https://app.osbb365.com/api/tenant/osbb?accountId=' +
        this.props.accountId +
        '&osbbId=' +
        this.props.osbbId +
        '&workPeriod=' +
        this.props.workPeriods[this.props.workPeriods.length - 1],
      /*'https://app.osbb365.com/api/tenant/osbb?'
    + 'accountId=' + this.props.accountId
    + '&osbbId=' + this.props.osbbId
    + 'workPeriod=' + this.props.workPeriods[this.props.workPeriods.length-1]*/ {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.props.token + '',
        },
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        
        this.onAboutHouseDataChange(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

      var ws = new WebSocket(
      'wss://app.osbb365.com/socket.io/?auth_token=' +
        this.props.token +
        '&EIO=3&transport=websocket'
    );

    ws.onopen = () => {
    // connection opened
      ws.send('424["/statutoryDocuments/list",{}]'); // send a message
    };

    ws.onmessage = e => {
      // a message was received
      if (e.data.substring(0, 3) == '434') {
        const myObjStr = JSON.stringify(e.data.substring(3, e.data.length));
        var myObj = JSON.parse(myObjStr);
        var data = JSON.parse(myObj);
        //console.log('aboutHouseDocuments', data[0]);
        this.onAboutHouseDocumentsChange(data[0]);
      }
    };
  }

  getImage() {
    //console.log("house", this.props.aboutHouseData);
    if (this.props.aboutHouseData == null) return;
    if (this.props.aboutHouseData.image == null) return (<View style={{alignItems: 'center', margin: 5}}><Text style={{color: '#364A5F'}}>Фото будинку відсутнє</Text></View>);
    return (
      <Image
        source={{
          uri: 'https://app.osbb365.com' + this.props.aboutHouseData.image,
        }}
        style={{
          width: 300,
          height: 300,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
    );
  }

  getAddress(){
    var address = '';
    address += this.props.aboutHouseData.Region.name_ua + " ";
    address += this.props.aboutHouseData.City.name_ua + " ";
    address += this.props.aboutHouseData.Street.StreetType.name + " ";
    address += this.props.aboutHouseData.house;
    return address;
  }

  getGeneralData() {
    if (this.props.aboutHouseData == null) return;
    return (
      <View style={{ alignItems: 'center' }}>
        <DataContainer
          name="Назва ОСББ"
          data={this.props.aboutHouseData.name}
        />
        <DataContainer
          name="Адреса"
          data={this.getAddress()}
        />
        <DataContainer name="Телефон" data={this.props.aboutHouseData.telephone} />
        <DataContainer name="Поштовий індекс" data={this.props.aboutHouseData.postCode} />
        <DataContainer name="Інформація про ОСББ" data={this.props.aboutHouseData.about} />
      </View>
    );
  }

  getFileShowDialog(){
    if(this.props.aboutHouseSelectedFile != null){
      var type = this.props.aboutHouseSelectedFile.path.substring(this.props.aboutHouseSelectedFile.path.length - 3)
      var path = this.props.aboutHouseSelectedFile.path;
      //type = 'jpg'
      //console.log("TYPE", type)
      switch(type){
        case 'jpg':
          return(
            <ImageZoom cropWidth={320}
                       cropHeight={300}
                       imageWidth={320}
                       imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />
          </ImageZoom>)
        case 'png':
          return(<ImageZoom cropWidth={320}
            cropHeight={300}
            imageWidth={320}
            imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          />
          </ImageZoom>)
        case 'svg':
          return(<ImageZoom cropWidth={320}
            cropHeight={300}
            imageWidth={320}
            imageHeight={300}>
          <Image
            style={{width: 320, height: 300, resizeMode: 'contain'}}
            source={{uri: 'https://app.osbb365.com' + path}}
          /></ImageZoom>)
        case 'pdf':
          return(
          <PDFReader
            style={{width: 250, maxHeight: 400}}
            source={{
              uri: 'https://app.osbb365.com' + path,
            }}
          />
          ) 
        /*default: 
          //download('https://app.osbb365.com' + path)
          return(<Text>У розробці...</Text>)*/
          
      }
    }
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader navigation={this.props.navigation} title="Про ОСББ" />
        <ScrollView>
          <View style={styles.container}>
            {this.getImage()}
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
                Загальна інформація
              </Text>
            </View>
            <View style={styles.container}>{this.getGeneralData()}</View>
          </View>

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
                Статутні документи
              </Text>
            </View>
            <FlatList
              data={this.props.aboutHouseDocuments}
              renderItem={({ item }) => (
                <ItemFile 
                  name={item.name} 
                  path={item.filename} 
                  onAboutHouseSelectedFileChange={this.onAboutHouseSelectedFileChange}/>
              )}
              keyExtractor={item => item.name}
            />
            <Dialog.Container
            visible={this.props.aboutHouseSelectedFile == null ? false : true}>
            <Dialog.Title>
              {this.props.aboutHouseSelectedFile == null
                ? ''
                : this.props.aboutHouseSelectedFile.name}
            </Dialog.Title>
            <View style={{alignSelf: 'center'}}>
              {this.getFileShowDialog()}
            </View>
            
            
            <Dialog.Button
              label="OK"
              onPress={() => {
                this.onAboutHouseSelectedFileChange(null);
              }}
            />
          </Dialog.Container>
          </View>
        </ScrollView>
      </View>
    );
  }
}

async function download(url) {
  //const { uri: localUri } = await FileSystem.downloadAsync(url, 'file://..name.txt'); 

  //console.log("svinya", localUri)

  //alert(localUri)
  //const FilePath = localUri // path of the file
  //const FileMimeType = 'application/msword'; // mime type of the file
  //FileOpener.open(
  //  FilePath,
  //  FileMimeType
  //).then((msg) => {
  //  alert('success!!')
  //},() => {
  //  alert('error!!')
  //});

  /*alert(localUri)
  FileViewer.open(localUri)
  then(() => {
	  console.log('openFile', 1)
  })
  .catch(error => {
	  console.log('openFile', 2)
  });
  console.log('openFiele', localUri)*/
}

class ItemFile extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress = {() => {
        var file = {
          name: this.props.name,
          path: this.props.path
        }
        this.props.onAboutHouseSelectedFileChange(file)
      }}>
        <View
          >
          
          {getImage(this.props.path, this.props.name)}
        </View>
      </TouchableOpacity>
    );
  }
}

function getImage(type, name) {
  switch (type.substring(type.length - 3)) {
    case 'pdf':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}> 
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../images/ic_pdf.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'png':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'jpg':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
        </View>
      );
    case 'svg':
      return (
        <View style={{
          flexDirection: 'row',
          marginVertical: 5,
          justifyContent: 'space-between',
          backgroundColor: '#F9F9F9',
        }}>
          <Image
            style={{ width: 40, height: 50 }}
            source={require('../../images/ic_jpg.png')}
          />
          <Text style={styles.itemFileStyle}>{name}</Text>
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
    backgroundColor: 'white',
  },
  itemFileStyle: {
    width: '80%',
    fontSize: 16,
    color: '#364A5F',
    alignContent: 'flex-end',
  },
});
