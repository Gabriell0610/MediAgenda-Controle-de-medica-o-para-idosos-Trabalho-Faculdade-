import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

type IoniconName = keyof typeof Ionicons.glyphMap;

export type MainTabParamList = {
  Home: undefined;
  Meds: undefined;
  Exams: undefined;
  Profile: undefined;
};

interface PlaceholderScreenProps {
  title: string;
}

const tabIcons: Record<
  keyof MainTabParamList,
  {
    active: IoniconName;
    inactive: IoniconName;
  }
> = {
  Home: {
    active: 'home',
    inactive: 'home-outline',
  },
  Meds: {
    active: 'medkit',
    inactive: 'medkit-outline',
  },
  Exams: {
    active: 'calendar',
    inactive: 'calendar-outline',
  },
  Profile: {
    active: 'person',
    inactive: 'person-outline',
  },
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  );
};

const MedsScreen: React.FC = () => {
  return <PlaceholderScreen title="Em breve" />;
};

const ExamsScreen: React.FC = () => {
  return <PlaceholderScreen title="Em breve" />;
};

const ProfileScreen: React.FC = () => {
  return <PlaceholderScreen title="Em breve" />;
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          const icon = tabIcons[route.name];
          const iconName = focused ? icon.active : icon.inactive;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ title: 'Início' }}
      />
      <Tab.Screen name="Meds" component={MedsScreen} options={{ title: 'Remédios' }} />
      <Tab.Screen name="Exams" component={ExamsScreen} options={{ title: 'Exames' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 0.5,
    height: 60,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 11,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default TabNavigator;
