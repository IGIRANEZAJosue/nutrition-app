import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '~/components/Header';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 p-5">
      <Header />
      <View className="my-4 gap-1">
        <Text className="font-geistMedium text-2xl text-gray-600">Hello,</Text>
        <Text className="font-geistSemiBold text-3xl">Josue Igiraneza</Text>

        <View className="my-4 w-full flex-row items-center justify-between rounded-2xl border border-gray-300 p-4">
          <View className="gap-4">
            <Text className="font-geistMedium text-xl">Sleep</Text>
            <Text className="font-geistBold text-2xl">6.5 hrs</Text>
            <Text className="font-geistRegular text-xl text-gray-400">/8hrs</Text>
          </View>
          <View className="size-28 items-center justify-center rounded-full border-8 border-primary">
            <Text>80%</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
