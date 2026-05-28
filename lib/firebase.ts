import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    'AIzaSyDYwlSJDpGeVwIlqZl2luZvctNmwBGt0UM',

  authDomain:
    'naitei-ai-3d633.firebaseapp.com',

  projectId: 'naitei-ai-3d633',

  storageBucket:
    'naitei-ai-3d633.firebasestorage.app',

  messagingSenderId:
    '900529841575',

  appId:
    '1:900529841575:web:e388792450a0533e858282',

  measurementId:
    'G-8XN2T992ED',
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;