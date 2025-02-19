import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Login = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-primaryDark">
      <Image source={require('../assets/logo.png')} className="my-16 h-28" resizeMode="contain" />
      <View className="min-h-1/2 absolute bottom-0 w-full rounded-t-3xl bg-white p-4">
        <Text className="font-geistSemiBold text-3xl text-primaryDark">Login</Text>
        <Text className="text-geistRegular my-2 text-base text-gray-500">
          Enter your email and password below to login to your account.
        </Text>
        <View className="my-4">
          <Text className="my-2 font-geistRegular font-semibold">E-mail</Text>
          <TextInput className="w-full rounded-lg border border-gray-200 p-4" />
        </View>
        <View className="mb-4">
          <Text className="my-2 font-geistRegular font-semibold">Password</Text>
          <TextInput className="w-full rounded-lg border border-gray-200 p-4" secureTextEntry />
        </View>
        <View className="my-4 gap-4">
          <TouchableOpacity className="rounded-lg bg-primary p-4">
            <Text className="font-geistMedium text-center text-base text-white">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-lg border border-gray-200 bg-transparent p-4">
            <Text className="font-geistMedium text-center text-base">Login with Google </Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-12 mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Text onPress={() => router.push('/signup')} className="text-primary">
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
