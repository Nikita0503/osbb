import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
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
    this.props.setAddCommentToAdvertisementText(null);
    this.props.setAddCommentToAdvertisementButtonSend(false);
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
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                alignSelf: 'center',
              }}
              placeholder="Ваш коментар"
              onChangeText={text => {
                this.props.setAddCommentToAdvertisementText(text);
              }}
              value={this.props.addCommentToAdvertisementText}
            />
          </ScrollView>
          <TouchableOpacity
            disabled={this.props.isDisabledButtonSend}
            style={{
              width: '100%',
              backgroundColor: '#F9F9F9',
              alignItems: 'center',
              borderRadius: 15,
            }}
            onPress={() => {
              if(this.props.addCommentToAdvertisementText == null || this.props.addCommentToAdvertisementText.trim() == ''){
                Alert.alert(
                  'Повідомлення',
                  'Неможливо додати коментар. Введіть текст',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: true }
                )
                return
              }
              this.props.sendComment(this.props.addCommentToAdvertisementText,
                this.props.selectedPost,
                this.props.navigation,
                this.props.token)
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
