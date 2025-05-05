import { Plus } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';

const Progress = () => {
  return (
    <Container page="progress">
      <View className="my-4">
        <View className="flex-row items-center justify-between">
          <Text className="font-geistSemiBold text-xl">Your Goals</Text>
          <View className="size-8 items-center justify-center rounded-full bg-primary">
            <Plus color="white" size={16} />
          </View>
        </View>
        <View></View>
      </View>
    </Container>
  );
};

export default Progress;
