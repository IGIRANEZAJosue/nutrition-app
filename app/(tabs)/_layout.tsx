import { Redirect, Tabs } from 'expo-router';
import { HeartPulse, House, Lightbulb, UserRound } from 'lucide-react-native';
import React from 'react';

import { useAuth } from '~/context/AuthContext';

export default function TabLayout() {
  const { session } = useAuth();

  if (!session) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#22C55E',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,
          paddingBottom: 10,
          height: 70,
        },
        sceneStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <House size={24} color={color} fill={color} />
            ) : (
              <House size={24} color="gray" />
            ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Lightbulb size={24} color={color} fill={color} />
            ) : (
              <Lightbulb size={24} color="gray" />
            ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HeartPulse size={28} color="white" fill={color} />
            ) : (
              <HeartPulse size={24} color="gray" />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserRound size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
