import React from 'react';
import { Text, View } from 'react-native';

import CircularProgressBar from '~/components/CircularProgressBar';
import { Container } from '~/components/Container';
import MetricCard from '~/components/cards/MetricCard';
import RingProgress from '~/components/ui/RingProgress';
import { useAuth } from '~/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <Container page="home">
      <View className="my-4 gap-4">
        <View>
          <Text className="font-geistMedium text-2xl text-gray-600">Hello,</Text>
          <Text className="font-geistSemiBold text-3xl">{user ? user.name : 'Friend'}</Text>
        </View>
        <View className="my-6 gap-4">
          <RingProgress progress={0.7} radius={100} color="#10C875" />
          <Text className="text-center font-geistMedium text-lg text-gray-600">
            You've burned 1000 calories today
          </Text>
        </View>

        {/* Health Stats Cards  */}
        <View className="mb-6 flex-row flex-wrap justify-between">
          <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-2 text-red-500">❤️</Text>
              <Text className="font-geistRegular text-sm text-gray-600">Heart Rate</Text>
            </View>
            <Text className="font-geistSemiBold text-xl">72 BPM</Text>
          </View>

          <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-2">🛏️</Text>
              <Text className="font-geistRegular text-sm text-gray-600">Sleep</Text>
            </View>
            <Text className="font-geistSemiBold text-xl">7h 23m</Text>
          </View>

          <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-2">🔥</Text>
              <Text className="font-geistRegular text-sm text-gray-600">Calories</Text>
            </View>
            <Text className="font-geistSemiBold text-xl">847 kcal</Text>
          </View>

          <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-2">🏃</Text>
              <Text className="font-geistRegular text-sm text-gray-600">Activity</Text>
            </View>
            <Text className="font-geistSemiBold text-xl">42 min</Text>
          </View>
        </View>

        <MetricCard title="sleep" value={6.5} target={8} percentage={80} />
        <MetricCard title="steps" value={5000} target={7500} percentage={50} />
        <CircularProgressBar />
      </View>
    </Container>
  );
}
