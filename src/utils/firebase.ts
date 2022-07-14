import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
  User,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  push,
  child,
  set,
  get,
  update,
  remove,
} from 'firebase/database';

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
export const getUser = (): Promise<User | null> =>
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
export const getIdToken = (user): Promise<any> =>
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
export const signIn = (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(user => user)
    .catch(error => {
      throw error;
    });
};

/**
 * Logout user
 */
export const logout = (): Promise<void> => {
  return auth.signOut();
};

/**
 * ============= REALTIME DATABASE ==============
 */

/**
 * Add a bot in bots node
 * @param botData
 * @returns
 */
export const insertBotData = async (botData: any): Promise<any> => {
  const botKey: any = push(child(ref(db), 'bots')).key;

  const allBotsRef = ref(db, `/bots/${botKey}`);
  const myBotsRef = ref(db, `/user-bots/${botData.createdBy.uid}/${botKey}`);

  await set(allBotsRef, botData);
  await set(myBotsRef, botData);

  return {
    [botKey]: { ...botData },
  };
};

/**
 * Get all bots
 *
 */
export const getAllBotsData = async (): Promise<any> => {
  const snapshot = await get(ref(db, '/bots'));

  return snapshot.val();
};

/**
 * Get user's bots
 *
 */
export const getUserBotsData = async (uid: string): Promise<any> => {
  const snapshot = await get(ref(db, `/user-bots/${uid}`));

  return snapshot.val();
};

/**
 * Update bot details in bots node
 * @param botKey string
 * @param botData object
 * @returns
 */
export const updateBotData = async (botKey, botData): Promise<any> => {
  const allBotsRef = ref(db, `/bots/${botKey}`);
  const myBotsRef = ref(db, `/user-bots/${botData.createdBy.uid}/${botKey}`);

  await update(allBotsRef, botData);
  await update(myBotsRef, botData);

  return {
    [botKey]: { ...botData },
  };
};

/**
 * Remove bot from bots node
 * @param botKey string
 */
export const removeBotData = async (
  botKey: string,
  uid: string,
): Promise<void> => {
  const allBotsRef = ref(db, `/bots/${botKey}`);
  const myBotsRef = ref(db, `/user-bots/${uid}/${botKey}`);

  await remove(allBotsRef);
  await remove(myBotsRef);
};
