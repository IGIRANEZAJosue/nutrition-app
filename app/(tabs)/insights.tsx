import { Bed, Brain, Footprints, Heart } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { Container } from '~/components/Container';

const Insights = () => {
  return (
    <Container page="insights">
      <View className="my-5 space-y-4 rounded-xl bg-[#EFF6FF] p-4">
        <Text className="font-geistSemiBold text-xl">AI Insights</Text>
        <View className="flex-row gap-4">
          <View className="size-12 items-center justify-center rounded-full bg-blue-500">
            <Brain size={20} color="white" />
          </View>
          <View className="flex-1 space-y-2">
            <Text className="font-geistSemiBold text-lg">Post-Workout Nutrition Tip</Text>
            <Text className="fontgeistRegular text-sm text-gray-700">
              You just completed a 45-min workout. To replenish glycogen stores, consider these
              carb-rich foods:
            </Text>

            <View className="mt-4 flex-row gap-2">
              <Image
                source={require('../../assets/banana-image.png')}
                style={{ width: 72, height: 72, borderRadius: 8 }}
              />
              <Image
                source={require('../../assets/oats-image.png')}
                style={{ width: 72, height: 72, borderRadius: 8 }}
              />
              <Image
                source={require('../../assets/dough-image.png')}
                style={{ width: 72, height: 72, borderRadius: 8 }}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text className="mt-4 font-geistSemiBold text-xl">Today's Analysis</Text>
        <View className="my-2 gap-4">
          <View className="flex-row items-center gap-4 rounded-xl border border-gray-300 p-4">
            <View className="size-12 items-center justify-center rounded-full bg-[#6366F1]">
              <Bed size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-geistMedium text-base">Sleep Quality</Text>
              <Text className="font-geistRegular text-sm text-gray-700">
                Your sleep was 23 minutes better than average
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4 rounded-xl border border-gray-300 p-4">
            <View className="size-12 items-center justify-center rounded-full bg-blue-500">
              <Footprints size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-geistMedium text-base">Step Count Trend</Text>
              <Text className="font-geistRegular text-sm text-gray-700">
                You're walking 15% more than last week
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-4 rounded-xl border border-gray-300 p-4">
            <View className="size-12 items-center justify-center rounded-full bg-primaryLight">
              <Heart size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-geistMedium text-base">Heart Rate Variability</Text>
              <Text className="font-geistRegular text-sm text-gray-700">
                Your stress levels are lower than usual
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Insights;
