import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/AuthStyles';
import { getAuth } from 'firebase/auth';
import firebase from '../../config/firebase';
import UserContext from '../../components/UserContext';
import { db } from '../../config/firebase';
import useQuoteOfTheDay from '../../components/useQuoteOfTheDay';
import { forgotPassword, handleLogin } from '../../components/authComponent';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebase);
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

  const userContext = useContext(UserContext);
  const setUser = userContext
    ? userContext.setUser
    : () => {
        throw new Error('UserContext is not initialized');
      };

  const quote = useQuoteOfTheDay();

  const handleLoginPress = async () => {
    setIsLoading(true); // Show loading screen
    await handleLogin(auth, email, password, db, setUser, navigation);
    setIsLoading(false);
  };
  const handleForgotPasswordPress = () => {
    forgotPassword();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <TouchableOpacity onPress={handleForgotPasswordPress}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signButton}
        onPress={handleLoginPress}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? ( // Show loading indicator if loading
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signText}>Login</Text>
        )}
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
    </ScrollView>
  );
};

export default LoginScreen;
