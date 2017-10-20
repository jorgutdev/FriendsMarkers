import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export class Header extends Component {
  render () {
    return (
      <View style={styles.header}>
        <View style={styles.menuIconContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('DrawerOpen')
            }}
          >
            <Icon name='menu' style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{this.props.name}</Text>
        </View>
        <View style={styles.searchIconContainer}>
          <TouchableOpacity
            onPress={() => {
              // TODO
            }}
          >
            <Icon name='magnify' style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(52, 52, 52, 0.9)',
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  menuIconContainer: {
    alignSelf: 'flex-start'
  },
  menuIcon: {
    color: 'white',
    fontSize: 25
  },
  searchIconContainer: {
    alignSelf: 'flex-end'
  },
  searchIcon: {
    color: 'white',
    fontSize: 25
  },
  nameContainer: {
    alignSelf: 'center'
  },
  name: {
    fontSize: 20,
    color: 'white'
  }
})

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
