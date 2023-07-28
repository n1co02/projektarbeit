import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'react-native';
import UserContext from '../../../components/UserContext';
import { DocumentData } from 'firebase/firestore';
import { styles } from '../../../styles/LearningScreenStyle';
import {
  fetchData,
  handleAnswerChange,
  handleAnswerSubmit,
} from '../../../components/LearningScreenComponent';
//import { setNavBarScreen } from '../../../components/navBarComponent';
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
  //setNavBarScreen(setActiveScreen);
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
  const nextQuestionCall = () => {
    fetchData(setData, setIsLoading);
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
        <View style={styles.inputContainer}></View>
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={handleAnswerChangeCall}
          placeholder="Your answer"
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAnswerSubmitCall}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        {isCorrect && <Text style={styles.correctText}>Correct!</Text>}
        {!isCorrect && isStarted && (
          <Text style={styles.incorrectText}>Incorrect! Try again.</Text>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={nextQuestionCall}
        >
          <Text style={[styles.submitText, { fontSize: 14 }]}>
            Task too hard? Go to the next question!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
