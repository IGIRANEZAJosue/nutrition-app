import { router } from 'expo-router';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => router.push('/login') },
    ]);
  }

  return (
    <SafeAreaView className="flex-1 p-6">
      <Text className="text-center font-geistBold text-4xl text-primaryDark">Profile</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="rounded-lg bg-primary p-4"
        accessibilityRole="button"
        accessibilityLabel="Logout from your account">
        <Text className="text-center font-geistMedium text-base text-white">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
