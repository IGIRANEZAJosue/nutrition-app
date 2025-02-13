import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import Header from '~/components/Header';

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <Text>Hello</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
