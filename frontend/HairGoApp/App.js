import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screen/Home';
import MapScreen from './screen/MapScreen';
import CalendarScreen from './screen/CalendarScreen';
import FavoritesScreen from './screen/FavoritesScreen';
import ProfileScreen from './screen/ProfileScreen';
import Login from './screen/Login';
import Signup from './screen/Signup';
import Formulaire from './screen/Formulaire';
import { AuthProvider, useAuth } from './context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Formulaire" component={Formulaire} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Accueil':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Carte':
            iconName = focused ? 'location' : 'location-outline';
            break;
          case 'Calendrier':
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case 'Favoris':
            iconName = focused ? 'bookmark' : 'bookmark-outline';
            break;
          case 'Profil':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'home-outline';
        }

        return <Icon name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: '#FD3C4A',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Accueil" component={Home} />
    <Tab.Screen name="Carte" component={MapScreen} />
    <Tab.Screen name="Calendrier" component={CalendarScreen} />
    <Tab.Screen name="Favoris" component={FavoritesScreen} />
    <Tab.Screen name="Profil" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Tab" 
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </NavigationContainer>
  );
}

function AppWithAuth() {
  const { loading, user } = useAuth();

  if (loading) {
    return null;
  }

  // Add a console log to verify auth state
  console.log('Auth state:', { loading, user });

  return user ? <AppStack /> : <AuthStack />;
}
