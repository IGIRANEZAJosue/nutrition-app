import React from 'react';
import { Text, View } from 'react-native';

interface ActivityCardProps {
  title: string;
  value: number;
  target: number;
  percentage: number;
}

const ActivityCard = ({ title, value, target, percentage }: ActivityCardProps) => {
  return (
    <View className="my-4 w-full flex-row items-center justify-between rounded-2xl border border-gray-300 bg-white p-4">
      <View className="gap-4">
        <Text className="font-geistMedium text-xl capitalize">{title}</Text>
        <Text className="font-geistBold text-3xl">{value}</Text>
        <Text className="font-geistRegular text-xl text-gray-400">/{target}</Text>
      </View>
      <View className="size-28 items-center justify-center rounded-full border-8 border-primary">
        <Text>{percentage}%</Text>
      </View>
    </View>
  );
};

export default ActivityCard;
