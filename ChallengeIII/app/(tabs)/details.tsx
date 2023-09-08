import { useFonts } from "expo-font";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Platform
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type Item = {
  id: number;
  name: string;
  description: string;
  coverImageUrl: string;
  popular: number;
  category: string;
  classification: number;
  price: number;
};

type DetailsScreenRouteParams = {
  item: Item;
};

export default function DetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<Record<string, DetailsScreenRouteParams>, string>>();

  const [fontsLoaded] = useFonts({
    "Poppins Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

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

      <Image
        source={{ uri: item.coverImageUrl }}
        style={styles.itemImage}
      />
      <Text style={styles.itemCategory}>{item.category}</Text>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>

      <View style={styles.tabBar}>
      </View>
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
    height: 247,
    flexShrink: 0,
  },
  itemCategory: {
    width: 100,
    height: 24,
    left: 24,
    marginTop: 20,
    fontFamily: "Poppins Regular",
    fontWeight: "400",
    fontSize: 16,
    fontStyle: "normal",
    lineHeight: 24,
    color: "#969595",
  },
  itemName: {
    width: 231,
    height: 24,
    left: 24,
    marginTop: 15,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 28,
    fontStyle: "normal",
    lineHeight: 30,
    color: "#000000",
  },
  itemPrice: {
    width: 56,
    height: 19,
    left: 24,
    marginTop: 30,
    flexShrink: 0,
    fontFamily: "Poppins Medium",
    fontWeight: "600",
    fontSize: 20,
    fontStyle: "normal",
    lineHeight: 23,
    color: "#000000",
  },
  tabBar: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: 85,
    left: -1,
    bottom: 0,
    flexShrink: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0.601,
    paddingLeft: 0.805,
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
    backgroundColor: "#FFFFFF",
  },
});
