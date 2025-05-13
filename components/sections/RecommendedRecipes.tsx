import React from 'react';
import { Image, Text, View } from 'react-native';

const RecommendedRecipes = () => {
  return (
    <View className="my-5 gap-4 rounded-xl bg-primary/10 p-5">
      <Text className="font-geistSemiBold text-xl">Recommended Recipes</Text>
      <View className="gap-4">
        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/banana-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Berry Protein Smoothie Bowl</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              Perfect post-workout meal • 320 calories • 24g protein
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/oats-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Overnight Protein Oats</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              High in fiber • 280 calories • 18g protein
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/dough-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Overnight Protein Oats</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              High in fiber • 280 calories • 18g protein
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/oats-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Mediterranean Quinoa Bowl</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              Rich in omega-3 • 420 calories • 15g protein
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/dough-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Grilled Chicken Salad</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              Low carb • 350 calories • 32g protein
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <Image
            source={require('../../assets/banana-image.png')}
            style={{ width: 80, height: 80, borderRadius: 8 }}
          />
          <View className="flex-1">
            <Text className="font-geistMedium text-lg">Tofu Vegetable Stir-Fry</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              Plant-based • 300 calories • 20g protein
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RecommendedRecipes;
