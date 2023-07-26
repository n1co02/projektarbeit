import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { createdRoomStyles } from '../../../styles/CreatedRoomStyles';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore';

type StackParamList = {
  CreatedRoomScreen: { roomId: string };
};

type CreatedRoomScreenRouteProp = RouteProp<
  StackParamList,
  'CreatedRoomScreen'
>;

const JoinedRoomScreen = () => {
  const route = useRoute<CreatedRoomScreenRouteProp>();
  const navigation = useNavigation();
  const [roomData, setRoomData] = useState<DocumentData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [time, setTime] = useState<number | null>(null);
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [leave, setLeave] = useState(false);
  const fetchRoomDataAsync = async (
    navigation: NavigationProp<ReactNavigation.RootParamList>
  ) => {
    setIsLoading(true);
    const db = getFirestore();
    const docRef = doc(db, 'rooms', route.params.roomId);
    const roomSnapshot = await getDoc(docRef);
    if (roomSnapshot.exists()) {
      const roomData = roomSnapshot.data();
      if (time == null) {
        setTime(roomData.quizItems[0].time);
        //setElapsedTime(roomData.quizItems[0].time);
      }
      const roomDataArray = roomData || [];
      if (roomData.quizItems[0].question != '') {
        setTask(roomData.quizItems[0].question);
      }
      setRoomData(roomDataArray);
    } else {
      setLeave(true);
      setIsLoading(false);
      setElapsedTime(0);
      setIntervalId(null);
      navigation.navigate('bottomNavBar' as never);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (leave == false) {
      fetchRoomDataAsync(navigation);
    }
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const handleTimer = async (timer: number | null) => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    const newIntervalId = window.setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        if (typeof prevElapsedTime === 'number' && prevElapsedTime > 0) {
          return prevElapsedTime - 1;
        } else {
          if (time != null) {
            setElapsedTime(time);
            handleTimer(time); // Reset the elapsed time to the initial timer value
          }
          clearInterval(newIntervalId);
        }
        return prevElapsedTime;
      });
    }, 900);
    setIntervalId(newIntervalId); // Update the intervalId state with the new interval ID
  };

  useEffect(() => {
    if (
      isLoading == true &&
      time != null &&
      time > 0 &&
      task != '' &&
      elapsedTime == 0
    ) {
      setElapsedTime(time);
      handleTimer(time);
    }
  }, [isLoading, time, task]);
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  //const currentQuestion = roomData?.quizItems[0];
  if (!roomData) {
    // Room data is still loading or not available
    return <Text>Loading...</Text>;
  }
  return (
    <View style={createdRoomStyles.container}>
      <Text>Timer: {elapsedTime}</Text>

      {/* Display the current question */}
      <Text>{task}</Text>

      {/* User input field to type in the answer */}
      <TextInput
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={(text) => setUserAnswer(text)}
      />

      {/* Display the current score */}
      <Text>Score: {roomData.joinedUsers[0].score}</Text>

      {/* Add a button to submit the answer */}
      <Button
        title="Submit Answer"
        onPress={() => {
          // Handle answer submission logic here
          // For example, you can compare userAnswer with currentQuestion.answer
          // and update the user's score accordingly.
        }}
      />
    </View>
  );
};

export default JoinedRoomScreen;
