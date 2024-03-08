import { API_URL } from "../constants/url";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const createVictory = async (victoryText: string) => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("accessToken")
      : await SecureStore.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/victories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        victory_text: victoryText,
        image_url: null,
        category: "Standard",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not create victory.");
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("ERROR creating victory", error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      console.log("An unexpected error occurred");
    }
    throw error;
  }
};

export const fetchCurrentUserVictories = async () => {
  const token =
    Platform.OS === "web"
      ? localStorage.getItem("accessToken")
      : await SecureStore.getItem("accessToken");

  try {
    const response = await fetch(`${API_URL}/victories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK, attempt to parse any JSON error message
      const errorData = await response.json();
      throw new Error(errorData.error || "Could not fetch user victories.");
    }

    // If the response is OK, parse the JSON body of the response
    const victories = await response.json();
    return victories;
  } catch (error) {
    if (error instanceof Error) {
      console.log("ERROR fetching user victories", error.message);
    } else {
      console.log("An unexpected error occurred");
    }
    throw error;
  }
};
