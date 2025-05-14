import { Link, router } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import BellDot from '~/assets/BellDot';

interface HeaderProps {
  goBack?: boolean;
  page: string;
}

const notifications = [
  {
    id: 1,
    title: 'New message',
    message: 'You have a new message',
  },
  {
    id: 2,
    title: 'New message',
    message: 'You have a new message',
  },
];

const Header = ({ goBack, page }: HeaderProps) => {
  return (
    <View className="shadow-xs flex flex-row items-center justify-between rounded-full bg-primary/10 px-4 py-4">
      {goBack ? (
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      ) : (
        <View className="size-6" />
      )}

      {page === 'home' ? (
        <Image
          source={require('../assets/logo.png')}
          className="h-9"
          style={{ height: 36 }}
          resizeMode="contain"
        />
      ) : (
        <Text className="font-geistSemiBold text-2xl capitalize text-primaryDark">{page}</Text>
      )}

      <Link href="/notifications" asChild>
        <Pressable>{notifications.length > 0 ? <BellDot /> : <Bell />}</Pressable>
      </Link>
    </View>
  );
};

export default Header;
