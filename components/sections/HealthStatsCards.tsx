import React from 'react';
import { View, Text } from 'react-native';
import useBiomarkers from '~/hooks/useBiomarkers';

const HealthStatsCards = () => {
  const { data: biomarkers } = useBiomarkers();

  // Helper function to find biomarker value by type
  const getBiomarkerValue = (type: string) => {
    const biomarker = biomarkers.find((item) => item.type === type);
    return biomarker ? parseFloat(biomarker.value) : null;
  };

  // Helper function to format time duration
  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  // Helper function to format activity duration
  const formatActivityDuration = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    return `${Math.round(minutes)} min`;
  };

  // Get biomarker values
  const heartRate = getBiomarkerValue('heart_rate') || getBiomarkerValue('resting_heart_rate');
  const sleepDuration = getBiomarkerValue('sleep_duration');
  const activeEnergyBurned = getBiomarkerValue('active_energy_burned');
  const totalEnergyBurned = getBiomarkerValue('total_energy_burned');
  const activeDuration = getBiomarkerValue('active_duration');

  // Calculate calories (prefer active energy, fallback to total energy)
  const calories = activeEnergyBurned || totalEnergyBurned;

  return (
    <View className="mb-6 flex-row flex-wrap justify-between">
      <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
        <View className="mb-2 flex-row items-center">
          <Text className="mr-2 text-red-500">❤️</Text>
          <Text className="font-geistRegular text-sm text-gray-600">Heart Rate</Text>
        </View>
        <Text className="font-geistSemiBold text-xl">
          {heartRate ? `${Math.round(heartRate)} BPM` : 'N/A'}
        </Text>
      </View>

      <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
        <View className="mb-2 flex-row items-center">
          <Text className="mr-2">🛏️</Text>
          <Text className="font-geistRegular text-sm text-gray-600">Sleep</Text>
        </View>
        <Text className="font-geistSemiBold text-xl">{formatDuration(sleepDuration)}</Text>
      </View>

      <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
        <View className="mb-2 flex-row items-center">
          <Text className="mr-2">🔥</Text>
          <Text className="font-geistRegular text-sm text-gray-600">Active Calories</Text>
        </View>
        <Text className="font-geistSemiBold text-xl">
          {calories ? `${Math.round(calories)} kcal` : 'N/A'}
        </Text>
      </View>

      <View className="mb-4 w-[48%] rounded-xl border border-gray-200 bg-[#F8F9FA] p-4">
        <View className="mb-2 flex-row items-center">
          <Text className="mr-2">🏃</Text>
          <Text className="font-geistRegular text-sm text-gray-600">Activity</Text>
        </View>
        <Text className="font-geistSemiBold text-xl">{formatActivityDuration(activeDuration)}</Text>
      </View>
    </View>
  );
};

export default HealthStatsCards;
