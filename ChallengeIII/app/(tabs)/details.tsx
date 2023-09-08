import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

// Define a type for your item data
type Item = {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  popular: number;
  classification: number;
  price: number;
};

// Define a custom type for your route params
type DetailsScreenRouteParams = {
  item: Item;
};

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, DetailsScreenRouteParams>, string>>();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Access the item data with the specified type
  const item = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Image
            source={require("../../assets/images/back_button.png")}
          />
        </Pressable>
        
        <Text style={styles.title}>Details</Text>
      </View>

      {/* Display the item data */}
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Image
                source={{ uri: item.coverImageUrl }}
                style={styles.itemImage}
              />
      {/* Add more components to display other item details */}
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
    width: 50,
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
