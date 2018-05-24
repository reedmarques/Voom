import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BGC, tintColor } from '../index/colors';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';


export default class Header extends Component<Props> {

  createPost(){
    this.props.navigation.navigate('Picker')
  }

  getFriendsList(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        accessToken = data.accessToken
        userID = data.userID
        console.log(accessToken)
        console.log(userID);

        return fetch(`https://graph.facebook.com/${userID}/taggable_friends?access_token=${accessToken}`)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('responseJson', responseJson);
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });

  });

  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.horizContainer}> */}
          <TouchableOpacity onPress={() => this.getFriendsList()}>
            <Icon name='ios-upload' size={30} color='white'/>
          </TouchableOpacity>
          <Text style={styles.title}>
            HOT AIR
          </Text>
          <TouchableOpacity onPress={() => this.createPost()}>
            <Icon name='photo-camera' size={30} color={`${BGC}`}/>
          </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection:'row',
    height: 40,
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor: `${tintColor}`,
    // paddingTop: 30,
    paddingHorizontal:16,
  },
  horizContainer: {
    // flex: 1,
    height: 64,
    flexDirection: 'row',
    alignItems: 'stretch',
    // justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    color: 'white'
  }

});
