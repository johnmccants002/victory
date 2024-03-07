// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { signIn } from "../services/auth";
import { getCurrentUser } from "../services/user";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

interface AuthContextType {
  session: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    enabled: false, // Initially disable automatic fetching
  });
  async function checkSessionToken() {
    if (Platform.OS === "web") {
      const token = localStorage.getItem("sessionToken");
      if (token) {
        setSession({ token }); // Adjust according to how you want to structure the session state
        refetchUser();
      }
    } else {
      const token = await SecureStore.getItemAsync("sessionToken");
      if (token) {
        setSession({ token }); // Adjust according to how you want to structure the session state
        refetchUser();
      }
    }
  }

  useEffect(() => {
    checkSessionToken();
  }, []);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
