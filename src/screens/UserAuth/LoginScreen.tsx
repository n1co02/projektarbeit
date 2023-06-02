import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../config/firebase';
import UserContext from '../../components/UserContext';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebase);

  const userContext = useContext(UserContext);
  const setUser = userContext
    ? userContext.setUser
    : () => {
        throw new Error('UserContext is not initialized');
      };

  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote(data[randomIndex]);
      });
  }, []);

  const handleLogin = async () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hi, Welcome Back! 👋</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signButton} onPress={handleLogin}>
        <Text style={styles.signText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Registration' as never)}
        >
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.headline}>Quote of the Day:</Text>
        <Text style={styles.quoteText}>{quote.text}</Text>
        <Text style={styles.quoteAuthor}>- {quote.author}</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;
