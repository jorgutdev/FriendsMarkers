import React, { Component } from 'react'
import { Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'

// Styles
import styles from './Styles/LoginScreenStyles'
import * as firebase from "firebase";
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;

let provider = new firebase.auth.FacebookAuthProvider();


export default class LoginScreen extends Component {
    state = {

    }

    static navigationOptions = {
        header: null
    }

    


    constructor(props) {
        super(props);
        console.log('LoginScreen constructor | props -> ', props)
        console.log('LoginScreen constructor | initial state -> ', this.state)
    }



    componentWillMount() {

    }



    componentDidMount() {

    }


    componentWillUnmount() {
    }

    register() {
        firebase.auth().createUserWithEmailAndPassword('jorgutpar@gmail.com', '1234').then(result => {
            console.log(JSON.stringify(result))
        }, error => {
            console.log('Register | error ->', error)
        })
    }
    loginEmail() {

        firebase.auth().signInWithEmailAndPassword('jorgutpar@gmail.com', '1234').then(result => {
            console.log(JSON.stringify(result))
        }, error => {
            if (error.code == 'auth/user-not-found') {
                console.log('Login | error code -> auth/user-not-found')
                this.register()
            }
        })
    }

    facebookLogin(){

        console.log('facebookLogin | currentAccessToken -> ', AccessToken.getCurrentAccessToken())
        // firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(LoginManager.getCurrentAccessToken()).then(
        //     AccessToken.getCurrentAccessToken().then((data) => {
        //         console.log(data.accessToken.toString());
        //         console.log(res);
        //     });
        //     console.log(res);
        // }, error => {
        //     console.log(error)
        // });
    }

    googleLogin() {

    }
    render() {
        return (
            <View style={{ backgroundColor: '#4fafea' }}>
                <View>
                    <TextInput placeholder="Email" ></TextInput>
                    <TextInput placeholder="Password" value={this.state.password} secureTextEntry={true} ></TextInput>
                </View>
                <View>
                    <Button title="Google" onPress={() => this.googleLogin()} />
                    <Button title="Login" onPress={this.facebookLogin.bind(this)} />
                            <LoginButton
              publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                console.log("Login was cancelled");
              } else {
                console.log("Login was successful | result -> ", result)
                this.facebookLogin()
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
                </View>
            </View>
        );
    }



}
