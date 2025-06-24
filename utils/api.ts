export interface loginUserDto {
  email: string;
  password: string;
}

export interface signupUserDto {
  email: string;
  password: string;
  name: string;
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
