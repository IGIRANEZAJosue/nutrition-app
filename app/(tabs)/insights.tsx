import { Brain } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { Container } from '~/components/Container';

const Insights = () => {
  return (
    <Container page="insights">
      <View className="my-5 space-y-4 rounded-lg bg-[#EFF6FF] p-4">
        <Text className="font-geistSemiBold text-xl">AI Insights</Text>
        <View className="flex-row gap-4">
          <View className="size-10 items-center justify-center rounded-full bg-blue-500">
            <Brain size={20} color="white" />
          </View>
          <View className="flex-1 space-y-2">
            <Text className="font-geistSemiBold text-lg">Post-Workout Nutrition Tip</Text>
            <Text className="fontgeistRegular text-sm text-gray-700">
              You just completed a 45-min workout. To replenish glycogen stores, consider these
              carb-rich foods:
            </Text>

            <View className="flex-row gap-2">
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
    </Container>
  );
};

export default Insights;
