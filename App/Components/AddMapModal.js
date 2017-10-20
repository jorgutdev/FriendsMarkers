import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import MapsActions from '../Redux/MapsRedux';

export class AddMapModal extends Component {
  state = {
    newMapName: ''
  };

  componentDidMount() {}

  render() {
    return (
      <View>
        <Modal
          isVisible={this.props.isModalVisible}
          style={styles.modal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        >
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Creating new map</Text>
            <TouchableOpacity onPress={() => this.props.closeModal()}>
              <Icon style={styles.iconClose} name="close" color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textinput}
                underlineColorAndroid="transparent"
                onChangeText={newMapName => this.setState({ newMapName })}
                value={this.state.newMapName}
                placeholder="Map Name"
                defaultValue="MapName"
                autoFocus={false}
              />
            </View>
            <View style={styles.saveView}>
              <TouchableOpacity
                onPress={() => this.props.addMap(this.state.newMapName)}
              >
                <Icon
                  style={styles.iconSave}
                  name="google-maps"
                  color="#0069c0"
                >
                  <Text> Add Map</Text>
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  textInputView: {},
  saveView: {
    alignSelf: 'center',
    margin: 50
  },
  textinput: {
    fontSize: 23,
    width: '50%',
    alignSelf: 'center'
  },
  iconSave: {
    fontSize: 20
  },
  iconClose: {
    fontSize: 20,
    paddingTop: 15,
    paddingLeft: '9%'
  },
  modalHeader: {
    backgroundColor: '#0069c0',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 28,
    color: '#fff',
    padding: 10
  },
  modal: {
    backgroundColor: 'transparent'
  },
  modalContent: {
    backgroundColor: '#6ec6ff',
    height: '70%'
  }
});

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    isLogged: state.userReducer.isLogged
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMap: name => dispatch(MapsActions.addMap(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMapModal);
