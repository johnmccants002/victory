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
import { Link } from "expo-router";
import { useVictories } from "./VictoriesContext";

const CreateVictoryScreen = () => {
  const [toDoList, setToDoList] = useState("");
  const [victories, setVictories] = useState<object[] | null>(null);
  const { setPreviewVictories } = useVictories();

  const handleSubmit = async () => {
    try {
      const data = await processToDoList(toDoList);
      console.log(JSON.stringify(data.victories), "DATA VICTORIES VICTORIES");
      console.log(JSON.parse(data.victories), "PARSED");
      const parsedVictories = JSON.parse(data.victories);
      setVictories(data.victories); // Assuming the backend returns an object with a 'victories' key
      setPreviewVictories(parsedVictories.victories);
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
          value={toDoList}
          onChangeText={setToDoList}
          style={{
            height: 100,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
          }}
        />
      )}
      <Button title="Generate Victories" onPress={handleSubmit} />
      {victories && <Text style={{ marginTop: 20 }}>{victories}</Text>}
    </ScrollView>
  );
};

export default CreateVictoryScreen;
