import { Redirect, Stack } from 'expo-router';

import { useAuth } from '~/context/AuthContext';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) return <Redirect href="/" />;

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
