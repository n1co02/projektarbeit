import { NavigationProp } from '@react-navigation/native';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
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
      const isEmailVerified = userCredential.user.emailVerified;
      if (!isEmailVerified) {
        alert('Please verify your email before logging in.');
        return; // Return early if email is not verified
      }

      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const username = docSnap.data().username;
        setUser({ id: userCredential.user.uid, username, email: email });
      }

      // If the user exists and email is verified, navigate to the Home screen.
      navigation.navigate('bottomNavBar' as never);
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

//registration
export const handleRegistration = async (
  auth: Auth,
  email: string,
  password: string,
  username: string,
  db: ReturnType<typeof getFirestore>,
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
    await sendEmailVerification(userCredential.user);
    navigation.navigate('Login' as never);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    let errorMessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid Email!';
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
export const handleLogout = async (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      navigation.navigate('Login' as never);
    })
    .catch((error) => {
      console.error(error);
    });
};
export const handleChangePassword = async (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  email: string | undefined
) => {
  try {
    const auth = getAuth();

    // Send a password reset email to   the provided email address
    if (email != undefined) {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('Login' as never);
      alert('Password reset email sent successfully!');
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
