import React, { Component } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

class ButtonRight extends Component {

    render() {

        const { icon, navigate, to, title } = this.props


        return (
          <Button
            onPress={() => navigate('DrawerOpen')}
            title='{title}'
          />)
    }
}

const styles = StyleSheet.create({
    icon: { fontSize: 20 }
})

export default ButtonRight
