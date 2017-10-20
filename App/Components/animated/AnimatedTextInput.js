import React, { Component } from 'react'
import { Animated, TextInput } from 'react-native'

export class AnimatedTextInput extends Component {
  state = {
    text: '',
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount () {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 10000 // Make it take a while
      }
    ).start()
  }

  render () {
    let { fadeAnim } = this.state

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        <TextInput
          placeholder='Marker name'
          onChangeText={name => this.setState({ name })}
        />
      </Animated.View>
    )
  }
}
