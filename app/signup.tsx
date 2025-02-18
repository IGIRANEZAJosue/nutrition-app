import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const signup = () => {
  return (
    <SafeAreaView className="flex-1 bg-primaryDark">
      <Text className="text-center font-geistBold text-4xl text-white">Signup</Text>
    </SafeAreaView>
  );
};

export default signup;
