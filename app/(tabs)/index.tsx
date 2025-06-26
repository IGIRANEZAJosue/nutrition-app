import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import Sahha, { SahhaEnvironment, SahhaSensor, SahhaSensorStatus } from 'sahha-react-native';

import CircularProgressBar from '~/components/CircularProgressBar';
import { Container } from '~/components/Container';
import MetricCard from '~/components/cards/MetricCard';
import HealthStatsCards from '~/components/sections/HealthStatsCards';
import RingProgress from '~/components/ui/RingProgress';
import MealPlanModal from '~/components/MealPlanModal';
import { useAuth } from '~/context/AuthContext';
import useBiomarkers from '~/hooks/useBiomarkers';
import useSahhaScore from '~/hooks/useSahhaScore';
import { Activity, generateWearableEnhancedMealPlan, addNutritionHistory } from '~/utils/api';

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
  ], // defaults to all sensors
};

const appId = 'E1XDqfbpB7OZR421X3xmpNHqD51DtIJA';
const appSecret = 'a4Pkh2IOFJkDOYc5QdaDaG6TGv1VdFhsIHtnFJwLIlRQrFT3CWX9lZEtg3gIDewl';
const externalId = 'SampleProfile-622bd4c2-843e-4a1d-b75f-3dae46b6b4a0';

// Meal type constants
const MEAL_KEYS = ['breakfast', 'lunch', 'dinner', 'snack'];

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function getMealTypeByHour(hour: number) {
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 21) return 'dinner';
  return 'snack';
}

function formatMealTypeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

const MealCard = ({ meal, mealType }: { meal: any; mealType: string }) => {
  if (!meal) return null;

  const getPreparationPreview = () => {
    if (!meal.preparation) return '';
    return meal.preparation.length > 50
      ? meal.preparation.substring(0, 50) + '...'
      : meal.preparation;
  };

  return (
    <View className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="font-geistSemiBold text-lg text-gray-800">
          {formatMealTypeLabel(mealType)}
        </Text>
        <Text className="font-geistMedium text-sm text-gray-600">{meal.calories} cal</Text>
      </View>
      <Text className="mb-2 font-geistMedium text-base text-gray-800">{meal.recipe_name}</Text>
      <Text className="font-geistRegular text-sm text-gray-600">{getPreparationPreview()}</Text>
    </View>
  );
};

