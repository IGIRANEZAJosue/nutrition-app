import React from 'react';
import { Image, Text, View } from 'react-native';

const signup = () => {
  return (
    <View className="flex-1 items-center bg-primaryDark">
      <Text className="text-center font-geistBold text-4xl text-white">Signup</Text>
      <Image className="my-16 h-24" resizeMode="contain" source={require('../assets/logo.png')} />
    </View>
  );
};

export default signup;
