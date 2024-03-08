// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/user";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { User } from "../interfaces/authResults";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true); // Assume loading initially

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    enabled: false, // Enable fetching if accessToken is available
  });
  async function checkSessionToken() {
    let token: string | null = null;
    if (Platform.OS === "web") {
      token = localStorage.getItem("accessToken");
    } else {
      token = await SecureStore.getItemAsync("accessToken");
    }
    console.log("🚀 ~ checkSessionToken ~ token:", token);
    if (token) {
      setAccessToken(token);
      await refetchUser(); // Trigger the refetch manually since 'enabled' depends on accessToken
    }
  }

  useEffect(() => {
    const fetchAuthStatus = async () => {
      setLoading(true);
      await checkSessionToken(); // Make sure this function updates currentUser as needed
      setLoading(false);
    };

    fetchAuthStatus();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ user:", user);

    if (user) {
      console.log("SETTING THE USER");
      setCurrentUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        currentUser,
        setCurrentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
