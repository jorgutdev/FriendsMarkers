import React, { Component } from "react";
import {
  DrawerNavigator,
  StackNavigator,
  NavigationActions,
  DrawerItems
} from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import LoginScreen from "../Containers/LoginScreen";
import AddMarker from "../Containers/AddMarker";
import DrawerMenu from "../Containers/DrawerMenu";

import {
  Button,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import styles from "./Styles/NavigationStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Hidden extends React.Component {
  render() {
    return null;
  }
}
// Manifest of possible screens
const PrimaryStack = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: ({ navigation }) => ({
      headerMode: "screen",
      title: "",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DrawerOpen");
          }}
        >
          <Icon
            name="menu"
            style={{
              color: "black",
              padding: 10,
              marginLeft: 10,
              fontSize: 20
            }}
          />
        </TouchableOpacity>
      ),
      drawer: () => ({
        label: "Maps",
        icon: () => <Icon name="rocket" size={30} color="#900" />
      })
    })
  },

  /*    merged with:
     https://stackoverflow.com/questions/43885690/how-to-lock-drawer-for-specific-page-using-drawernavigation-react-navigationr 
     */
  AddMarkerScreen: {
    screen: AddMarker,
    navigationOptions: ({ navigation }) => ({
      drawerLockMode: "locked-closed",
      headerMode: "screen"
    })
  }
});

/* const AddMarkerStack = StackNavigator({
  AddMarkerScreen: {
    screen: AddMarker,
    navigationOptions: ({ navigation }) => ({
      title: "Add Marker",
      drawerLabel: (<Hidden />),
      headerLeft: <TouchableOpacity onPress={() => { navigation.navigate('LaunchScreen') }}>
        <Icon name="keyboard-backspace" style={{ color: 'black', padding: 10, marginLeft: 10, fontSize: 20 }} />
      </TouchableOpacity>,
  }),
}, });
 */
//<MenuButton navigate={navigati on.navigate} />
// Manifest of possible screens
const LoginStack = StackNavigator(
  {
    LoginScreen: { screen: LoginScreen }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerMode: "screen",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DrawerOpen");
          }}
        >
          <Icon
            name="menu"
            style={{
              color: "black",
              padding: 10,
              marginLeft: 10,
              fontSize: 20
            }}
          />
        </TouchableOpacity>
      )
    })
  }
);

const MenuButton = <View />;

const DrawerNav = DrawerNavigator(
  {
    PrimaryStack: { screen: PrimaryStack },
    LoginStack: { screen: LoginStack }
  },
  {
    initialRouteName: "PrimaryStack",
    contentComponent: props => (
      <ScrollView style={{ height: "100%", backgroundColor: "#2196F3" }}>
        <DrawerMenu {...props} />
      </ScrollView>
    ),
    contentOptions: {
      activeTintColor: "#e91e63",
      style: {
        marginVertical: 0
      }
    }
  }
);

export default DrawerNav;
