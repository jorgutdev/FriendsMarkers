import React, { Component } from 'react'
import { Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'

// Styles
import styles from './Styles/LoginScreenStyles'
import * as firebase from "firebase";
import FBSDK, { LoginManager } from 'react-native-fbsdk'

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

    googleLogin(){
        
    }
    render() {
        return (
            <View style={{ backgroundColor: '#4fafea' }}>
                <View>
                    <TextInput placeholder="Email" ></TextInput>
                    <TextInput placeholder="Password" value={this.state.password} secureTextEntry={true} ></TextInput>
                </View>
<View>
                    <Button title="Google" onPress={ () => this.googleLogin() } />
                </View>
            </View>
        );
    }



}
