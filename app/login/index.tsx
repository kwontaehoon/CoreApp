import Logo from "@/components/Logo";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const keyboardHeight = useKeyboardHeight();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState(false);
  const setSession = useSessionStore((state) => state.setSession)

  async function signInWithEmail() {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setValidationError(true);
      console.log(error)
    } else {
      const { session } = data;
      setSession(session)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ paddingBottom: keyboardHeight }}
    >
      <View className="flex-1 items-center justify-center p-5 gap-5">
        <Logo />

        <View className="w-full">
          <Text className="mb-1 text-base font-medium">이메일</Text>
          <TextInput
            label="이메일을 입력하세요"
            mode="outlined"
            value={email}
            onFocus={()=>setValidationError(false)}
            onChangeText={setEmail}
            style={{ backgroundColor: "#f2f2f2" }}
          />
        </View>

        <View className="w-full">
          <Text className="mb-1 text-base font-medium">비밀번호</Text>
          <TextInput
            label="비밀번호를 입력하세요"
            mode="outlined"
            value={password}
            onFocus={()=>setValidationError(false)}
            onChangeText={setPassword}
            style={{ backgroundColor: "#f2f2f2" }}
            secureTextEntry
          />
        </View>

        {validationError && (
          <View className="w-full">
            <Text style={{ color: "red" }}>입력 정보를 다시 확인해주세요.</Text>
          </View>
        )}

        <View className="w-full items-end">
          <Text className="text-sm text-blue-600">비밀번호를 잊으셨나요?</Text>
        </View>

        <Button
          mode="contained"
          className="w-full rounded-lg"
          onPress={() => signInWithEmail()}
        >
          로그인
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
