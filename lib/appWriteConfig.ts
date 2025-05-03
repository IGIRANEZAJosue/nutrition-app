import { Platform } from 'react-native';
import { Client, Account } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'api endpoint')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'project id');

switch (Platform.OS) {
  case 'android':
    client.setPlatform(
      process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME || 'com.josue.nutrition-app-android'
    );
    break;
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID || 'ios bundle id');
    break;
}

const account = new Account(client);

export { account };
