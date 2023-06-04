import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export { styles };
