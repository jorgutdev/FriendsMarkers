import React, { Component } from 'react'
import { Image, View } from 'react-native'
import Modal from 'react-native-modal';

// Styles
import styles from './Styles/ModalStyles'

export default class ModalMarker extends Component {
    render() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Text>Hello!</Text>
                </View>      </Modal>
        )
    }
}
