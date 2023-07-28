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
      console.log(solution, answer);
      // Increment the score of that user by 1
      if (solution == answer) {
        joinedUsersArray[userIndex].score =
          joinedUsersArray[userIndex].score + 1;
        await updateDoc(docRef, {
          joinedUsers: joinedUsersArray,
        });
        console.log('answerTrue');
        return true;
      }
      return false;
      // Save the updated joinedUsers array back to Firestore
    }
  }
};
