import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '~/components/Header';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text className="text-center font-geistBold text-3xl text-primaryDark">Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
