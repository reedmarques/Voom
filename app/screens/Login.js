import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SocialIcon, Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Loginform from '../components/LoginForm';
import Register from './Register';
import * as firebase from 'firebase';
import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';


export default class Login extends Component {

  state={
    loading:false,
  }


  fbAuth = async () => {
    firestore = firebase.firestore()
    settings = {timestampsInSnapshots: true};
    firestore.settings(settings)

    try {
      this.setState({loading:true});
      var result = await LoginManager.logInWithReadPermissions(['public_profile','email','user_friends']);
      if (!result.isCancelled){
        var tokenData = await AccessToken.getCurrentAccessToken();
        var token = tokenData.accessToken.toString();
        var credential = firebase.auth.FacebookAuthProvider.credential(token);
        var user = await firebase.auth().signInWithCredential(credential);
        console.log("user", user);
        firestore.collection('users')
        .doc(`${user.uid}`)
        .set({
          ['info']: {
            name:user.displayName,
            email:user.email,
            photoURL:user.photoURL,
            refreshToken:user.refreshToken,
          }},
          { merge: true }
        )
        .then(() => {
          this.setState({loading:false});
          this.switchNavigators()
        })

      }

    } catch (error) {
      this.setState({loading:false});
      alert(error)
    }
  }

  switchNavigators(){
    this.props.navigation.navigate("SignedIn")
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content"
        /> */}

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
             />
          <Text style={styles.title}>
            boozt
          </Text>
        </View>
        {this.state.loading && <ActivityIndicator
          size='large' color='#f92222'/>}
        <View style={styles.formContainer}>
          <Loginform
            navigation={this.props.navigation}
          />
        </View>
        <SocialIcon
          title='Continue with Facebook'
          type='facebook'
          light
          button
          onPress={() => this.fbAuth()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#2c3e50',
  },
  formContainer:{
    // paddingVertical:200
  },
  logoContainer:{
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
  },
  logo:{
    width:150,
    height:150,
  },
  title: {
    // flex:1,
    color:'white',
    marginTop:10,
    justifyContent:'center',
    opacity:1
  },
  divider:{
    backgroundColor:'red',
    alignSelf:'center',
    width: '80%',
  }

});
