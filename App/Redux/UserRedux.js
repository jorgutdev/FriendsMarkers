import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: null,
  // user -> in success function will be accesible from action.success
  userLoginSuccess: ['user'],
  userLoginFailure: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  isLogged: null,
  logging: null,
  error: null,
})

/* ------------- Reducers ------------- */




export const login = (state) => {
    state.merge({ logging: true, isLogged: false })
    return state
}

export const logout = (state) => {
  state.merge({ logging: false, user: null, isLogged: false })
  return state
}


export const success = (state, action) => {
  const { user } = action

  const { displayName, photoURL, email } = user

  let myUser = {
    displayName,
    photoURL,
    email
  }

  let myState = state.asMutable();

  myState.user = {
    displayName,
    photoURL,
    email
  } 
  console.log('myState ', myState)
  
  
  console.log('success | returning state -> ', myState)
  return myState
}

export const failure = (state, error) => {
    state.merge({ logging: false, error })

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