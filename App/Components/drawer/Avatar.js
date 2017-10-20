import React, { Component } from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { call, put } from 'redux-saga/effects'

import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'

export class Avatar extends Component {
  constructor (props) {
    super(props)
    console.log('constructor props', props)
  }

  componentDidMount () {
    console.log('MapCustom | markers -> ', this)
    this.props.getMarkers()
  }

  /*     <TouchableOpacity onPress={() => { }}>
    <Image style={styles.avatar} source={{ uri: props.currentUser.photoURL }} />
</TouchableOpacity>

<Text style={styles.name}>

  {props.currentUser.displayName}
</Text> */
  render () {
    console.log('Avatar - render', this.props)
    return <View style={styles.avatarContainer} />
  }
}

var styles = StyleSheet.create({
  routesContainer: {
    marginTop: '-2%',
    flex: 1,
    alignItems: 'stretch'
  },
  topContainer: {
    backgroundColor: '#2196F3',
    height: '100%'
  },
  name: {
    color: '#E3F2FD',
    margin: '5%',
    fontSize: 21,
    fontFamily: 'Roboto'
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: 'white'
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  avatar: {
    marginTop: '5%',
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#0069c0'
  },
  buttonContainer: {
    marginTop: '2%',
    alignItems: 'center',
    width: '100%'
  }
})

function mapStateToProps (state) {
  console.log('Avatar - mapStateToProps', state)
  return {
    user: state.userReducer.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: () => dispatch(UserActions.userRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
