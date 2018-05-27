import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { BGC, tintColor } from '../index/colors';
import Header from '../components/Header';

type Props = {};
export default class CompetitionDetails extends Component<Props> {



  render() {
    const {competition} = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Header title={competition.name}
          leftIcon='ios-arrow-back'
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: `${BGC}`,
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
});
