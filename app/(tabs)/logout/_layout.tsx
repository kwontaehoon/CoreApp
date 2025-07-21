import { Stack } from "expo-router";

export default function LogoutLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "로그아웃" }} />
    </Stack>
  );
}
