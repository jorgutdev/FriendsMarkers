import React, { Component } from 'react'
import { Image, View } from 'react-native'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class DrawerMenu extends Component {
  render () {
    return (
      <View>
        <Image source={Images.launch} style={styles.logo} />
      </View>
    )
  }
}
