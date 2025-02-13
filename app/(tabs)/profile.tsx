import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View>
        <Text>Profile</Text>
      </View>
    </>
  );
}
