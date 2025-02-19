import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  return (
    <View className="flex-1 p-6">
      <Text className="text-center font-geistBold text-4xl text-primaryDark">Profile</Text>
      <TouchableOpacity
        onPress={() => router.push('/login')}
        className="rounded-lg bg-primary p-4 ">
        <Text className="font-geistMedium text-center text-base text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
