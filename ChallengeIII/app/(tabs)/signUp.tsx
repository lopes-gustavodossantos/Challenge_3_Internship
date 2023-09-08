import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleSignUp = () => {
    // Perform registration logic here, e.g., sending data to a server
    // You can use 'name', 'email', and 'password' state values

    // Reset the password field to empty after sign up
    setName("");
    setEmail("");
    setPassword("");

    navigation.navigate("index");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        ref={emailInputRef}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
          ref={passwordInputRef}
          onSubmitEditing={handleSignUp}
        />
        <Pressable onPress={toggleShowPassword} style={styles.showPasswordButton}>
          <Text>{showPassword ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buttonSignUp} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 75,
    color: "#000000",
  },
  input: {
    width: 360,
    height: 48,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 48,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#BDBDBD",
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 10,
  },
  showPasswordButton: {
    padding: 10,
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
  buttonText: {
    width: 100,
    height: 24,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 22,
    textAlign: "center",
    lineHeight: 26,
    color: "#FFFFFF",
  },
});