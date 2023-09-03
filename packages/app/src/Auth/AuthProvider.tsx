import { useState, useEffect, createContext, useContext } from "react";
import { AuthLanding, AuthStack } from "./LoginHome";
import { tokenVar } from "../Apollo/apollo";
import { fetchUser, verifyToken } from "./Utils";
import { getAsyncData, storeAsyncData } from "../Utils/AsyncStorage";
import { LoadingScreen } from "../Utils/MiscComponents";
import { User } from "common";

export const AuthGateway = ({ children }) => {
  const [token, updateToken] = useState("");
  const [fetchingPrev, updateFetchingPrev] = useState(true);

  const refreshToken = (x) => {
    tokenVar(x);
    updateToken(x);
    storeAsyncData("token", x);
  };

  useEffect(() => {
    // Check if we were logged in last time - ask backend if token is still valid
    getAsyncData("token").then((result) =>
      verifyToken(result)
        .then((valid) => valid && refreshToken(result))
        .then(() => updateFetchingPrev(false))
    );
  }, []);

  if (fetchingPrev)
    return <LoadingScreen text={"Remembering who you are..."} />;
  else if (!token) return <AuthStack updateToken={(x) => refreshToken(x)} />;
  else
    return <AuthProvider updateToken={refreshToken}>{children}</AuthProvider>;
};

const AuthProvider = ({ children, updateToken }) => {
  return (
    <AuthContext.Provider value={useProvideAuth(updateToken)}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext(null);

export const useAuthData = () => {
  return useContext(AuthContext);
};

export function useProvideAuth(updateToken) {
  const [userData, updateUserData] = useState<User | undefined>(undefined);

  const refreshData = async () => {
    await fetchUser().then((user) => {
      updateUserData(user);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Provide these as return values to the useAuthData hook throughout the nested code
  return {
    user: userData,
    refetch: refreshData,
    logout: () => updateToken(""),
  };
}
