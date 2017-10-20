import React, { Component } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Picker
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import Modal from 'react-native-modalbox';
import MapsActions from "../Redux/MapsRedux";
import { fromHsv, toHsv, ColorPicker } from "react-native-color-picker";
import { AnimatedTextInput } from './animated/AnimatedTextInput'
export class AddMarkerModal extends Component {
  state = {
    name: ""
  };

  constructor(props) {
    super(props);
  }



  componentDidMount() { }

  saveMarker = () => {
    if (this.state.name == "" || this.state.name == null)
      alert("Marker name cannot be empty");
    else {
      console.log(' this.props', this.props)

      let marker = {
        title: this.state.name,
        description: "",
        latlng: {
          latitude: this.props.coordinate.latitude,
          longitude: this.props.coordinate.longitude
        },
        pinColor: this.state.color,
        user: this.props.user.email,
        map: this.props.map.id
      };
      this.props.addMarkerToMap(marker);

      this.props.markerSaved();
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModalVisible}
        position={"center"}
        style={{
          width: 300,
          height: 200,

        }}
      >
      <View style={ styles.rootHeader } ></View>
      
          <Text>{this.state.name}</Text>
          <AnimatedTextInput

          />
        <TouchableOpacity onPress={ () => this.saveMarker() }   >
        <Text>Next</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#E0E0E0",
    height: "70%"
  },

  header: {
    backgroundColor: "rgba(0,0, 0, 1)",
    padding: 15,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  menuIconContainer: {
    alignSelf: "flex-start"
  },
  menuIcon: {
    color: "white",
    fontSize: 25
  },
  searchIconContainer: {
    alignSelf: "flex-end"
  },
  searchIcon: {
    color: "white",
    fontSize: 25
  },
  nameContainer: {
    alignSelf: "center"
  },
  name: {
    fontSize: 20,
    color: "white"
  }
});

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    isLogged: state.userReducer.isLogged,
    map: state.mapsReducer.map
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMarkerToMap: marker => dispatch(MapsActions.addMarkerToMap(marker))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMarkerModal);

