import { createContext, ReactNode, useContext, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';

interface AuthContextType {
  session: boolean;
  user: boolean;
  signin: () => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  session: true,
  user: false,
  signin: () => {},
  signout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [session, setSession] = useState(true);

  const signin = () => {};
  const signout = () => {};

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
