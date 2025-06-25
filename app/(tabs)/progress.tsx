import { PersonStanding, Plus, Ruler } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { SahhaSensor } from 'sahha-react-native';

import { Container } from '~/components/Container';
import GoalCard from '~/components/cards/GoalCard';
import useSahhaStats from '~/hooks/useSahhaStats';
import { getNutritionTrends } from '~/utils/api';

const goalsData = [
  {
    id: '1',
    title: 'Weight Loss',
    currentValue: '58 kg',
    targetValue: '53 kg',
    progressPercent: 60,
    IconComponent: Ruler,
    iconColor: 'white',
    iconBgClass: 'bg-green-500',
    progressBarColorClass: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Running Distance',
    currentValue: '2.3 km',
    targetValue: '5 km',
    progressPercent: 46,
    IconComponent: PersonStanding,
    iconColor: 'white',
    iconBgClass: 'bg-blue-500',
    progressBarColorClass: 'bg-blue-500',
  },
];

const Progress = () => {
  const { stats } = useSahhaStats();
  const [trends, setTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('stats', stats);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNutritionTrends(7);
        setTrends(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load nutrition trends');
      }
      setLoading(false);
    };
    fetchTrends();
  }, []);

  return (
    <Container page="progress">
      <View className="my-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-geistSemiBold text-xl">Your Goals</Text>
          <View className="size-8 items-center justify-center rounded-full bg-primary">
            <Plus color="white" size={16} />
          </View>
        </View>

        <Text>{stats}</Text>

        <View className="mt-4">
          {goalsData.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>

        {/* Nutrition Stats */}
        <View className="mb-6 mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <Text className="font-geistSemiBold text-lg">Nutrition</Text>
          {loading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text className="text-red-500">{error}</Text>
          ) : trends ? (
            <View className="mt-4 flex-row justify-between">
              <View>
                <Text className="text-gray-600">Carbs</Text>
                <Text className="font-geistSemiBold text-xl">{trends.nutrient_averages?.carbs ? `${trends.nutrient_averages.carbs}g` : 'N/A'}</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
              <View>
                <Text className="text-gray-600">Protein</Text>
                <Text className="font-geistSemiBold text-xl">{trends.nutrient_averages?.protein ? `${trends.nutrient_averages.protein}g` : 'N/A'}</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
              <View>
                <Text className="text-gray-600">Fat</Text>
                <Text className="font-geistSemiBold text-xl">{trends.nutrient_averages?.fat ? `${trends.nutrient_averages.fat}g` : 'N/A'}</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Container>
  );
};

export default Progress;
