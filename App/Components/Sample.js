import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

export class Sample extends Component {
  componentDidMount() {}

  render() {
    return <View style={styles.container} />;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonBar);
