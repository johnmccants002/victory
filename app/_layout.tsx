import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, useColorScheme, Text } from "react-native";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { VictoriesProvider } from "../components/VictoriesContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { AuthProvider } from "../providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <VictoriesProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="create-victory"
                options={{
                  title: "Create Victory",
                  headerShown: true,
                  headerLeft: () => (
                    <Pressable onPress={router.back}>
                      <Ionicons name="arrow-back" size={30} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="preview-victories"
                options={{
                  title: "Preview Victories",
                  headerShown: true,
                  headerLeft: () => (
                    <Pressable onPress={router.back}>
                      <Ionicons name="arrow-back" size={30} />
                    </Pressable>
                  ),
                }}
              />

              <Stack.Screen
                name="sponsors"
                options={{
                  title: "Your Sponsors",
                  headerRight: () => (
                    <Link href="/createsponsor" asChild>
                      <Pressable>
                        {({ pressed }) => (
                          <FontAwesome
                            name="user-plus"
                            size={25}
                            color={Colors[colorScheme ?? "light"].text}
                            style={{
                              marginRight: 15,
                              opacity: pressed ? 0.5 : 1,
                            }}
                          />
                        )}
                      </Pressable>
                    </Link>
                  ),
                }}
              />
              <Stack.Screen name={"settings"} options={{ title: "Settings" }} />
              <Stack.Screen
                name="sponsordetail"
                options={{ title: "Sponsor Details" }}
              />
              <Stack.Screen
                name="createsponsor"
                options={{ title: "New Sponsor" }}
              />
              <Stack.Screen name="userprofile" options={{ title: "Profile" }} />
              <Stack.Screen name="typefeed" options={{ title: "Workout" }} />
              <Stack.Screen
                name="selecttype"
                options={{
                  title: "Select Type",
                  presentation: "fullScreenModal",
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <FontAwesome name="close" size={20} />
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
          </VictoriesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
