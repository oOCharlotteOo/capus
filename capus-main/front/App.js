import * as React from 'react';
import {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ChallengeScreen from './src/screens/ChallengeScreen';
import {tailwind} from './tailwind';
import {UserContext} from './userContext';
import BookmarksScreen from './src/screens/BookmarksScreen';
import RewardsScreen from './src/screens/RewardsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      animationEnabled: false,
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Challenge" component={ChallengeScreen} />
  </Stack.Navigator>
);

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          ...tailwind('h-14'),
          backgroundColor: '#f9f9fb',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./src/assets/images/icons/home-focus.png')
              : require('./src/assets/images/icons/home-regular.png');

            return (
              <Image
                style={{
                  ...tailwind('h-8'),
                  aspectRatio: focused ? 512 / 451 : 256 / 342,
                }}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./src/assets/images/icons/bookmarks-focus.png')
              : require('./src/assets/images/icons/bookmarks-regular.png');

            return (
              <Image
                style={{
                  ...tailwind('h-8'),
                  aspectRatio: focused ? 512 / 451 : 146 / 130,
                }}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./src/assets/images/icons/trophy-focus.png')
              : require('./src/assets/images/icons/trophy-regular.png');

            return (
              <Image
                style={{
                  ...tailwind('h-8'),
                  aspectRatio: focused ? 251 / 221 : 256 / 342,
                }}
                source={icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./src/assets/images/icons/user-focus.png')
              : require('./src/assets/images/icons/user-regular.png');

            return (
              <Image
                style={{
                  ...tailwind('h-8'),
                  aspectRatio: focused ? 251 / 221 : 256 / 342,
                }}
                source={icon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const getUser = () => ({
  loggedIn: false,
});

export default function App() {
  const [user, setUser] = useState(null);
  const value = {user, setUser};

  return (
    <UserContext.Provider value={value}>
      <NavigationContainer>
        <BottomTabsNavigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
