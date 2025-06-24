import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Sahha, {
  SahhaEnvironment,
  SahhaSensor,
  SahhaSensorStatus,
  SahhaScoreType,
} from 'sahha-react-native';

import CircularProgressBar from '~/components/CircularProgressBar';
import { Container } from '~/components/Container';
import MetricCard from '~/components/cards/MetricCard';
import HealthStatsCards from '~/components/sections/HealthStatsCards';
import RingProgress from '~/components/ui/RingProgress';
import { useAuth } from '~/context/AuthContext';
import useSahhaStats from '~/hooks/useSahhaStats';

const sahhaSettings = {
  environment: SahhaEnvironment.sandbox, // Required -  .sandbox for testing
  // Optional - Android only
  notificationSettings: {
    icon: 'ic_test',
    title: 'Test Title',
    shortDescription: 'Test description.',
  },

  sensors: [
    SahhaSensor.steps,
    SahhaSensor.sleep,
    SahhaSensor.device_lock,
    SahhaSensor.heart_rate,
    SahhaSensor.active_energy_burned,
    SahhaSensor.blood_pressure_systolic,
    SahhaSensor.floors_climbed,
    SahhaSensor.heart_rate_variability_sdnn,
    SahhaSensor.resting_heart_rate,
    SahhaSensor.total_energy_burned,
    SahhaSensor.body_temperature,
    SahhaSensor.device_lock,
  ], // defaults to all sensors
};

const appId = 'E1XDqfbpB7OZR421X3xmpNHqD51DtIJA';
const appSecret = 'a4Pkh2IOFJkDOYc5QdaDaG6TGv1VdFhsIHtnFJwLIlRQrFT3CWX9lZEtg3gIDewl';
const externalId = '7884a866-4ae1-4945-9fba-b2b8d2b7c5a9';

