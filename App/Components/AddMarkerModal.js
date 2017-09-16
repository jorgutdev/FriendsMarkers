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

export class AddMarkerModal extends Component {
  state = {
    newMarkerName: ""
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  saveMarker() {
    if (this.state.newMarkerName == "" || this.state.newMarkerName == null)
      alert("Marker name cannot be empty");
    else {
      console.log('this.props', this.props)
      
      let marker = {
        title: this.state.newMarkerName,
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
          
        >
          <View style={styles.header}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Adding marker</Text>
            </View>
            <View style={styles.searchIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.props.closeModal();
                }}
              >
                <Icon name="close" style={styles.searchIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.modalContent}>
            <View style={{ padding: "10%" }}>
              <TextInput
                style={{ padding: 10, fontSize: 30 }}
                onChangeText={newMarkerName => this.setState({ newMarkerName })}
                value={this.state.newMarkerName}
                placeholder="Marker Name"
                autoFocus={false}
                underlineColorAndroid="transparent"
              />
            </View>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <ColorPicker
                defaultColor="blue"
                color={this.state.color}
                hideSliders={true}
                onColorChange={color => {
                  let myColor = fromHsv(color);
                  this.setState({ color: myColor });
                }}
                onColorSelected={color => this.setState({ color })}
                style={{ flex: 1, width: "100%", alignSelf: "center" }}
              />
            </KeyboardAvoidingView>

            <View style={{ flex: 1, margin: 40 }}>
              <TouchableOpacity
                onPress={this.saveMarker.bind(this) }
                style={{
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1.5,
                    borderRadius: 56,
                    borderColor: this.state.color,
                    paddingRight: 10,
                    backgroundColor: "transparent"
                  }}
                >
                  <Icon
                    name="map-marker-plus"
                    style={{ padding: 10 }}
                    size={28}
                    color={this.state.color}
                  />
                  <Text
                    style={{
                      color: this.state.color,
                      fontWeight: "bold"
                    }}
                  >
                    Save Marker
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
