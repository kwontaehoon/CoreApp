import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function KeyboardAvoding() {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button onPress={() => null}>버튼</Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: 'space-around',
      borderWidth: 1
    },
    header: {
      fontSize: 36,
      marginBottom: 48,
    },
    textInput: {
      height: 40,
      borderColor: '#000000',
      borderBottomWidth: 1,
      marginBottom: 36,
    },
    btnContainer: {
      backgroundColor: 'white',
      marginTop: 12,
      borderWidth: 1
    },
  });