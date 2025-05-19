import React from 'react';
import { Text, View } from 'react-native';

import CircularProgressBar from '~/components/CircularProgressBar';
import { Container } from '~/components/Container';
import MetricCard from '~/components/cards/MetricCard';
import HealthStatsCards from '~/components/sections/HealthStatsCards';
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
          <Text className="text-center font-geistRegular text-lg ">
            You've burned 1000 calories today
          </Text>
        </View>

        {/* Health Stats Cards  */}
        <HealthStatsCards />

        <MetricCard title="sleep" value={6.5} target={8} percentage={80} />
        <MetricCard title="steps" value={5000} target={7500} percentage={50} />
        <CircularProgressBar />
      </View>
    </Container>
  );
}
