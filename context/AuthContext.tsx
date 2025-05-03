import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { ID, Models } from 'react-native-appwrite';

import { account } from '~/lib/appWriteConfig';
import { loginUserDto, signupUserDto } from '~/utils/api';

interface AuthContextType {
  session: Models.Session | null;
  user: Models.User<object> | null;
  signin: (data: loginUserDto) => Promise<void>;
  signup: (data: signupUserDto) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signin: async (data: loginUserDto) => {},
  signup: async (data: signupUserDto) => {},
  signout: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Models.User<object> | null>(null);
  const [session, setSession] = useState<Models.Session | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    checkAuth();
  };

  const checkAuth = async () => {
    try {
      const session = await account.getSession('current');
      setSession(session);

      const user = await account.get();
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async ({ email, password }: loginUserDto) => {
    setLoading(true);

    try {
      const responseSession = await account.createEmailPasswordSession(email, password);
      setSession(responseSession);

      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const signup = async ({ email, password, name }: signupUserDto) => {
    setLoading(true);
    try {
      const newUser = await account.create(ID.unique(), email, password, name);

      if (!newUser) throw new Error('User creation failed');

      // Automatically sign in the user after successful signup
      const session = await account.createEmailPasswordSession(email, password);
      setSession(session);
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);

    await account.deleteSession('current');
    setUser(null);
    setSession(null);

    setLoading(false);
  };

  const contextData = { session, user, signin, signup, signout };

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
