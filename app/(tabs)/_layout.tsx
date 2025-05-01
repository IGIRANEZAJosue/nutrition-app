import { Redirect, Tabs } from 'expo-router';
import { HeartPulse, House, Lightbulb, UserRound } from 'lucide-react-native';

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
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => <Lightbulb size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <HeartPulse size={24} color={color} />,
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
