import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, View } from 'react-native';
import BottomNavBar from '../NavigationBar';
import UserContext from '../../../components/UserContext';
import { DocumentData } from 'firebase/firestore';
import { styles } from './HomeScreenStyle';
import {
  fetchData,
  handleAnswerChange,
  handleAnswerSubmit,
} from '../../../components/HomeScreenComponent';
const HomeScreen = () => {
  const userContext = useContext(UserContext);
  const [data, setData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    fetchData(setData, setIsLoading);
  }, []);

  const handleAnswerChangeCall = (text: string) => {
    handleAnswerChange(text, setAnswer);
  };

  const handleAnswerSubmitCall = () => {
    console.log(data);
    handleAnswerSubmit(
      data,
      answer,
      setIsStarted,
      setIsCorrect,
      setAnswer,
      setData,
      setIsLoading
    );
  };

  if (!userContext || !userContext.user) {
    return null;
  }

  const { user } = userContext;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello, {user.username}</Text>
      </View>
      <KeyboardAvoidingView style={styles.dataContainer}>
        <Text style={styles.englishWord}>{data?.english}</Text>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={handleAnswerChangeCall}
          placeholder="Your answer"
        />
        <Button title="Submit" onPress={handleAnswerSubmitCall} />
        {isCorrect && <Text style={styles.correctText}>Correct!</Text>}
        {!isCorrect && isStarted && (
          <Text style={styles.incorrectText}>Incorrect! Try again.</Text>
        )}
      </KeyboardAvoidingView>
      <BottomNavBar />
    </SafeAreaView>
  );
};

export default HomeScreen;
