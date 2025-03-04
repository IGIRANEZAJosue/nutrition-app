import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '~/components/Header';

const Insights = () => {
  return (
    <SafeAreaView className="flex-1 p-5">
      <Header />
      <Text className="text-center font-geistBold text-3xl text-primaryDark">Insights</Text>
    </SafeAreaView>
  );
};

export default Insights;
