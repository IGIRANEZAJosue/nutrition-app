import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Progress = () => {
  return (
    <SafeAreaView className="flex-1 p-5">
      <Text className="text-center font-geistBold text-3xl text-primaryDark">Progress</Text>
    </SafeAreaView>
  );
};

export default Progress;
