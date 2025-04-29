import { Link, router } from 'expo-router';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';

interface HeaderProps {
  goBack?: boolean;
  page: string;
}

const Header = ({ goBack, page }: HeaderProps) => {
  return (
    <View className="shadow-xs flex flex-row items-center justify-between rounded-full bg-primary/10 p-4">
      {goBack ? (
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </Pressable>
      ) : (
        <View className="size-6" />
      )}

      {page === 'home' ? (
        <Image source={require('../assets/logo.png')} className="h-9" resizeMode="contain" />
      ) : (
        <Text className="font-geistSemiBold text-2xl capitalize text-primaryDark">{page}</Text>
      )}

      <Link href="/notifications" asChild>
        <Pressable>
          <Bell size={24} />
        </Pressable>
      </Link>
    </View>
  );
};

export default Header;
