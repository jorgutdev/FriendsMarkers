import { put } from 'redux-saga/effects'
import MarkersActions from '../Redux/MarkersRedux'
import * as firebase from 'firebase'

export function* getMarkers() {
    try {
        let promise = yield firebase.database().ref('markers').once('value');
        let value = promise.val()
        let markers = []
        for( var index in value){
            markers.push(value[index])
        }
        yield put(MarkersActions.markersSuccess(markers))
    } catch (error) {
        yield put(MarkersActions.markersFailure(error))
    }
}


export function* addMarkerToMap(action) {
    debugger;;
    const { marker } = action
    try {
        let key = firebase.database().ref('maps/'+marker.map+'/markers').push().key
        yield firebase.database().ref('maps/'+marker.map+'/markers/'+key).set(marker)
        yield put(MarkersActions.markerAdded())
    } catch (error) {
        console.error(error)
    }
}