import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  markersRequest: null,
  // markers -> in success function will be accesible from action.success
  markersSuccess: ['markers'],
  markersFailure: null,
  addMarkerToMap: ['marker'],
  markerAdded: null,
})

export const MarkersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  markers: [],
  fetching: null,
  error: null,
}

/* ------------- Reducers ------------- */

export const request = (state) => {
  state = {
    ...state,
    fetching: true,
  }
  return state;
}
export const success = (state, action) => {
  const { markers } = action
  let myMarkers = Array.from(markers)
  state = {
    ...state,
    fetching: false,
    markers,
  }
  return state
}

export const failure = (state, error) => {
  state = {
    ...state,
    fetching: false,
    error,
  }
}


export const addMarkerToMap = (state, parameters) => {

  debugger;;

  const { marker } = parameters

  myState = {
    ...state,
    addingMarker: true,
    newMarker: marker,
  }
  return myState
}

export const markerAdded = (state) => {
  debugger;;
  myState = {
    ...state,
    addingMarker: false,
  }
  return myState
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MARKERS_REQUEST]: request,
  [Types.MARKERS_SUCCESS]: success,
  [Types.MARKERS_FAILURE]: failure,
  [Types.ADD_MARKER_TO_MAP]: addMarkerToMap,
  [Types.MARKER_ADDED]: markerAdded,
})