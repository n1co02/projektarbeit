import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.1,
  },
  welcome: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    width: 265,
    height: 47,
    alignSelf: 'center',
    marginBottom: 35,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8, // added to give space below the input field
    paddingLeft: 8,
  },
  label: {
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end', // to align the "Forgot Password?" to the right
    marginBottom: 18, // added to give space below the input field
  },
  forgotPassword: {
    color: '#E86969',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginRight: 2,
  },
  signButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '80%',
    height: 47,
    alignItems: 'center',
    marginBottom: 20,
  },
  signText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: '#160062',
    marginLeft: 4,
  },
  quoteContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  headline: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 20,
  },
  eyeIconContainer: {
    justifyContent: 'center',
    marginTop: 12,
    alignItems: 'flex-start', // To vertically center the eye icon with the TextInput
    position: 'absolute', // Use relative positioning
    right: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row', // To display the TextInput and the eye icon side by side
    alignItems: 'center', // To vertically center the eye icon with the TextInput
    height: 48,
    width: '100%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8, // added to give space below the input field
    paddingLeft: 8,
    position: 'relative', // Use relative positioning
  },
});

export { styles };
export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
