import { router } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, View } from 'react-native';

export default function Header() {
  return (
    <View className="flex w-full flex-row items-center justify-between rounded-full bg-[#D7E4DE]/60 px-4 py-3">
      <Pressable onPress={() => router.back()}>
        <ArrowLeft className="size-5 text-primaryDark" color="black" />
      </Pressable>
      <Image source={require('../assets/logo.png')} className="h-9" resizeMode="contain" />
      <Pressable>
        <Bell className="size-5 text-primaryDark" color="black" />
      </Pressable>
    </View>
  );
}
