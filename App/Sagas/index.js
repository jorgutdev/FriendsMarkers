import { takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { UserTypes } from '../Redux/UserRedux'
import { MapsTypes } from '../Redux/MapsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { login, getCurrentUser } from './UserSagas'
import { addMap, loadMap, addMarkerToMap } from './MapsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    takeLatest(UserTypes.USER_LOGIN, login),
    takeLatest(UserTypes.GET_CURRENT_USER, getCurrentUser),
    takeLatest(MapsTypes.ADD_MAP, addMap),
    takeLatest(MapsTypes.LOAD_MAP, loadMap),
    takeLatest(MapsTypes.ADD_MARKER_TO_MAP, addMarkerToMap),
    
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]
}
