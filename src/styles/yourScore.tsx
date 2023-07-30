const { width, height } = Dimensions.get('window');
import { Dimensions, StyleSheet } from 'react-native';

export const yourScoreStyles = StyleSheet.create({
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
    alignItems: 'center',
  },
  scoreHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'blue',
  },
  userScore: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
});
