import { put } from 'redux-saga/effects'
import MarkersActions from '../Redux/MarkersRedux'
import * as firebase from 'firebase'

export function* getMarkers() {
    try {
        let promise = yield firebase.database().ref('markers').once('value');
        markers = promise.val()
        yield put(MarkersActions.markersSuccess(markers))
    } catch (error) {
        yield put(MarkersActions.markersFailure(error))
    }
}