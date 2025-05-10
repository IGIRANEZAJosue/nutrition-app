import { View } from 'react-native';

interface ProgressBarProps {
  progressPercent: number;
  colorClass: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercent, colorClass }) => {
  return (
    <View className="my-2 h-2.5 w-full rounded-full bg-gray-200">
      <View
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${progressPercent}%` }}
      />
    </View>
  );
};

export default ProgressBar;
