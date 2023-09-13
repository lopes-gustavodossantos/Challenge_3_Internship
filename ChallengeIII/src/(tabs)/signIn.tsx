import React, { useState, useContext, useRef } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";

import { UserContext } from "../context/UserLogin";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../assets/FirebaseConfig/config";

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  const passwordInput = useRef<TextInput | null>(null);
  const emailInput = useRef<TextInput | null>(null);

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.navigate("IndexScreen");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  const { login } = useContext(UserContext);

  async function handleLogin() {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    setTimeout(() => {
      login(email, password);
      navigation.navigate("Home", { user: user.uid });
    }, 1500);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <Image
            source={require("../../assets/images/back_button.png")}
          />
        </Pressable>

        <Text style={styles.title}>Sign In</Text>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        placeholder="Type your e-mail address"
        onSubmitEditing={() => {
          if (passwordInput.current) {
            passwordInput.current.focus();
          }
        }}
        ref={(input) => {
          emailInput.current = input;
        }}
      />

      <TextInput
        style={styles.input}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        placeholder="Type your password"
        onSubmitEditing={handleLogin}
        ref={(input) => {
          passwordInput.current = input;
        }}
      />

      <Text style={styles.signUpText} onPress={handleSignUp}>
        Don't have an account? Sign Up
      </Text>

      <Pressable style={styles.buttonSignIn} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
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
    width: 48,
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
  signUpText: {
    marginTop: 10,
    color: "#418B64",
    textDecorationLine: "underline",
  },
  buttonSignIn: {
    width: 360,
    height: 48,
    marginTop: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
});
