import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressBarProps {
  size?: number;
  progress?: number;
  color?: string;
}

export default function CircularProgressBar({
  size = 120,
  progress = 0,
  color = '#2ecc71',
}: CircularProgressBarProps) {
  const strokeWidth = 10;

  const calculations = useMemo(() => {
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress / 100);
    const rotationTransform = `rotate(-90 ${size / 2} ${size / 2})`;

    return {
      radius,
      circumference,
      strokeDashoffset,
      rotationTransform,
    };
  }, [size, progress, strokeWidth]);

  const { radius, circumference, strokeDashoffset, rotationTransform } = calculations;

  return (
    <View className="relative flex items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#e6e6e6"
          fill="transparent"
        />

        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={rotationTransform} // Makes the circle start from the top and go in clockwise direction
        />
      </Svg>

      {/* Percentage Text */}
      <View className="absolute inset-0 flex items-center justify-center">
        <Text className="font-geistBold text-lg">{Math.round(progress)}%</Text>
      </View>
    </View>
  );
}
