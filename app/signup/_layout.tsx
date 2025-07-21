import { Stack } from "expo-router";

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      {/* 다른 회원가입 관련 페이지 필요시 추가*/}
    </Stack>
  );
}
