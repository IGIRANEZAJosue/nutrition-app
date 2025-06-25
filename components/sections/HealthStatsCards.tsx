import React from 'react';
import { View, Text } from 'react-native';

const HealthStatsCards = () => {
  return (
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
  );
};

export default HealthStatsCards;
