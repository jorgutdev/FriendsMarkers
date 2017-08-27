import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import MarkersActions from '../Redux/MarkersRedux'


export class CustomMap extends Component {

    state = {
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 80.0922,
            longitudeDelta: 80.0421,
      },
    }


    constructor(props){
        super(props)
        console.log('constructor props ->', props)
    }

    componentWillMount(){
        this.props.getGlobalMarkers()
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('componentDidMount | getCurrentPosition ', position)
                this.zoomToLocation(position)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 500 }
        );
    }
    
      // Events
  longPress(event) {
    let { coordinate, position } = event
    console.log('_longPress | event -> ', event)
    console.log('_longPress | coordinates -> ', coordinate)
    console.log('_longPress | position -> ', position)

    const {setParams} = this.props.navigation;
    setParams({ coordinate : coordinate })    
    this.props.navigation.navigate('AddMarkerScreen')
  }


    zoomToLocation(position){
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

    render(){


        return (
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
            onLongPress={event => this.longPress(event.nativeEvent)}
            //onRegionChange={this.onRegionChange}
            //onRegionChangeComplete={this.onRegionChangeComplete}
            //zoomed={false}
            >

            {this.props.markers.map((marker, index) => (
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
        )
    }
}


let styles = StyleSheet.create({
    map: {
    ...StyleSheet.absoluteFillObject
  },
})

function mapStateToProps(state) {
  console.log('CustomMap | mapStateToProps', state)
  return {
    markers: state.markerReducer.markers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGlobalMarkers: () => dispatch(MarkersActions.markersRequest()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMap)