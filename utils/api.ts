const BASE_URL = 'https://nutrionhd-recommendation-modal.onrender.com';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export interface loginUserDto {
  email: string;
  password: string;
}

export interface signupUserDto {
  username: string;
  email: string;
  password: string;
  name: string;
  first_name?: string;
  last_name?: string;
  profile?: any;
  preferences?: any;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Merge headers properly
  if (options.headers) {
    Object.assign(headers, options.headers);
  }
  
  if (requireAuth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || res.statusText);
  }
  return res.json();
}

export async function loginUser(data: loginUserDto) {
  const res = await apiRequest<{ access_token: string; refresh_token: string; user: any }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    false
  );
  accessToken = res.access_token;
  refreshToken = res.refresh_token;
  return res.user;
}

export async function signupUser(data: signupUserDto) {
  const res = await apiRequest<{ user: any }>(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    false
  );
  return res.user;
}

export async function getCurrentUser() {
  return apiRequestWithRefresh<any>('/auth/me', {}, true);
}

export async function refreshAccessToken() {
  if (!refreshToken) throw new Error('No refresh token available');
  
  try {
    const res = await apiRequest<{ access_token: string; refresh_token?: string }>(
      '/auth/refresh',
      {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
      false
    );
    
    accessToken = res.access_token;
    if (res.refresh_token) {
      refreshToken = res.refresh_token;
    }
    
    return accessToken;
  } catch (error) {
    // If refresh fails, clear tokens
    clearTokens();
    throw new Error('Token refresh failed. Please login again.');
  }
}

export function setTokens({ access, refresh }: { access: string; refresh: string }) {
  accessToken = access;
  refreshToken = refresh;
}

export function clearTokens() {
  accessToken = null;
  refreshToken = null;
}

export async function getNutritionInsights(days: number = 30) {
  return apiRequestWithRefresh<any>(`/nutrition/insights?days=${days}`);
}

export async function getNutritionTrends(days: number = 7) {
  return apiRequestWithRefresh<any>(`/nutrition/trends?days=${days}`);
}

export async function generateWearableEnhancedMealPlan(profile: {
  weight_kg: number;
  height_cm: number;
  age: number;
  gender: string;
  goal: string;
  diseases?: string[];
  allergies?: string[];
  intolerances?: string[];
}) {
  return apiRequestWithRefresh<any>('/meal-plan/wearable-enhanced', {
    method: 'POST',
    body: JSON.stringify(profile),
  });
}

export async function addNutritionHistory(mealData: {
  timestamp: string;
  meal_type: string;
  recipe_name: string;
  calories: number;
  nutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  satisfaction_rating?: number;
}) {
  return apiRequestWithRefresh<any>('/nutrition/history', {
    method: 'POST',
    body: JSON.stringify(mealData),
  });
}

export async function updateProfile(profileData: {
  first_name?: string;
  last_name?: string;
  profile?: {
    weight_kg?: number;
    height_cm?: number;
    age?: number;
    gender?: string;
    fitness_level?: string;
    activity_level?: string;
  };
  preferences?: {
    allergies?: string[];
    intolerances?: string[];
    dietary_restrictions?: string[];
  };
}) {
  return apiRequestWithRefresh<any>('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

// Enhanced apiRequest with automatic token refresh
export async function apiRequestWithRefresh<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true
): Promise<T> {
  try {
    return await apiRequest<T>(endpoint, options, requireAuth);
  } catch (error: any) {
    // If it's a 401 error and we have a refresh token, try to refresh
    if (error.message?.includes('401') && refreshToken && requireAuth) {
      try {
        await refreshAccessToken();
        // Retry the original request with new token
        return await apiRequest<T>(endpoint, options, requireAuth);
      } catch (refreshError) {
        // If refresh also fails, throw the original error
        throw error;
      }
    }
    throw error;
  }
}

// TypeScript interfaces for activity tracking data

export interface ActivityFactor {
  id: string;
  name: string;
  value: number;
  goal: number;
  score: number;
  state: 'high' | 'medium' | 'low';
  unit: string;
}

export interface Activity {
  id: string;
  type: string;
  state: 'high' | 'medium' | 'low';
  score: number;
  factors: ActivityFactor[];
  dataSources: string[];
  scoreDateTime: string; // ISO 8601 date string
  createdAtUtc: string; // ISO 8601 date string
  version: number;
}

// Type for the root array
export type ActivityData = Activity[];

// Utility types for specific factor names if you want type safety
export type FactorName = 'steps' | 'active_hours' | 'active_calories' | 'intense_activity_duration';

export type FactorUnit = 'actiity' | 'sleep' | '' | 'minute';

// More specific interface if you want stricter typing for known factors
export interface TypedActivityFactor extends Omit<ActivityFactor, 'name' | 'unit'> {
  name: FactorName;
  unit: FactorUnit;
}

export interface TypedActivity extends Omit<Activity, 'factors'> {
  factors: TypedActivityFactor[];
}

export interface Biomarker {
  id: string;
  category: string;
  type: string;
  periodicity: string;
  aggregation: string;
  value: string;
  unit: string;
  valueType: string;
  startDateTime: string;
  endDateTime: string;
}