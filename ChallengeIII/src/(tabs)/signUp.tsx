import React, { useState } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../assets/FirebaseConfig/config";

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.navigate("IndexScreen");
  };

  const handleSignIn = () => {
    navigation.navigate("SignInScreen");
  };

  async function handleSignUp() {
    if (password !== confirmPassword) {
      return;
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      navigation.navigate("SignInScreen");
    }
  }

  let passwordInput: TextInput | null = null;
  let confirmPasswordInput: TextInput | null = null; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <Image source={require("../../assets/images/back_button.png")} />
        </Pressable>

        <Text style={styles.title}>Sign Up</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type your e-mail address"
        onChangeText={(email) => setEmail(email)}
        onSubmitEditing={() => {
          if (passwordInput) {
            passwordInput.focus();
          }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        ref={(input) => {
          passwordInput = input;
        }}
        onSubmitEditing={() => {
          if (confirmPasswordInput) {
            confirmPasswordInput.focus();
          }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your password again"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        secureTextEntry
        ref={(input) => {
          confirmPasswordInput = input;
        }}
      />

      <Text style={styles.signInText} onPress={handleSignIn}>
        Already have an account? Sign In
      </Text>

      <Pressable style={styles.buttonSignUp} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    height: 98,
    flexShrink: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    width: 54,
    height: 24,
    top: 33,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  backButton: {
    width: 26,
    height: 26,
    top: 56,
    left: -176,
    flexShrink: 0,
  },

  
  input: {
    width: 360,
    height: 48,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000000",
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 15,
    fontStyle: "normal",
    lineHeight: 15,
    color: "#000000",
  },
  buttonText: {
    width: 100,
    height: 24,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    fontSize: 22,
    textAlign: "center",
    lineHeight: 24,
    color: "#FFFFFF",
  },
  signInText: {
    marginTop: 10,
    color: "#418B64",
    textDecorationLine: "underline",
  },
  buttonSignUp: {
    width: 360,
    height: 48,
    marginTop: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
});
