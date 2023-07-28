import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

const joinedRoomStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.1,
  },
  timer: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  answerInput: {
    height: 48,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  score: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
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
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export { joinedRoomStyles };
