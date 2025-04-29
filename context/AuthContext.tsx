import { createContext, ReactNode, useContext, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';

interface AuthContextType {
  session: boolean;
  user: boolean;
  signin: () => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [session, setSession] = useState(false);

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

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
