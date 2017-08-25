import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  markersRequest: null,
  // markers -> in success function will be accesible from action.success
  markersSuccess: ['markers'],
  markersFailure: null
})

export const MarkersTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  markers: null,
  fetching: null,
  error: null,
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state) => {
  state.merge({ fetching: true })
  return state;
}
// successful avatar lookup
export const success = (state, action) => {
  const { markers } = action
  console.log('state ->', state)
  console.log('action ->', action)
  return state.merge({ fetching: false, error: null, markers })
}

// failed to get the avatar
export const failure = (state, error) =>
  state.merge({ fetching: false, error: true, avatar: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MARKERS_REQUEST]: request,
  [Types.MARKERS_SUCCESS]: success,
  [Types.MARKERS_FAILURE]: failure
})