import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useVictories } from "./VictoriesContext";
import { createVictories } from "../services/victory";

const PreviewVictoriesScreen = () => {
  const { previewVictories } = useVictories();
  const [selectedVictories, setSelectedVictories] = useState(
    new Set(previewVictories.map((item) => item.victoryText))
  );

  const toggleSelect = (victoryText) => {
    const newSelectedVictories = new Set(selectedVictories);
    if (newSelectedVictories.has(victoryText)) {
      newSelectedVictories.delete(victoryText);
    } else {
      newSelectedVictories.add(victoryText);
    }
    setSelectedVictories(newSelectedVictories);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.victoryText}</Text>
      <TouchableOpacity
        onPress={() => toggleSelect(item.victoryText)}
        style={styles.checkbox}
      >
        <Text>{selectedVictories.has(item.victoryText) ? "[x]" : "[ ]"}</Text>
      </TouchableOpacity>
    </View>
  );

  const create = async () => {
    // Here you would handle the creation of the selected victories
    try {
      const data = await createVictories(previewVictories);
      console.log("🚀 ~ create ~ data:", data);
    } catch {
      console.log("Unable to create victories");
    }
    console.log(
      "Creating selected victories...",
      Array.from(selectedVictories)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={previewVictories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.createButton} onPress={create}>
        <Text style={styles.buttonText}>Create Victories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  cardText: {
    color: "black",
  },
  checkbox: {
    padding: 10,
  },
  listContainer: {
    paddingBottom: 50, // To ensure the button is not covering the last item
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "blue",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PreviewVictoriesScreen;
