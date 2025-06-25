import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { Container } from '~/components/Container';
import { useAuth, type UserPrefs } from '~/context/AuthContext';

export default function EditProfileModal() {
  const { user, updateUserPrefs, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Initialize form with current user data
  const [prefs, setPrefs] = useState<UserPrefs>({
    height: '',
    weight: '',
    age: '',
    fitnessLevel: '',
    gender: '',
    activity_level: '',
  });

  // Refresh user data when modal opens
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setInitializing(true);
    try {
      await refreshUser();
    } catch (error) {
      console.error('Failed to load user data:', error);
      Alert.alert('Error', 'Failed to load user data. Please try again.');
    } finally {
      setInitializing(false);
    }
  };

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setPrefs({
        height: user?.profile?.height_cm ? `${user.profile.height_cm}` : '',
        weight: user?.profile?.weight_kg ? `${user.profile.weight_kg}` : '',
        age: user?.profile?.age ? `${user.profile.age}` : '',
        fitnessLevel: user?.profile?.fitness_level || '',
        gender: user?.profile?.gender || '',
        activity_level: user?.profile?.activity_level || '',
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    if (prefs.height && !prefs.height.match(/^\d+(\.\d+)?$/)) {
      Alert.alert('Invalid Height', 'Please enter height as a number (e.g., 175)');
      return false;
    }
    if (prefs.weight && !prefs.weight.match(/^\d+(\.\d+)?$/)) {
      Alert.alert('Invalid Weight', 'Please enter weight as a number (e.g., 70)');
      return false;
    }
    if (prefs.age && !prefs.age.match(/^\d+$/)) {
      Alert.alert('Invalid Age', 'Please enter a valid age (numbers only)');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await updateUserPrefs(prefs);
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (initializing) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center pt-12">
          <ActivityIndicator size="large" />
          <Text className="mt-4 font-geistMedium text-gray-600">Loading profile data...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="flex-1 pt-12">
        <Text className="mb-6 text-center font-geistBold text-2xl text-gray-800">Edit Profile</Text>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Height (cm)</Text>
          <TextInput
            className="rounded-xl border border-gray-300 bg-white p-4 font-geistRegular text-base"
            placeholder="e.g., 175"
            value={prefs.height}
            onChangeText={(text) => setPrefs({ ...prefs, height: text })}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Weight (kg)</Text>
          <TextInput
            className="rounded-xl border border-gray-300 bg-white p-4 font-geistRegular text-base"
            placeholder="e.g., 70"
            value={prefs.weight}
            onChangeText={(text) => setPrefs({ ...prefs, weight: text })}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Age</Text>
          <TextInput
            className="rounded-xl border border-gray-300 bg-white p-4 font-geistRegular text-base"
            placeholder="e.g., 28"
            value={prefs.age}
            onChangeText={(text) => setPrefs({ ...prefs, age: text })}
            keyboardType="numeric"
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Gender</Text>
          <View className="rounded-xl border border-gray-300 bg-white">
            <Picker
              selectedValue={prefs.gender}
              onValueChange={(value) => setPrefs({ ...prefs, gender: value })}
              className="font-geistRegular text-base">
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Activity Level</Text>
          <View className="rounded-xl border border-gray-300 bg-white">
            <Picker
              selectedValue={prefs.activity_level}
              onValueChange={(value) => setPrefs({ ...prefs, activity_level: value })}
              className="font-geistRegular text-base">
              <Picker.Item label="Select Activity Level" value="" />
              <Picker.Item label="Sedentary" value="sedentary" />
              <Picker.Item label="Lightly Active" value="lightly_active" />
              <Picker.Item label="Moderately Active" value="moderately_active" />
              <Picker.Item label="Very Active" value="very_active" />
            </Picker>
          </View>
        </View>

        <View className="mb-6">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Fitness Level</Text>
          <View className="rounded-xl border border-gray-300 bg-white">
            <Picker
              selectedValue={prefs.fitnessLevel}
              onValueChange={(value) => setPrefs({ ...prefs, fitnessLevel: value })}
              className="font-geistRegular text-base">
              <Picker.Item label="Select Fitness Level" value="" />
              <Picker.Item label="Beginner" value="beginner" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Advanced" value="advanced" />
            </Picker>
          </View>
        </View>

        <View className="mt-4 flex-row justify-end gap-x-4">
          <TouchableOpacity 
            onPress={handleCancel} 
            disabled={loading}
            className="rounded-xl bg-gray-200 px-6 py-3">
            <Text className="font-geistMedium text-base text-gray-800">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSave} 
            disabled={loading}
            className="rounded-xl bg-blue-500 px-6 py-3 flex-row items-center">
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : null}
            <Text className="font-geistMedium text-base text-white ml-2">
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
