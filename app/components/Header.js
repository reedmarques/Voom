import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BGC, tintColor } from '../index/colors';
import { NavigationActions } from 'react-navigation';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';


export default class Header extends Component<Props> {

  createPost(){
    // this.props.navigation.navigate('Picker')
  }

  goBack(){
    this.props.navigation.dispatch(NavigationActions.back())
  }

  getFriendsList(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        accessToken = data.accessToken
        userID = data.userID
        console.log(accessToken)
        console.log(userID);

        // return fetch(`https://graph.facebook.com/${userID}/taggable_friends?access_token=${accessToken}`)
        //   .then((response) => response.json())
        //   .then((responseJson) => {
        //     console.log('responseJson', responseJson);
        //     return responseJson;
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });

        return fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
        .then((response) => response.json())
        .then((json) => {
          // Friends list should be in json.friends.data of type <array of friends>
          console.log('json',json);
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.horizContainer}> */}
          {this.props.leftIcon == 'ios-arrow-back' && <TouchableOpacity onPress={() => this.goBack()}>
            <Icon name={this.props.leftIcon} size={30} color={`${BGC}`}/>
            {/* <Icon name='menu' size={30} color='transparent'/> */}
          </TouchableOpacity>}
          {!this.props.leftIcon && <TouchableOpacity onPress={() => this.goBack()}>
            <Icon name={this.props.leftIcon} size={30} color={`${BGC}`}/>
            {/* <Icon name='menu' size={30} color='transparent'/> */}
          </TouchableOpacity>}
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <TouchableOpacity onPress={() => this.createPost()}>
            <Icon name={this.props.rightIcon} size={30} color={`${BGC}`}/>
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
    color: `${BGC}`
  }

});
