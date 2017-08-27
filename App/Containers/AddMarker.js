import React, { Component } from 'react'
import { Text, Image, KeyboardAvoidingView, View, ScrollView, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from "firebase";
import DrawerMenu, { logout } from './DrawerMenu'
// Styles
import { fromHsv, toHsv, ColorPicker } from 'react-native-color-picker'

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
    LoginManager,
    AccessToken
} = FBSDK;



export default class AddMarker extends Component {

    state = {
        newMarkerName: null,
        newMarkerDescription: null,
        color: 'blue',
    }

    constructor(props){
        super(props)
        console.log('AddMarker props -> ', props)
    }

    markerStyle = function (options) {
        return {
            color: this.state.color,
        }
    }

    returnColor = function () {
        return this.state.color
    }


    static navigationOptions = {
        header: ({ state }) => ({
            right: <TouchableOpacity onPress={() => { this.addMarker() }}>
                <Icon name="map-marker-plus" style={{ padding: 10 }} size={28} color='#fff' />
            </TouchableOpacity>
        })
    };


    static navigationOptions = {
        title: 'Adding marker to map ...'
    }


    addMarker() {
        alert("Wiii")
    }

    componentWillMount() {
        /*         let currentUser = null
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        currentUser = user
                        console.log('LoginScreen | User already logged -> ', user)
                        //this.props.navigation.navigate('PrimaryStack')
                    } else {
                        console.log('LoginScreen | user is not logged yet')
                    }
                }, error => {
                    console.error(error)
                }); */
    }



    componentDidMount() {
        console.log('AddMarker | componentDidMount | this -> ', this)
    }


    componentWillUnmount() {
    }

    saveMarker() {
        if(this.state.newMarkerName=="" || this.state.newMarkerName==null )
            alert('Marker name cannot be empty')
        else {
            /* MarkersActions.addMarkerToMap(
                {
                    title: this.state.newMarkerName,
                    description: '',
                    latlng: {
                        latitude: this.props.coords.latitude,
                        longitude: this.props.coords.longitude,
                    },
                    pinColor: this.state.color,
                    user: this.props.user.USER ID O ALGO,
                    map: this.props.mapId,
                }
                )
            */
        this.props.navigation.navigate('LaunchScreen')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }} >

                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                }} behavior="padding"
                >
                    <View style={{ flex: 1, height: '100%' }} behavior="padding">
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
                            style={{ flex: 1,  width: '100%', alignSelf: 'center' }}
                        />
                    </View>
                </View>

                <View style={{ padding: '10%' }}>
                    <TextInput
                        style={{ padding: 10, fontSize: 30 }}
                        onChangeText={newMarkerName => this.setState({ newMarkerName })}
                        value={this.state.newMarkerName}
                        placeholder="Marker Name"
                        autoFocus={true}
                    />

                </View>





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
        );
    }
}

const styles = StyleSheet.create({
    color: {
        height: 40,
        width: 40,
    },
});