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


export default class Header extends Component<Props> {

  createPost(){
    this.props.navigation.navigate('Picker')
  }



  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.horizContainer}> */}
          <TouchableOpacity>
            <Icon name='ios-upload' size={30} color='transparent'/>
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
