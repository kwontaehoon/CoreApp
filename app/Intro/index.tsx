import Logo from "@/components/Logo";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function InroScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-7 p-5">
      
      <Logo />

      <View>
        <Text className="text-4xl font-bold">환영합니다!</Text>
      </View>

      <View>
        <Text className="text-2xl text-gray-500">CoreApp과 함께 시작해보세요</Text>
      </View>

      <View className="w-full">
        <Button
          icon=""
          mode="contained"
          style={{ borderRadius: 6, backgroundColor: "#3b82f6" }}
          className="mb-4"
          onPress={() => router.push("/login")}
        >
          로그인
        </Button>
        <Button
          icon=""
          mode="contained"
          textColor="black"
          style={{ borderRadius: 6, backgroundColor: "white" }}
          onPress={() => router.push("/signup")}
        >
          회원가입
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
