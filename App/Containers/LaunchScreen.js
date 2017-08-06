import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import { ButtonRight } from '../Components/ButtonRight'
import { ButtonLeft } from '../Components/ButtonLeft'
import { Images } from '../Themes'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView   from 'react-native-maps';
import Modal from 'react-native-modal';
import { ModalMarker } from './ModalMarker';
import * as firebase from "firebase";

// Styles
import styles from './Styles/LaunchScreenStyles'
const { width, height } = Dimensions.get('window');


export default class LaunchScreen extends Component {
  state = {
    hackHeight: height,
    mapName: 'Global Map',
    isModalVisible: false,
        markers: [],

  }

  

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  static navigationOptions = {
    header: null  }


  constructor(props) {
    super(props);

    console.log('LaunchScreen constructor | props -> ', props)
    console.log('LaunchScreen constructor | state -> ', this.state)
    this._loadMarkers()

  }



  componentWillMount() {
    setTimeout(() => this.setState({ hackHeight: height + 1 }), 500);
    setTimeout(() => this.setState({ hackHeight: height }), 1000);
  }


  componentDidMount() {
    console.log('LaunchScreen.componentDidMount')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('componentDidMount | getCurrentPosition ', position)
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: false, timeout: 20000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      console.log('componentDidMount | watchPosition | position ', position)
    });


  }


    _loadMarkers(){
      let markers = firebase.database().ref("markers");
      markers.once('value').then(snapshot => {
      let root = this;
          snapshot.forEach(function(childSnapshot) {
        console.log("_loadMarkers | childSnapshot", childSnapshot.val()) 
        root.setState({ markers: [...root.state.markers, {
            id:childSnapshot.key,
            latlng:childSnapshot.val().coordinate,
            description:childSnapshot.val().description,
            title:childSnapshot.val().title 
        }]})
          });




        console.log("_loadMarkers | snapshot.val()", snapshot.val()) 


      })

    }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  watchLocation() {
    console.log('LaunchScreen | watchLocation init ')
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log('LaunchScreen | state ', this.state)
      console.log('LaunchScreen | position ', position)
      const myLastPosition = this.state.myPosition;
      const myPosition = position.coords;
      if (!isEqual(myPosition, myLastPosition)) {
        this.state.myPosition = myPosition;
      }


    }, null, this.props.geolocationOptions);
    this.state.mapRegion.lastLat = position.coords.latitude;
    this.state.mapRegion.lastLong = position.coords.longitude;
    console.log('LaunchScreen | position ', position)
  }


  _changeMap() {
    console.log('_changeMap | state -> ', state)
  }

  _longPress(event) {
    let { coordinate, position } = event
    console.log('_longPress | event -> ', event)
    console.log('_longPress | coordinates -> ', coordinate)
    console.log('_longPress | position -> ', position)

    this.setState({ isModalVisible: true })
    this.setState({ newMarkerCoordinate: coordinate})



  }

  _shortPress(event) {
    let { coordinate, position } = event
    console.log('_longPress | event -> ', event)
    console.log('_longPress | coordinates -> ', coordinate)
    console.log('_longPress | position -> ', position)
  }

  _saveMarker(){

    console.log("_saveMarker | newMarkerName -> ", this.state.newMarkerName)
    console.log("_saveMarker | newMarkerDescription -> ", this.state.newMarkerDescription)
    console.log("_saveMarker | newMarkerCoordinate -> ", this.state.newMarkerCoordinate)
    console.log("_saveMarker | latitude -> ", this.state.newMarkerCoordinate.latitude)
    console.log("_saveMarker | longitude -> ", this.state.newMarkerCoordinate.longitude)

    // let rootRef = firebase.database().ref()
    // console.log('_longPress | rootRef -> ', rootRef)
    let markers = firebase.database().ref("markers/");
    markers.push({
  coordinate: this.state.newMarkerCoordinate,
  title: this.state.newMarkerName,
  description: this.state.newMarkerDescription

});


  this.setState({ markers: [...this.state.markers,{
      latlng:this.state.newMarkerCoordinate,
      description:this.state.newMarkerDescription,
      title:this.state.newMarkerName 
  }]})

    console.log("_saveMarker | setState -> ", this.state.newMarkerName)

  this._loadMarkers()
  this._hideModal()
    
  }

  render() {

    return (
      <View>
      <View style={{ flex: 1, zIndex: -1, paddingBottom: this.state.hackHeight }}>



        <MapView
          style={styles.map}
          customMapStyle={this.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followUserLocation={true}
          onPress={event => this._shortPress(event.nativeEvent)}
          onLongPress={event => this._longPress(event.nativeEvent)}
          initialRegion={this.state.initialPosition}>

 {this.state.markers.map(marker => (
    <MapView.Marker
      id={marker.id}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
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


        <View style={{ flex: 1 }} style={{width:50}}>
          <Modal
            isVisible={this.state.isModalVisible} 
            transparent={true}
            animationIn={'fadeInUpBig'}
            animationOut={'zoomOut'}
            backdropOpacity={1}
            backdropColor='white'>
            
            <View style={{ flex: 1 }}>
              <Text style={styles.markerModal} >Hello!</Text>

 <TextInput
        style={{height: 40}}
        onChangeText={newMarkerName => this.setState({newMarkerName})}
        value={this.state.newMarkerName}
        placeholder="Marker Name"
      />

       <TextInput
        style={{height: 40 }}
        onChangeText={(newMarkerDescription) => this.setState({newMarkerDescription})}
        value={this.state.newMarkerDescription}
        placeholder="Description"
      />

      <Button title="Save" onPress={() => this._saveMarker()}/>

            </View>
          </Modal>
        </View>
        </View>
    );
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
