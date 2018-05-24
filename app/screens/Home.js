import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList,

} from 'react-native';
import {List} from 'react-native-elements';

import { BGC, tintColor } from '../index/colors';
import {impData} from '../index/data';
// import { NavigationActions } from 'react-navigation';
import Header from './../components/Header';
import Post from './../components/Post';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount(){
    this.setState({data: impData}, ()=> console.log(this.state.data))
  }



  renderSeparator(){
    return(
      <View
        style={{height:30}}
      />
    )
  }

  // renderHeader(){
  //   return(
  //     <Header navigation={this.props.navigation}/>
  //   )
  // }

  _renderItem = ({item}) => (
    <Post
      name={item.name}
      time={item.time}
      image={item.image}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {/* <Header navigation={this.props.navigation}/> */}
        {/* <List> */}
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent= {<Header navigation={this.props.navigation}/>}
        />
        {/* </List> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
  },
  scrollContainer:{
    flex:1,
    // backgroundColor:'black'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#cccccc',
    marginBottom: 5,
  },
  body: {
    flex:1,
    justifyContent: 'center',
  }
});
