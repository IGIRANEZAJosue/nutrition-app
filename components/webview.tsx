import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Sahha from 'sahha-react-native';

const MyWebComponent = () => {
  const [profileToken, setProfileToken] = useState<string>('');

  useEffect(() => {
    Sahha.getProfileToken((error: string, token?: string) => {
      if (error) {
        console.error(`Error: ${error}`);
      } else if (token) {
        console.log(`Profile Token: ${token}`);
        setProfileToken(token);
      } else {
        console.log(`Profile Token: null`);
      }
    });
  }, []);

  // Ensure profile token has a value before rendering the webview

  if (!profileToken) return <Text>No profile token</Text>;

  // Use https://webview.sahha.ai/app in production

  return (
    <WebView
      source={{
        uri: 'https://sandbox.webview.sahha.ai/app',
        headers: {
          Authorization: profileToken,
        },
      }}
      style={{ flex: 1 }}
    />
  );
};

export default MyWebComponent;
