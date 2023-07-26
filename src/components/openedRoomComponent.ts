import { NavigationProp } from '@react-navigation/native';
import { User } from './UserContext';
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const leaveRoom = async (
  roomId: string,
  user: User | null,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  try {
    const db = getFirestore();
    const docRef = doc(db, 'rooms', roomId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Get the data from the document snapshotssss
      const roomData = docSnapshot.data();

      // Access the "creator" field from the room data
      const creator = roomData.creator;
      if (user != null && creator === user.id) {
        await deleteDoc(docRef);
        navigation.navigate('bottomNavBar' as never);
      } else {
        alert('only creator can delete the room. How did you even do that?');
      }
    }
  } catch (error) {
    console.error('Error fetching room data:', error);
  }
};
///check if bugs
export const handleQuestions = async (roomId: string, timer: number) => {
  const randomId = Math.floor(Math.random() * 1003) + 1; // random number between 1 and 1003
  const docId = String(randomId); // convert the random number to string

  try {
    const docRef = doc(db, 'tasks', docId);
    const docSnapshot = await getDoc(docRef);
    const roomRef = doc(db, 'rooms', roomId);
    const roomSnapshot = await getDoc(roomRef);
    if (docSnapshot.exists()) {
      const randomDocument = docSnapshot.data();
      const updatedQuizItem = {
        question: randomDocument?.english || '', // Update with the English field from randomDocument, if available
        answer: randomDocument?.german || '', // Update with the German field from randomDocument, if available
        time: timer,
      };
      const roomData = roomSnapshot.data();
      const quizItemsArray = roomData?.quizItems || [];
      quizItemsArray[0] = updatedQuizItem;
      const started = true;
      // Update the room document with the new quizItems array
      await updateDoc(roomRef, { quizItems: quizItemsArray, started: started });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export const handleRoomSettings = async (roomId: string) => {
  const docRef = doc(db, 'rooms', roomId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    const randomDocument = docSnapshot.data();
    return randomDocument;
  }
};
export const fetchRoomData = async (roomId: string) => {
  try {
    const docRef = doc(db, 'rooms', roomId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const randomDocument = docSnapshot.data();
      return randomDocument;
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }
};
