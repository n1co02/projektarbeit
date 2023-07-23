import React from 'react';
import { Text, View } from 'react-native';
import { createdRoomStyles } from '../../../styles/CreatedRoomStyles';

const JoinedRoomScreen = () => {
  return (
    <View style={createdRoomStyles.container}>
      <Text style={createdRoomStyles.heading}>There you are</Text>
    </View>
  );
};

export default JoinedRoomScreen;
