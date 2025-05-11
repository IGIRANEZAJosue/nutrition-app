import { Text, View } from 'react-native';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
};

const ProfileStatCard = ({ icon, label, value }: StatCardProps) => (
  <View className="mb-4 w-[48%] rounded-xl border border-gray-300 p-3">
    <Text className="mb-1 font-geistRegular text-xs text-gray-500">
      {icon} {label}
    </Text>
    <Text className="font-geistSemiBold text-lg text-gray-800">{value}</Text>
  </View>
);

export default ProfileStatCard;
