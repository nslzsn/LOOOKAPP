import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import AiVibeScreen from './screens/AiVibeScreen';
import QrScreen from './screens/QrScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let icon;
            switch (route.name) {
              case 'Home': icon = 'home-outline'; break;
              case 'Explore': icon = 'search-outline'; break;
              case 'AI': icon = 'sparkles-outline'; break;
              case 'QR': icon = 'qr-code-outline'; break;
              case 'Profile': icon = 'person-outline'; break;
            }
            return <Ionicons name={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#7c1e1e',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('./assets/defaults/giris.jpg')} style={{ width: 28, height: 28, borderRadius: 8 }} />
          ),
        }} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="AI" component={AiVibeScreen} />
        <Tab.Screen name="QR" component={QrScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
