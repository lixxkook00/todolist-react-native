import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNZtx1NRKnVQEGl1EyM6QpDZ-NnTHeIdo",
    authDomain: "todolist-react-native-d6d71.firebaseapp.com",
    projectId: "todolist-react-native-d6d71",
    storageBucket: "todolist-react-native-d6d71.appspot.com",
    messagingSenderId: "436838429019",
    appId: "1:436838429019:web:ece513a56a410346f8aa7e"
}

firebase.initializeApp(firebaseConfig)

export default firebase;