import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

import { Container } from '~/components/Container';
import { useAuth } from '~/context/AuthContext';

export default function Profile() {
  const { user, signout } = useAuth();

  async function handleLogout() {
    await signout();
  }

  return (
    <Container page="profile">
      <Text className="text-center font-geistBold text-4xl text-primaryDark">{user?.name}</Text>
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
