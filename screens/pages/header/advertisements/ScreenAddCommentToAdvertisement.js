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
} from 'react-native';
import PageHeader from '../../../../components/PageHeader';

export default class ScreenAddCommentToAdvertisement extends React.Component {
  constructor(props) {
    super(props);
    this.onAddCommentToAdvertisementTextChange = this.onAddCommentToAdvertisementTextChange.bind(
      this
    );
  }

  onAddCommentToAdvertisementTextChange(text) {
    this.props.setAddCommentToAdvertisementText(text);
  }

  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE' }}>
        <PageHeader
          navigation={this.props.navigation}
          title="Додати коментар"
        />
        <View style={styles.container}>
          <ScrollView style={{width: '90%'}}>
            <TextInput
              multiline
              style={{
                width: '90%',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Ваш коментар"
              onChangeText={text => {
                this.onAddCommentToAdvertisementTextChange(text);
              }}
              value={this.props.addCommentToAdvertisementText}
            />
          </ScrollView>
          <TouchableOpacity
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
            }}
            onPress={() => {
              var ws = new WebSocket(
                'wss://app.osbb365.com/socket.io/?auth_token=' +
                  this.props.token +
                  '&EIO=3&transport=websocket'
              );

              ws.onopen = () => {
                if(this.props.addCommentToAdvertisementText != null){
                // connection opened123
                  ws.send('428["/comment/create",{"text":"' + this.props.addCommentToAdvertisementText + '","noticeId":' + this.props.selectedPost.id + '}]');
                } // send a message
              }; //428["/comment/create",{"text":"qwe","noticeId":53}]

              ws.onmessage = e => {
                // a message was received
                this.onAddCommentToAdvertisementTextChange(null);
                this.props.navigation.goBack()
                
              };
            }}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  color: '#364A5F',
                  fontSize: 18,
                }}>
                Додати коментар
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    justifyContent: 'space-between',
  },
});
