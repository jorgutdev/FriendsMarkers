import { put, take } from 'redux-saga/effects'
import MapsActions from '../Redux/MapsRedux'
import * as firebase from 'firebase'

export function* addMap(action) {
    let user = yield firebase.auth().currentUser;
    const { name } = action
    let map = {
        name,
        markers: [],
        creator: user.email,
        users: [],
    }
    try {
        let key = firebase.database().ref('maps').push().key
        yield firebase.database().ref('maps').child(key).set(map)
        yield put(MapsActions.returnToMap(map))
    } catch (error) {
        console.error(error)
    }
}


export function* loadMap(action) {
    const { id } = action
    try {
        let promise = yield firebase.database().ref('maps/' + id).once('value')
        let markersArray = promise.val().markers

        let markers = []
        for( var index in markersArray){
            markers.push(markersArray[index])
        }

        let map = {
            users: [],
            id,
            ...promise.val(),
            markers,            
        }
        yield put(MapsActions.mapLoaded(map))
    } catch (error) {
        console.error(error)
    }
}




export function* addMarkerToMap(action) {
    const { marker } = action
    try {
        let key = firebase.database().ref('maps/'+marker.map+'/markers').push().key
        yield firebase.database().ref('maps/'+marker.map+'/markers/'+key).set(marker)
        yield put(MapsActions.markerAddedSuccessfully(marker))
    } catch (error) {
        console.error(error)
    }
}