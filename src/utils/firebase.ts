import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Get user if authenticated
 * @returns {Promise<FirebaseUser>}
 */
export const getUser = () =>
  new Promise(resolve => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });

/**
 * Get user ID token
 * @param {*} user
 * @returns
 */
export const getIdToken = user =>
  user
    .getIdToken()
    .then(token => token)
    .catch(error => {
      throw error;
    });

/**
 * Sign in with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<FirebaseUser>}
 */
export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log('singin', user);
      return user;
    })
    .catch(error => {
      throw error;
    });
};

/**
 * Logout user
 */
export const logout = () => {
  auth.signOut();
};
