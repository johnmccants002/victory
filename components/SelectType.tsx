import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type Props = {};

const SelectType: React.FC<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [types, setTypes] = useState<string[]>([
    "Fitness",
    "Education",
    "Art",
    "Music",
  ]); // Example types

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement the search logic or API call to filter the types
  };

  const handleSelectType = (type: string) => {
    console.log("Selected Type:", type);
    // Handle the selection
  };

  const handleCreateNewType = () => {
    console.log("Creating New Type:", searchQuery);
    // Add logic to create a new type
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search types..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {types
        .filter((type) =>
          type.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((type, index) => (
          <TouchableOpacity
            key={index}
            style={styles.typeItem}
            onPress={() => handleSelectType(type)}
          >
            <Text style={styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}

      {searchQuery !== "" && (
        <TouchableOpacity
          style={styles.newTypeButton}
          onPress={handleCreateNewType}
        >
          <Text style={styles.newTypeButtonText}>Create "{searchQuery}"</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  typeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  typeText: {
    fontSize: 16,
    color: "#333",
  },
  newTypeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  newTypeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SelectType;
