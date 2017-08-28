import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TextInput, Button, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'

import ActionButtonBar from '../Components/ActionButtonBar';
import CustomMap from '../Components/CustomMap';
import AddMapModal from '../Components/AddMapModal';

import * as firebase from "firebase";
import { fromHsv, toHsv, TriangleColorPicker } from 'react-native-color-picker'
// Styles
import styles from './Styles/LaunchScreenStyles'

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };


export class LaunchScreen extends Component {
  state = {
    hackHeight: height,
    mapName: this.props.map.name,
    isModalVisible: false,
    color: 'blue',
  }
    static navigationOptions = {
        drawerLabel: 'Maps',
        drawerIcon: (<Icon name="google-maps" size={26} style={{color: "#fff"}} />),
    };



  constructor(props) {
    console.log('launchscreen | props -> ', props)
    super(props);
  }



  componentWillMount() {
  }


  componentDidMount() {
  }


  showModal = () => {
    this.setState({ isModalVisible: true })
  }
  closeModal = () => {
    this.setState({ isModalVisible: false })
  }

  render() {
    return (
      <View>
        <View style={{ flex: 1, paddingBottom: this.state.hackHeight }}>
      
        <CustomMap navigation={this.props.navigation} />
        <ActionButtonBar navigation={this.props.navigation}  showModal={this.showModal}    />
        <AddMapModal isModalVisible={this.state.isModalVisible} closeModal={this.closeModal}  />
        
        </View>
      </View>
    );
  }

  changeColor(color) {
    this.setState({ 
      color: fromHsv({ 
        h: color.color.h,
        s: color.color.s,
        v: color.color.v 
      })
    })
      
  }
}


function mapStateToProps(state) {
  console.log('LaunchScreen | mapStateToProps', state)
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
)(LaunchScreen)
