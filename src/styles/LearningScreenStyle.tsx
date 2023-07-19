import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'flex-start',
    marginVertical: 20,
    marginLeft: 20,
    marginTop: 60,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  englishWord: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    width: '80%',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8, // added to give space below the input field
    paddingLeft: 8,
  },
  correctText: {
    color: '#00C75B',
    fontSize: 18,
    marginBottom: 10,
  },
  incorrectText: {
    color: '#C70C00',
    fontSize: 18,
    marginBottom: 10,
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

export { styles };
