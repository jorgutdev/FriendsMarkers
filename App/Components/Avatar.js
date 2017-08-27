import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import { call, put } from 'redux-saga/effects'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'
import * as firebase from 'firebase'



export class Avatar extends Component {




  constructor(props) {
    super(props)
    console.log('constructor props', props)
  }

  componentDidMount() {
  }



  render() {
    let avatar, loginButton

    if (!this.props.isLogged) {
      loginButton = (
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => this.props.facebookLogin()}>
          <Text style={styles.buttonText}>Login with Facebook</Text>
        </Icon.Button>
      )
    } else {
      loginButton = (
        <Icon.Button name="sign-out" backgroundColor="black" onPress={() => this.props.facebookLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </Icon.Button>
      )
    }




    return (
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={() => { }}>
          <Image style={styles.avatar} source={{ uri: this.props.user.photoURL }} />
        </TouchableOpacity>
        <Text style={styles.name}>
          {this.props.user.displayName}
        </Text>
        
        { loginButton }

      </View>
    )
  }
}

var anonymousUser = {
  displayName: 'Anonymous',
  photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
}

var styles = StyleSheet.create({
  name: {
    color: '#E3F2FD',
    margin: '5%',
    fontSize: 21,
    fontFamily: 'Roboto'
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  avatar: {
    marginTop: '5%',
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#0069c0',
  },
    buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white'
  },
})

function mapStateToProps(state) {
  console.log('avatar | mapStateToProps', state)
  return {
    user: state.userReducer.user,
    isLogged: state.userReducer.isLogged,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    facebookLogin: () => dispatch(UserActions.userLogin()),
    facebookLogout: () => dispatch(UserActions.userLogout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar)