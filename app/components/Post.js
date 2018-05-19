import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BGC, tintColor } from '../index/colors';
import HiddenPanel from './HiddenPanel';


export default class Post extends Component<Props> {

  state = {
    image:'https://facebook.github.io/react-native/docs/assets/favicon.png'
  }

  componentWillMount(){
    console.log(this.props.image);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.horizContainer}>
          <View style={styles.avatar}>

          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.name}>
              {this.props.name}
            </Text>
            <Text style={styles.time}>
              {this.props.time} hrs
            </Text>
          </View>

        </View>

        <View style={styles.bodyContainer}>
          {/* <View style={styles.content}> */}
            <Image
              style={styles.content}
              resizeMethod='resize'
              source={{uri:this.props.image}}
            />
            {/* ADD IMAGE OR VIDEO HERE */}
          {/* </View> */}
          <View style={styles.detailsContainer}>
            <HiddenPanel />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor:'blue',
  },
  horizContainer: {
    height:60,
    // backgroundColor: 'black',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer:{
    flex: 1,
    // backgroundColor:'blue',
    alignItems: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'red',
    // marginVertical: 16,
    // marginLeft: 16,
  },
  bodyContainer:{
    flex: 1,
    // height: 300,
    // backgroundColor: 'green'
  },
  name: {
    // flex:1,
    fontWeight: "700"
  },
  time: {
    fontWeight: "100",
    fontStyle: 'italic'
  },
  content: {
    // flex:4,
    height:300,
    width: 300,
    justifyContent:'center',
    alignSelf:'center'
    // backgroundColor: 'purple',

  },
  detailsContainer: {
    height: 40
  },
  headerContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingTop:16,
    paddingBottom: 16,
    justifyContent: 'center',
    // backgroundColor:'green'
  }
});
