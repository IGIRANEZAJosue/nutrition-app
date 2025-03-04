import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '~/components/Header';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 p-5">
      <Header />
      <Text className="text-center font-geistBold text-3xl text-primaryDark">Home</Text>
    </SafeAreaView>
  );
}
