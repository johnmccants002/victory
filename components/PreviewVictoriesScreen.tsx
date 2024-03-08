import React from "react";
import { useVictories } from "./VictoriesContext";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Post from "./Post";
// Import other necessary components

const PreviewVictoriesScreen = () => {
  const { previewVictories } = useVictories();

  console.log(
    previewVictories,
    "THESE ARE THE PREVIEW VICTORIES",
    typeof previewVictories
  );

  const renderItem = ({ item }) => (
    <Text style={{ color: "black" }}>{item.victoryText}</Text>
  );

  return (
    <View style={styles.container}>
      {previewVictories &&
        previewVictories.map((item) => (
          <Text key={item.victoryText}>{item.victoryText}</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Adjust the background color as needed
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PreviewVictoriesScreen;
