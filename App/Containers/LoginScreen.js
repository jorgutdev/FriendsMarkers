import React, { Component } from 'react'
import { Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'

// Styles
import styles from './Styles/LoginScreenStyles'
import * as firebase from "firebase";
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;
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
        this.login()
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
    login() {
        //firebase.auth.FacebookAuthProvider.credential(token).
        //
        firebase.auth().signInWithEmailAndPassword('jorgutpar@gmail.com', '1234').then(result => {
            console.log(JSON.stringify(result))
        }, error => {
            if (error.code == 'auth/user-not-found') {
                console.log('Login | error code -> auth/user-not-found')
                this.register()
            }
        })
    }

    facebookLogin() {
        console.log('LoginScreen | FB Login init')
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    alert('Login success with permissions: '
                        + result.grantedPermissions.toString());
                }
            },
            function (error) {
                alert('Login fail with error: ' + error);
            }
        );
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
                    <Button title="Facebook" onPress={() => this.facebookLogin()} />
                </View>
            </View>
        );
    }



}
