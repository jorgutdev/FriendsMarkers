import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addMap: ['name'],
  returnToMap: ['map'],
  loadMap: ['id'],
  mapLoaded: ['map'],
})

export const MapsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  map: {
    name: '',
    id: null,
    markers: [],
    creator: null,
    users: null,
  },
  loadingMap: false,
  addingMap: false,
  error: null,
}

/* ------------- Reducers ------------- */





export const loadMap = (state) => {
  myState = {
    ...state,
    loadingMap: true,
  }
  return myState
}




export const mapLoaded = (state, action) => {
  const { map } = action
  myState = {
    ...state,
    map,
    loadingMap: false,
  }
  return myState
}



export const addMap = (state, parameters) => {
  myState = {
    ...state,
    map: {
      ...state.map,
      name: parameters.name,
    },
    addingMap: true,
  }
  return myState
}


export const returnToMap = (state, action) => {

  const { map } = action
  debugger;;
  myState = {
    ...state,
    map,
    addingMap: false,
  }
  return myState
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_MAP]: addMap,
  [Types.RETURN_TO_MAP]: returnToMap,
  [Types.LOAD_MAP]: loadMap,
  [Types.MAP_LOADED]: mapLoaded,
})