import { API_URL } from "../constants/url";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const getCurrentUser = async () => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("accessToken")
      : await SecureStore.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/users/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not complete signup.");
    }
    return data;
  } catch (error) {
    console.log("ERROR Getting User", error.message);
    throw error;
  }
};
