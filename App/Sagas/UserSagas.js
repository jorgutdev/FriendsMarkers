import { put } from 'redux-saga/effects';
import UserActions from '../Redux/UserRedux';
import * as firebase from 'firebase';
const FBSDK = require('react-native-fbsdk');
const { LoginManager, AccessToken } = FBSDK;

export function* login() {
  let user;
  try {
    let accessToken = yield AccessToken.getCurrentAccessToken();
    console.log('*login | accessToken -> ', accessToken);
    let promise = yield LoginManager.logInWithReadPermissions([
      'public_profile',
      'email',
      'user_friends'
    ]);
    console.log('*login | promise -> ', promise);
    user = yield firebase
      .auth()
      .signInWithCredential(
        firebase.auth.FacebookAuthProvider.credential(accessToken.accessToken)
      );

    yield put(UserActions.userLoginSuccess(user));
  } catch (error) {
    console.error(error);
    yield put(UserActions.userLoginFailure(error));
  }
}

export function* getCurrentUser() {
  try {
    let accessToken = yield AccessToken.getCurrentAccessToken();
    let currentUser = firebase.auth().currentUser;
    if (currentUser) {
      yield put(UserActions.userLoginSuccess(currentUser));
    } else {
      if (accessToken) {
        let user = yield firebase
          .auth()
          .signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(
              accessToken.accessToken
            )
          );
        yield put(UserActions.userLoginSuccess(user));
      }
    }
  } catch (error) {
    yield put(UserActions.userLoginFailure(error));
  }
}

export function* logout() {
  LoginManager.logOut();
  yield firebase.auth().signOut();
  yield put(UserActions.userLogout());
}
