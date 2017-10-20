import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

export class ActionButtonBar extends Component {
  showModal = () => {
    this.props.showModal();
  };

  render() {
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        position="left"
        verticalOrientation="down"
        style={styles.buttonContainer}
      >
        <ActionButton.Item buttonColor="#9b59b6" onPress={this.showModal}>
          <Icon name="map-marker-plus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          onPress={() => this.props.navigation.navigate('DrawerOpen')}
        >
          <Icon name="account" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#1abc9c" onPress={() => {}}>
          <Icon name="map-marker" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}

var styles = StyleSheet.create({
  actionButtonIcon: {
    color: '#fff',
    fontSize: 18
  },
  buttonContainer: {
    top: '9%',
    left: '-2%'
  }
});

function mapStateToProps(state) {
  return {
    isLogged: state.userReducer.isLogged
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonBar);
