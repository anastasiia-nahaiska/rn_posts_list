import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
