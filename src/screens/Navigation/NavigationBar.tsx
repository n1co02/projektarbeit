import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons, AntDesign, Ionicons } from '@expo/vector-icons';
import HomeScreen from './NavBarScreens/HomeScreen';
import ClassRoomScreen from './NavBarScreens/ClassRoomScreen';
import ProfileScreen from './NavBarScreens/ProfileScreen';
const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ClassRoom"
        component={ClassRoomScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="laptop" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={30} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavBar;
