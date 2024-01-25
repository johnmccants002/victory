import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import { posts } from "../data/DummyData";
import Post from "./Post";

type Props = {
  // Add any props you need, like user details, sponsorship details, etc.
};

const SponsorDetailScreen = (props: Props) => {
  // Placeholder data - replace with actual data
  const userName = "John Doe";
  const userImage = posts[0].profileImage; // Replace with actual image path

  const [loading, setLoading] = useState(false);
  const victories = []; // Array of victories, replace with actual data
  const moneyPerVictory = 10; // Example value
  const totalVictories = 50; // Example value
  const completionBonus = 100; // Example value
  const handleMessage = () => {
    // Handle message logic
    console.log("Message Pressed");
  };
  const renderItem = ({ item }) => (
    <Post
      profileImage={item.profileImage}
      name={item.name}
      text={item.text}
      postImage={item.postImage}
      dateTime={item.dateTime}
      onReply={() => console.log("Reply clicked on post", item.id)}
      onRespect={() => console.log("Respect clicked on post", item.id)}
    />
  );
  const handleCancelSponsorship = () => {
    // Handle cancellation logic
    Alert.alert(
      "Cancel Sponsorship",
      "Are you sure you want to cancel this sponsorship? Earned money will be sent back.",
      [
        // Button configurations
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={styles.profileSection}>
            <Image source={{ uri: userImage }} style={styles.profileImage} />
          </View>

          <View style={styles.sponsorshipDetails}>
            <Text style={styles.userName}>{userName}</Text>
            <Text>Sacramento, CA</Text>
            <Text>15 mutual friends</Text>
          </View>
        </View>

        <View style={styles.sponsorDetailsContainer}>
          <Text style={styles.sponsorDetailsTitle}>Sponsor Details</Text>

          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Money per Victory:</Text>
            <Text style={styles.detailValue}>${moneyPerVictory}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Total Victories:</Text>
            <Text style={styles.detailValue}>{totalVictories}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>Completion Bonus:</Text>
            <Text style={styles.detailValue}>${completionBonus}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.messageButton]}
            onPress={handleMessage}
          >
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancelSponsorship}
          >
            <Text style={styles.buttonText}>Cancel Sponsorship</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List of victories - replace with actual data */}
      <FlatList
        style={{ paddingTop: 10, paddingHorizontal: 10 }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator animating={true} color="blue" />
          ) : (
            <View style={styles.empty}>
              <Text>Sorry No Victories to display</Text>
            </View>
          )
        }
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => console.log("Grabbing new posts")}
          />
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  sponsorshipDetails: {
    marginHorizontal: 20,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    marginLeft: 10, // Spacing between buttons
  },

  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  victoryItem: {
    backgroundColor: "#f0f0f0", // Adjust color based on your app's theme
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1, // ensures equal width for both buttons
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "blue", // Adjust color based on your app's theme
    marginRight: 10, // Spacing between buttons
  },
  sponsorDetailsContainer: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  sponsorDetailsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    color: "#333", // Dark color for the title
    textAlign: "center",
  },
  sponsorDetailsText: {
    fontSize: 16,
    color: "gray", // Adjust the color as needed
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Light border for separation
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666", // Slightly darker color for titles
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333", // Dark color for values
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default SponsorDetailScreen;
{
  /* <Text style={styles.detailText}>
            Money per Victory: ${moneyPerVictory}
          </Text>
          <Text style={styles.detailText}>
            Total Victories: {totalVictories}
          </Text>
          <Text style={styles.detailText}>
            Completion Bonus: ${completionBonus}
          </Text> */
}
