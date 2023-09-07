import { useFonts } from "expo-font";
import { Text, View, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import data from "../../assets/api/data.json";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hi}>Hi,</Text>
        <Text style={styles.title}>Most popular</Text>

        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("index" as never)}
        >
          <Image
            source={require("../../assets/images/profile_image.png")}
            style={styles.buttonImage}
          />
        </Pressable>
      </View>

      <FlatList
        data={data.body.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.coverImageUrl }}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    height: 470,
    flexShrink: 0,
    backgroundColor: "#00FF00",
  },
  hi: {
    width: 97,
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
  title: {
    width: 135,
    height: 24,
    top: 146,
    left: 24,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  buttonContainer: {
    position: "absolute",
    top: 79,
    right: 24,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    flex: 1,
    height: 279,
    flexShrink: 0,
    marginHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  itemImage: {
    width: "100%",
    height: 209,
    flexShrink: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemName: {
    width: 117,
    height: 26,
    left: 18,
    marginTop: 10,
    flexShrink: 0,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  itemPrice: {
    width: 45,
    height: 25,
    left: 18,
    flexShrink: 0,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
});
