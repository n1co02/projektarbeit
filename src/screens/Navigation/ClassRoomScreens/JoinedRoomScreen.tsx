import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore';
import UserContext from '../../../components/UserContext';
import { answerSubmit } from '../../../components/joinedRoomComponents';
import { joinedRoomStyles } from '../../../styles/joinedRoomStyles';
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
  const userContext = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(1);
  let questionsAsked = 0;
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
        setTotalQuestions(roomData.questions);
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
        if (
          typeof prevElapsedTime === 'number' &&
          prevElapsedTime > 0 &&
          questionsAsked < totalQuestions
        ) {
          return prevElapsedTime - 1;
        } else {
          if (time != null) {
            questionsAsked++;
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
      setIsDisabled(false);
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
  if (!userContext || !userContext.user) {
    return null;
  }
  const { user } = userContext;
  const handleAnswerSubmit = async () => {
    setIsDisabled(true);
    const checkAnswer = await answerSubmit(
      userAnswer,
      roomData?.quizItems[0].answer,
      user,
      route.params.roomId
    );
    console.log(checkAnswer);
  };
  //const currentQuestion = roomData?.quizItems[0];
  if (!roomData) {
    // Room data is still loading or not available
    return <Text>Loading...</Text>;
  }
  return (
    <View style={joinedRoomStyles.container}>
      <Text style={joinedRoomStyles.timer}>Timer: {elapsedTime}</Text>

      {/* Display the current question */}
      <Text style={joinedRoomStyles.question}>{task}</Text>

      {/* User input field to type in the answer */}
      <TextInput
        style={joinedRoomStyles.answerInput}
        placeholder="Type your answer here"
        value={userAnswer}
        onChangeText={(text) => setUserAnswer(text)}
      />

      {/* Display the current score */}
      <Text style={joinedRoomStyles.score}>
        Score: {roomData.joinedUsers[0].score}
      </Text>

      {/* Add a button to submit the answer */}
      <TouchableOpacity
        style={joinedRoomStyles.submitButton}
        onPress={handleAnswerSubmit}
        disabled={isDisabled}
      >
        <Text style={joinedRoomStyles.submitButtonText}>Submit answer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JoinedRoomScreen;
