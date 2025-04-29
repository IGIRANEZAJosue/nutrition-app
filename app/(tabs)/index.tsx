import { Text, View } from 'react-native';

import ActivityCard from '~/components/ActivityCard';
import CircularProgressBar from '~/components/CircularProgressBar';
import { Container } from '~/components/Container';

export default function Home() {
  return (
    <Container>
      <View className="my-4 gap-4">
        <View>
          <Text className="font-geistMedium text-2xl text-gray-600">Hello,</Text>
          <Text className="font-geistSemiBold text-3xl">Josue Igiraneza</Text>
        </View>
        <ActivityCard title="sleep" value={6.5} target={8} percentage={80} />
        <ActivityCard title="steps" value={5000} target={7500} percentage={50} />
        <CircularProgressBar />
      </View>
    </Container>
  );
}
