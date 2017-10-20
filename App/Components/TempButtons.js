import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ActionButton from "react-native-action-button";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    bottom: "-100%"
  },
  cancelButton: {
    flex: 1,
    height: "20%",
    left: "4%"
  },
  cancelIcon: {
    color: "white",
    fontSize: 20
  },
  okButton: {
    flex: 1,
    height: "20%",
    left: "-17%"
  },
  okIcon: {
    color: "black",
    fontSize: 20
  }
});

export class TempButtons extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ToastAndroid.showWithGravity(
      "Adding marker\nPress the marker to move it",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cancelButton}>
          <ActionButton
            buttonColor="rgba(20, 4, 4,1.0)"
            onPress={this.props.onCancel}
            icon={<Icon name="close" style={styles.cancelIcon} />}
          />
        </View>
        <View style={styles.okButton}>
          <ActionButton
            buttonColor="rgba(82, 255, 30,1)"
            onPress={this.props.onSave}
            icon={<Icon name="check" style={styles.okIcon} />}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TempButtons);
