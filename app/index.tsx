import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // console.log("초기 세션: ", session);
      // setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("auth 상태 변경됨", session);
      if (session) {
        setSession(session);
        router.replace("/board");
      } else {
        router.replace("/Intro");
      }
    });
  }, []);

  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});

// return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
