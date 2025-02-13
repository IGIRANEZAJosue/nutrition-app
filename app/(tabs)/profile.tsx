import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Profile() {
  return (
    <>
      <View>
        <Text>Profile</Text>
        <Link href="/login">Logout</Link>
      </View>
    </>
  );
}
