import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

import {Root} from './app/index/router';
import {BGC, tintColor} from './app/index/colors';
import { isSignedIn } from './app/index/auth';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyArYC_nDk8eGW5STuSDEBo-eltWpNw9CzM",
    authDomain: "voom-5bff5.firebaseapp.com",
    databaseURL: "https://voom-5bff5.firebaseio.com",
    projectId: "voom-5bff5",
    storageBucket: "",
    messagingSenderId: "103121224948"
  };
firebase.initializeApp(config);

type Props = {};
export default class App extends Component<Props> {

  state = {
    signedIn: false,
    checkedSignedIn: false
  }

  componentDidMount(){
    var res = isSignedIn()
    this.setState({signedIn: res, checkedSignedIn: true})
  }


  render() {

    const Layout = Root(this.state.signedIn)
    return (
      <SafeAreaView style={styles.safeArea}>
        <Layout/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor:`${tintColor}`
  }
});

console.disableYellowBox = true;
