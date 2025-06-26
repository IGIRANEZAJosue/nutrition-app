import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import {
  loginUserDto,
  signupUserDto,
  loginUser,
  signupUser,
  getCurrentUser,
  refreshAccessToken,
  setTokens,
  clearTokens,
  updateProfile,
  loadTokens,
} from '~/utils/api';

export interface UserPrefs {
  height?: string;
  weight?: string;
  age?: string;
  fitnessLevel?: string;
  gender?: string;
  activity_level?: string;
}

interface AuthContextType {
  session: boolean; // true if logged in
  user: any | null;
  signin: (data: loginUserDto) => Promise<void>;
  signup: (data: signupUserDto) => Promise<void>;
  signout: () => Promise<void>;
  updateUserPrefs: (prefs: UserPrefs) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: false,
  user: null,
  signin: async (data: loginUserDto) => {},
  signup: async (data: signupUserDto) => {},
  signout: async () => {},
  updateUserPrefs: async (prefs: UserPrefs) => {},
  refreshUser: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      await loadTokens();
      const user = await getCurrentUser();
      setUser(user);
      setSession(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setSession(false);
    }
    setLoading(false);
  };

  const signin = useCallback(async (data: loginUserDto) => {
    setLoading(true);
    try {
      const user = await loginUser(data);
      // After login, fetch fresh user data from /auth/me
      const freshUser = await getCurrentUser();
      setUser(freshUser);
      setSession(true);
    } catch (error) {
      setUser(null);
      setSession(false);
      throw error;
    }
    setLoading(false);
  }, []);

  const signup = useCallback(
    async (data: signupUserDto) => {
      setLoading(true);
      try {
        await signupUser(data);
        // After signup, immediately login and fetch fresh user data
        await signin({ email: data.email, password: data.password });
      } catch (error) {
        setUser(null);
        setSession(false);
        throw error;
      }
      setLoading(false);
    },
    [signin]
  );

  const signout = useCallback(async () => {
    setLoading(true);
    await clearTokens();
    setUser(null);
    setSession(false);
    setLoading(false);
  }, []);

  const updateUserPrefs = useCallback(async (prefs: UserPrefs) => {
    setLoading(true);
    try {
      // Convert string values to numbers where appropriate
      const profileData = {
        profile: {
          weight_kg: prefs.weight ? parseFloat(prefs.weight) : undefined,
          height_cm: prefs.height ? parseFloat(prefs.height) : undefined,
          age: prefs.age ? parseInt(prefs.age) : undefined,
          gender: prefs.gender,
          fitness_level: prefs.fitnessLevel,
          activity_level: prefs.activity_level,
        },
      };

      const updatedUser = await updateProfile(profileData);
      setUser(updatedUser);
    } catch (error: any) {
      console.error('Profile update failed:', error);
      Alert.alert('Error', error.message || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setUser(user);
      setSession(true);
      return user;
    } catch (error: any) {
      console.error('Failed to refresh user data:', error);
      // If refresh fails and we have no user, clear session
      if (!user) {
        setSession(false);
        await clearTokens();
      }
      throw error;
    }
  }, [user]);

  const contextData = useMemo(
    () => ({ session, user, signin, signup, signout, updateUserPrefs, refreshUser }),
    [session, user, signin, signup, signout, updateUserPrefs, refreshUser]
  );

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <ActivityIndicator />
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
