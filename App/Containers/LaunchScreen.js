import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import { ButtonRight } from '../Components/ButtonRight'
import { ButtonLeft } from '../Components/ButtonLeft'
import { Images } from '../Themes'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomMap from '../Components/CustomMap';
import Modal from 'react-native-modal';
import { ModalMarker } from './ModalMarker';
import * as firebase from "firebase";
import { fromHsv, toHsv, TriangleColorPicker } from 'react-native-color-picker'
// Styles
import styles from './Styles/LaunchScreenStyles'

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };


export default class LaunchScreen extends Component {
  state = {
    hackHeight: height,
    mapName: 'Global Map',
    zoomed: false,
    isModalVisible: false,
    colorPickerVisible: false,
    markers: [],
    color: 'blue',
  }
    static navigationOptions = {
        drawerLabel: 'Maps',
        drawerIcon: (<Icon name="google-maps" size={26} style={{color: "#fff"}} />)
    };


  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  _showColorPicker = () => this.setState({ colorPickerVisible: true })
  _hideColorPicker = () => this.setState({ colorPickerVisible: false })


  constructor(props) {
    super(props);
    console.log('LaunchScreen constructor | props -> ', props)
    console.log('LaunchScreen constructor | initial state -> ', this.state)
    console.log('LaunchScreen constructor | markers will load -> this._loadMarkers()')
    this._loadMarkers()

  }



  componentWillMount() {
    firebase.auth().signOut()
  }


  componentDidMount() {
    console.log('LaunchScreen | componentDidMount')
  }






  _changeMap() {
    console.log('_changeMap | state -> ', state)
  }


  // Events
  _longPress(event) {
    let { coordinate, position } = event
    console.log('_longPress | event -> ', event)
    console.log('_longPress | coordinates -> ', coordinate)
    console.log('_longPress | position -> ', position)

    this.setState({ newMarkerCoordinate: coordinate })
    const {setParams} = this.props.navigation;
    setParams({ coordinate : coordinate })    
    this.props.navigation.navigate('AddMarkerScreen')
  }

  _shortPress(event) {
    let { coordinate, position } = event
    console.log('_shortPress | event -> ', event)
    console.log('_shortPress | coordinates -> ', coordinate)
    console.log('_shortPress | position -> ', position)
  }



  _loadMarkers() {
    let markers = firebase.database().ref("markers");
    markers.once('value').then(snapshot => {
      let root = this;
      snapshot.forEach(function (childSnapshot) {
        root.setState({
          markers: [...root.state.markers, {
            id: childSnapshot.key,
            latlng: childSnapshot.val().coordinate,
            description: childSnapshot.val().description,
            title: childSnapshot.val().title,
            pinColor: childSnapshot.val().pinColor,
          }]
        })
      });
      console.log("_loadMarkers | snapshot.val()", snapshot.val())
    })

  }

  _saveMarker() {

    console.log("_saveMarker | newMarkerName -> ", this.state.newMarkerName)
    console.log("_saveMarker | newMarkerDescription -> ", this.state.newMarkerDescription)
    console.log("_saveMarker | newMarkerCoordinate -> ", this.state.newMarkerCoordinate)
    console.log("_saveMarker | latitude -> ", this.state.newMarkerCoordinate.latitude)
    console.log("_saveMarker | longitude -> ", this.state.newMarkerCoordinate.longitude)
    console.log("_saveMarker | color -> ", this.state.color)
    if (this.state.newMarkerName) {
      let markers = firebase.database().ref("markers/");
      markers.push({
        coordinate: this.state.newMarkerCoordinate,
        title: this.state.newMarkerName,
        description: this.state.newMarkerDescription,
        pinColor: this.state.color
      });


      this.setState({
        markers: [...this.state.markers, {
          latlng: this.state.newMarkerCoordinate,
          description: this.state.newMarkerDescription,
          title: this.state.newMarkerName,
          pinColor: this.state.color,
        }]
      })
    }
    this._hideModal()
  }

  _zoomToLocation = () => {
    this.setState(
      {
        region: {
          latitude: this.state.position.coords.latitude,
          longitude: this.state.position.coords.longitude,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10
        }
      })
    console.log('_zoomToLocation | this.state --> ', this.state)
    let region = {
      latitude: this.state.position.coords.latitude,
      longitude: this.state.position.coords.longitude,
      latitudeDelta: 0.10,
      longitudeDelta: 0.10
    }
    console.log('zoomToLocation | region -> ', region)
    this.map.animateToRegion(region, 100)
    this.map.forceUpdate()
    this.map.animateToCoordinate(this.state.position.coords, 100)
  }


  // ES7 :)
  onRegionChange = (region) => {
    this.setState({ region: region });
    console.log('onRegionChange | this.state.region ->', this.state.region)
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region: region });
    console.log('onRegionChangeComplete | this.state.region ->', this.state.region)
  }


  render() {




    return (
      <View>
        <View style={{ flex: 1, zIndex: -1, paddingBottom: this.state.hackHeight }}>
      
        <CustomMap navigation={this.props.navigation} />


          <TouchableHighlight onPress={this._changeMap}>
            <Text style={styles.mapName}>{this.state.mapName}</Text>
          </TouchableHighlight>

          <ActionButton buttonColor="rgba(231,76,60,1)" position='right' verticalOrientation='down'>
            <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
              <Icon name="menu" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="account" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' onPress={() => { }}>
              <Icon name="map-marker" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>


        </View>
      </View>
    );
  }

  changeColor(color) {
    this.setState({ color: fromHsv({ h: color.color.h, s: color.color.s, v: color.color.v }) })
  }

}
