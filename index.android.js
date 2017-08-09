import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'
import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNeVXNwwn21u2Rfoevif3-R0zor4qkl90",
    authDomain: "friendsmarkers-7fb19.firebaseapp.com",
    databaseURL: "https://friendsmarkers-7fb19.firebaseio.com",
    projectId: "friendsmarkers-7fb19",
    storageBucket: "friendsmarkers-7fb19.appspot.com",
    messagingSenderId: "114090560885"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
AppRegistry.registerComponent('FriendsMarkers', () => App)
