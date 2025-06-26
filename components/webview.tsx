import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Sahha from 'sahha-react-native';

const MyWebComponent = () => {
  const [profileToken, setProfileToken] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // First check if Sahha is authenticated
    checkSahhaAuthentication();
  }, []);

  const checkSahhaAuthentication = () => {
    try {
      // Check if Sahha is available and authenticated
      if (Sahha) {
        // Try to get profile token which will indicate if we're authenticated
        Sahha.getProfileToken((error: string, token?: string) => {
          setLoading(false);
          if (error) {
            console.error(`Error getting profile token: ${error}`);
            setError(`Authentication error: ${error}`);
            setIsAuthenticated(false);
          } else if (token) {
            console.log(`Profile Token obtained successfully`);
            setProfileToken(token);
            setError(null);
            setIsAuthenticated(true);
          } else {
            console.log(`Profile Token: null - Sahha may not be authenticated`);
            setError('Sahha is not authenticated. Please authenticate in the Home tab first.');
            setIsAuthenticated(false);
          }
        });
      } else {
        setLoading(false);
        setError('Sahha SDK is not available');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setLoading(false);
      setError('Failed to check Sahha authentication');
      setIsAuthenticated(false);
    }
  };

  if (loading) {
    return (
      <View className="h-96 items-center justify-center">
        <Text className="font-geistMedium text-gray-600">Loading Sahha data...</Text>
      </View>
    );
  }

  if (error || !profileToken || !isAuthenticated) {
    return (
      <View className="h-96 items-center justify-center rounded-lg border border-gray-200 p-4">
        <Text className="font-geistMedium text-gray-800">Sahha Health Data</Text>
        <Text className="mt-2 text-center font-geistRegular text-sm text-gray-600">
          {error || 'Profile token not available'}
        </Text>
        <Text className="mt-1 text-center font-geistRegular text-xs text-gray-500">
          {!isAuthenticated
            ? 'Go to the Home tab to authenticate Sahha first'
            : 'Please ensure Sahha is properly configured and authenticated'}
        </Text>
      </View>
    );
  }

  return (
    <View className="h-96 overflow-hidden rounded-lg border border-gray-200">
      <Text className="bg-gray-50 p-2 text-center font-geistMedium text-sm text-gray-700">
        Sahha Health Dashboard
      </Text>
      <WebView
        source={{
          uri: 'https://webview.sahha.ai/app/biomarkers',
          headers: {
            Authorization: profileToken,
          },
        }}
        style={{ flex: 1 }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          setError('Failed to load Sahha webview');
        }}
        onLoadStart={() => console.log('WebView loading started')}
        onLoadEnd={() => console.log('WebView loading finished')}
        startInLoadingState={true}
        renderLoading={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="font-geistMedium text-gray-600">Loading dashboard...</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyWebComponent;
