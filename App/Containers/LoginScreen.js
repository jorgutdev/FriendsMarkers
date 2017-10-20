import React, { Component } from 'react'
import {
  Text,
  Image,
  View,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from 'firebase'
import DrawerMenu, { logout } from './DrawerMenu'
// Styles
import styles from './Styles/LoginScreenStyles'

const FBSDK = require('react-native-fbsdk')
const { LoginButton, LoginManager, AccessToken } = FBSDK

export default class LoginScreen extends Component {
  state = {
    currentUser: null
  };

  static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: <Icon name='account' size={25} style={{ color: '#fff' }} />
  };

  constructor (props) {
    super(props)
    console.log('LoginScreen constructor | props -> ', props)
    console.log('LoginScreen constructor | initial state -> ', this.state)
  }

  componentWillMount () {
    let currentUser = null
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          currentUser = user
          console.log('LoginScreen | User already logged -> ', user)
          // this.props.navigation.navigate('PrimaryStack')
        } else {
          console.log('LoginScreen | user is not logged yet')
        }
      },
      error => {
        console.error(error)
      }
    )
  }

  componentDidMount () {
    this.props.navigation.navigate('DrawerOpen')
  }

  componentWillUnmount () {}

  register () {
    firebase
      .auth()
      .createUserWithEmailAndPassword('jorgutpar@gmail.com', '1234')
      .then(
        result => {
          console.log(JSON.stringify(result))
        },
        error => {
          console.log('Register | error ->', error)
        }
      )
  }
  loginEmail () {
    firebase
      .auth()
      .signInWithEmailAndPassword('jorgutpar@gmail.com', '1234')
      .then(
        result => {
          console.log(JSON.stringify(result))
        },
        error => {
          if (error.code == 'auth/user-not-found') {
            console.log('Login | error code -> auth/user-not-found')
            this.register()
          }
        }
      )
  }

  facebookLogin () {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then(
        result => {
          console.log(
            'facebookLogin | logInWithReadPermissions | result -> ',
            result
          )
          AccessToken.getCurrentAccessToken().then(
            result => {
              console.log(result)
              var credential = firebase.auth.FacebookAuthProvider.credential(
                result.accessToken
              )
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(
                  fbResult => {
                    console.log(
                      'Firebase Auth successful! | fbResult ->',
                      fbResult
                    )
                    // this.props.navigation.navigate('PrimaryStack')
                  },
                  fbError => {
                    console.error('Firebase Auth Error | fbError ->', fbError)
                  }
                )
                .catch(fbError => {
                  console.error('signInWithCredential | fbError ->', fbError)
                })
            },
            error => console.log(error)
          )
        },
        error => {
          console.log(error)
        }
      )
      .catch(error => console.log(error))
  }

  googleLogin () {}
  render () {
    return (
      <View style={{ backgroundColor: '#4fafea' }}>
        <View>
          <TextInput placeholder='Email' />
          <TextInput
            placeholder='Password'
            value={this.state.password}
            secureTextEntry
          />
        </View>
        <View>
          <Button title='Google' onPress={() => this.googleLogin()} />
          <Button title='Login' onPress={this.facebookLogin.bind(this)} />
        </View>
      </View>
    )
  }
}
