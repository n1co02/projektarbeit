import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import firebase from '../../config/firebase';
import { db } from '../../config/firebase';
import UserContext from '../../components/UserContext';
const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
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
  const handleRegistration = async () => {
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
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Create an account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <TouchableOpacity style={styles.signButton} onPress={handleRegistration}>
        <Text style={styles.signText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.signUpText}>Login</Text>
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

export default RegistrationScreen;
