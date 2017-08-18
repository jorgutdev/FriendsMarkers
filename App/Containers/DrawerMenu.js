import { DrawerItems } from 'react-navigation';
import React, { Component } from 'react'
import { Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import * as firebase from "firebase";
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
    AccessToken,
    LoginButton
} = FBSDK;


 export function logout(){
    this.setState({     
    currentUser: {
      displayName: 'Anonymous',
      photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
    } })
  }

export default class DrawerMenu extends Component {

  anonymous = {
        currentUser: {
      displayName: 'Anonymous',
      photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
    }
  }

  state = {
    currentUser: {
      displayName: 'Anonymous',
      photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
    }
  }

  logout(){

  }

  componentWillMount() {
    firebase.auth().signOut()
    if(firebase.auth().currentUser){
      this.setState({ currentUser : firebase.auth().currentUser})
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('LoginScreen | User already logged -> ', user)
        this.setState({ currentUser : user })
        console.log(this.state)
      } else {
        console.log('LoginScreen | user is not logged yet')
      }
    }, error => {
      console.error(error)
    });
  }


  facebookLogin(){
    AccessToken.getCurrentAccessToken().then(
      result => {
        let credential = firebase.auth.FacebookAuthProvider.credential(result.accessToken);
        firebase.auth().signInWithCredential(credential).then(
          (fbResult) => {
              console.log('Firebase Auth successful! | fbResult ->', fbResult)
              this.setState({currentUser : firebase.auth().currentUser})
          },
          (fbError) => {
              console.error('Firebase Auth Error | fbError ->', fbError)
          }
      ).catch(
        (fbError) => {
            console.error('signInWithCredential | fbError ->', fbError)
        }
      )
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.currentUser.photoURL }} />
        <Text>{this.state.currentUser.displayName}</Text>
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
                        onLogoutFinished={() => { 
                          firebase.auth().signOut() 
                          this.setState({ currentUser: this.anonymous.currentUser })
                        }} />
        <DrawerItems {...this.props} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'center'
  },
  imageContainer: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  imageContainer2: {

  }
});

