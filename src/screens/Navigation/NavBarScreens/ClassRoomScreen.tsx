import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Text,
  View,
  Button,
  StyleSheet,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import UserContext from '../../../components/UserContext';
import { styles } from '../../../styles/LearningScreenStyle';
import { modalStyles } from '../../../styles/ModalStyles';
import { Picker } from '@react-native-picker/picker';
import { handleCreateRoom } from '../../../components/ClassRoomComponent';

const ClassRoomScreen = () => {
  const userContext = useContext(UserContext);

  //create Room Logic
  const [selectedQuestions, setSelectedQuestions] = useState('5');
  const [selectedTime, setSelectedTime] = useState('15');
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

  const handleCreateRoomPress = async () => {
    setIsLoading(true);
    if (userContext !== null) {
      handleCreateRoom(userContext.user, selectedTime, selectedQuestions);
    }
    setIsLoading(false);
  };

  //Scanner logic

  // Modal visibility state
  const [openBarCodeScanner, setOpenBarCodeScanner] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  //bar code scanner here
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //User Context here
  if (!userContext || !userContext.user) {
    return null;
  }
  const { user } = userContext;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Hello, {user.username}</Text>
      </View>
      <KeyboardAvoidingView style={styles.dataContainer}>
        <View style={styles.inputContainer}></View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setCreateRoom(true)}
        >
          <Text style={styles.submitText}>Create Class Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setOpenBarCodeScanner(true)}
        >
          <Text style={styles.submitText}>Join Class Room</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={openBarCodeScanner}
          onRequestClose={() => {
            setOpenBarCodeScanner(!openBarCodeScanner);
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              title="Tap to Scan Again"
              onPress={() => setScanned(false)}
            />
          )}
        </Modal>
        {/*PopUp für Raum erstellen */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={createRoom}
          onRequestClose={() => {
            setCreateRoom(!createRoom);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>
                Select number of questions
              </Text>

              {/* Dropdown for "Anzahl Fragen" */}
              <Picker
                selectedValue={selectedQuestions}
                onValueChange={(itemValue) => setSelectedQuestions(itemValue)}
                style={pickerStyles.picker}
                itemStyle={pickerStyles.pickerItem}
              >
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
              </Picker>
              {/* Dropdown for "Time to Answer" */}
              <Text>Select time for questions</Text>
              <Picker
                selectedValue={selectedTime}
                onValueChange={(itemValue) => setSelectedTime(itemValue)}
                style={pickerStyles.picker}
                itemStyle={pickerStyles.pickerItem}
              >
                <Picker.Item label="15 seconds" value="15" />
                <Picker.Item label="30 seconds" value="30" />
                <Picker.Item label="60 seconds" value="60" />
              </Picker>
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={handleCreateRoomPress}
                disabled={isLoading} // Disable button while loading
              >
                <Text style={modalStyles.textStyle}>Create Classroom</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const pickerStyles = StyleSheet.create({
  picker: {
    width: 200,
    height: 50,
  },
  pickerItem: {
    color: 'red',
  },
});

export default ClassRoomScreen;
