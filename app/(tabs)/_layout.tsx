import { FontAwesome } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Text>Hello</Text>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
