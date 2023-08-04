import { NavigationProp } from '@react-navigation/native';
import { User } from './UserContext';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { SetStateAction } from 'react';
export const answerSubmit = async (
  solution: string,
  answer: string,
  user: User,
  roomId: string
) => {
  const db = getFirestore();
  const docRef = doc(db, 'rooms', roomId);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    // Get the current joinedUsers array from Firestore
    const joinedUsersArray = docSnapshot.data().joinedUsers || [];

    // Find the index of the user in the array
    const userIndex = joinedUsersArray.findIndex(
      (u: { id: string }) => u.id === user.id
    );

    // If the user is found in the array
    if (userIndex !== -1) {
      // Increment the score of that user by 1
      if (solution == answer) {
        joinedUsersArray[userIndex].score =
          joinedUsersArray[userIndex].score + 1;
        await updateDoc(docRef, {
          joinedUsers: joinedUsersArray,
        });
        return true;
      }
      return false;
      // Save the updated joinedUsers array back to Firestore
    }
  }
};
export const fetchRoomData = async (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  roomId: string,
  time: number | null,
  setTime: {
    (value: SetStateAction<number | null>): void;
    (arg0: number): void;
  },
  setTotalQuestions: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  setTask: { (value: SetStateAction<string>): void; (arg0: string): void },
  setLeave: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  const db = getFirestore();
  const docRef = doc(db, 'rooms', roomId);
  const roomSnapshot = await getDoc(docRef);
  if (roomSnapshot.exists()) {
    const roomData = roomSnapshot.data();
    if (time == null) {
      setTime(roomData.quizItems[0].time);
      setTotalQuestions(roomData.questions);
    }
    const roomDataArray = roomData || [];
    if (roomData.quizItems[0].question != '') {
      setTask(roomData.quizItems[0].question);
    }
    return roomDataArray;
  } else {
    setLeave(true);
    navigation.navigate('bottomNavBar' as never);
  }
};
