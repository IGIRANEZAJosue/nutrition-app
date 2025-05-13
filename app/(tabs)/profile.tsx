import { ChevronRight, LogOut } from 'lucide-react-native';
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
    name: user?.name || 'Sarah Anderson',
    membership: 'Premium Member',
    avatarUrl: 'https://avatars.githubusercontent.com/u/88510074?v=4',
    height: '165 cm',
    weight: '58 kg',
    age: '28',
    fitnessLevel: 'Intermediate',
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
      <View className="mb-4 items-center pb-6 pt-8">
        <Image
          source={{ uri: profileData.avatarUrl }}
          className="mb-4 h-28 w-28 rounded-full border-2 border-gray-200"
          accessibilityLabel="Profile picture"
          onError={(e) => console.log('Error loading profile image:', e.nativeEvent.error)}
          defaultSource={require('~/assets/logo.png')}
        />
        <Text className="font-geistBold text-2xl text-gray-800">{profileData.name}</Text>
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
            className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-300 p-4"
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
        className="mt-2 flex-row items-center justify-center space-x-2 rounded-lg bg-red-50 p-4"
        accessibilityRole="button"
        accessibilityLabel="Log Out">
        <LogOut color="red" />
        <Text className="text-center font-geistMedium text-base text-red-500">Log Out</Text>
      </TouchableOpacity>
    </Container>
  );
}
