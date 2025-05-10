import { PersonStanding, Plus, Ruler } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import GoalCard from '~/components/cards/GoalCard';

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
  return (
    <Container page="progress">
      <View className="my-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-geistSemiBold text-xl">Your Goals</Text>
          <View className="size-8 items-center justify-center rounded-full bg-primary">
            <Plus color="white" size={16} />
          </View>
        </View>
        <View className="mt-4">
          {goalsData.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Progress;
