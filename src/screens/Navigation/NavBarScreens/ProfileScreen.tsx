import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import UserContext from '../../../components/UserContext';
import {
  handleChangePassword,
  handleLogout,
} from '../../../components/authComponent';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!userContext || !userContext.user) {
    return null;
  }

  const { user } = userContext;
  const handleLogOutCall = async () => {
    setIsLoading(true);
    await handleLogout(navigation);
    setIsLoading(false);
  };
  const handleChangePasswordCalll = async () => {
    await handleChangePassword(navigation, user.email);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.heading}>Your Profile</Text>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Your Email</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handleChangePasswordCalll}
          >
            <Text style={styles.forgotPasswordText}>Change Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            disabled={isLoading}
            onPress={handleLogOutCall}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { width } = Dimensions.get('window');
const isSmallDevice = width <= 375;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Set the background color to white here
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: isSmallDevice ? 20 : 40,
    paddingHorizontal: isSmallDevice ? 10 : 20,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: isSmallDevice ? 24 : 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    padding: 10,
  },
  profileInfo: {
    marginBottom: isSmallDevice ? 10 : 15,
  },
  label: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    fontSize: isSmallDevice ? 18 : 18,
    color: '#333',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: '#E86969',
    fontSize: isSmallDevice ? 14 : 16,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
