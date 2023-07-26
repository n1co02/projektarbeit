import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { createdRoomStyles } from '../../../styles/CreatedRoomStyles';
import QRCode from 'react-native-qrcode-svg';
import { leaveRoom } from '../../../components/openedRoomComponent';
import UserContext from '../../../components/UserContext';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { handleQuestions } from '../../../components/openedRoomComponent';
type StackParamList = {
  CreatedRoomScreen: { roomId: string; questions: number; time: number };
};

type CreatedRoomScreenRouteProp = RouteProp<
  StackParamList,
  'CreatedRoomScreen'
>;

const CreatedRoomScreen = () => {
  const userContext = useContext(UserContext);

  const navigation = useNavigation();
  const [isLeaving, setIsLeaving] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState<
    { id: string; username: string; score: number }[]
  >([]);
  const handleLeaveRoom = async () => {
    setQrCodeVisible(false);
    setIsLeaving(true);
    Alert.alert(
      'Confirmation',
      "If you close the Room, it'll get deleted",
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setIsLeaving(false);
            setQrCodeVisible(true);
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            if (userContext !== null) {
              await leaveRoom(
                route.params.roomId,
                userContext.user,
                navigation
              );
            }
            setIsLeaving(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const route = useRoute<CreatedRoomScreenRouteProp>();
  const qrCodeValue = route.params.roomId;
  const [qrCodeVisible, setQrCodeVisible] = useState(true);
  // Function to fetch the joinedUsers from the database
  const fetchJoinedUsers = async () => {
    try {
      const db = getFirestore();
      const docRef = doc(db, 'rooms', route.params.roomId);
      const roomSnapshot = await getDoc(docRef);

      if (roomSnapshot.exists()) {
        const roomData = roomSnapshot.data();
        const joinedUsersArray = roomData?.joinedUsers || [];
        setJoinedUsers(joinedUsersArray);
      } else {
        console.error('Room not found');
      }
    } catch (error) {
      console.error('Error fetching joinedUsers:', error);
    }
  };

  // Fetch the joinedUsers data when the component mounts or when the roomId changes
  useEffect(() => {
    if (qrCodeVisible) {
      fetchJoinedUsers();
    }
  });

  //check if bugss
  const [task, setTask] = useState<{ english: string; german: string } | null>(
    null
  );
  const [timer, setTimer] = useState(route.params.time);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  let questionsAsked = 0;
  const totalQuestions = route.params.questions;
  const handleStartPressed = async () => {
    setQrCodeVisible(false);

    // Check if there are remaining questions
    await handleTimer(timer);
    await handleQuestions(route.params.roomId, timer);
    setElapsedTime(timer); // Initialize elapsedTime to timer value
  };

  useEffect(() => {
    if (timer > 0 && qrCodeVisible == false) {
      handleTimer(timer);
    }
  }, [timer]);

  const handleTimer = async (timer: number) => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const newIntervalId = window.setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        if (
          typeof prevElapsedTime === 'number' &&
          prevElapsedTime > 0 &&
          typeof totalQuestions === 'number' &&
          questionsAsked < totalQuestions
        ) {
          return prevElapsedTime - 1;
        } else {
          if (
            prevElapsedTime == 0 &&
            typeof totalQuestions === 'number' &&
            questionsAsked < totalQuestions
          ) {
            handleQuestions(route.params.roomId, timer);
            questionsAsked++;
            setElapsedTime(timer);
            handleTimer(timer);
          } else {
            const score = joinedUsers;
          }
          clearInterval(newIntervalId);
          return prevElapsedTime;
        }
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleQuizItemsUpdate = (snapshot: any) => {
    const roomData = snapshot.data();
    const quizItemsArray = roomData?.quizItems || [];

    // Check if there is a task in the updated quizItems array
    if (quizItemsArray.length > 0) {
      const updatedTask = quizItemsArray[0];
      setTimer(updatedTask?.time);
      setTask({
        english: updatedTask?.question || '',
        german: updatedTask?.answer || '',
      });
    } else {
      setTimer(0);
      setTask(null);
    }
  };

  // Effect to set up the real-time listener when the component mounts
  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, 'rooms', route.params.roomId);

    const unsubscribe = onSnapshot(docRef, handleQuizItemsUpdate);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [route.params.roomId]);
  return (
    <View style={createdRoomStyles.container}>
      <Text>Timer: {elapsedTime}</Text>

      <TouchableOpacity
        style={createdRoomStyles.submitButton}
        disabled={isLeaving}
        onPress={handleLeaveRoom}
      >
        <Text style={createdRoomStyles.submitText}>Close Room</Text>
      </TouchableOpacity>
      {qrCodeVisible && (
        <TouchableOpacity
          style={createdRoomStyles.submitButton}
          onPress={handleStartPressed}
        >
          <Text style={createdRoomStyles.submitText}>Start</Text>
        </TouchableOpacity>
      )}
      {task && (
        <>
          <Text>Frage: {task.english}</Text>
          <Text>Antwort: {task.german}</Text>
        </>
      )}
      {/* Display the joinedUsers */}
      <View>
        <Text>Joined Users:</Text>
        {joinedUsers.map((user) => (
          <View key={user.id}>
            <Text>Username: {user.username}</Text>
          </View>
        ))}
      </View>

      {qrCodeVisible && (
        <View>
          <Text style={createdRoomStyles.heading}>
            Scan QR Code to join Room
          </Text>
          <View style={createdRoomStyles.qrCodeContainer}>
            <QRCode value={qrCodeValue} size={200} />
          </View>
        </View>
      )}
    </View>
  );
};

export default CreatedRoomScreen;
