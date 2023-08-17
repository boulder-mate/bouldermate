import { useState, useEffect, createContext, useContext } from "react";
import { AuthLanding, AuthStack } from "./LoginHome";
import { tokenVar } from "../Apollo/apollo";
import { fetchUser } from "./Utils";

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    console.log("Authorized with token:", tokenVar());
  }, [tokenVar()]);

  if (!tokenVar()) return <AuthStack />;
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

  const refreshData = async () => {
    await fetchUser().then((user) => updateUserData(user));
  };

  useEffect(() => {
    refreshData();
  }, []);

  return { user: userData, refetch: refreshData };
}
