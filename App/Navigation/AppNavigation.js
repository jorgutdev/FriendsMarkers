import React, { Component } from 'react'
import { DrawerNavigator, StackNavigator, NavigationActions, DrawerItems } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import DrawerMenu from '../Containers/DrawerMenu'

import { Button, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import styles from './Styles/NavigationStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Manifest of possible screens
const PrimaryStack = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
}, {
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerLeft: (<TouchableOpacity onPress={() => { navigation.navigate('DrawerOpen') }}>
        <Icon name="menu" style={{ color: 'black', padding: 10, marginLeft: 10, fontSize: 20 }} />
      </TouchableOpacity>),
      drawer: () => ({
        label: 'Map',
        icon: () => (<Icon name="rocket" size={30} color="#900" />)
      })
    })
  });

//<MenuButton navigate={navigati on.navigate} />
// Manifest of possible screens
const LoginStack = StackNavigator({
  LoginScreen: { screen: LoginScreen }
}, {
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('DrawerOpen') }}>
        <Icon name="menu" style={{ color: 'black', padding: 10, marginLeft: 10, fontSize: 20 }} />
      </TouchableOpacity>,
    })
  }
);

const MenuButton = (
  <View>

  </View>
);

const DrawerNav = DrawerNavigator({
  PrimaryStack: { screen: PrimaryStack },
  LoginStack: { screen: LoginStack }
}, {
    initialRouteName: 'LoginStack',
    contentComponent: props => (<ScrollView style={{ height:'100%', backgroundColor: '#2196F3'}}><DrawerMenu {...props} /></ScrollView>),
    contentOptions: {
      activeTintColor: '#e91e63',
      style: {
        marginVertical: 0,
      }
    }
  });



export default DrawerNav
