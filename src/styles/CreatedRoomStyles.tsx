import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const createdRoomStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Light grayish blue
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.1,
  },
  timer: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    color: '#172B4D', // Dark blue
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    color: '#172B4D',
    marginBottom: 20,
  },
  answerInput: {
    height: 48,
    width: '100%',
    borderColor: '#A5ADBA', // Light grayish blue
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    backgroundColor: '#ffffff', // white
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: '600',
    color: '#172B4D',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5, // More rounded corners
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    color: '#172B4D',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#172B4D',
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  actionContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 60,
    marginLeft: 15,
    borderRadius: 5,
    width: '40%',
    height: 35,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
