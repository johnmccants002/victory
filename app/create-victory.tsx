import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import CreateVictoryScreen from "../components/CreateVictoryNew";
export default function CreateVictory() {
  return <CreateVictoryScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
