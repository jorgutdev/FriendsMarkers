import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { MarkersTypes } from '../Redux/MarkersRedux'
import { UserTypes } from '../Redux/UserRedux'
import { MapsTypes } from '../Redux/MapsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getMarkers, addMarkerToMap } from './MarkersSagas'
import { login, getCurrentUser } from './UserSagas'
import { addMap, loadMap } from './MapsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(MarkersTypes.MARKERS_REQUEST, getMarkers),
    takeLatest(MarkersTypes.ADD_MARKER_TO_MAP, addMarkerToMap),
    takeLatest(UserTypes.USER_LOGIN, login),
    takeLatest(UserTypes.GET_CURRENT_USER, getCurrentUser),
    takeLatest(MapsTypes.ADD_MAP, addMap),
    takeLatest(MapsTypes.LOAD_MAP, loadMap),
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]
}
