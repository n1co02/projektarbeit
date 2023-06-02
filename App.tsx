import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import LoginScreen from './src/screens/UserAuth/LoginScreen';
import RegistrationScreen from './src/screens/UserAuth/RegistrationScreen';
import HomeScreen from './src/screens/Navigation/NavBarScreens/HomeScreen';
import ClassRoomScreen from './src/screens/Navigation/NavBarScreens/ClassRoomScreen';
import ProfileScreen from './src/screens/Navigation/NavBarScreens/ProfileScreen';
import UserContext, { User } from './src/components/UserContext';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClassRoom"
            component={ClassRoomScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
