import { Text, View } from 'react-native';

import ProgressBar from '../ui/ProgressBar';

interface GoalCardProps {
  goal: GoalData;
}

interface GoalData {
  id: string;
  title: string;
  currentValue: string;
  targetValue: string;
  progressPercent: number;
  IconComponent: React.ElementType;
  iconColor: string;
  iconBgClass: string;
  progressBarColorClass: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const {
    title,
    currentValue,
    targetValue,
    progressPercent,
    IconComponent,
    iconColor,
    iconBgClass,
    progressBarColorClass,
  } = goal;

  return (
    <View className="my-2 rounded-xl border border-gray-300 bg-white p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className={`mr-3 size-10 items-center justify-center rounded-full ${iconBgClass}`}>
            <IconComponent color={iconColor} size={20} />
          </View>
          <Text className="font-geistMedium text-base text-gray-800">{title}</Text>
        </View>
        <Text className="font-geistRegular text-sm text-gray-600">
          {currentValue} / {targetValue}
        </Text>
      </View>

      <ProgressBar progressPercent={progressPercent} colorClass={progressBarColorClass} />

      <Text className="font-geistRegular text-sm text-gray-500">Progress: {progressPercent}%</Text>
    </View>
  );
};

export default GoalCard;
