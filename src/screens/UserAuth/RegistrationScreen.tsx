import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/AuthStyles';
import { getAuth } from 'firebase/auth';
import firebase from '../../config/firebase';
import { db } from '../../config/firebase';
import useQuoteOfTheDay from '../../components/useQuoteOfTheDay';
import { handleRegistration } from '../../components/authComponent';
const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const auth = getAuth(firebase);
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

  const quote = useQuoteOfTheDay();
  const handleRegistrationPress = async () => {
    setIsLoading(true);
    await handleRegistration(auth, email, password, username, db, navigation);
    setIsLoading(false);
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

      <TouchableOpacity
        style={styles.signButton}
        onPress={handleRegistrationPress}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? ( // Show loading indicator if loading
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.signText}>Sign Up</Text>
        )}
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
