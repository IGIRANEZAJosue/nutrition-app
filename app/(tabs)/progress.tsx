import { PersonStanding, Plus, Ruler } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { SahhaSensor } from 'sahha-react-native';

import { Container } from '~/components/Container';
import GoalCard from '~/components/cards/GoalCard';
import useSahhaStats from '~/hooks/useSahhaStats';
// import MyWebComponent from '~/components/webview';

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
  const { stats } = useSahhaStats(SahhaSensor.steps);

  console.log('stats', stats);

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
          <View className="mt-4 flex-row justify-between">
            <View>
              <Text className="text-gray-600">Carbs</Text>
              <Text className="font-geistSemiBold text-xl">180g</Text>
              <Text className="text-sm text-gray-500">of 250g</Text>
            </View>
            <View>
              <Text className="text-gray-600">Protein</Text>
              <Text className="font-geistSemiBold text-xl">75g</Text>
              <Text className="text-sm text-gray-500">of 90g</Text>
            </View>
            <View>
              <Text className="text-gray-600">Fat</Text>
              <Text className="font-geistSemiBold text-xl">45g</Text>
              <Text className="text-sm text-gray-500">of 65g</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <MyWebComponent /> */}
    </Container>
  );
};

export default Progress;
