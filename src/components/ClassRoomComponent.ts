import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { User } from './UserContext';

export const handleCreateRoom = async (
  user: User | null,
  time: string,
  questions: string
) => {
  const db = getFirestore();

  if (!user) {
    throw new Error('User must be logged in to create a room');
  }
  const joinedUsers: string[] = [];
  // prepare the room document
  const room = {
    time,
    questions,
    joinedUsers,
    creator: user.id,
  };

  // add the room document to the 'rooms' collection
  const docRef = await addDoc(collection(db, 'rooms'), room);

  // return the id of the new room
  return docRef.id;
};
