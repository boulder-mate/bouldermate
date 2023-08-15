import { useState, useEffect, createContext, useContext } from "react";
import { AuthLanding, AuthStack } from "./LoginHome";

export const AuthProvider = ({ children }) => {
  const [userToken, setToken] = useState("");

  if (!userToken) return <AuthStack />;
  else
    return (
      <AuthContext.Provider value={useProvideAuth()}>
        {children}
      </AuthContext.Provider>
    );
};

const AuthContext = createContext(null);

export const useAuthData = () => {
  return useContext(AuthContext);
};

export function useProvideAuth() {
  const [userData, updateUserData] = useState({});

  useEffect(() => {
    // fetchUser();
  }, []);

  return userData;
}