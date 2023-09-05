import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FirstScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require("../../assets/images/header_background.png")}
          style={styles.imageHeader}
        >
        </ImageBackground>
      </View>

      <Text style={styles.title}>Plant Paradise</Text>
      <Text style={styles.byline}>Find your favorite plants and help the environment</Text>

      <Pressable
        style={styles.buttonSignIn}
        onPress={() => navigation.navigate("second" as never)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("second" as never)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 442,
    flexShrink: 0,
  },
  imageHeader: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    width: 225,
    height: 100,
    top: 40,
    left: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 50,
    fontStyle: "normal",
    lineHeight: 55,
    color: "#000000",
  },
  byline: {
    width: 249,
    height: 40,
    top: 60,
    left: 24,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 20,
    color: "#000000",
  },
  buttonSignIn: {
    width: 360,
    height: 48,
    marginTop: 100,
    left: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  buttonSignUp: {
    width: 360,
    height: 48,
    marginTop: 25,
    left: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  buttonText: {
    width: 100,
    height: 24,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});