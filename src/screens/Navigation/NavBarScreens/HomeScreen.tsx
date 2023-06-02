import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import BottomNavBar from '../NavigationBar';
import UserContext from '../../../components/UserContext';
import { db } from '../../../config/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

const HomeScreen = () => {
  const userContext = useContext(UserContext);
  const [data, setData] = useState<DocumentData[] | never[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

        // Take the first 10 documents
        const limitedDocuments = shuffledDocuments.slice(0, 10);

        setData(limitedDocuments);
        setIsLoading(false);
        console.log(limitedDocuments);
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
    return shuffledArray;
  };

  if (!userContext || !userContext.user) {
    return null;
  }

  const { user } = userContext;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello, {user.username}</Text>
        {/* Your screen content here */}
      </View>
      <BottomNavBar />
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
});
export default HomeScreen;
