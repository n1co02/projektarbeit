import { NavigationProp } from '@react-navigation/native';
import { User } from './UserContext';
import { deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore';
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
      // Get the data from the document snapshot
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
export const handleQuestions = async (roomId: string) => {
  const returnValue = await handleTimerAndQuestions(roomId);
  const questions = returnValue?.questions;
  const time = returnValue?.time;
  const randomId = Math.floor(Math.random() * 1003) + 1; // random number between 1 and 1003
  const docId = String(randomId); // convert the random number to string

  try {
    const docRef = doc(db, 'tasks', docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const randomDocument = docSnapshot.data();
      return randomDocument;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
const handleTimerAndQuestions = async (roomId: string) => {
  const db = getFirestore();
  const docRef = doc(db, 'rooms', roomId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    // Get the data from the document snapshot
    const roomData = docSnapshot.data();
    console.log(roomData);
    const time = roomData.time;
    const questions = roomData.questions;
    return { time: time, questions: questions };
    console.log(time, questions);
  }
};
