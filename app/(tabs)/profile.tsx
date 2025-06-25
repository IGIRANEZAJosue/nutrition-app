import { router } from 'expo-router';
import { ChevronRight, LogOut, PenSquare } from 'lucide-react-native';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import ProfileStatCard from '~/components/cards/ProfileStatCard';
import { useAuth } from '~/context/AuthContext';

export default function Profile() {
  const { user, signout, refreshUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      await refreshUser();
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    await signout();
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshUser();
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const error = !user ? 'User data not available' : null;

  // Profile data from /auth/me endpoint
  const profileData = {
    name: user?.first_name && user?.last_name 
      ? `${user.first_name} ${user.last_name}`
      : user?.first_name || user?.name || user?.username || 'User',
    membership: 'Premium Member',
    avatarUrl: user?.profile?.avatar_url || 'https://avatars.githubusercontent.com/u/88510074?v=4',
    height: user?.profile?.height_cm ? `${user.profile.height_cm} cm` : 'N/A',
    weight: user?.profile?.weight_kg ? `${user.profile.weight_kg} kg` : 'N/A',
    age: user?.profile?.age ? `${user.profile.age} years` : 'N/A',
    fitnessLevel: user?.profile?.fitness_level || user?.profile?.activity_level || 'N/A',
    gender: user?.profile?.gender || 'N/A',
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
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" />
            <Text className="mt-4 font-geistMedium text-gray-600">Loading profile...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-red-500 font-geistMedium">{error}</Text>
            <TouchableOpacity 
              onPress={loadUserData}
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
            >
              <Text className="text-white font-geistMedium">Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
              <Text className="mt-2 font-geistMedium text-sm text-gray-600">{profileData.fitnessLevel}</Text>
            </View>

            {/* Stats Section */}
            <View className="mb-6 flex-row flex-wrap justify-between">
              <ProfileStatCard icon="📏" label="Height" value={profileData.height} />
              <ProfileStatCard icon="⚖️" label="Weight" value={profileData.weight} />
              <ProfileStatCard icon="🎂" label="Age" value={profileData.age} />
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
              className="mt-2 flex-row items-center justify-center gap-2 rounded-lg bg-red-50 p-4"
              accessibilityRole="button"
              accessibilityLabel="Log Out">
              <LogOut color="red" />
              <Text className="text-center font-geistMedium text-base text-red-500">Log Out</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </Container>
  );
}
