import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';

export const Container = ({ children, page }: { children: React.ReactNode; page?: string }) => {
  return (
    <SafeAreaView className={`${styles.container}`}>
      <Header page={page || 'home'} goBack={page !== 'home'} />
      <ScrollView style={{ flex: 1, height: '100%' }} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1 m-5',
};
