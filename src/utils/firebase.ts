import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDatabase,
  ref,
  push,
  child,
  set,
  get,
  update,
  remove,
  onChildAdded,
  onChildChanged,
} from 'firebase/database';
import { faker } from '@faker-js/faker';
import { generateBotName } from './randomizer';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getDatabase();

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

export const insertBot = async (botData: object): Promise<any> => {
  const botKey: any = push(child(ref(db), 'bots')).key;

  const botsRef = ref(db, `/bots/${botKey}`);

  // onChildAdded(botsRef, data => {
  //   console.log('onChildAdded', data.key, data.val());
  // });

  set(botsRef, botData);

  return {
    [botKey]: { ...botData },
  };
};

export const getBots = async (): Promise<any> => {
  const snapshot = await get(ref(db, '/bots'));

  return snapshot.val();
};

export const updateBotData = async (botKey, botData): Promise<any> => {
  const botsRef = ref(db, `/bots/${botKey}`);
  await update(botsRef, botData);

  await onChildChanged(botsRef, data => {
    console.log('onChildChanged', data.key, data.val());
  });

  return {
    [botKey]: { ...botData },
  };
};

export const deleteBotData = async (botKey): Promise<any> => {
  remove(ref(db, `/bots/${botKey}`));
};
