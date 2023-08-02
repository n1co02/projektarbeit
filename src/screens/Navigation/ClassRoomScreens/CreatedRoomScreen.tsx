import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Modal } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { createdRoomStyles } from '../../../styles/CreatedRoomStyles';
import QRCode from 'react-native-qrcode-svg';
import {
  fetchJoinedUsers,
  confirmLeaveRoom,
} from '../../../components/CreatedRoomScreenComponent';
import { useTimer } from '../../../hooks/useTimerHook';
import UserContext from '../../../components/UserContext';
import {
  getFirestore,
  doc,
  onSnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { handleQuestions } from '../../../components/CreatedRoomScreenComponent';
import { scoreTable } from '../../../styles/scoreTable';

type StackParamList = {
  CreatedRoomScreen: { roomId: string; questions: number; time: number };
};

type CreatedRoomScreenRouteProp = RouteProp<
  StackParamList,
  'CreatedRoomScreen'
>;

/* Bitte ordnung in den screen bringend, states & methoden & useEffects sind komplett durcheinander */
const CreatedRoomScreen = () => {
  const userContext = useContext(UserContext);
  const navigation = useNavigation();
  const [isLeaving, setIsLeaving] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState<
    { id: string; username: string; score: number }[]
  >([]);

  const route = useRoute<CreatedRoomScreenRouteProp>();
  const qrCodeValue = route.params.roomId;
  const [qrCodeVisible, setQrCodeVisible] = useState(true);
  const [task, setTask] = useState<{ english: string; german: string } | null>(
    null
  );
  const [timer, setTimer] = useState(route.params.time);

  const handleLeaveRoom = async () => {
    //setQrCodeVisible(false);
    setIsLeaving(true);
    await confirmLeaveRoom(route.params.roomId, user, navigation);
  };

  // Function to fetch the joinedUsers from the database
  const fetchJoinedUsersCall = async () => {
    const joinedUsersArray = await fetchJoinedUsers(route.params.roomId);
    setJoinedUsers(joinedUsersArray);
  };

  //check if bugss

  const { elapsedTime, isFinished, startTimer } = useTimer(
    route.params.time,
    route.params.questions,
    async () => {
      handleQuestions(route.params.roomId, timer);
    }
  );
  const handleStartPressed = () => {
    setQrCodeVisible(false);
    startTimer(); // Start the timer
    handleQuestions(route.params.roomId, timer);
  };

  const handleQuizItemsUpdate = (snapshot: DocumentSnapshot) => {
    const roomData = snapshot.data();
    const quizItemsArray = roomData?.quizItems || [];

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
  // Fetch the joinedUsers data when the component mounts or when the roomId changes
  useEffect(() => {
    if ((qrCodeVisible && !isLeaving) || (!isLeaving && isFinished)) {
      fetchJoinedUsersCall();
    }
  });
  // Effect to set up the real-time listener when the component mounts
  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, 'rooms', route.params.roomId);

    const unsubscribe = onSnapshot(docRef, handleQuizItemsUpdate);

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [route.params.roomId]);
  if (!userContext || !userContext.user) {
    return null;
  }
  const { user } = userContext;
  return (
    <View style={createdRoomStyles.container}>
      <TouchableOpacity
        style={createdRoomStyles.closeButton}
        disabled={isLeaving}
        onPress={handleLeaveRoom}
      >
        <Text style={createdRoomStyles.closeButtonText}>Close Room</Text>
      </TouchableOpacity>
      {qrCodeVisible && (
        <View style={createdRoomStyles.qrCodeContainer}>
          <Text style={createdRoomStyles.heading}>
            Scan QR Code to join Room
          </Text>
          <QRCode value={qrCodeValue} size={200} />
        </View>
      )}

      <Text style={createdRoomStyles.timer}>Timer: {elapsedTime}</Text>

      {task && (
        <>
          <Text style={createdRoomStyles.question}>Frage: {task.english}</Text>
          <Text style={createdRoomStyles.question}>Antwort: {task.german}</Text>
        </>
      )}

      <View>
        <Text style={createdRoomStyles.subHeading}>Joined Users:</Text>
        {joinedUsers.map((user) => (
          <View key={user.id}>
            <Text>Username: {user.username}</Text>
          </View>
        ))}
      </View>

      {qrCodeVisible && (
        <TouchableOpacity
          style={createdRoomStyles.submitButton}
          onPress={handleStartPressed}
        >
          <Text style={createdRoomStyles.submitText}>Start</Text>
        </TouchableOpacity>
      )}

      <Modal animationType="slide" transparent={true} visible={isFinished}>
        <View style={scoreTable.modalContainer}>
          <View style={scoreTable.contentContainer}>
            <Text style={scoreTable.tableHeader}>Scores</Text>
            {joinedUsers.map((user) => (
              <View key={user.id} style={scoreTable.tableRow}>
                <Text style={scoreTable.userName}>{user.username + ' '}</Text>
                <Text style={scoreTable.userScore}>
                  Score: {' ' + user.score}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={handleLeaveRoom}
              style={scoreTable.closeButton}
            >
              <Text style={scoreTable.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreatedRoomScreen;
