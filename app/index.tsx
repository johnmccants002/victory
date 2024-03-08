import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { View, Image, ImageBackground } from "react-native";

type Props = {};

const Page = () => {
  const { currentUser, loading } = useAuth();

  const isLoading = true;

  useEffect(() => {
    console.log(loading, "THIS IS THE LOADING");
    console.log(currentUser, "THIS IS THE CURRENT USER");
  }, [loading]);

  if (loading) {
    // Render loading indicator
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {/* <Image source={require("../assets/images/splash.png")} /> */}
      </View>
    );
  }

  // Your existing logic for redirect based on currentUser
  return currentUser ? (
    <Redirect href={"/(tabs)/"} />
  ) : (
    <Redirect href={"/(auth)/login"} />
  );
};

export default Page;
