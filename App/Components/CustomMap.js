import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ActionButtonBar from "./ActionButtonBar";
import Header from "./Header";
import AddMapModal from "../Components/AddMapModal";
import AddMarkerModal from "../Components/AddMarkerModal";
import TempButtons from "../Components/TempButtons";
import MarkerCallout from "../Components/MarkerCallout";

export class CustomMap extends Component {
  state = {
    tmpMkr: null,
    tmpCoords: null,
    isMapModalVisible: false,
    isMarkerModalVisible: false
  };

  constructor(props) {
    super(props);
    let color;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.zoomToLocation(position);
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 2000 }
    );
  }

  // Events
  longPress(event) {
    let { coordinate, position } = event;
    // New temporal marker
    let tmpMkr = {
      coordinate
    };
    this.setState({ tmpMkr });
    this.setState({ tmpCoords: coordinate });
    this.tmpMkr(coordinate);
  }

  // to change
  tmpMkr(coordinate) {
    // var myArray = [
    //   "red",
    //   "tomato",
    //   "orange",
    //   "yellow",
    //   "gold",
    //   "wheat",
    //   "tan",
    //   "linen",
    //   "green",
    //   "blue",
    //   "navy",
    //   "aqua",
    //   "teal",
    //   "turquoise",
    //   "violet",
    //   "purple",
    //   "plum",
    //   "indigo"
    // ];

    this.setState({ tempCoordinates: coordinate });
  }
  removeTempMarker() {
    this.setState({ tmpBtns: null });
    this.setState({ tmpMkr: null });
  }

  saveMarker() {
    this.setState({
      isMarkerModalVisible: true,
      newMarkerCoordinate: this.state.tmpCoords
    });
  }

  zoomToLocation(position) {
    this.setState({
      region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      }
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  showAddMarkerModal() {
    this.setState({
      isMarkerModalVisible: true,
      newMarkerCoordinate: this.state.tempCoordinates
    });
  }

  closeAddMarkerModal = () => {
    this.setState({ isMarkerModalVisible: false });
  };

  showAddMapModal() {
    this.setState({ isMapModalVisible: true });
  }
  closeAddMapModal = () => {
    this.setState({ isMapModalVisible: false });
  };

  onRegionChange = region => {
    this.setState({ region: region });
  };

  render() {
    let tmpMkr;
    let tmpBtns;
    if (!!this.state.tmpMkr) {
      tmpMkr = (
        <MapView.Marker
          draggable
          coordinate={this.state.tmpCoords}
          pinColor="aqua"
          onDragStart={event => {}}
          onDrag={event => {}}
          onDragEnd={event => {}}
        />
      );
      tmpBtns = (
        <TempButtons
          onCancel={this.removeTempMarker.bind(this)}
          onSave={this.saveMarker.bind(this)}
        />
      );
    }

    return (
      <View style={styles.map}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          region={this.state.region}
          style={styles.map}
          //customMapStyle={this.mapStyle}
          sUserLocation={true}
          showsMyLocationButton={true}
          showsBuildings={true}
          followUserLocation={true}
          //onLayout={this.onLayout()}
          //onPress={event => this._shortPress(event.nativeEvent)}
          onLongPress={event => this.longPress(event.nativeEvent)}
          onRegionChange={this.onRegionChange}
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
          {tmpMkr}
        </MapView>
        <Header navigation={this.props.navigation} name={this.props.map.name} />

        {tmpBtns}

        <ActionButtonBar
          navigation={this.props.navigation}
          showModal={this.showAddMapModal}
        />
        <AddMarkerModal
          isModalVisible={this.state.isMarkerModalVisible}
          coordinate={this.state.tmpCoords}
          closeModal={this.closeAddMarkerModal}
          markerSaved={this.markerSaved.bind(this)}
        />
        <AddMapModal
          isModalVisible={this.state.isMapModalVisible}
          closeModal={this.closeAddMapModal}
        />
      </View>
    );
  }

  markerSaved() {
    alert("marker saved!");
    this.setState({ isMarkerModalVisible: false });
  }
}

let styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  nameContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.9)",
    height: "7%"
  },
  name: {
    fontSize: 20,
    color: "white",
    alignSelf: "center"
  }
});

function mapStateToProps(state) {
  return {
    map: state.mapsReducer.map
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMap);
