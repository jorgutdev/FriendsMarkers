import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import UserActions from '../Redux/UserRedux'
import MapsActions from '../Redux/MapsRedux'

import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
    console.ignoredYellowBox = ['Setting a timer'];
    this.props.loadMap('global')
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  loadMap: (id) => dispatch(MapsActions.loadMap(id)),
})

export default connect(null, mapDispatchToProps)(RootContainer)
