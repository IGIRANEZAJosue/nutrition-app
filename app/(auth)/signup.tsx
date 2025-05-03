import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '~/context/AuthContext';

const Signup = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      console.log('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    try {
      await signup({ email, password, name });
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-primaryDark">
      <Image
        className="my-16 h-28"
        resizeMode="contain"
        source={require('../../assets/logo.png')}
      />
      <View className="min-h-1/2 absolute bottom-0 w-full rounded-t-3xl bg-white p-4">
        <Text className="font-geistSemiBold text-3xl text-primaryDark">Sign up</Text>
        <Text className="text-geistRegular my-2 text-base text-gray-500">
          Enter your details below to create your account.
        </Text>

        <View className="my-4">
          <Text className="my-2 font-geistRegular font-semibold">Name</Text>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Your unique username"
            className="w-full rounded-lg border border-gray-200 p-4"
          />
        </View>
        <View className="my-4">
          <Text className="my-2 font-geistRegular font-semibold">E-mail</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholder="m@example.com"
            className="w-full rounded-lg border border-gray-200 p-4"
          />
        </View>
        <View className="mb-4">
          <Text className="my-2 font-geistRegular font-semibold">Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            className="w-full rounded-lg border border-gray-200 p-4"
            secureTextEntry
          />
        </View>
        <View className="my-4 gap-4">
          <TouchableOpacity
            onPress={handleSignup}
            disabled={isLoading}
            className={`rounded-lg p-4 ${isLoading ? 'bg-primary/70' : 'bg-primary'}`}>
            <Text className="text-center font-geistMedium text-base text-white">
              {isLoading ? 'Signing up...' : 'Sign up'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="rounded-lg border border-gray-200 bg-transparent p-4">
            <Text className="text-center font-geistMedium text-base">Sign up with Google </Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-5 mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Text onPress={() => router.push('/login')} className="text-primary">
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
