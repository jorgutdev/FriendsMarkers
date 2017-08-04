import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class ButtonLeft extends Component {

    render() {

        return (
          <Button
            title='Open Drawer'
          />)
    }
}

const styles = StyleSheet.create({
    icon: { fontSize: 20 }
})

export default ButtonLeft
