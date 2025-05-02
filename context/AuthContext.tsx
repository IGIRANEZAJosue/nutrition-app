import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Models } from 'react-native-appwrite';

import { account } from '~/lib/appWriteConfig';
import { loginUserDto } from '~/utils/api';
interface AuthContextType {
  session: Models.Session | null;
  user: Models.User<object> | null;
  signin: (data: loginUserDto) => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signin: async (data: loginUserDto) => {},
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

  const signout = async () => {
    setLoading(true);

    await account.deleteSession('current');
    setUser(null);
    setSession(null);

    setLoading(false);
  };

  const contextData = { session, user, signin, signout };

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
