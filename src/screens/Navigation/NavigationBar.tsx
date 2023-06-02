import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Ionicons } from '@expo/vector-icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BottomNavBar = () => {
  const navigation = useNavigation();

  return (
    <Animatable.View animation="fadeInLeft" style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Home' as never)}
      >
        <Octicons name="home" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('ClassRoom' as never)}
      >
        <AntDesign name="laptop" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile' as never)}
      >
        <Ionicons name="person-outline" size={30} color="black" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderTopWidth: 2.5,
    borderTopColor: '#d9d9d9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavBar;
