import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Button,StyleSheet, Dimensions, TouchableHighlight } from 'react-native'
import { ButtonRight } from '../Components/ButtonRight'
import { ButtonLeft } from '../Components/ButtonLeft'
import { Images } from '../Themes'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

// Styles
import styles from './Styles/LaunchScreenStyles'
const { width, height } = Dimensions.get('window');


export default class LaunchScreen extends Component {
    state = { hackHeight: height, mapName: 'Global Map' }


  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    console.log('LaunchScreen constructor | props -> ',props)
    console.log('LaunchScreen constructor | state -> ', this.state)
  }



   componentWillMount() {
        setTimeout( () => this.setState({ hackHeight: height+1}), 500);
        setTimeout( () => this.setState({ hackHeight: height}), 1000);
    }


  componentDidMount() {
        console.log('LaunchScreen.componentDidMount')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('componentDidMount | getCurrentPosition ', position)
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: false, timeout: 20000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      console.log('componentDidMount | watchPosition | position ', position)
    });
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


_changeMap(){
  console.log('_changeMap | state -> ', state)
}

render() {

  console.log("render | state -> ", this.state)

  return (     
    <View style= {{ flex:1, paddingBottom: this.state.hackHeight }}>
  <MapView  
    style={styles.map}
    customMapStyle={this.mapStyle}
    showsUserLocation={true}
    followUserLocation={true}
    initialRegion={this.state.initialPosition}/>


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
          <ActionButton.Item buttonColor='#1abc9c' onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>


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
