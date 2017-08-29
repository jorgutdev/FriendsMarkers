import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button';
import Modal from 'react-native-modal'
import MapsActions from '../Redux/MapsRedux'
import { fromHsv, toHsv, ColorPicker } from 'react-native-color-picker'



export class AddMarkerModal extends Component {
    state = {
        newMarkerName: '',
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <Modal
                    isVisible={this.props.isModalVisible}
                    style={styles.modal}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                >

                    <View style={styles.modalHeader} >
                        <Text style={styles.headerText}>Adding marker</Text>
                        <TouchableOpacity onPress={() => this.props.closeModal()} >
                            <Icon style={styles.iconClose} name="close" color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <View style={{ padding: '10%' }}>
                            <TextInput
                                style={{ padding: 10, fontSize: 30 }}
                                onChangeText={newMarkerName => this.setState({ newMarkerName })}
                                value={this.state.newMarkerName}
                                placeholder="Marker Name"
                                autoFocus={true}
                            />

                        </View>

                        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} >
                            <ColorPicker
                                defaultColor='blue'
                                color={this.state.color}
                                hideSliders={true}
                                onColorChange={
                                    color => {
                                        let myColor = fromHsv(color)
                                        this.setState({ color: myColor })
                                    }
                                }
                                onColorSelected={color => this.setState({ color })}
                                style={{ flex: 1, width: '100%', alignSelf: 'center' }}
                            />
                        </KeyboardAvoidingView>



                        <View style={{ flex: 1, margin: 40 }} >
                            <TouchableOpacity onPress={() => { this.saveMarker() }} style={{
                                alignItems: 'center',

                            }} >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderWidth: 1.5,
                                    borderRadius: 56,
                                    borderColor: this.state.color,
                                    paddingRight: 10,
                                    backgroundColor: 'transparent',
                                }} >
                                    <Icon name="map-marker-plus" style={{ padding: 10 }} size={28} color={this.state.color} />
                                    <Text style={{
                                        color: this.state.color,
                                        fontWeight: 'bold',
                                    }}>Save Marker</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    textInputView: {
    },
    saveView: {
        alignSelf: 'center',
        margin: 50,
    },
    textinput: {
        fontSize: 23,
        width: '50%',
        alignSelf: 'center'
    },
    iconSave: {
        fontSize: 20,
    },
    iconClose: {
        fontSize: 20,
        paddingTop: 15,
        paddingLeft: '9%',

    },
    modalHeader: {
        backgroundColor: '#0069c0',
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 28,
        color: '#fff',
        padding: 10,
    },
    modal: {
        backgroundColor: 'transparent',
    },
    modalContent: {
        backgroundColor: '#6ec6ff',
        height: '70%',
    },

})

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        isLogged: state.userReducer.isLogged,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMarkerModal)