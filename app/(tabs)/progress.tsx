import {
  PersonStanding,
  Plus,
  Ruler,
  Heart,
  Activity,
  Flame,
  Timer,
  Clock,
} from 'lucide-react-native';
import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import GoalCard from '~/components/cards/GoalCard';
import CircularProgressBar from '~/components/CircularProgressBar';
import RingProgress from '~/components/ui/RingProgress';

const goalsData = [
  {
    id: '1',
    title: 'Weight Loss',
    currentValue: '58 kg',
    targetValue: '53 kg',
    progressPercent: 60,
    IconComponent: Ruler,
    iconColor: 'white',
    iconBgClass: 'bg-green-500',
    progressBarColorClass: 'bg-green-500',
  },
  {
    id: '2',
    title: 'Running Distance',
    currentValue: '2.3 km',
    targetValue: '5 km',
    progressPercent: 46,
    IconComponent: PersonStanding,
    iconColor: 'white',
    iconBgClass: 'bg-blue-500',
    progressBarColorClass: 'bg-blue-500',
  },
];

// Static health metrics data
const healthMetrics = [
  {
    id: '1',
    title: 'Steps',
    value: 8421,
    target: 10000,
    percentage: 84,
    color: '#3b82f6',
    icon: PersonStanding,
  },
  {
    id: '2',
    title: 'Calories',
    value: 450,
    target: 600,
    percentage: 75,
    color: '#ef4444',
    icon: Flame,
  },
  {
    id: '3',
    title: 'Active Minutes',
    value: 45,
    target: 60,
    unit: 'min',
    percentage: 75,
    color: '#10b981',
    icon: Timer,
  },
];

// Static weekly progress data
const weeklyProgress = {
  caloriesBurned: 2850,
  workoutsCompleted: 4,
  avgSleepHours: 7.2,
  activeHours: 6.5,
};

// Static nutrition data
const nutritionData = {
  carbs: 180,
  protein: 85,
  fat: 65,
  totalCalories: 5250,
  dailyAverage: 1875,
};

const overallHealthScore = 78;

const Progress = () => {
  return (
    <Container page="progress">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="my-4">
          {/* Header */}
          <View className="mb-6">
            <Text className="font-geistSemiBold text-2xl">Your Progress</Text>
            <Text className="font-geistRegular text-gray-500">Track your health journey</Text>
          </View>

          {/* Nutrition Stats */}
          <View className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
            <Text className="mb-4 font-geistSemiBold text-lg">Nutrition Overview</Text>
            <View className="mb-4 flex-row justify-between">
              <View className="items-center">
                <Text className="text-gray-600">Carbs</Text>
                <Text className="font-geistSemiBold text-xl">{nutritionData.carbs}g</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600">Protein</Text>
                <Text className="font-geistSemiBold text-xl">{nutritionData.protein}g</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-600">Fat</Text>
                <Text className="font-geistSemiBold text-xl">{nutritionData.fat}g</Text>
                <Text className="text-sm text-gray-500">average</Text>
              </View>
            </View>

            {/* Weekly calorie intake overview */}
            <View className="mt-4 border-t border-gray-100 pt-4">
              <Text className="mb-2 font-geistMedium text-gray-700">Weekly Calorie Intake</Text>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Total:</Text>
                <Text className="font-geistSemiBold">{nutritionData.totalCalories} cal</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-500">Daily Average:</Text>
                <Text className="font-geistSemiBold">{nutritionData.dailyAverage} cal</Text>
              </View>
            </View>
          </View>

          {/* Weekly Summary Cards */}
          <View className="mb-6">
            <Text className="mb-3 font-geistSemiBold text-xl">This Week</Text>
            <View className="mb-4 flex-row justify-between">
              <View className="mr-2 flex-1 rounded-xl bg-blue-50 p-4">
                <Text className="font-geistMedium text-blue-700">Calories</Text>
                <Text className="font-geistBold text-2xl text-blue-800">
                  {weeklyProgress.caloriesBurned} kcal
                </Text>
                <Text className="font-geistRegular text-sm text-blue-600">burned</Text>
              </View>
              <View className="ml-2 flex-1 rounded-xl bg-green-50 p-4">
                <Text className="font-geistMedium text-green-700">Workouts</Text>
                <Text className="font-geistBold text-2xl text-green-800">
                  {weeklyProgress.workoutsCompleted}
                </Text>
                <Text className="font-geistRegular text-sm text-green-600">completed</Text>
              </View>
            </View>
            <View className="flex-row justify-between">
              <View className="mr-2 flex-1 rounded-xl bg-purple-50 p-4">
                <Text className="font-geistMedium text-purple-700">Sleep</Text>
                <Text className="font-geistBold text-2xl text-purple-800">
                  {weeklyProgress.avgSleepHours}h
                </Text>
                <Text className="font-geistRegular text-sm text-purple-600">average</Text>
              </View>
              <View className="ml-2 flex-1 rounded-xl bg-orange-50 p-4">
                <Text className="font-geistMedium text-orange-700">Active Hours</Text>
                <Text className="font-geistBold text-2xl text-orange-800">
                  {weeklyProgress.activeHours}h
                </Text>
                <Text className="font-geistRegular text-sm text-orange-600">this week</Text>
              </View>
            </View>
          </View>

          {/* Daily Health Metrics */}
          <View className="mb-6">
            <Text className="mb-3 font-geistSemiBold text-xl">Last 24 hours</Text>
            <View className="space-y-3">
              {healthMetrics.map((metric) => (
                <View
                  key={metric.id}
                  className="flex-row items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                  <View className="flex-1 flex-row items-center">
                    <View
                      className="mr-4 size-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${metric.color}20` }}>
                      <metric.icon size={20} color={metric.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-geistMedium text-lg">{metric.title}</Text>
                      <Text className="font-geistBold text-2xl">{metric.value}</Text>
                      <Text className="font-geistRegular text-gray-500">
                        Target: {metric.target} {metric.unit || ''}
                      </Text>
                    </View>
                  </View>
                  <CircularProgressBar
                    progress={metric.percentage}
                    color={metric.color}
                    size={80}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Goals Section */}
          <View className="mb-6">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-geistSemiBold text-xl">Your Goals</Text>
              <View className="size-8 items-center justify-center rounded-full bg-primary">
                <Plus color="white" size={16} />
              </View>
            </View>

            <View className="space-y-3">
              {goalsData.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </View>
          </View>

          {/* Health Score Ring Progress */}
          <View className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
            <Text className="mb-4 text-center font-geistSemiBold text-lg">
              Overall Health Score
            </Text>
            <View className="items-center">
              <RingProgress
                radius={80}
                strokeWidth={12}
                progress={overallHealthScore / 100}
                color="#059669"
              />
              <View className="absolute mt-8">
                <Text className="text-center font-geistBold text-3xl">{overallHealthScore}%</Text>
                <Text className="text-center text-sm text-gray-500">
                  {overallHealthScore >= 80
                    ? 'Excellent!'
                    : overallHealthScore >= 60
                      ? 'Great progress!'
                      : overallHealthScore >= 40
                        ? 'Keep going!'
                        : 'Getting started'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Progress;
