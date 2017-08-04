import React, {Component} from 'react'
import {DrawerNavigator, StackNavigator} from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import {Button} from 'react-native'
import styles from './Styles/NavigationStyles'
import DrawerMenu from '../Containers/DrawerMenu'

// Manifest of possible screens
const PrimaryStack = StackNavigator({
  LaunchScreen: { screen: LaunchScreen }
}, {
  navigationOptions: {
    headerMode: 'screen'
  },
});

const DrawerNav = DrawerNavigator({
  PrimaryStack: { screen: PrimaryStack }
},  {
    initialRouteName: 'PrimaryStack',
    headerMode: 'screen'
});

export default DrawerNav
