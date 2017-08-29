import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import ActionButtonBar from './ActionButtonBar';
import Header from './Header';


export class CustomMap extends Component {

  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 80.0922,
      longitudeDelta: 80.0421,
    },
  }


  constructor(props) {
    super(props)
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.zoomToLocation(position)
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 2000 }
    );
  }

  // Events
  longPress(event) {
    let { coordinate, position } = event
    
  }


  zoomToLocation(position) {
    this.setState(
      {
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10
        }
      })
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.map}>
        <MapView
          ref={ref => { this.map = ref; }}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 50.0922,
            longitudeDelta: 50.0421,
          }}
          region={this.state.region}
          style={styles.map}
          //customMapStyle={this.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={true}
          followUserLocation={true}
          //onLayout={this.onLayout()}
          //onPress={event => this._shortPress(event.nativeEvent)}
          onLongPress={event => this.props.showAddMarkerModal(event.nativeEvent)}
        //onRegionChange={this.onRegionChange}
        //onRegionChangeComplete={this.onRegionChangeComplete}
        //zoomed={false}
        >

          {this.props.map.markers.map((marker, index) => (
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


        <ActionButtonBar navigation={this.props.navigation} showModal={this.props.showAddMapModal} />
        <Header navigation={this.props.navigation}  name={this.props.map.name} />

        
      </View>
    )
  }
}


let styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  nameContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    height: '7%',
  },
  name: {
    fontSize: 20,
    color:'white',
    alignSelf:'center',
  },
})

function mapStateToProps(state) {
  return {
    map: state.mapsReducer.map,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMap)