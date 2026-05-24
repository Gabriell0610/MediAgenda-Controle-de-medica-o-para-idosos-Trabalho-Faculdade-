import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';

export type RootStackParamList = {
  Landing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        {/* LoginScreen, DashboardScreen and future screens are registered in this stack. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
