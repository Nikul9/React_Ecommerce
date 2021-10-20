// import * as firebase from "firebase/app"; // old way, wont work anymore
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
// firebase config
const config = {
  apiKey: "AIzaSyCJiZ9_2oP8LRsh9VfM1BpiUNq_szWT67o",
  authDomain: "reactecommerce-9edb2.firebaseapp.com",
  projectId: "reactecommerce-9edb2",
  storageBucket: "reactecommerce-9edb2.appspot.com",
  messagingSenderId: "216424087995",
  appId: "1:216424087995:web:7adff0ae58ae3986c1049e",
  measurementId: "G-EXBRJD2C15"
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();