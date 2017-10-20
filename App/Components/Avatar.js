import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import UserActions from "../Redux/UserRedux";

export class Avatar extends Component {
  render() {
    let loginButton;
    if (!this.props.isLogged) {
      loginButton = (
        <Icon.Button
          name="facebook"
          backgroundColor="#3b5998"
          onPress={() => this.props.facebookLogin()}
        >
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </Icon.Button>
      );
    } else {
      loginButton = (
        <Icon.Button
          name="sign-out"
          backgroundColor="black"
          onPress={() => this.props.facebookLogout()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Icon.Button>
      );
    }

    return (
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.user.photoURL }}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{this.props.user.displayName}</Text>
        {loginButton}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  name: {
    color: "#E3F2FD",
    margin: "5%",
    fontSize: 21,
    fontFamily: "Roboto"
  },
  avatarContainer: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    marginBottom: "4%"
  },
  avatar: {
    marginTop: "5%",
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: "#0069c0"
  },
  buttonText: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "white"
  }
});

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    isLogged: state.userReducer.isLogged
  };
}

function mapDispatchToProps(dispatch) {
  return {
    facebookLogin: () => dispatch(UserActions.userLogin()),
    facebookLogout: () => dispatch(UserActions.userLogout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