export default function Home() {
  const { user } = useAuth();
  const { data } = useBiomarkers();

  const [stats, setStats] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [mealPlanData, setMealPlanData] = useState<any>(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [savedMeals, setSavedMeals] = useState<{ [key: string]: any }>({});

  // Process biomarkers data for display
  const processBiomarkersData = () => {
    console.log('Biomarkers data:', data); // Debug log to see actual data

    if (!data || !Array.isArray(data)) {
      console.log('No biomarkers data available');
      return {
        steps: { current: 0, target: 7500 },
        sleep: { current: 0, target: 8 },
        activeCalories: { current: 0, target: 300 },
        activeHours: { current: 0, target: 8 },
      };
    }

    // Get the most recent data (last few days to ensure we have data)
    const recentData = data.slice(-20); // Get last 20 entries
    console.log('Recent biomarkers data:', recentData);

    // Extract relevant metrics using the correct field names from Biomarker interface
    const steps = recentData.find((item) => item.type === 'steps')?.value || 0;
    const sleepDuration = recentData.find((item) => item.type === 'sleep_duration')?.value || 0;
    const activeCalories =
      recentData.find((item) => item.type === 'active_energy_burned')?.value || 0;
    const activeHours = recentData.find((item) => item.type === 'active_hours')?.value || 0;

    console.log('Processed metrics:', { steps, sleepDuration, activeCalories, activeHours });

    return {
      steps: {
        current: parseInt(steps.toString()),
        target: 7500,
      },
      sleep: {
        current: parseFloat((parseInt(sleepDuration.toString()) / 60).toFixed(1)), // Convert minutes to hours
        target: 8,
      },
      activeCalories: {
        current: parseInt(activeCalories.toString()),
        target: 300,
      },
      activeHours: {
        current: parseInt(activeHours.toString()),
        target: 8,
      },
    };
  };

  const healthMetrics = processBiomarkersData();

  // Calculate total calories burned (rough estimation)
  const totalCaloriesBurned =
    healthMetrics.activeCalories.current + healthMetrics.steps.current * 0.04; // Rough calculation

  // Load saved meals on mount
  useEffect(() => {
    (async () => {
      const meals: { [key: string]: any } = {};
      for (const key of MEAL_KEYS) {
        const val = await SecureStore.getItemAsync(`@meal_${key}`);
        if (val) meals[key] = JSON.parse(val);
      }
      setSavedMeals(meals);
    })();
  }, []);

  // Save meal to AsyncStorage
  const saveMealLocally = async (mealType: string, meal: any) => {
    await SecureStore.setItem(`@meal_${mealType}`, JSON.stringify(meal));
    setSavedMeals((prev) => ({ ...prev, [mealType]: meal }));
  };

  const getStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'high':
        return '#22C55E';
      case 'medium':
        return '#FFA500';
      case 'minimal':
        return '#FF4444';
      default:
        return '#808080';
    }
  };

  const [sahhaConfigured, setSahhaConfigured] = useState<boolean>(false);
  const [authentication, setAuthentication] = useState<{
    loading: boolean;
    authenticated: boolean;
  }>({
    loading: false,
    authenticated: false,
  });

  useEffect(() => {
    const fetchStats = () => {
      setLoading(true);
      setStats([]);

      const token =
        'profile eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvcHJvZmlsZUlkIjoiMmRlM2VmMmItYjRhZi00YmJhLThjNjctZTA0ZTBmMzFiZmQzIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL2V4dGVybmFsSWQiOiI3ODg0YTg2Ni00YWUxLTQ5NDUtOWZiYS1iMmI4ZDJiN2M1YTkiLCJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvYWNjb3VudElkIjoiNDMxMTAxZjAtNzZkNC00MThmLWIzYTktNGMyOTlkZTAyODU1IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3NhaGhhQXBpU2NvcGUiOiJTYW5kYm94IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JlZ2lvbiI6IlVTIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JvbGUiOiJwcm9maWxlX293bmVyIiwiZXhwIjoxNzUwODA3NjYzLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXBpLnNhaGhhLmFpIiwiYXVkIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5zYWhoYS5haSJ9.rVw7mDK2fICdmtjYeHKm5B4PELftPWFdkBt-0vc9T6E';

      fetch(
        'https://sandbox-api.sahha.ai/api/v1/profile/score?endDateTime=2025-06-25&startDateTime=2025-06-25&types=activity',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setStats(data))
        .catch((error) => console.error('Error:', error))
        .finally(() => setLoading(false));
    };

    if (authentication.authenticated) {
      fetchStats();
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

  const authenticateSahha = async () => {
    setAuthentication({ ...authentication, loading: true });
    await saveData();
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
      [SahhaSensor.steps, SahhaSensor.sleep, SahhaSensor.heart_rate, SahhaSensor.device_lock],
      (error: string, value: SahhaSensorStatus) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else {
          console.log(`Enable Sensors status: ${SahhaSensorStatus[value]}`);
          getSensorStatus();
        }
      }
    );
  };

  // Connect Clean button to /meal-plan/wearable-enhanced
  const handleClean = async () => {
    setLoading(true);
    setMealPlanData(null); // Reset data first
    setShowMealModal(false); // Ensure modal is closed
    try {
      // Use user profile data if available, otherwise use defaults
      const profile = {
        weight_kg: user?.profile?.weight_kg || 70,
        height_cm: user?.profile?.height_cm || 175,
        age: user?.profile?.age || 30,
        gender: user?.profile?.gender || 'male',
        goal: 'maintain',
        diseases: [],
        allergies: user?.preferences?.allergies || [],
        intolerances: user?.preferences?.intolerances || [],
      };
      const result = await generateWearableEnhancedMealPlan(profile);
      setMealPlanData(result);
      setShowMealModal(true);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate recommendations.');
    }
    setLoading(false);
  };

  const handleGenerateNew = async () => {
    setLoading(true);
    try {
      const profile = {
        weight_kg: user?.profile?.weight_kg || 70,
        height_cm: user?.profile?.height_cm || 175,
        age: user?.profile?.age || 30,
        gender: user?.profile?.gender || 'male',
        goal: 'maintain',
        diseases: [],
        allergies: user?.preferences?.allergies || [],
        intolerances: user?.preferences?.intolerances || [],
      };
      const result = await generateWearableEnhancedMealPlan(profile);
      setMealPlanData(result);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to generate new recommendations.');
    }
    setLoading(false);
  };

  const handleSelectMeal = async (meal: any) => {
    try {
      // Get current meal type based on time
      const hour = new Date().getHours();
      let mealType = getMealTypeByHour(hour);

      // Format meal data for nutrition history and local storage
      const mealData = {
        timestamp: new Date().toISOString(),
        meal_type: mealType,
        recipe_name: meal.Name,
        calories: meal.Calories,
        nutrients: {
          protein: meal.Nutrition?.Proteins || 0,
          carbs: meal.Nutrition?.Carbohydrates || 0,
          fat: meal.Nutrition?.Fat || 0,
          fiber: meal.Nutrition?.Fiber || 0,
        },
        preparation: meal.Preparation || '',
        satisfaction_rating: 4, // Default rating, could be made configurable
      };

      // Save to nutrition history (API)
      await addNutritionHistory(mealData);
      // Save locally
      await saveMealLocally(mealType, mealData);

      Alert.alert(
        'Meal Saved!',
        `"${meal.Name}" has been added to your ${formatMealTypeLabel(mealType)}.`,
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      Alert.alert('Error', `Failed to save meal: ${err.message || 'Unknown error'}`, [
        { text: 'OK' },
      ]);
    }
  };

  const handleCloseMealModal = () => {
    setShowMealModal(false);
    setMealPlanData(null); // Reset data when closing
  };

  return (
    <Container page="home">
      <View className="my-4 gap-4">
        {/* Clean Button */}
        <TouchableOpacity
          onPress={handleClean}
          disabled={loading}
          className={`mb-4 w-full rounded-lg bg-green-500 p-4 ${loading ? 'opacity-50' : ''}`}>
          <Text className="text-center font-geistMedium text-base text-white">
            {loading ? 'Generating...' : 'Generate Recommendation'}
          </Text>
        </TouchableOpacity>

        {/* Saved Meals Cards */}
        {MEAL_KEYS.map((key) => (
          <MealCard key={key} meal={savedMeals[key]} mealType={key} />
        ))}

        <View>
          <Text className="font-geistSemiBold text-3xl">{user ? user.name : 'Friend'}</Text>
        </View>
        <View className="my-6 gap-4">
          <RingProgress
            progress={Math.min(
              healthMetrics.activeCalories.current / healthMetrics.activeCalories.target,
              1
            )}
            radius={100}
            color="#10C875"
          />
          <Text className="text-center font-geistRegular text-lg ">
            You've burned {Math.round(totalCaloriesBurned)} calories today
          </Text>
        </View>

        {/* Health Stats Cards  */}
        <HealthStatsCards />

        <MetricCard
          title="sleep"
          value={healthMetrics.sleep.current}
          target={healthMetrics.sleep.target}
          percentage={Math.round((healthMetrics.sleep.current / healthMetrics.sleep.target) * 100)}
        />
        <MetricCard
          title="steps"
          value={healthMetrics.steps.current}
          target={healthMetrics.steps.target}
          percentage={Math.round((healthMetrics.steps.current / healthMetrics.steps.target) * 100)}
        />
        <MetricCard
          title="active hours"
          value={healthMetrics.activeHours.current}
          target={healthMetrics.activeHours.target}
          percentage={Math.round(
            (healthMetrics.activeHours.current / healthMetrics.activeHours.target) * 100
          )}
        />
      </View>

      {/* Meal Plan Modal */}
      <MealPlanModal
        visible={showMealModal}
        onClose={handleCloseMealModal}
        mealPlanData={mealPlanData}
        onSelectMeal={handleSelectMeal}
        onGenerateNew={handleGenerateNew}
        loading={loading}
      />
    </Container>
  );
}
