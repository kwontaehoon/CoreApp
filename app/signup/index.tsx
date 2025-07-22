import Logo from "@/components/Logo";
import { useSignupMutation } from "@/hooks/query";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import { supabase } from "@/lib/supabase";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "@/utils/validation";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, TextInput as PaperTextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {

  const signupList = [
    { id: 1, title: "이메일" },
    { id: 2, title: "이름" },
    { id: 3, title: "비밀번호" },
  ];

  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardHeight = useKeyboardHeight();
  const inputWrapperRefs = useRef<(View | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [policyCheck, setPolicyCheck] = useState({
    terms: false,
    privacy: false,
  });

  const [validation, setValidation] = useState({
    email: "",
    password: "",
    name: "",
    policy: "",
  });

  const { mutateAsync: signup } = useSignupMutation({
    email: userInfo.email,
    password: userInfo.password,
    name: userInfo.name,
  });

  useEffect(() => {
    if (
      keyboardHeight > 0 &&
      focusedIndex !== null &&
      inputWrapperRefs.current[focusedIndex] &&
      scrollViewRef.current
    ) {
      inputWrapperRefs.current[focusedIndex]?.measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          const scrollToY = y - keyboardHeight; // 키보드 위 50px
          scrollViewRef.current?.scrollTo({ y: scrollToY, animated: true });
        },
        (error) => console.warn("measureLayout error", error)
      );
    }
  }, [keyboardHeight, focusedIndex]);

  const test = async () => {
    let emailError = "";
    let passwordError = "";
    let nameError = "";
    let policyCheckError = "";

    if (!emailValidation(userInfo.email)) {
      emailError = "이메일을 다시 입력해주세요.";
    }
    if (!passwordValidation(userInfo.password)) {
      passwordError = "비밀번호를 6자리 이상으로 입력해주세요.";
    }
    if (!nameValidation(userInfo.name)) {
      nameError = "이름을 입력해주세요.";
    }
    if (!Object.values(policyCheck).every((value) => value)) {
      policyCheckError = "이용약관에 동의해주세요.";
    }
    setValidation({
      email: emailError,
      password: passwordError,
      name: nameError,
      policy: policyCheckError,
    });

    if (emailError || passwordError || nameError || policyCheckError) return;

    try {
      await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
      });

      await signup();
      Alert.alert("회원가입 완료");
    } catch (err: any) {
      if (err?.code === "23505") {
        Alert.alert("에러", "이미 가입된 이메일입니다.");
      } else {
        Alert.alert("에러", "회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[
          styles.container,
          { paddingBottom: keyboardHeight + 50 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Logo />

        {signupList.map((content, index) => (
          <View
            key={content.id}
            ref={(ref) => (inputWrapperRefs.current[index] = ref)}
            style={{ width: "100%" }}
          >
            <Text className="mb-2">{content.title}</Text>
            <PaperTextInput
              style={{ backgroundColor: "#f2f2f2", height: 40 }}
              mode="outlined"
              activeOutlineColor="#3b82f6"
              secureTextEntry={content.id === 3}
              placeholder={content.title}
              placeholderTextColor={"grey"}
              onFocus={() => setFocusedIndex(index)}
              onChangeText={(text) => {
                switch (content.id) {
                  case 1: {
                    setUserInfo({ ...userInfo, email: text });
                    if (validation.email && emailValidation(text)) {
                      setValidation((prev) => ({ ...prev, email: "" }));
                    }
                    break;
                  }
                  case 2: {
                    setUserInfo({ ...userInfo, name: text });
                    if (validation.name && nameValidation(text)) {
                      setValidation((prev) => ({ ...prev, name: "" }));
                    }
                    break;
                  }
                  case 3: {
                    setUserInfo({ ...userInfo, password: text });
                    if (validation.password && passwordValidation(text)) {
                      setValidation((prev) => ({ ...prev, password: "" }));
                    }
                    break;
                  }
                }
              }}
            />
          </View>
        ))}
        <View className="w-full">
          {validation.email && (
            <Text style={{ color: "red" }}>{validation.email}</Text>
          )}
          {validation.password && (
            <Text style={{ color: "red" }}>{validation.password}</Text>
          )}
          {validation.name && (
            <Text style={{ color: "red" }}>{validation.name}</Text>
          )}
          {validation.policy && !Object.values(policyCheck).every((value) => value) && (
            <Text style={{ color: "red" }}>{validation.policy}</Text>
          )}
        </View>

        <View className="w-full flex flex-col gap-2">
          <View className="flex-row">
            <TouchableOpacity
              className={`w-5 h-5 border mr-2 items-center justify-center ${policyCheck.terms ? "bg-blue-500" : "bg-white"}`}
              activeOpacity={0}
              onPress={() => {
                setPolicyCheck({ ...policyCheck, terms: !policyCheck.terms })
                if(policyCheck.privacy && !policyCheck.terms){
                  setValidation({...validation, policyCheck: ""})
                }
              }}
            >
              {policyCheck.terms ? (
                <Ionicons name="checkmark" color="white" />
              ) : (
                ""
              )}
            </TouchableOpacity>

            <Text>이용약관에 동의합니다 (필수)</Text>
          </View>

          <View className="flex-row">
            <TouchableOpacity
              className={`w-5 h-5 border mr-2 items-center justify-center ${policyCheck.privacy ? "bg-blue-500" : "bg-white"}`}
              activeOpacity={0}
              onPress={() => {
                setPolicyCheck({
                  ...policyCheck,
                  privacy: !policyCheck.privacy,
                })
                if(policyCheck.terms && !policyCheck.privacy){
                  setValidation({...validation, policyCheck: ""})
                }
              }}
            >
              {policyCheck.privacy ? (
                <Ionicons name="checkmark" color="white" />
              ) : (
                ""
              )}
            </TouchableOpacity>

            <Text>개인정보처리방침에 동의합니다 (필수)</Text>
          </View>
        </View>

        <Button
          mode="contained"
          style={{ borderRadius: 6, backgroundColor: "#3b82f6" }}
          className="mb-4 w-full"
          onPress={test}
        >
          회원가입
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    gap: 21,
    alignItems: "center",
    justifyContent: "center",
  },
});
