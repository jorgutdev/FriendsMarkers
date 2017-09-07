import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionButton from 'react-native-action-button';


export class TempButtons extends Component {

    



    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }



    render() {

        return (
            <View style={{ flex: 1 }}>
               <View>



                <ActionButton 
            buttonColor="rgba(0,0,0,1)"
             onPress={ () => {
                alert('cancel')
                }}  icon={
                    
                    <Icon name="cancel" />
      
                }/>
              </View>
            <ActionButton buttonColor="rgba(250,0,0,1)" onPress={ () => {
                alert('save')}}
                icon={
                    
                    <Icon name="cancel"  />
      
                }
                 />


            </View>
        )
    }
}


var styles = StyleSheet.create({
    centerButton: {
        alignSelf: 'flex-start',
    },
    buttonContainerLeft: {
        alignSelf: 'flex-start'
    },
    buttonCancel: {
        color:'white'
    }
})

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempButtons)