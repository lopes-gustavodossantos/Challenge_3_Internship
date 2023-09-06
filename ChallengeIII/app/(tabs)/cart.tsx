import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Source Sans Pro": require("../../assets/fonts/SourceSansPro.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Subtotal:</Text>
      </View>

      <Pressable
        style={styles.buttonSignUp}
        onPress={() => navigation.navigate("home" as never)}
      >
        <Text style={styles.buttonText}>Go to Checkout</Text>
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
    height: 655,
    flexShrink: 0,
    backgroundColor: "#00ff00",
  },
  title: {
    width: 54,
    height: 24,
    top: 82,
    left: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 27,
    color: "#000000",
  },
  rectangle: {
    width: 360,
    height: 30,
    marginTop: 5,
    left: 26,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#418B64",
    justifyContent: "center",
    backgroundColor: "#ECF8F3",
  },
  rectangleText: {
    width: 54,
    height: 14,
    left: 5,
    fontFamily: "Source Sans Pro",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 14,
    color: "#000000",
  },
  buttonSignUp: {
    width: 360,
    height: 48,
    marginTop: 15,
    left: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#418B64",
  },
  buttonText: {
    width: 105,
    height: 20,
    fontFamily: "Source Sans Pro",
    fontWeight: "600",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
