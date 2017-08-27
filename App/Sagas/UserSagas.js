import { put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import * as firebase from 'firebase'
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
  AccessToken,
  LoginButton
} = FBSDK

export function* login() {
    try {

        let accessToken = yield AccessToken.getCurrentAccessToken()
        console.log('*login | accessToken -> ',accessToken)
        let promise = yield LoginManager.logInWithReadPermissions(['public_profile']);
        console.log('*login | promise -> ',promise)
        let user = yield firebase.auth().signInWithCredential(
            firebase.auth.FacebookAuthProvider.credential(accessToken.accessToken)
        )
        console.log('*login | user -> ',user)
        

    
        yield put(UserActions.userLoginSuccess(user)) 
    } catch (error) {
        console.error(error)
        yield put(UserActions.userLoginFailure(error))
    }
}


export function* getCurrentUser(){
    try {
        let user = firebase.auth().currentUser
        if(user){

            yield put(UserActions.userLoginSuccess(user))
        }
    } catch (error) {
        yield put(UserActions.userLoginFailure(error))
    }
}



export function* logout(){
    LoginManager.logOut()
    firebase.auth().signOut()
}