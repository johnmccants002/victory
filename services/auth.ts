const API_URL = "http://localhost:3000/api"; // Change this to your actual backend URL

// Function to sign up a new user
export const signUp = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not complete signup.");
    }
    return data;
  } catch (error) {
    // Handle errors, e.g., show a notification or log
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Function to sign in an existing user
export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Could not complete signin.");
    }
    return data;
  } catch (error) {
    // Handle errors, e.g., show a notification or log
    console.error("Signin error:", error.message);
    throw error;
  }
};
