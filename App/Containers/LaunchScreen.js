import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

import ActionButtonBar from '../Components/ActionButtonBar'
import CustomMap from '../Components/CustomMap'
import AddMapModal from '../Components/AddMapModal'
import AddMarkerModal from '../Components/AddMarkerModal'

import * as firebase from 'firebase'
import { fromHsv, toHsv, TriangleColorPicker } from 'react-native-color-picker'

export class LaunchScreen extends Component {
  state = {};
  static navigationOptions = {
    header: null,
    drawerLabel: 'Maps',
    drawerIcon: <Icon name='google-maps' size={26} style={{ color: '#fff' }} />
  };

  constructor (props) {
    super(props)
  }

  componentWillMount () {}

  componentDidMount () {}

  render () {
    return (
      <View style={styles.map}>
        <View style={{ flex: 1, paddingBottom: this.state.hackHeight }}>
          <CustomMap
            navigation={this.props.navigation}
            showAddMapModal={this.showAddMapModal}
            showAddMarkerModal={this.showAddMarkerModal}
          />
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

function mapStateToProps (state) {
  return {
    map: state.mapsReducer.map
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
