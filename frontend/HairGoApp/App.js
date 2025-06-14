import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './screen/Home';
import MapScreen from './screen/MapScreen';
import CalendarScreen from './screen/CalendarScreen';
import FavoritesScreen from './screen/FavoritesScreen';
import ProfileScreen from './screen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
