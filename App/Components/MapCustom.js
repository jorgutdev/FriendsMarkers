import React, { Component } from 'react'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import { call, put } from 'redux-saga/effects'

import { connect } from 'react-redux'
import MarkersActions from '../Redux/MarkersRedux'

let styles

export class MapCustom extends Component {

  constructor(props) {
    super(props)
    console.log('constructor props', props)
  }

  componentDidMount(){
    
console.log('MapCustom | markers -> ', this)
    this.props.getMarkers()
  }

  render() {
    return (
      <View>
        <Text>{ JSON.stringify(this.props)}</Text>
      </View>
    )
  }

}

styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  text: {
    textAlign: 'center'
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
})

function mapStateToProps(state) {
  console.log('mapStateToProps', state)
  return {
    markers: state.markerReducer.markers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMarkers: () => dispatch(MarkersActions.markersRequest())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapCustom)