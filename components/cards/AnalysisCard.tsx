import { View, Text } from 'react-native';

const AnalysisCard = ({
  icon,
  bgColor,
  title,
  description,
}: {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  description: string;
}) => (
  <View className="flex-row items-center gap-4 rounded-xl border border-gray-300 p-4">
    <View className={`size-12 items-center justify-center rounded-full ${bgColor}`}>{icon}</View>
    <View className="flex-1">
      <Text className="font-geistMedium text-base">{title}</Text>
      <Text className="font-geistRegular text-sm text-gray-700">{description}</Text>
    </View>
  </View>
);

export default AnalysisCard;
