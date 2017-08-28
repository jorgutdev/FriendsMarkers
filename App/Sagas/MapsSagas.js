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
        let map = {
            markers: [],
            users: [],
            id,
            ...promise.val(),
        }
        yield put(MapsActions.mapLoaded(map))
    } catch (error) {
        console.error(error)
    }
}




