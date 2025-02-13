import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Login = () => {
  return (
    <View className="bg-primaryDark flex-1">
      <Text className="text-white">Login</Text>
      <View className="absolute bottom-0 h-1/2 w-full rounded-t-3xl bg-white p-5">
        <Text className="text-primaryDark font-geistSemiBold text-3xl">Login</Text>
        <Text className="text-geistRegular my-2 text-base text-gray-500">
          Enter your email and password below to login to your account.
        </Text>
        <View>
          <Text className="font-geistRegular font-semibold">E-mail</Text>
          <TextInput className="w-full border-2 bg-green-200 p-4" placeholder="m@example.com" />
        </View>
      </View>
    </View>
  );
};

export default Login;
