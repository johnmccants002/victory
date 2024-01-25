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
  const userImage = "path_to_image"; // Replace with actual image path
  const moneyPerVictory = 25;
  const totalVictories = 10;
  const completionBonus = 50;
  const [loading, setLoading] = useState(false);
  const victories = []; // Array of victories, replace with actual data
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
      <View style={styles.profileSection}>
        <Image source={{ uri: userImage }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.sponsorshipDetails}>
        <Text style={styles.detailText}>
          Money per Victory: ${moneyPerVictory}
        </Text>
        <Text style={styles.detailText}>Total Victories: {totalVictories}</Text>
        <Text style={styles.detailText}>
          Completion Bonus: ${completionBonus}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={handleCancelSponsorship}
      >
        <Text style={styles.cancelButtonText}>Cancel Sponsorship</Text>
      </TouchableOpacity>

      {/* List of victories - replace with actual data */}
      <FlatList
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
    backgroundColor: "red", // Adjust color based on your app's theme
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
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
});

export default SponsorDetailScreen;
