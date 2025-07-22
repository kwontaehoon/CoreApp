import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false}} />
          <Stack.Screen
            name="Intro"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              title: "회원가입",
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              title: "로그인",
            }}
          />
          <Stack.Screen
            name="board"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
