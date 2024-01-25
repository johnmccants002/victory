import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

const friendsList = [
  { id: "1", name: "Alice Smith", imageUrl: "https://i.imgur.com/hCwHtRc.png" },
  { id: "2", name: "Bob Johnson", imageUrl: "https://i.imgur.com/y1SvStU.png" },
  // ... more friends
];

const CreateSponsorScreen: React.FC = () => {
  const [moneyPerVictory, setMoneyPerVictory] = useState<string>("");
  const [totalVictories, setTotalVictories] = useState<string>("");
  const [completionBonus, setCompletionBonus] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);
  const [filteredFriends, setFilteredFriends] = useState(friendsList);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFriends(friendsList);
    } else {
      const filtered = friendsList.filter((friend) =>
        friend.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  };

  const handleSelectFriend = (friend: { name: string; imageUrl: string }) => {
    setSelectedFriend(friend);
    setSearchQuery(""); // Clear search query
    setFilteredFriends(friendsList); // Reset search results
  };

  const handleRemoveSelection = () => {
    setSelectedFriend(null);
  };

  const handleSubmit = () => {
    // Handle the submission of the sponsorship details
    Alert.alert(
      "Sponsorship Created",
      "Your sponsorship has been successfully created."
    );
    // Add logic to process the data
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: 20,
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.inputLabel}>Select Friend To Sponsor</Text>
          {!selectedFriend && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a friend"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          )}

          {searchQuery !== "" && !selectedFriend && (
            <View style={styles.searchResults}>
              {filteredFriends.map((friend) => (
                <TouchableOpacity
                  key={friend.id}
                  style={styles.friendItem}
                  onPress={() => handleSelectFriend(friend)}
                >
                  <Text>{friend.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {selectedFriend && (
            <View style={styles.selectedFriendContainer}>
              <Image
                source={{ uri: selectedFriend.imageUrl }}
                style={styles.friendImage}
              />
              <Text style={styles.friendName}>{selectedFriend.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveSelection}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.inputLabel}>{"Amount Per Victory (USD)"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Money per Victory"
            keyboardType="numeric"
            value={moneyPerVictory}
            onChangeText={setMoneyPerVictory}
          />
          <Text style={styles.inputLabel}>Up To How Many Victories?</Text>

          <TextInput
            style={styles.input}
            placeholder="Total Victories"
            keyboardType="numeric"
            value={totalVictories}
            onChangeText={setTotalVictories}
          />
          <Text style={styles.inputLabel}>
            {"Bonus Amount Given When Completed (Optional)"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Completion Bonus"
            keyboardType="numeric"
            value={completionBonus}
            onChangeText={setCompletionBonus}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Sponsorship</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 16,
    color: "#333", // Dark color for the title
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 28,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchResults: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    maxHeight: 200, // Adjust as needed
  },
  friendItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  selectedFriend: {
    fontSize: 16,
    marginVertical: 10,
  },
  selectedFriendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  friendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  friendName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 16,
    color: "red",
  },
});

export default CreateSponsorScreen;
