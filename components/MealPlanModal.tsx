import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { X, Clock, Target, RefreshCw } from 'lucide-react-native';

interface MealPlanModalProps {
  visible: boolean;
  onClose: () => void;
  mealPlanData: any;
  onSelectMeal: (meal: any) => void;
  onGenerateNew: () => void;
  loading?: boolean;
}

const MealPlanModal: React.FC<MealPlanModalProps> = ({
  visible,
  onClose,
  mealPlanData,
  onSelectMeal,
  onGenerateNew,
  loading = false,
}) => {
  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(null);

  const getCurrentMealType = () => {
    const hour = new Date().getHours();
    if (hour < 10) return 'breakfast';
    if (hour < 16) return 'lunch';
    return 'dinner';
  };

  const getMealTypeDisplay = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'Breakfast';
      case 'lunch':
        return 'Lunch';
      case 'dinner':
        return 'Dinner';
      default:
        return mealType;
    }
  };

  const currentMealType = getCurrentMealType();
  const currentMeal = mealPlanData?.meals?.[currentMealType];

  const handleSelectMeal = (meal: any, index: number) => {
    setSelectedMealIndex(index);
    Alert.alert(
      'Select Meal',
      `Would you like to select "${meal.Name}" as your ${getMealTypeDisplay(currentMealType)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Select',
          onPress: () => {
            onSelectMeal(meal);
            onClose();
          },
        },
      ]
    );
  };

  const formatNutrition = (nutrition: any) => {
    return {
      calories: nutrition?.Calories || 0,
      protein: nutrition?.Proteins || 0,
      carbs: nutrition?.Carbohydrates || 0,
      fat: nutrition?.Fat || 0,
      fiber: nutrition?.Fiber || 0,
    };
  };

  if (!currentMeal) {
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-white">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-xl font-geistSemiBold">No Meal Available</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-gray-500 text-center">
              No meal plan available for {getMealTypeDisplay(currentMealType)}.
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <View>
            <Text className="text-xl font-geistSemiBold">
              {getMealTypeDisplay(currentMealType)} Recommendations
            </Text>
            <Text className="text-sm text-gray-500">
              Based on your health data and preferences
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Daily Targets Summary */}
        <View className="p-4 bg-blue-50">
          <View className="flex-row items-center mb-2">
            <Target size={16} color="#3B82F6" />
            <Text className="ml-2 font-geistMedium text-blue-600">Daily Targets</Text>
          </View>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-600">Calories</Text>
              <Text className="font-geistSemiBold">
                {mealPlanData?.daily_targets?.Calories || 0}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-600">Protein</Text>
              <Text className="font-geistSemiBold">
                {mealPlanData?.daily_targets?.ProteinContent?.toFixed(1) || 0}g
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-600">Carbs</Text>
              <Text className="font-geistSemiBold">
                {mealPlanData?.daily_targets?.CarbohydrateContent?.toFixed(1) || 0}g
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-600">Fat</Text>
              <Text className="font-geistSemiBold">
                {mealPlanData?.daily_targets?.FatContent?.toFixed(1) || 0}g
              </Text>
            </View>
          </View>
        </View>

        {/* Generate New Button */}
        <View className="p-4">
          <TouchableOpacity
            onPress={onGenerateNew}
            disabled={loading}
            className={`flex-row items-center justify-center p-3 rounded-lg bg-green-500 ${
              loading ? 'opacity-50' : ''
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <RefreshCw size={16} color="white" />
            )}
            <Text className="ml-2 font-geistMedium text-white">
              {loading ? 'Generating...' : 'Get New Recommendations'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Meal Recommendations */}
        <ScrollView className="flex-1 px-4">
          <Text className="text-lg font-geistSemiBold mb-4">
            Recommended for {getMealTypeDisplay(currentMealType)}
          </Text>

          {currentMeal.recipe_recommendations?.map((meal: any, index: number) => {
            const nutrition = formatNutrition(meal.Nutrition);
            const isSelected = selectedMealIndex === index;

            return (
              <View
                key={index}
                className={`mb-4 rounded-xl border-2 p-4 ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Meal Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-lg font-geistSemiBold text-gray-800">
                      {meal.Name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Clock size={14} color="gray" />
                      <Text className="ml-1 text-sm text-gray-500">
                        {meal.ReadyInMinutes} min
                      </Text>
                      <Text className="mx-2 text-gray-300">•</Text>
                      <Text className="text-sm text-gray-500 capitalize">
                        {meal.Cuisine}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg font-geistSemiBold text-green-600">
                      {meal.Calories} cal
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {meal.Servings} servings
                    </Text>
                  </View>
                </View>

                {/* Nutrition Info */}
                <View className="flex-row justify-between mb-3 p-3 bg-gray-50 rounded-lg">
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Protein</Text>
                    <Text className="font-geistSemiBold text-blue-600">
                      {nutrition.protein}g
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Carbs</Text>
                    <Text className="font-geistSemiBold text-orange-600">
                      {nutrition.carbs}g
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Fat</Text>
                    <Text className="font-geistSemiBold text-red-600">
                      {nutrition.fat}g
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-xs text-gray-600">Fiber</Text>
                    <Text className="font-geistSemiBold text-green-600">
                      {nutrition.fiber}g
                    </Text>
                  </View>
                </View>

                {/* Select Meal Button */}
                <TouchableOpacity
                  onPress={() => handleSelectMeal(meal, index)}
                  className="w-full bg-green-500 p-3 rounded-lg"
                >
                  <Text className="text-center font-geistMedium text-white">
                    Select This Meal
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default MealPlanModal; 