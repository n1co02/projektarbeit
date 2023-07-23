import React, { useContext, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { createdRoomStyles } from '../../../styles/CreatedRoomStyles';
import QRCode from 'react-native-qrcode-svg';
import { leaveRoom } from '../../../components/openedRoomComponent';
import UserContext from '../../../components/UserContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { handleQuestions } from '../../../components/openedRoomComponent';
type StackParamList = {
  CreatedRoomScreen: { roomId: string };
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
        console.log(joinedUsers);
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
  const handleStartPressed = async () => {
    setQrCodeVisible(false);
    const returnValue = await handleQuestions(route.params.roomId);
    setTask(returnValue as { english: string; german: string } | null);
    console.log(returnValue);
  };

  return (
    <View style={createdRoomStyles.container}>
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
