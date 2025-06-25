import { Bed, Brain, Footprints, Heart } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';

import { Container } from '~/components/Container';
import AnalysisCard from '~/components/cards/AnalysisCard';
import RecommendedRecipes from '~/components/sections/RecommendedRecipes';
import { getNutritionInsights } from '~/utils/api';

const Insights = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <Text className="font-geistSemiBold text-lg">Post-Workout Nutrition Tip</Text>
            <Text className="font-geistRegular text-sm text-gray-700">
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

      <RecommendedRecipes />

      <View>
        <Text className="mt-4 font-geistSemiBold text-xl">Today's Analysis</Text>
        {loading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text className="text-red-500">{error}</Text>
        ) : insights ? (
          <View className="my-2 gap-4">
            <AnalysisCard
              icon={<Bed size={20} color="white" accessibilityLabel="Sleep icon" />}
              bgColor="bg-[#6366F1]"
              title="Sleep Quality"
              description={`Sleep quality: ${insights.sleep_quality || 'N/A'}`}
            />
            <AnalysisCard
              icon={<Footprints size={20} color="white" accessibilityLabel="Step count icon" />}
              bgColor="bg-blue-500"
              title="Step Count Trend"
              description={`Average daily steps: ${insights.activity?.total_steps ?? 'N/A'}`}
            />
            <AnalysisCard
              icon={<Heart size={20} color="white" accessibilityLabel="Heart rate icon" />}
              bgColor="bg-[#EC4899]"
              title="Heart Rate Variability"
              description={`HRV: ${insights.heart_rate?.variability ?? 'N/A'}`}
            />
          </View>
        ) : null}
      </View>
    </Container>
  );
};

export default Insights;
