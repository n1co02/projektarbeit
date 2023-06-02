// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBDyTETL_th2LlCM9DFynDtkLYgu49Unh8',
  authDomain: 'projektarbeit-6359e.firebaseapp.com',
  projectId: 'projektarbeit-6359e',
  storageBucket: 'projektarbeit-6359e.appspot.com',
  messagingSenderId: '626358262742',
  appId: '1:626358262742:web:0c16e61e2f559d59f86277',
  measurementId: 'G-ZQ4CSRJXQF',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

export default firebase;
