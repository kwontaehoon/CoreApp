import { Stack } from "expo-router";

export default function IntroLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* 다른 로그인 관련 페이지 필요시 추가*/}
    </Stack>
  );
}
