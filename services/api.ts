// services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Change to your actual backend URL

export const processToDoList = async (toDoList) => {
  console.log("IN THE FUNCTION");
  try {
    const response = await axios.post(`${BASE_URL}/processToDoList`, {
      toDoList,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to process to-do list:", error);
    throw error;
  }
};
