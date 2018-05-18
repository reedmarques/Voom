import React from 'react';
import {StyleSheet, Image} from 'react-native';
import { createBottomTabNavigator, createStackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { BGC, tintColor } from './colors';
import Home from '../screens/Home';
import Leaderboard from '../screens/Leaderboard';
import Activity from '../screens/Activity';
import Trending from '../screens/Trending';
import Profile from '../screens/Profile';



export const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
  },
}, {
  mode:'modal',
  headerMode:'none',
})

export const TabNav = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-square" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-square-outline" size={30} />
      )
    }
  },
  Trending: {
    screen: Trending,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-bonfire" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-bonfire-outline" size={30} />
      )
    }
  },
  Leaderboard: {
    screen: Leaderboard,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-trophy" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-trophy-outline" size={30} />
      )
      // tabBarIcon: ({focused}) => (
      //   focused
      //   ? <Icon name="ios-ribbon" size={30} color={'red'}/>
      //   : <Icon name="ios-ribbon-outline" size={30} />
      // )
    }
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-notifications" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-notifications-outline" size={30} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: null,
      tabBarIcon: ({focused}) => (
        focused
        ? <Icon name="ios-happy" size={30} color={`${tintColor}`}/>
        : <Icon name="ios-happy-outline" size={30} />
      )
    }
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  tabBarOptions: {
    showLabel: false,
    activeBackgroundColor:'#7f8c8d',
    inactiveBackgroundColor:'#7f8c8d'

  }
})


export const Root = createStackNavigator({
  Home: {
    screen: TabNav,
  },
  // Order: {
  //   screen: OrderStack,
  // },
}, {
  mode: 'modal',
  headerMode: 'none',
});
