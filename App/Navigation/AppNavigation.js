import React, {Component} from 'react'
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from '../Containers/LoginScreen'
import {Button} from 'react-native'
import styles from './Styles/NavigationStyles'
import DrawerMenu from '../Containers/DrawerMenu'

// Manifest of possible screens
const PrimaryStack = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
}, {
  navigationOptions: {
    headerMode: 'screen'
  },
});


// Manifest of possible screens
const LoginStack = StackNavigator({
  LoginScreen: { screen: LoginScreen }
}, {
  navigationOptions: {
    headerMode: 'screen'
  },
});



const DrawerNav = DrawerNavigator({
  PrimaryStack: { screen: PrimaryStack },
  LoginStack: { screen: LoginStack }
},  {
    initialRouteName: 'LoginStack',
    headerMode: 'screen'
});

export default DrawerNav
