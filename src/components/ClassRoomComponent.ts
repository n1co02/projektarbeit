import {
  collection,
  addDoc,
  getFirestore,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { User } from './UserContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

export const handleCreateRoom = async (
  user: User | null,
  time: number,
  questions: number,
  navigation: NavigationProp<ParamListBase, 'CreatedRoomScreen'>
) => {
  const db = getFirestore();

  if (!user) {
    throw new Error('User must be logged in to create a room');
  }
  const started = false;

  // Prepare the room document

  const room = {
    quizItems: [
      {
        time,
        question: '',
        answer: '',
      },
    ],
    started,
    questions,
    joinedUsers: [],
    creator: user.id,
  };

  // Add the room document to the 'rooms' collection
  const docRef = await addDoc(collection(db, 'rooms'), room);

  navigation.navigate('CreatedRoomScreen', { roomId: docRef.id });
};

export const navigateFromQrCode = async (
  user: User | null,
  roomId: string,
  navigation: NavigationProp<ParamListBase, 'CreatedRoomScreen'>
) => {
  if (!user) {
    throw new Error('User must be logged in to join a room');
  }

  const db = getFirestore();
  const roomRef = doc(db, 'rooms', roomId);

  try {
    // Fetch the room document
    const roomSnapshot = await getDoc(roomRef);

    if (roomSnapshot.exists()) {
      // Get the current joinedUsers array from the room document
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentJoinedUsers: any[] = roomSnapshot.get('joinedUsers');
      // Check if the user's ID is already in the joinedUsers array
      if (currentJoinedUsers.some((u) => u.id === user.id)) {
        navigation.navigate('JoinedRoomScreen', { roomId });
      } else {
        // Add the user's ID and username to the joinedUsers array
        currentJoinedUsers.push({
          id: user.id,
          username: user.username,
          score: 0,
        });

        // Update the joinedUsers array in the room document
        await updateDoc(roomRef, { joinedUsers: currentJoinedUsers });

        // Navigate to the JoinedRoomScreen with the updated room ID
        navigation.navigate('JoinedRoomScreen', { roomId });
      }
    } else {
      throw new Error('Room not found');
    }
  } catch (error) {
    console.error('Error joining room:', error);
  }
};
