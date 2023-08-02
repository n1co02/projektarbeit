import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useQuizTimer } from '../../../hooks/useQuizTimerHook';
import { DocumentData } from 'firebase/firestore';
import UserContext from '../../../components/UserContext';
import {
  answerSubmit,
  fetchRoomData,
} from '../../../components/JoinedRoomComponent';
import { joinedRoomStyles } from '../../../styles/JoinedRoomStyles';
import { yourScoreStyles } from '../../../styles/yourScore';

type StackParamList = {
  CreatedRoomScreen: { roomId: string };
};

type CreatedRoomScreenRouteProp = RouteProp<
  StackParamList,
  'CreatedRoomScreen'
>;
type User = {
  id: string;
  username: string;
  score: number;
};

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
  const [totalQuestions, setTotalQuestions] = useState(1);

  // Using the custom hook
  const { elapsedTime, isDisabled, isFinished } = useQuizTimer({
    isLoading,
    time,
    task,
    totalQuestions,
  });

  const handleFetchRoomData = async () => {
    setIsLoading(true);
    const RoomDataArray = await fetchRoomData(
      navigation,
      route.params.roomId,
      time,
      setTime,
      setTotalQuestions,
      setTask,
      setLeave
    );
    if (RoomDataArray) {
      setRoomData(RoomDataArray);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (leave == false) {
      handleFetchRoomData();
    }
  });

  if (!userContext || !userContext.user) {
    return null;
  }

  const { user } = userContext;

  const handleAnswerSubmit = async () => {
    await answerSubmit(
      userAnswer,
      roomData?.quizItems[0].answer,
      user,
      route.params.roomId
    );
  };

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
      {/* Add a button to submit the answer */}
      <TouchableOpacity
        style={joinedRoomStyles.submitButton}
        onPress={handleAnswerSubmit}
        disabled={isDisabled}
      >
        <Text style={joinedRoomStyles.submitButtonText}>Submit answer</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={isFinished}>
        <View style={yourScoreStyles.modalContainer}>
          <View style={yourScoreStyles.contentContainer}>
            <Text style={yourScoreStyles.scoreHeading}>Your Score</Text>
            {roomData.joinedUsers.map((user: User) => (
              <View key={user.id}>
                <Text
                  style={yourScoreStyles.userScore}
                >{`${user.username}: ${user.score}`}</Text>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default JoinedRoomScreen;
