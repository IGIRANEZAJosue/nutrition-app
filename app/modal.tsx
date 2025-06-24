import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Container } from '~/components/Container';
import { useAuth, type UserPrefs } from '~/context/AuthContext';

export default function EditProfileModal() {
  const { user, updateUserPrefs } = useAuth();

  const [prefs, setPrefs] = useState<UserPrefs>({
    height: user?.prefs?.height || '',
    weight: user?.prefs?.weight || '',
    age: user?.prefs?.age || '',
    fitnessLevel: user?.prefs?.fitnessLevel || '',
  });

  const handleSave = async () => {
    await updateUserPrefs(prefs);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Container>
      <View className="flex-1 pt-12">
        <Text className="mb-6 text-center font-geistBold text-2xl text-gray-800">Edit Profile</Text>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Height</Text>
          <TextInput
            className="rounded-xl border border-gray-300 bg-white p-4 font-geistRegular text-base"
            placeholder="e.g., 165 cm"
            value={prefs.height}
            onChangeText={(text) => setPrefs({ ...prefs, height: text })}
          />
        </View>

        <View className="mb-4">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Weight</Text>
          <TextInput
            className="rounded-xl border border-gray-300 bg-white p-4 font-geistRegular text-base"
            placeholder="e.g., 58 kg"
            value={prefs.weight}
            onChangeText={(text) => setPrefs({ ...prefs, weight: text })}
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

        <View className="mb-6">
          <Text className="mb-2 font-geistMedium text-base text-gray-600">Fitness Level</Text>
          <View className="rounded-xl border border-gray-300 bg-white">
            <Picker
              selectedValue={prefs.fitnessLevel}
              onValueChange={(value) => setPrefs({ ...prefs, fitnessLevel: value })}
              className="font-geistRegular text-base">
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
          </View>
        </View>

        <View className="mt-4 flex-row justify-end gap-x-4">
          <TouchableOpacity onPress={handleCancel} className="rounded-xl bg-gray-200 px-6 py-3">
            <Text className="font-geistMedium text-base text-gray-800">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} className="rounded-xl bg-blue-500 px-6 py-3">
            <Text className="font-geistMedium text-base text-white">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
