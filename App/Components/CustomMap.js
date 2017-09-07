import React, { Component } from 'react'
import MapView from 'react-native-maps';
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import ActionButtonBar from './ActionButtonBar';
import Header from './Header';
import AddMapModal from '../Components/AddMapModal';
import AddMarkerModal from '../Components/AddMarkerModal';
import TempButtons from '../Components/TempButtons'
export class CustomMap extends Component {

  


  state = {
    temporalMarker: null,
    isMapModalVisible: false,
    isMarkerModalVisible: false,
  }


  constructor(props) {
    super(props)
    let color
    let tempMarker=null
    
  }

  componentDidMount() {
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
  
    // New temporal marker
    let temporalMarker = {
      coordinate: coordinate,
    }

    this.displayTempMarker(coordinate)

    this.setState({ temporalMarker: temporalMarker })
  }

// to change
  displayTempMarker(coordinate){
    var myArray = ['red','tomato','orange','yellow','gold','wheat','tan','linen','green','blue','navy','aqua','teal','turquoise','violet','purple','plum','indigo']    
    
    auxMarker = (
        <MapView.Marker draggable
          coordinate={coordinate}
          pinColor={this.color}
          onDragStart={ event => {
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            this.color=rand
          }}
          onDrag={ event => {
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            this.color=rand            
          }}
          onDragEnd={ (event) => {
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            this.color=rand
                        this.map.forceUpdate()

          }}
          />
      )
      this.tempMarker = auxMarker
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



  showAddMarkerModal = (event) => {
    this.setState({ 
      isMarkerModalVisible: true,
      newMarkerCoordinate: event.coordinate,
   })
  }

  closeAddMarkerModal = () => {
    this.setState({ isMarkerModalVisible: false })
  }

  showAddMapModal = () => {
    this.setState({ isMapModalVisible: true })
  }
  closeAddMapModal = () => {
    this.setState({ isMapModalVisible: false })
  }

  render() {


    return (
      <View style={styles.map}>
        <MapView
          ref={ref => { this.map = ref; }}
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

          { this.tempMarker }
          { this.temporalButton }
        </MapView>
        <Header navigation={this.props.navigation}  name={this.props.map.name} />

        <TempButtons />
 
        <ActionButtonBar    navigation={this.props.navigation} showModal={this.showAddMapModal} />




          <AddMapModal
            isModalVisible={this.state.isMapModalVisible}
            closeModal={this.closeAddMapModal} />

          <AddMarkerModal
            isModalVisible={this.state.isMarkerModalVisible}
            coordinate={this.state.newMarkerCoordinate}
            closeModal={this.closeAddMarkerModal} />


        
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
