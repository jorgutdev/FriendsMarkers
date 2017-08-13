import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import { ButtonRight } from '../Components/ButtonRight'
import { ButtonLeft } from '../Components/ButtonLeft'
import { Images } from '../Themes'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
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




  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })
  _showColorPicker = () => this.setState({ colorPickerVisible: true })
  _hideColorPicker = () => this.setState({ colorPickerVisible: false })

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    console.log('LaunchScreen constructor | props -> ', props)
    console.log('LaunchScreen constructor | initial state -> ', this.state)
    console.log('LaunchScreen constructor | markers will load -> this._loadMarkers()')
    this._loadMarkers()

  }



  componentWillMount() {

  }

getInitialState() {
  return {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 100.0922,
      longitudeDelta: 100.0421,
    },
  };
}

  componentDidMount() {
    console.log('LaunchScreen.componentDidMount')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('componentDidMount | getCurrentPosition ', position)
        var initialPosition = JSON.stringify(position);
        let { latitude, longitude } = position.coords;
        console.log(position)
        let props = this.props
        //Zoom to user location
        this.setState({ position })
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 500 }
    );



  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
    this._showModal()
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
    console.log('_zoomToLocation | this.state --> ', this.state)
    let region = {
      latitude: this.state.position.coords.latitude,
      longitude: this.state.position.coords.longitude,
      latitudeDelta: 0.10,
      longitudeDelta: 0.10   
    }

    this.map.animateToRegion(region, 100)    
  }


  // ES7 :)
  onRegionChange = (region) => {
    this.setState({ region : region });
    console.log('onRegionChange | this.state.region ->', this.state.region)
  }  
  
  onRegionChangeComplete = (region) => {
    this.setState({ region : region });
    console.log('onRegionChangeComplete | this.state.region ->', this.state.region)
  }


  render() {




    return (
      <View>
        <View style={{ flex: 1, zIndex: -1, paddingBottom: this.state.hackHeight }}>
          <MapView
            ref={ref => { this.map = ref; }}
            initialRegion={{
              latitude: 0,
              longitude: 0,
              latitudeDelta: 100.0922,
              longitudeDelta: 100.0421,
            }}
            region={this.state.region}
            style={styles.map}
            customMapStyle={this.mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsBuildings={true}
            followUserLocation={true}
            onLayout={this._zoomToLocation}
            onPress={event => this._shortPress(event.nativeEvent)}
            onLongPress={event => this._longPress(event.nativeEvent)}
            onRegionChange={this.onRegionChange}
            onRegionChangeComplete={this.onRegionChangeComplete}
            zoomed={false} >

            {this.state.markers.map((marker, index) => (
              <MapView.Marker
                id={marker.id}
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
                pinColor={marker.pinColor}
              />
            ))}

          </MapView>



          <TouchableHighlight onPress={this._changeMap}>
            <Text style={styles.mapName}>{this.state.mapName}</Text>
          </TouchableHighlight>

          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item buttonColor='#9b59b6' onPress={() => console.log("notes tapped!")}>
              <Icon name="md-person" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="md-menu" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' onPress={() => { }}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>


        </View>




        <View style={{ flex: 1 }}>
          <Modal
            isVisible={this.state.isModalVisible}
            transparent={true}
            animationIn={'fadeInUpBig'}
            animationOut={'zoomOut'}
            backdropOpacity={1}
            backdropColor='white'>

            <View style={{ flex: 1 }}>
              <Button title="Save" onPress={() => this._saveMarker()} />

              <TextInput
                style={{ height: 40 }}
                onChangeText={newMarkerName => this.setState({ newMarkerName })}
                value={this.state.newMarkerName}
                placeholder="Marker Name"
              />

              <TextInput
                style={{ height: 40 }}
                onChangeText={(newMarkerDescription) => this.setState({ newMarkerDescription })}
                value={this.state.newMarkerDescription}
                placeholder="Description"
              />

              <Text>Color</Text>
              <TriangleColorPicker
                defaultColor='blue'
                color={this.state.color}
                hideSliders={true}
                onColorChange={color => this.changeColor({ color })}
                onColorSelected={color => this.setState({ color })}
                style={{ flex: 1, width: '45%', top: '-5%', marginLeft: '25%', }}
              />

            </View>


          </Modal>
        </View>
      </View>
    );
  }

  changeColor(color) {
    this.setState({ color: fromHsv({ h: color.color.h, s: color.color.s, v: color.color.v }) })
  }
  mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]




}
