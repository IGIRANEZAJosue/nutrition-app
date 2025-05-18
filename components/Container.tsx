import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';

export const Container = ({ children, page }: { children: React.ReactNode; page?: string }) => {
  return (
    <SafeAreaView className={`${styles.container}`}>
      <Header page={page || 'home'} goBack={page !== 'home'} />
      <ScrollView showsVerticalScrollIndicator={false} contentInset={{ bottom: 50 }}>
        <View className="flex-1">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex-1 mx-5 mt-2',
};
