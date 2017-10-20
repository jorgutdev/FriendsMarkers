import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class MarkerCallout extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  render() {
    return (
      <View style={{
          width:150,
          height:150,
          backgroundColor: 'transparent'
      }}>
        <Text>Aqui va a ir todo </Text>
      </View>
    );
  }
}
