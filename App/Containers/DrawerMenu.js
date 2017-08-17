import { DrawerItems } from 'react-navigation';
import React, { Component } from 'react'
import { Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import * as firebase from "firebase";

export default class DrawerMenu extends Component {

  state = {
    currentUser: {
      displayName: 'Anonymous',
      photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
    }
  }

  user = {
    displayName: 'Anonymous',
    photoURL: 'http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg'
  }

  componentWillMount() {
    let currentUser = null
    this.setState({ avatar: '' })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('LoginScreen | User already logged -> ', user)
        this.user.photoURL = user.photoURL
        this.user.displayName = user.displayName
      } else {
        console.log('LoginScreen | user is not logged yet')
      }
    }, error => {
      console.error(error)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.user.photoURL }} />
        <Text>{this.user.displayName}</Text>
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

