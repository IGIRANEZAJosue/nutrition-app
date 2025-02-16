import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Login = () => {
  return (
    <View className="flex-1 bg-primaryDark">
      <Text className="text-white">Login</Text>
      <View className="min-h-1/2 absolute bottom-0 w-full rounded-t-3xl bg-white p-5">
        <Text className="font-geistSemiBold text-3xl text-primaryDark">Login</Text>
        <Text className="text-geistRegular my-2 text-base text-gray-500">
          Enter your email and password below to login to your account.
        </Text>
        <View className="my-4">
          <Text className="my-2 font-geistRegular font-semibold">E-mail</Text>
          <TextInput className="w-full rounded-lg border border-gray-300 bg-green-200/10 p-4" />
        </View>
        <View className="mb-4">
          <Text className="my-2 font-geistRegular font-semibold">Password</Text>
          <TextInput className="w-full rounded-lg border border-gray-300 bg-green-200/10 p-4" />
        </View>
      </View>
    </View>
  );
};

export default Login;
