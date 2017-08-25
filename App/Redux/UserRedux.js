import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: null,
  // markers -> in success function will be accesible from action.success
  loginSuccess: ['user'],
  loginFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  logging: null,
  error: null,
})

/* ------------- Reducers ------------- */


// successful avatar lookup
export const success = (state, action) => {
  const { user } = action
  console.log('state ->', state)
  console.log('action ->', action)
  state.merge({ logging: false, error: null, user })

  return state
}

export const login = (state) => {
    state.merge({ logging: true })
    return state
}

// failed to get the avatar
export const failure = (state, error) => {
    state.merge({ fetching: false, error: true })

    return state
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LOGIN]: login,
  [Types.USER_LOGOUT]: logout,
  [Types.USER_LOGIN_SUCCESS]: success,
  [Types.USER_LOGOUT_SUCCESS]: success,
  [Types.USER_LOGIN_FAILURE]: failure,
  [Types.USER_LOGOUT_FAILURE]: failure,
})