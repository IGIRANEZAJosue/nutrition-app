import { router } from 'expo-router';
import { ChevronRight, LogOut, PenSquare } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { Container } from '~/components/Container';
import ProfileStatCard from '~/components/cards/ProfileStatCard';
import { useAuth } from '~/context/AuthContext';

export default function Profile() {
  const { user, signout } = useAuth();

  async function handleLogout() {
    await signout();
  }

  // Placeholder data from the image
  const profileData = {
    name: user?.name || 'John Doe',
    membership: 'Premium Member',
    avatarUrl: 'https://avatars.githubusercontent.com/u/88510074?v=4',
    height: user?.prefs?.height || '165 cm',
    weight: user?.prefs?.weight || '58 kg',
    age: user?.prefs?.age || '28',
    fitnessLevel: user?.prefs?.fitnessLevel || 'Intermediate',
  };

  const settingsItems = [
    { id: '1', icon: '⚙️', label: 'Account Settings', screen: '/account-settings' },
    { id: '2', icon: '🔔', label: 'Notifications', screen: '/notifications' },
    { id: '3', icon: '🔒', label: 'Privacy', screen: '/privacy' },
    { id: '4', icon: '❓', label: 'Help & Support', screen: '/help-support' },
    { id: '5', icon: 'ℹ️', label: 'About', screen: '/about' },
  ];

  return (
    <Container page="profile">
      <View className="mb-6 items-center pt-8">
        <Image
          source={require('~/assets/avatar.png')}
          className="mb-4 h-28 w-28 rounded-full border-2 border-gray-200"
          accessibilityLabel="Profile picture"
          onError={(e) => console.log('Error loading profile image:', e.nativeEvent.error)}
          defaultSource={require('~/assets/logo.png')}
        />
        <View className="flex-row items-center gap-2">
          <Text className="font-geistBold text-2xl text-gray-800">{profileData.name}</Text>
          <TouchableOpacity onPress={() => router.push('/modal')}>
            <PenSquare color="gray" />
          </TouchableOpacity>
        </View>
        <Text className="mt-2 font-geistMedium text-sm">{profileData.fitnessLevel}</Text>
      </View>

      {/* Stats Section */}
      <View className="mb-6 flex-row flex-wrap justify-between">
        <ProfileStatCard icon="📏" label="Height" value={profileData.height} />
        <ProfileStatCard icon="⚖️" label="Weight" value={profileData.weight} />
        <ProfileStatCard icon="🧠" label="Age" value={profileData.age} />
        <ProfileStatCard icon="🏃" label="Fitness Level" value={profileData.fitnessLevel} />
      </View>

      {/* Settings List */}
      <View className="mb-6">
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-200 p-4"
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => {
              // router.push(item.screen); // Uncomment to enable navigation
              console.log('Navigate to', item.label);
            }}>
            <View className="flex-row items-center">
              <Text className="mr-3 text-xl">{item.icon}</Text>
              <Text className="font-geistRegular text-base text-gray-800">{item.label}</Text>
            </View>
            <ChevronRight color="gray" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Log Out Button */}

      <TouchableOpacity
        onPress={handleLogout}
        className="mb-8 mt-2 flex-row items-center justify-center gap-2 rounded-lg bg-red-50 p-4"
        accessibilityRole="button"
        accessibilityLabel="Log Out">
        <LogOut color="red" />
        <Text className="text-center font-geistMedium text-base text-red-500">Log Out</Text>
      </TouchableOpacity>
    </Container>
  );
}
