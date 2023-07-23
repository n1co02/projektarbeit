import { StyleSheet } from 'react-native';
export const createdRoomStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  qrCodeContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  roomIdText: {
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '80%',
    height: 47,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
