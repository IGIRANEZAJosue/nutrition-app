import { useFonts } from 'expo-font';
import '../global.css';
import { Stack } from 'expo-router';

import { AuthProvider } from '~/context/AuthContext';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Geist-Light': require('../assets/fonts/Geist-Light.ttf'),
    'Geist-Thin': require('../assets/fonts/Geist-Thin.ttf'),
    'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/Geist-Medium.ttf'),
    'Geist-SemiBold': require('../assets/fonts/Geist-SemiBold.ttf'),
    'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
    'Geist-Black': require('../assets/fonts/Geist-Black.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthProvider>
  );
}
