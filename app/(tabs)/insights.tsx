import { Bed, Brain, Footprints, Heart } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Container } from '~/components/Container';
import AnalysisCard from '~/components/cards/AnalysisCard';
import MealPlanModal from '~/components/MealPlanModal';
import { useAuth } from '~/context/AuthContext';
import useBiomarkers from '~/hooks/useBiomarkers';
import { getNutritionInsights, generateActivityBasedMealPlan } from '~/utils/api';

const Insights = () => {
  const { data: biomarkersData } = useBiomarkers();
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealPlanData, setMealPlanData] = useState<any>(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const { user } = useAuth();

  // Process biomarkers data for insights
  const processBiomarkersInsights = () => {
    if (!biomarkersData || !Array.isArray(biomarkersData)) {
      return {
        sleepQuality: 'No data available',
        stepsTrend: 'No data available',
        activityLevel: 'No data available',
        workoutRecommendation: 'General post-workout nutrition recommended',
      };
    }

    // Get today's and yesterday's data for comparison
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayData = biomarkersData.filter(
      (item) => item.startDateTime?.includes(today) || item.endDateTime?.includes(today)
    );
    const yesterdayData = biomarkersData.filter(
      (item) => item.startDateTime?.includes(yesterday) || item.endDateTime?.includes(yesterday)
    );

    // Extract key metrics
    const todaySteps = parseInt(todayData.find((item) => item.type === 'steps')?.value || '0');
    const yesterdaySteps = parseInt(
      yesterdayData.find((item) => item.type === 'steps')?.value || '0'
    );
    const sleepDuration = parseInt(
      todayData.find((item) => item.type === 'sleep_duration')?.value || '0'
    );
    const activeCalories = parseInt(
      todayData.find((item) => item.type === 'active_energy_burned')?.value || '0'
    );
    const activeHours = parseInt(
      todayData.find((item) => item.type === 'active_hours')?.value || '0'
    );
    const sedentaryTime = parseInt(
      todayData.find((item) => item.type === 'activity_sedentary_duration')?.value || '0'
    );

    // Generate insights
    const sleepHours = sleepDuration / 60;
    let sleepQuality = '';
    if (sleepHours >= 7.5) {
      sleepQuality = 'Excellent - Well rested for optimal metabolism';
    } else if (sleepHours >= 6.5) {
      sleepQuality = 'Good - Consider earlier bedtime for better recovery';
    } else if (sleepHours >= 5) {
      sleepQuality = 'Poor - Lack of sleep affects appetite hormones';
    } else {
      sleepQuality = 'Critical - Sleep deprivation impacts weight management';
    }

    // Steps trend analysis
    let stepsTrend = '';
    if (todaySteps > yesterdaySteps) {
      stepsTrend = `Great progress! ${todaySteps.toLocaleString()} steps (+${(todaySteps - yesterdaySteps).toLocaleString()})`;
    } else if (todaySteps < yesterdaySteps) {
      stepsTrend = `${todaySteps.toLocaleString()} steps (${(todaySteps - yesterdaySteps).toLocaleString()} from yesterday)`;
    } else {
      stepsTrend = `${todaySteps.toLocaleString()} steps - Consistent with yesterday`;
    }

    // Activity level assessment
    let activityLevel = '';
    if (activeCalories > 200) {
      activityLevel = 'High activity - Perfect for muscle recovery nutrition';
    } else if (activeCalories > 100) {
      activityLevel = 'Moderate activity - Balanced nutrition recommended';
    } else {
      activityLevel = 'Light activity - Focus on nutrient-dense foods';
    }

    // Workout-based recommendation
    let workoutRecommendation = '';
    if (activeCalories > 150) {
      workoutRecommendation = 'You had a solid workout session today!';
    } else if (activeCalories > 75) {
      workoutRecommendation = 'You had moderate activity today.';
    } else {
      workoutRecommendation = 'Light activity day.';
    }

    return {
      sleepQuality,
      stepsTrend,
      activityLevel,
      workoutRecommendation,
      metrics: {
        sleepHours: sleepHours.toFixed(1),
        todaySteps,
        activeCalories,
        activeHours,
        sedentaryHours: (sedentaryTime / 60).toFixed(1),
      },
    };
  };

  const biomarkersInsights = processBiomarkersInsights();

  const getRecommendedRecipe = async () => {
    setLoading(true);
    try {
      // Determine activity level based on biomarkers data
      const activeCalories = biomarkersInsights.metrics?.activeCalories || 0;
      const todaySteps = biomarkersInsights.metrics?.todaySteps || 0;

      let activityLevel = 'sedentary';
      if (activeCalories > 200 || todaySteps > 8000) {
        activityLevel = 'very_active';
      } else if (activeCalories > 100 || todaySteps > 5000) {
        activityLevel = 'moderately_active';
      } else if (activeCalories > 50 || todaySteps > 2000) {
        activityLevel = 'lightly_active';
      }

      const profile = {
        weight_kg: user?.profile?.weight_kg || 70,
        height_cm: user?.profile?.height_cm || 175,
        age: user?.profile?.age || 30,
        gender: user?.profile?.gender || 'male',
        activity_level: activityLevel,
        goal: 'maintain',
        diseases: [],
        allergies: user?.preferences?.allergies || [],
        intolerances: user?.preferences?.intolerances || [],
        dietary_restrictions: user?.preferences?.dietary_restrictions || [],
        variety_level: 'maximum',
      };
      const result = await generateActivityBasedMealPlan(profile);
      setMealPlanData(result);
      setShowMealModal(true);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate recommendations.');
    }
    setLoading(false);
  };

  const handleSelectMeal = async (meal: any) => {
    Alert.alert('Meal Selected', `You selected: ${meal.Name}`, [{ text: 'OK' }]);
  };

  const handleCloseMealModal = () => {
    setShowMealModal(false);
    setMealPlanData(null);
  };

  const handleGenerateNew = async () => {
    await getRecommendedRecipe();
  };

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getNutritionInsights(30);
        setInsights(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load insights');
      }
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <Container page="insights">
      <View className="my-5 gap-4 rounded-xl bg-[#EFF6FF] p-4">
        <Text className="font-geistSemiBold text-xl">AI Insights</Text>
        <View className="flex-row gap-4">
          <View className="size-12 items-center justify-center rounded-full bg-blue-500">
            <Brain size={20} color="white" />
          </View>
          <View className="flex-1 gap-2">
            <Text className="font-geistSemiBold text-lg">AI tip</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
              {biomarkersInsights.workoutRecommendation} To optimize recovery and replenish energy
              stores, consider these foods:
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={getRecommendedRecipe}
        className="mt-4 rounded-xl bg-primary p-4 text-center"
        disabled={loading}>
        <Text className="font-geistSemiBold text-lg text-white">Get AI recipe</Text>
      </TouchableOpacity>

      <View>
        <Text className="mt-4 font-geistSemiBold text-xl">Today's Analysis</Text>
        <View className="my-2 gap-4">
          <AnalysisCard
            icon={<Bed size={20} color="white" accessibilityLabel="Sleep icon" />}
            bgColor="bg-[#6366F1]"
            title="Sleep Quality"
            description={biomarkersInsights.sleepQuality}
          />
          <AnalysisCard
            icon={<Footprints size={20} color="white" accessibilityLabel="Step count icon" />}
            bgColor="bg-blue-500"
            title="Step Count Trend"
            description={biomarkersInsights.stepsTrend}
          />
          <AnalysisCard
            icon={<Heart size={20} color="white" accessibilityLabel="Activity level icon" />}
            bgColor="bg-[#EC4899]"
            title="Activity Level"
            description={biomarkersInsights.activityLevel}
          />
        </View>

        {/* Additional Real-time Metrics */}
        <View className="mt-6">
          <Text className="mb-3 font-geistSemiBold text-lg">Health Metrics Summary</Text>
          <View className="gap-3 rounded-xl bg-gray-50 p-4">
            <View className="flex-row justify-between">
              <Text className="font-geistMedium text-gray-700">Sleep Duration</Text>
              <Text className="font-geistSemiBold">
                {biomarkersInsights.metrics?.sleepHours || '0'} hours
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-geistMedium text-gray-700">Active Calories</Text>
              <Text className="font-geistSemiBold">
                {biomarkersInsights.metrics?.activeCalories || 0} kcal
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-geistMedium text-gray-700">Active Hours</Text>
              <Text className="font-geistSemiBold">
                {biomarkersInsights.metrics?.activeHours || 0} hours
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-geistMedium text-gray-700">Sedentary Time</Text>
              <Text className="font-geistSemiBold">
                {biomarkersInsights.metrics?.sedentaryHours || '0'} hours
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Meal Plan Modal */}
      <MealPlanModal
        visible={showMealModal}
        onClose={handleCloseMealModal}
        mealPlanData={mealPlanData}
        onSelectMeal={handleSelectMeal}
        onGenerateNew={handleGenerateNew}
        loading={loading}
      />
    </Container>
  );
};

export default Insights;
