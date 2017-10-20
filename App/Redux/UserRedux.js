import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userLogin: null,
  userLogout: null,
  // user -> in success function will be accesible from action.success
  getCurrentUser: null,
  userLoginSuccess: ["user"],
  userLoginFailure: null
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  user: {
    displayName: "Anonymous",
    photoURL: "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg",
    email: ""
  },
  isLogged: false,
  logging: null,
  error: null
};

/* ------------- Reducers ------------- */

let myState;

export const login = state => {
  myState = {
    ...state,
    logging: true,
    isLogged: false
  };
  return myState;
};

export const logout = state => {
  myState = {
    ...state,
    logging: false,
    user: {
      displayName: "Anonymous",
      photoURL: "http://www.free-avatars.com/data/media/37/cat_avatar_0597.jpg",
      email: ""
    },
    isLogged: false
  };
  return myState;
};

export const success = (state, action) => {
  const { user } = action;
  const { displayName, photoURL, email } = user;
  myState = {
    ...state,
    logging: false,
    isLogged: true,
    user: {
      displayName,
      photoURL,
      email
    }
  };
  return myState;
};

export const failure = (state, error) => {
  myState = {
    ...state,
    logging: false,
    error
  };
  return state;
};

export const getCurrentUser = state => {
  let myState = {
    ...state,
    isLogged: false,
    logging: true
  };
  return myState;
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CURRENT_USER]: getCurrentUser,
  [Types.USER_LOGIN]: login,
  [Types.USER_LOGOUT]: logout,
  [Types.USER_LOGIN_SUCCESS]: success,
  [Types.USER_LOGOUT_SUCCESS]: success,
  [Types.USER_LOGIN_FAILURE]: failure,
  [Types.USER_LOGOUT_FAILURE]: failure
});
