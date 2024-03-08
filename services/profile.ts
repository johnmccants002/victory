import { API_URL } from "../constants/url";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const fetchCurrentUserProfile = async () => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("accessToken")
      : await SecureStore.getItem("accessToken");

  try {
    const response = await fetch(`${API_URL}/profiles`, {
      // Ensure this URL matches your backend route for fetching the profile
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK, attempt to parse any JSON error message
      const errorData = await response.json();
      throw new Error(errorData.error || "Could not fetch user profile.");
    }

    // If the response is OK, parse the JSON body of the response
    const profile = await response.json();
    return profile;
  } catch (error) {
    if (error instanceof Error) {
      console.log("ERROR fetching user profile", error.message);
    } else {
      console.log("An unexpected error occurred");
    }
    throw error;
  }
};
