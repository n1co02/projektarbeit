import { NavigationProp } from '@react-navigation/native';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { SetStateAction } from 'react';
import { User } from './UserContext';

//Login
export const handleLogin = async (
  auth: Auth,
  email: string,
  password: string,
  db: ReturnType<typeof getFirestore>,
  setUser: {
    (value: SetStateAction<User | null>): void;
    (arg0: { id: string; username: string }): void;
  },
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const username = docSnap.data().username;
        setUser({ id: userCredential.user.uid, username });
      }

      // If the user exists, navigate to the Home screen.
      navigation.navigate('Home' as never);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    let errorMessage;
    switch (error.code) {
      case 'auth/wrong-password':
        errorMessage = 'Wrong password. Please try again.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email.';
        break;
      default:
        errorMessage = 'An error occurred. Please try again.';
        break;
    }
    console.log(errorMessage);
    alert(errorMessage);
  }
};

export const forgotPassword = () => {
  alert('seems like a you problem');
};

//registration
export const handleRegistration = async (
  auth: Auth,
  email: string,
  password: string,
  username: string,
  db: ReturnType<typeof getFirestore>,
  setUser: {
    (value: SetStateAction<User | null>): void;
    (arg0: { id: string; username: string }): void;
  },
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), { username: username });
    setUser({ id: user.uid, username: username });
    navigation.navigate('Home' as never);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    let errorMessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password must be 6 characters long or more.';
        break;
      default:
        errorMessage = 'An error occurred. Please try again.';
        break;
    }
    console.log(errorMessage);
    alert(errorMessage);
  }
};
