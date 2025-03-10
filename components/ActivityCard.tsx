import { Footprints } from 'lucide-react-native';
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
    <View className="w-full flex-row items-center justify-between rounded-2xl border border-gray-300 bg-white p-4">
      <View className="gap-4">
        <View className="flex-row items-center gap-3">
          <View className="size-12 items-center justify-center rounded-full bg-primaryLight">
            <Footprints size={20} color="black" />
          </View>
          <Text className="font-geistMedium text-xl capitalize">{title}</Text>
        </View>
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
