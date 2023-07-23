import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import LoginScreen from './src/screens/UserAuth/LoginScreen';
import RegistrationScreen from './src/screens/UserAuth/RegistrationScreen';
import UserContext, { User } from './src/components/UserContext';
import BottomNavBar from './src/screens/Navigation/NavigationBar';
import CreatedRoomScreen from './src/screens/Navigation/ClassRoomScreens/CreatedRoomScreen';
import JoinedRoomScreen from './src/screens/Navigation/ClassRoomScreens/JoinedRoomScreen';
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
            name="bottomNavBar"
            component={BottomNavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatedRoomScreen"
            component={CreatedRoomScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="JoinedRoomScreen"
            component={JoinedRoomScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
