import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActivityCard from '~/components/ActivityCard';
import CircularProgressBar from '~/components/CircularProgressBar';
import Header from '~/components/Header';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-5">
      <Header />
      <View className="my-4 gap-4">
        <View>
          <Text className="font-geistMedium text-2xl text-gray-600">Hello,</Text>
          <Text className="font-geistSemiBold text-3xl">Josue Igiraneza</Text>
        </View>
        <ActivityCard title="sleep" value={6.5} target={8} percentage={80} />
        <ActivityCard title="steps" value={5000} target={7500} percentage={50} />
        <CircularProgressBar />
      </View>
    </SafeAreaView>
  );
}
