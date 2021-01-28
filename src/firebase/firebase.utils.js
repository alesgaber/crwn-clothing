import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBDK0hEuL4iadXkFcpeQs58tFDLXOCwftA',
  authDomain: 'crwn-db-6f309.firebaseapp.com',
  projectId: 'crwn-db-6f309',
  storageBucket: 'crwn-db-6f309.appspot.com',
  messagingSenderId: '895533110318',
  appId: '1:895533110318:web:45c6b413c7ef68ff45bbbf',
  measurementId: 'G-B0PJ1RV09T',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });

export const signinWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error created user', error.message);
    }
  }
  return userRef;
};

export default firebase;
