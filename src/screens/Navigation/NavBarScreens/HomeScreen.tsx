import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';
import { Text, View } from 'react-native';
import BottomNavBar from '../NavigationBar';
import UserContext from '../../../components/UserContext';
import { db } from '../../../config/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

const HomeScreen = () => {
  const userContext = useContext(UserContext);
  const [data, setData] = useState<DocumentData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, 'tasks');
        const querySnapshot = await getDocs(collectionRef);

        const documents: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          documents.push(doc.data());
        });

        // Randomly shuffle the documents array
        const shuffledDocuments = shuffleArray(documents);

        setData(shuffledDocuments);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    const limitedArray = shuffledArray.slice(0, 2);
    console.log(limitedArray);
    return limitedArray;
  };

  const handleAnswerChange = (text: string) => {
    setAnswer(text);
  };

  const handleAnswerSubmit = () => {
    setIsStarted(true);
    const currentData = data[currentIndex];
    if (currentData.german.toLowerCase() === answer.toLowerCase().trim()) {
      setIsCorrect(true);
      setAnswer('');
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCorrect(false);
    }
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

  const currentData = data[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello, {user.username}</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          {currentIndex < data.length ? (
            <View style={styles.dataContainer}>
              <Text style={styles.englishWord}>{currentData?.english}</Text>
              <TextInput
                style={styles.input}
                value={answer}
                onChangeText={handleAnswerChange}
                placeholder="Your answer"
              />
              <Button title="Submit" onPress={handleAnswerSubmit} />
              {isCorrect && <Text style={styles.correctText}>Correct!</Text>}
              {!isCorrect && isStarted && (
                <Text style={styles.incorrectText}>Incorrect! Try again.</Text>
              )}
            </View>
          ) : (
            <View style={styles.dataContainer}>
              <Text style={styles.correctText}>
                Congrats, you finished your daily amount!
              </Text>
            </View>
          )}
          <BottomNavBar />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 45,
    marginLeft: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  englishWord: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  correctText: {
    color: 'green',
    fontSize: 16,
    marginBottom: 10,
  },
  incorrectText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
