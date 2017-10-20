import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

export class Sample extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <View />;
  }
}

var styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonBar);
