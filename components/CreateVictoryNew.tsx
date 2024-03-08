// screens/CreateVictoryScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { processToDoList } from "../services/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
import { useVictories } from "./VictoriesContext";
import { createVictory } from "../services/victory";

const CreateVictoryScreen = () => {
  const [victoryText, setVictoryText] = useState("");
  const [victories, setVictories] = useState<object[] | null>(null);
  const { setPreviewVictories } = useVictories();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const data = await createVictory(victoryText);
      console.log("🚀 ~ handleSubmit ~ data:", data);

      alert("Victory created!");
      router.replace("/(tabs)/");
    } catch (error) {
      alert("Failed to generate victories. Please try again.");
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
      {victories ? (
        <View>
          <Text>
            {`Victories generated: ${
              victories.length > 0 ? victories.length : 0
            }`}
          </Text>
          <Link push href={"/preview-victories"} asChild>
            <Pressable>
              <Text>Preview Victories</Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <TextInput
          multiline
          placeholder="Paste your completed to-do list here"
          value={victoryText}
          onChangeText={setVictoryText}
          style={{
            height: 100,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
          }}
        />
      )}
      <Button title="Create Victory" onPress={handleSubmit} />
      {/* {victories && <Text style={{ marginTop: 20 }}>{victories}</Text>} */}
    </ScrollView>
  );
};

export default CreateVictoryScreen;
