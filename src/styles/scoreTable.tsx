import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const scoreTable = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userScore: {
    fontSize: 16,
    color: 'green',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