export default function Home() {
  const { user } = useAuth();

  const [activityScore, setActivityScore] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'high':
        return '#22C55E';
      case 'medium':
        return '#FFA500';
      case 'minimal':
        return '#EF4444';
      default:
        return '#808080';
    }
  };

  const {
    stats: stepStats,
    loading: stepsLoading,
    error: stepsError,
  } = useSahhaStats(SahhaSensor.steps);

  useEffect(() => {
    if (stepStats) {
      console.log('Step stats from hook:', stepStats);
    }
    if (stepsError) {
      console.error('Error from useSahhaStats hook:', stepsError);
    }
  }, [stepStats, stepsError]);

  const [sahhaConfigured, setSahhaConfigured] = useState<boolean>(false);
  const [authentication, setAuthentication] = useState<{
    loading: boolean;
    authenticated: boolean;
  }>({
    loading: false,
    authenticated: false,
  });

  useEffect(() => {
    const fetchActivityScore = () => {
      setLoading(true);

      // We will use the getScores method which is better for this
      const startDate = new Date('2025-06-23');
      const endDate = new Date('2025-06-24');

      Sahha.getScores(
        [SahhaScoreType.activity],
        startDate.getTime(),
        endDate.getTime(),
        (error: string, value: string) => {
          setLoading(false);
          if (error) {
            console.error('Error fetching activity score:', error);
          } else if (value) {
            const scores = JSON.parse(value);
            // We'll just grab the first score for now
            if (scores && scores.length > 0) {
              setActivityScore(scores[0]);
            } else {
              setActivityScore(null);
            }
          }
        }
      );
    };

    if (authentication.authenticated) {
      fetchActivityScore();
    }
  }, [authentication.authenticated]);

  const [sensorStatus, setSensorStatus] = useState<{
    loading: boolean;
    status: SahhaSensorStatus;
  }>({
    loading: true,
    status: SahhaSensorStatus.pending,
  });

  useEffect(() => {
    // Use custom values
    if (Sahha) {
      console.log('Sahha native module is available. Configuring...');
      Sahha.configure(sahhaSettings, (error: string, success: boolean) => {
        console.log(`Success: ${success}`);
        setSahhaConfigured(success);

        if (error) {
          console.error(`Error: ${error}`);
        }
      });
    } else {
      console.log('Sahha native module is not available. Are you running in Expo Go?');
      setSahhaConfigured(false);
    }
  }, []);

  useEffect(() => {
    authenticateSahha();
    getSensorStatus();
  }, []);

  const saveData = async () => {
    try {
      await SecureStore.setItemAsync('appId', appId);
      await SecureStore.setItemAsync('appSecret', appSecret);
      await SecureStore.setItemAsync('userId', externalId);
    } catch (e) {
      console.log(e);
    }
  };

  const authenticateSahha = () => {
    setAuthentication({ ...authentication, loading: true });
    saveData();
    Sahha.authenticate(appId, appSecret, externalId, (error: string, success: boolean) => {
      console.log(`Sahha Authentication success: ${success}`);
      setAuthentication({ authenticated: success, loading: false });

      if (error) {
        console.error(`Error: ${error}`);
      }
    });
  };

  const deauthenticate = () => {
    setAuthentication({ ...authentication, loading: true });
    console.log('Deauthenticate');
    Sahha.deauthenticate((err, success) => {
      console.log(`Deauthentication success: ${success}`);
      setAuthentication({ authenticated: !success, loading: false });

      if (err) console.log(`Sahha deauthentication error: ${err}`);
    });
  };

  const getSensorStatus = () => {
    console.log('Sheck Sensor Status');
    Sahha.getSensorStatus(
      [SahhaSensor.steps, SahhaSensor.sleep, SahhaSensor.heart_rate, SahhaSensor.device_lock],
      (error: string, value: SahhaSensorStatus) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else if (value != null) {
          console.log(`Sensor Status: ` + SahhaSensorStatus[value]);
          setSensorStatus({ status: value, loading: false });
          if (value == SahhaSensorStatus.pending) {
            console.log('Pending');
            // Show your custom UI asking your user to setup Sleep in the Health App
          }
        }
      }
    );
  };

  const enableSensors = () => {
    console.log('Enable Sensors');
    Sahha.enableSensors(
      [
        SahhaSensor.steps,
        SahhaSensor.sleep,
        SahhaSensor.heart_rate,
        SahhaSensor.active_energy_burned,
        SahhaSensor.blood_pressure_systolic,
        SahhaSensor.floors_climbed,
        SahhaSensor.heart_rate_variability_sdnn,
        SahhaSensor.resting_heart_rate,
        SahhaSensor.total_energy_burned,
        SahhaSensor.body_temperature,
        SahhaSensor.device_lock,
      ],
      (error: string, value: SahhaSensorStatus) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else if (value != null) {
          console.log(`Sensor Status: ` + SahhaSensorStatus[value]);
          setSensorStatus({ status: value, loading: false });
          if (value == SahhaSensorStatus.pending) {
            console.log('pending');
            // Show your custom UI asking your user to setup Sleep in the Health App
          }
        }
      }
    );
  };

  return (
    <Container page="home">
      <View className="my-4 gap-4">
        <View>
          <Text className="font-geistMedium text-2xl text-gray-600">Hello,</Text>
          <Text className="font-geistSemiBold text-3xl">{user ? user.name : 'Friend'}</Text>
        </View>
        <View className="my-6 gap-4">
          <RingProgress progress={0.7} radius={100} color="#10C875" />
          <Text className="text-center font-geistRegular text-lg ">
            You've burned 1000 calories today
          </Text>
        </View>

        {/* Health Stats Cards  */}
        <HealthStatsCards />

        <MetricCard title="sleep" value={6.5} target={8} percentage={80} />
        <MetricCard title="steps" value={5000} target={7500} percentage={50} />
        <CircularProgressBar />
      </View>
    </Container>
  );
}
