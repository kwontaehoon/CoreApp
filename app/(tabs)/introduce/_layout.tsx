import { Stack } from "expo-router";

export default function IntroduceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "프로젝트 소개" }} />
    </Stack>
  );
}
