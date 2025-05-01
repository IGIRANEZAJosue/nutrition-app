import { router } from 'expo-router';
import { Alert, Text, TouchableOpacity } from 'react-native';

import { Container } from '~/components/Container';

export default function Profile() {
  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.replace('/login') },
    ]);
  }

  return (
    <Container page="profile">
      <Text className="text-center font-geistBold text-4xl text-primaryDark">Profile</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="rounded-lg bg-primary p-4"
        accessibilityRole="button"
        accessibilityLabel="Logout from your account">
        <Text className="text-center font-geistMedium text-base text-white">Logout</Text>
      </TouchableOpacity>
    </Container>
  );
}
